// ── Build Master Exercise Database ─────────────────────────────────────────
// Merges:
// 1. hasaneyldrm/exercises-dataset   — 1,324 exercises with detailed instructions & images
// 2. JahelCuadrado/ExerciseGymGifsDB — 1,323 exercises with CDN animated GIFs & secondary muscles
// 3. azilRababe/Exercises_Dataset    — 2,909 exercises with descriptions, difficulty & GIFs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const REPO1_FILE = path.join(ROOT_DIR, 'temp_repos', 'hasaneyldrm', 'data', 'exercises.json');
const REPO2_FILE = path.join(ROOT_DIR, 'temp_repos', 'JahelCuadrado', 'api', 'en', 'exercises.json');
const REPO3_FITNESS_FILE = path.join(ROOT_DIR, 'temp_repos', 'azilRababe', 'fitness_data.json');
const REPO3_GIFS_FILE = path.join(ROOT_DIR, 'temp_repos', 'azilRababe', 'gifs_data.json');

const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'exercises_master.json');

console.log('🚀 Starting Master Exercise Database Consolidation...');

// Clean routine or program prefixes (e.g. "30 Chest Barbell Bench Press" -> "Barbell Bench Press")
function cleanTitle(str) {
  if (!str) return '';
  return str.replace(/^30(\s+(chest|arms|legs|back|shoulders|abs|core))?\s+/i, '').trim();
}

// Normalize string for deduplication key
function normalizeKey(str) {
  return cleanTitle(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalizeWords(str) {
  if (!str) return '';
  const cleaned = cleanTitle(str);
  return cleaned
    .split(' ')
    .map(w => w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '')
    .join(' ')
    .trim();
}

const MUSCLE_MAP = {
  // Chest
  pectorals: 'Chest', pectoralis: 'Chest', chest: 'Chest',
  // Back
  lats: 'Back', 'upper-back': 'Back', 'upper back': 'Back', traps: 'Back',
  trapezius: 'Back', back: 'Back', 'levator-scapulae': 'Back',
  rhomboids: 'Back', 'erector spinae': 'Back', spine: 'Back',
  'middle back': 'Back', 'lower-back': 'Core', neck: 'Back',
  // Shoulders
  delts: 'Shoulders', deltoids: 'Shoulders', shoulders: 'Shoulders',
  'serratus-anterior': 'Shoulders', 'serratus anterior': 'Shoulders',
  // Biceps
  biceps: 'Biceps', bicep: 'Biceps', 'upper arms': 'Biceps',
  // Triceps
  triceps: 'Triceps', tricep: 'Triceps',
  // Forearms
  forearms: 'Forearms',
  // Core
  abs: 'Core', abdominals: 'Core', core: 'Core', obliques: 'Core',
  'lower back': 'Core', waist: 'Core',
  // Legs
  quads: 'Legs', quadriceps: 'Legs', hamstrings: 'Legs', calves: 'Legs',
  glutes: 'Legs', 'hip flexors': 'Legs', abductors: 'Legs', adductors: 'Legs',
  legs: 'Legs', ankles: 'Legs',
  // Cardio
  cardio: 'Cardio', 'full-body': 'Cardio', 'full body': 'Cardio',
};

function getMuscleGroup(raw) {
  if (!raw) return 'Full Body';
  const k = raw.toLowerCase().trim();
  return MUSCLE_MAP[k] || capitalizeWords(raw);
}

function defaultSetsRepsRest(category, difficulty) {
  const d = (difficulty || 'intermediate').toLowerCase();
  const c = (category || 'strength').toLowerCase();
  if (c === 'cardio') {
    return { setsRange: [1, 3], repsRange: [10, 20], restSeconds: 30, caloriesPerSet: 15 };
  }
  if (c === 'stretching' || c === 'flexibility') {
    return { setsRange: [2, 3], repsRange: [30, 60], restSeconds: 20, caloriesPerSet: 3 };
  }
  if (c === 'plyometrics') {
    return { setsRange: [3, 4], repsRange: [8, 12], restSeconds: 90, caloriesPerSet: 12 };
  }
  if (d === 'beginner') {
    return { setsRange: [2, 3], repsRange: [10, 15], restSeconds: 60, caloriesPerSet: 6 };
  }
  if (d === 'advanced') {
    return { setsRange: [4, 5], repsRange: [4, 8], restSeconds: 120, caloriesPerSet: 10 };
  }
  return { setsRange: [3, 4], repsRange: [8, 12], restSeconds: 90, caloriesPerSet: 8 };
}

// 1. Read files
console.log('📖 Reading raw repository datasets...');
const r1Data = JSON.parse(fs.readFileSync(REPO1_FILE, 'utf8'));
const r2Raw = JSON.parse(fs.readFileSync(REPO2_FILE, 'utf8'));
const r2Data = r2Raw.exercises || r2Raw;
const r3Fitness = JSON.parse(fs.readFileSync(REPO3_FITNESS_FILE, 'utf8'));
const r3Gifs = JSON.parse(fs.readFileSync(REPO3_GIFS_FILE, 'utf8'));

console.log(`- Repo 1 (hasaneyldrm): ${r1Data.length} records`);
console.log(`- Repo 2 (JahelCuadrado): ${r2Data.length} records`);
console.log(`- Repo 3 (azilRababe fitness): ${r3Fitness.length} records`);
console.log(`- Repo 3 (azilRababe gifs): ${r3Gifs.length} records`);

const exerciseMap = new Map();

// 2. Ingest Repo 2 (JahelCuadrado) - High quality structured data with CDN GIFs
console.log('⚡ Processing Repo 2 (JahelCuadrado)...');
for (const ex of r2Data) {
  const norm = normalizeKey(ex.name);
  const muscleGroup = getMuscleGroup(ex.muscle || ex.bodyPart);
  const defaults = defaultSetsRepsRest(ex.category, 'Intermediate');

  exerciseMap.set(norm, {
    id: ex.id || ex.slug || `ex-${Math.random().toString(36).substring(2, 9)}`,
    name: capitalizeWords(ex.name),
    muscle: (ex.muscle || '').toLowerCase(),
    muscleGroup,
    bodyPart: ex.bodyPart || '',
    equipment: (ex.equipment || 'bodyweight').toLowerCase(),
    category: (ex.category || 'strength').toLowerCase(),
    difficulty: 'Intermediate',
    secondaryMuscles: Array.isArray(ex.secondaryMuscles)
      ? ex.secondaryMuscles.map(m => getMuscleGroup(m)).filter(Boolean)
      : [],
    instructions: Array.isArray(ex.instructions) ? ex.instructions : [],
    description: '',
    gifUrl: ex.gifUrl || '',
    thumbUrl: ex.thumbUrl || '',
    setsRange: defaults.setsRange,
    repsRange: defaults.repsRange,
    restSeconds: defaults.restSeconds,
    caloriesPerSet: defaults.caloriesPerSet,
    sources: ['JahelCuadrado'],
  });
}

// 3. Ingest Repo 1 (hasaneyldrm) - Multi-step coaching instructions & fallbacks
console.log('⚡ Processing Repo 1 (hasaneyldrm)...');
for (const ex of r1Data) {
  const norm = normalizeKey(ex.name);
  const existing = exerciseMap.get(norm);
  const gifUrl = ex.gif_url
    ? `https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/${ex.gif_url}`
    : '';
  const thumbUrl = ex.image
    ? `https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/${ex.image}`
    : '';

  const steps = Array.isArray(ex.instruction_steps) && ex.instruction_steps.length > 0
    ? ex.instruction_steps
    : (Array.isArray(ex.instructions) ? ex.instructions : (ex.instructions ? [ex.instructions] : []));

  if (existing) {
    if ((!existing.instructions || existing.instructions.length === 0) && steps.length > 0) {
      existing.instructions = steps;
    }
    if (!existing.gifUrl && gifUrl) existing.gifUrl = gifUrl;
    if (!existing.thumbUrl && thumbUrl) existing.thumbUrl = thumbUrl;
    if (existing.secondaryMuscles.length === 0 && Array.isArray(ex.secondary_muscles)) {
      existing.secondaryMuscles = ex.secondary_muscles.map(m => getMuscleGroup(m));
    }
    if (!existing.sources.includes('hasaneyldrm')) existing.sources.push('hasaneyldrm');
  } else {
    const muscleGroup = getMuscleGroup(ex.muscle_group || ex.target || ex.body_part);
    const defaults = defaultSetsRepsRest(ex.category, 'Intermediate');

    exerciseMap.set(norm, {
      id: ex.id ? `h-${ex.id}` : `ex-${Math.random().toString(36).substring(2, 9)}`,
      name: capitalizeWords(ex.name),
      muscle: (ex.target || ex.body_part || '').toLowerCase(),
      muscleGroup,
      bodyPart: ex.body_part || '',
      equipment: (ex.equipment || 'bodyweight').toLowerCase(),
      category: (ex.category || 'strength').toLowerCase(),
      difficulty: 'Intermediate',
      secondaryMuscles: Array.isArray(ex.secondary_muscles)
        ? ex.secondary_muscles.map(m => getMuscleGroup(m))
        : [],
      instructions: steps,
      description: '',
      gifUrl,
      thumbUrl,
      setsRange: defaults.setsRange,
      repsRange: defaults.repsRange,
      restSeconds: defaults.restSeconds,
      caloriesPerSet: defaults.caloriesPerSet,
      sources: ['hasaneyldrm'],
    });
  }
}

// 4. Ingest Repo 3 (azilRababe) - Coaching descriptions, difficulty levels, extra exercises
console.log('⚡ Processing Repo 3 (azilRababe)...');
const r3GifsMap = new Map();
for (const g of r3Gifs) {
  if (g.title) r3GifsMap.set(normalizeKey(g.title), g.gif_url);
}

for (const ex of r3Fitness) {
  const norm = normalizeKey(ex.title);
  const existing = exerciseMap.get(norm);
  const gifUrl = r3GifsMap.get(norm) || '';
  const diffRaw = (ex.difficulty_level || 'Intermediate').trim();
  const diff = ['Beginner', 'Intermediate', 'Advanced'].includes(capitalizeWords(diffRaw))
    ? capitalizeWords(diffRaw)
    : 'Intermediate';

  if (existing) {
    if (!existing.description && ex.description) existing.description = ex.description;
    if (existing.difficulty === 'Intermediate' && diff !== 'Intermediate') {
      existing.difficulty = diff;
      const def = defaultSetsRepsRest(existing.category, diff);
      existing.setsRange = def.setsRange;
      existing.repsRange = def.repsRange;
      existing.restSeconds = def.restSeconds;
      existing.caloriesPerSet = def.caloriesPerSet;
    }
    if (!existing.gifUrl && gifUrl) existing.gifUrl = gifUrl;
    if (!existing.sources.includes('azilRababe')) existing.sources.push('azilRababe');
  } else {
    const muscleGroup = getMuscleGroup(ex.body_part);
    const defaults = defaultSetsRepsRest(ex.category, diff);

    exerciseMap.set(norm, {
      id: ex.id ? `a-${ex.id}` : `ex-${Math.random().toString(36).substring(2, 9)}`,
      name: capitalizeWords(ex.title),
      muscle: (ex.body_part || '').toLowerCase(),
      muscleGroup,
      bodyPart: ex.body_part || '',
      equipment: (ex.equipment || 'bodyweight').toLowerCase(),
      category: (ex.category || 'strength').toLowerCase(),
      difficulty: diff,
      secondaryMuscles: [],
      instructions: [],
      description: ex.description || '',
      gifUrl,
      thumbUrl: '',
      setsRange: defaults.setsRange,
      repsRange: defaults.repsRange,
      restSeconds: defaults.restSeconds,
      caloriesPerSet: defaults.caloriesPerSet,
      sources: ['azilRababe'],
    });
  }
}

// 5. Build Final Consolidated Catalog
const masterExercises = Array.from(exerciseMap.values());
// Sort alphabetically by name
masterExercises.sort((a, b) => a.name.localeCompare(b.name));

console.log(`\n🎉 Consolidation Summary:`);
console.log(`- Total Unique Exercises: ${masterExercises.length}`);

let withGifs = 0;
let withDescriptions = 0;
let withInstructions = 0;
const muscleCounts = {};

for (const ex of masterExercises) {
  if (ex.gifUrl) withGifs++;
  if (ex.description) withDescriptions++;
  if (ex.instructions && ex.instructions.length > 0) withInstructions++;
  muscleCounts[ex.muscleGroup] = (muscleCounts[ex.muscleGroup] || 0) + 1;
}

console.log(`- With Animated GIFs: ${withGifs}`);
console.log(`- With Coaching Descriptions: ${withDescriptions}`);
console.log(`- With Multi-step Instructions: ${withInstructions}`);
console.log(`- Breakdown by Muscle Group:`, muscleCounts);

// 6. Write out JSON
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(masterExercises, null, 2), 'utf8');
const stat = fs.statSync(OUTPUT_FILE);
console.log(`\n✅ Saved to ${OUTPUT_FILE} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
