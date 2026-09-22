/**
 * Ultra-Premium Live Activity & Background Sync Service for Fit Ninja
 * 
 * Delivers an Apple-grade, high-end experience across all devices:
 * 1. Studio-grade Acoustic Chimes: Warm harmonic tones designed like luxury watch haptics.
 * 2. Dynamic Lock Screen Artwork: Renders an OLED Live Activity visual directly onto
 *    the phone's Lock Screen and Control Center player.
 * 3. Interactive Lock Screen Controls: Action buttons for [+30s] and [Skip Rest] right on Lock Screen.
 * 4. Micro-Haptic Pulses: Tactile feedback on rest completion.
 */

// Acoustic synthesizer producing warm, luxury gym chimes (no harsh electronic buzzers)
class AcousticSynth {
  private ctx: AudioContext | null = null;
  public isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudio();
      };
      window.addEventListener('touchstart', unlock, { passive: true });
      window.addEventListener('touchend', unlock, { passive: true });
      window.addEventListener('click', unlock, { passive: true });
    }
  }

  public async unlockAudio(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      const ctx = this.getContext();
      if (!ctx) return false;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // Play 1-frame silent buffer to permanently unlock iOS audio pipeline
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      this.isUnlocked = true;
      return true;
    } catch {
      return false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Subtle countdown tick for the final 5 seconds (5, 4, 3, 2, 1).
   * Soft, warm wooden tick with gentle harmonic overtone that rises in pitch.
   */
  playCountdownTick(secondsRemaining: number) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const pitches: Record<number, number> = {
        5: 587.33, // D5
        4: 659.25, // E5
        3: 739.99, // F#5
        2: 830.61, // G#5
        1: 932.33, // A#5
      };
      const pitch = pitches[secondsRemaining] || 750;

      // Primary warm tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; // triangle gives warmth & punch on phone speakers
      osc.frequency.setValueAtTime(pitch, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.095);

      // Subtle harmonic sparkle
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch * 2, now);
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now);
      osc2.stop(now + 0.065);
    } catch {}
  }

  /**
   * Workout Start: Uplifting, clean two-tone chime (E5 -> B5)
   */
  playWorkoutStarted() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      [
        { freq: 659.25, delay: 0.00, vol: 0.32, dur: 0.28 }, // E5
        { freq: 987.77, delay: 0.12, vol: 0.36, dur: 0.45 }, // B5
      ].forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + note.delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, t);

        gain.gain.setValueAtTime(note.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + note.dur + 0.01);
      });
    } catch {}
  }

  /**
   * Set Completed (Checkmark Tap): Satisfying, tactile micro-click
   */
  playSetCompleted() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.05);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  /**
   * Button tap / add set / add exercise: Subtle discreet tap
   */
  playTap() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(560, now);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  /**
   * Rest completion fanfare: Apple Watch-style A-Major resonant chord (A5 - C#6 - E6 - A6)
   */
  playRestFinished() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const chord = [
        { freq: 880.00, delay: 0.00, vol: 0.30 }, // A5
        { freq: 1108.73, delay: 0.07, vol: 0.32 }, // C#6
        { freq: 1318.51, delay: 0.14, vol: 0.34 }, // E6
        { freq: 1760.00, delay: 0.21, vol: 0.36 }, // A6
      ];

      chord.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + note.delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(note.vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.50);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.51);
      });
    } catch {}
  }

  /**
   * Workout Completed: Warm accomplishment triad (G5 - B5 - D6 - G6)
   */
  playWorkoutCompleted() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const chord = [
        { freq: 783.99, delay: 0.00, vol: 0.28 }, // G5
        { freq: 987.77, delay: 0.08, vol: 0.30 }, // B5
        { freq: 1174.66, delay: 0.16, vol: 0.32 }, // D6
        { freq: 1567.98, delay: 0.24, vol: 0.36 }, // G6
      ];

      chord.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + note.delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, t);

        gain.gain.setValueAtTime(note.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.60);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.61);
      });
    } catch {}
  }

  /**
   * Quick Test Sequence: Plays 2 wooden ticks followed by the completion chord.
   * Gives instant verification on mobile devices that audio is unlocked and working.
   */
  playTestChimeSequence() {
    this.unlockAudio();
    this.playCountdownTick(2);
    setTimeout(() => {
      this.playCountdownTick(1);
    }, 400);
    setTimeout(() => {
      this.playRestFinished();
    }, 850);
  }
}

export const soundSynth = new AcousticSynth();

// ── Dynamic Lock Screen Artwork Generator ──────────────────────────────────
let artworkCache: { key: string; dataUrl: string } | null = null;

function generateLockScreenArtwork(exerciseName: string, nextName?: string): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') return '/apple-touch-icon.png';

  const key = `${exerciseName}_${nextName || ''}`;
  if (artworkCache && artworkCache.key === key) {
    return artworkCache.dataUrl;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '/apple-touch-icon.png';

    // Deep luxury OLED background with subtle radial glow
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 320);
    grad.addColorStop(0, '#0c162d');
    grad.addColorStop(1, '#05070c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing border ring
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1F4B99';
    ctx.strokeRect(16, 16, 480, 480);

    // Fit Ninja brand header
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('FIT NINJA LIVE', 256, 75);

    // Subtle divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.lineTo(432, 100);
    ctx.stroke();

    // Active Exercise
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('CURRENT INTERVAL', 256, 150);

    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    const exDisplay = exerciseName.length > 20 ? exerciseName.slice(0, 18) + '…' : exerciseName;
    ctx.fillText(exDisplay, 256, 195);

    // Up Next Card Box
    if (nextName) {
      ctx.fillStyle = 'rgba(31, 75, 153, 0.25)';
      ctx.beginPath();
      ctx.roundRect(56, 260, 400, 180, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('⚡ UP NEXT', 256, 305);

      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#ffffff';
      const nextDisplay = nextName.length > 22 ? nextName.slice(0, 20) + '…' : nextName;
      ctx.fillText(nextDisplay, 256, 360);

      ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Ready for next set', 256, 405);
    }

    const dataUrl = canvas.toDataURL('image/png');
    artworkCache = { key, dataUrl };
    return dataUrl;
  } catch {
    return '/apple-touch-icon.png';
  }
}

// ── MediaSession Lock Screen Sync ──────────────────────────────────────────
export interface MediaSessionWorkoutInfo {
  workoutName: string;
  currentExercise: string;
  nextExercise?: string;
  remainingRestSeconds?: number;
  isResting: boolean;
}

export interface MediaSessionActionCallbacks {
  onAddRest?: (seconds: number) => void;
  onSkipRest?: () => void;
}

let silentAudioElement: HTMLAudioElement | null = null;
let registeredCallbacks: MediaSessionActionCallbacks = {};

export function setMediaSessionCallbacks(cbs: MediaSessionActionCallbacks) {
  registeredCallbacks = cbs;
}

// Ensure a continuous audio stream keeps MediaSession active on mobile lock screens
function initSilentAudio() {
  if (typeof window === 'undefined' || silentAudioElement) return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime); // Inaudible carrier
      const dest = ctx.createMediaStreamDestination();
      osc.connect(gain);
      gain.connect(dest);
      osc.start();

      silentAudioElement = document.createElement('audio');
      silentAudioElement.srcObject = dest.stream;
      silentAudioElement.setAttribute('playsinline', 'true');
      silentAudioElement.setAttribute('autoplay', 'true');
      silentAudioElement.style.display = 'none';
      document.body.appendChild(silentAudioElement);
      silentAudioElement.play().catch(() => {});
      return;
    }
  } catch {
    // Fallback below
  }

  // 1-second valid silent PCM WAV fallback
  const silentWav = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
  silentAudioElement = new Audio(silentWav);
  silentAudioElement.loop = true;
}

export function updateLockScreenMediaSession(info: MediaSessionWorkoutInfo | null) {
  if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

  if (!info) {
    if (silentAudioElement) {
      silentAudioElement.pause();
    }
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
    return;
  }

  initSilentAudio();
  if (silentAudioElement && silentAudioElement.paused) {
    silentAudioElement.play().catch(() => {});
  }

  const mins = Math.floor((info.remainingRestSeconds || 0) / 60);
  const secs = (info.remainingRestSeconds || 0) % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  const title = info.isResting
    ? `⏳ Rest: ${timeStr} left`
    : `💪 Doing: ${info.currentExercise}`;

  const artist = info.nextExercise
    ? `Next: ${info.nextExercise}`
    : `Workout: ${info.workoutName}`;

  const artworkSrc = generateLockScreenArtwork(info.currentExercise, info.nextExercise);

  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: 'Fit Ninja Live',
      artwork: [
        {
          src: artworkSrc,
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    });
    navigator.mediaSession.playbackState = 'playing';

    // Interactive Action buttons on Android & iPhone Lock Screen!
    try {
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (registeredCallbacks.onAddRest) {
          registeredCallbacks.onAddRest(30);
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (registeredCallbacks.onSkipRest) {
          registeredCallbacks.onSkipRest();
        }
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (registeredCallbacks.onAddRest) {
          registeredCallbacks.onAddRest(30);
        }
      });
    } catch {
      // Some browsers restrict action handlers
    }
  } catch {
    // Fallback
  }
}

// ── System Notifications ──────────────────────────────────────────────────
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const result = await Notification.requestPermission();
    return result === 'granted';
  }
  return false;
}

export function sendRestFinishedNotification(nextExerciseName?: string, targetInfo?: string) {
  // Mobile vibration pattern: 2 crisp bursts
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([120, 80, 240]);
  }

  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const body = nextExerciseName
      ? `Time to lift! Up next: ${nextExerciseName}${targetInfo ? ` (${targetInfo})` : ''}.`
      : 'Rest period complete! Get ready for your next set.';

    new Notification('⚡ Fit Ninja: Rest Complete!', {
      body,
      icon: '/apple-touch-icon.png',
      badge: '/apple-touch-icon.png',
      tag: 'fit-ninja-rest',
      silent: false
    });
  } catch {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title: '⚡ Fit Ninja: Rest Complete!',
        body: nextExerciseName ? `Up next: ${nextExerciseName}` : 'Rest complete!'
      });
    }
  }
}
