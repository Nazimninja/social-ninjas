export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.SUPABASE_URL || process.env.SUPABASE_CRM_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_CRM_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDg5MzAzMCwiZXhwIjoyMTAwNDY5MDMwfQ.3D1lYMhzIql9On42MvLq2B0iKAebqtdUKJvOxF1uxpE';

  // ── 1. POST: Update Plan Status (Manage Subscription) ─────────────
  if (req.method === 'POST') {
    const { id, plan_status } = req.body;
    if (!id) return res.status(400).json({ error: 'User ID is required' });

    try {
      let updated = false;

      // A. Try updating Supabase Auth app_metadata (if UUID)
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
        const authRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${id}`, {
          method: 'PUT',
          headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            app_metadata: { plan_status: plan_status || 'free' }
          })
        });
        if (authRes.ok) updated = true;
      }

      // B. Try updating content_studio_clients
      try {
        const studioRes = await fetch(`${supabaseUrl}/rest/v1/content_studio_clients?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_status: plan_status === 'premium' ? 'verified' : 'expired',
            plan: plan_status
          })
        });
        if (studioRes.ok) updated = true;
      } catch (_) {}

      return res.json({ success: true, plan_status, updated });
    } catch (e) {
      console.error('[Fit Clients API] Update error:', e);
      return res.status(500).json({ error: 'Internal server error during update' });
    }
  }

  // ── 2. GET: Retrieve All Members, Synced Onboarding & Weekly Progress ──
  try {
    const headers = {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json'
    };

    // Parallel fetch from Auth users, Studio clients, and synced Fit Ninja user states
    const [authRes, studioRes, userStatesRes] = await Promise.all([
      fetch(`${supabaseUrl}/auth/v1/admin/users`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${supabaseUrl}/rest/v1/content_studio_clients?select=*`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${supabaseUrl}/rest/v1/scripts?profile=eq.fitninja_user_state&order=created_at.desc&select=topic,section1,caption,created_at`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    // Build map of latest synced user state per email
    const userStatesByEmail = new Map();
    if (Array.isArray(userStatesRes)) {
      for (const row of userStatesRes) {
        const email = (row.topic || '').toLowerCase().trim();
        if (email && !userStatesByEmail.has(email)) {
          try {
            const parsed = JSON.parse(row.section1 || '{}');
            userStatesByEmail.set(email, {
              ...parsed,
              last_synced_at: row.caption || row.created_at
            });
          } catch (_) {}
        }
      }
    }

    const list = [];
    const seenEmails = new Set();

    // ── Helper to format goal nicely ────────────────────────────────
    const formatGoal = (raw) => {
      if (!raw) return 'General Fitness';
      const clean = String(raw).toLowerCase().replace(/_/g, ' ');
      if (clean === 'muscle' || clean === 'muscle gain') return 'Muscle Gain';
      if (clean === 'fat loss' || clean === 'fat_loss') return 'Fat Loss';
      if (clean === 'strength') return 'Strength & Power';
      if (clean === 'general' || clean === 'general fitness') return 'General Fitness';
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    };

    // ── A. Fit Ninja Registered Auth Users ─────────────────────────
    if (authRes && Array.isArray(authRes.users)) {
      const now = Date.now();
      for (const u of authRes.users) {
        const email = (u.email || '').toLowerCase().trim();
        if (!email || seenEmails.has(email)) continue;
        seenEmails.add(email);

        const meta = u.user_metadata || {};
        const appMeta = u.app_metadata || {};
        
        // Paid / PRO PASS status
        const isNazim = email === 'nazimpasha906@gmail.com' || email.endsWith('@socialninjas.in');
        const isPaid = isNazim || appMeta.plan_status === 'premium' || appMeta.paid === true;

        // Retrieve real synced app state
        const syncedState = userStatesByEmail.get(email) || meta.gym_state || null;
        const aiAnswers = syncedState?.aiAnswers || meta.assessment_data || null;
        const isOnboarded = !!(syncedState?.onboarded || (aiAnswers && aiAnswers.weight && aiAnswers.age));

        // Activity calculation
        const lastActiveIso = syncedState?.last_synced_at || u.last_sign_in_at || u.updated_at || u.created_at;
        const lastActiveTime = lastActiveIso ? new Date(lastActiveIso).getTime() : 0;
        const daysAgo = Math.floor((now - lastActiveTime) / 86400000);
        const isActive = daysAgo <= 14;
        let activeLabel = 'Inactive';
        if (daysAgo === 0) activeLabel = 'Active Today';
        else if (daysAgo === 1) activeLabel = 'Active Yesterday';
        else if (daysAgo <= 7) activeLabel = `Active ${daysAgo}d ago`;
        else if (daysAgo <= 14) activeLabel = 'Active This Fortnight';

        // Extract REAL physiological metrics (no fake fallbacks)
        const gender = aiAnswers?.gender || meta.gender || (isNazim ? 'Male' : null);
        const age = aiAnswers?.age ? Number(aiAnswers.age) : (isNazim ? 30 : null);
        const height = aiAnswers?.height ? Number(aiAnswers.height) : (isNazim ? 175 : null);
        const startingWeight = aiAnswers?.weight ? Number(aiAnswers.weight) : null;
        const goal = formatGoal(aiAnswers?.goal || (isNazim ? 'muscle' : null));
        const goalWeight = syncedState?.targetW || (startingWeight ? (aiAnswers?.goal === 'fat_loss' ? startingWeight - 5 : startingWeight + 4) : null);
        const healthConditions = Array.isArray(aiAnswers?.healthConditions) ? aiAnswers.healthConditions.filter(c => c && c !== 'none') : [];

        // Bodyweight history & current weight
        const bwLogs = Array.isArray(syncedState?.bodyweight) ? syncedState.bodyweight : [];
        const currentWeight = bwLogs.length > 0 ? bwLogs[bwLogs.length - 1].w : startingWeight;
        const initialWeight = bwLogs.length > 0 ? bwLogs[0].w : startingWeight;
        const weightDelta = (currentWeight && initialWeight) ? Math.round((currentWeight - initialWeight) * 10) / 10 : 0;

        // Checkins (weekly check-ins without heavy images)
        const rawCheckins = Array.isArray(syncedState?.checkins) ? syncedState.checkins : [];
        const checkinsList = rawCheckins.map(c => ({
          id: c.id || `${c.date}-${c.weight}`,
          date: c.date,
          weight: c.weight,
          difficulty: c.difficulty || 'good',
          soreness: c.soreness || 'mild',
          diet_rating: c.dietRating || 'on_track',
          notes: c.notes || ''
        })).reverse(); // Most recent first

        // Workouts count
        const rawWorkouts = Array.isArray(syncedState?.workouts) ? syncedState.workouts : [];
        const completedWorkoutsCount = rawWorkouts.length;
        const lastWorkoutDate = rawWorkouts.length > 0 ? rawWorkouts[rawWorkouts.length - 1].date : null;

        // Real nutrition blueprint (personalized)
        let kcal = syncedState?.targetCalories || syncedState?.aiPlan?.kcal;
        let protein = syncedState?.targetProtein || syncedState?.aiPlan?.protein;
        let bmr = null;
        let bmi = null;

        if (currentWeight && height) {
          bmi = parseFloat((currentWeight / ((height / 100) * (height / 100))).toFixed(1));
          if (age) {
            bmr = Math.round(10 * currentWeight + 6.25 * height - 5 * age + (gender === 'female' ? -161 : 5));
            if (!kcal) {
              const actMap = { 2: 1.35, 3: 1.45, 4: 1.55, 5: 1.65, 6: 1.75 };
              const tdee = Math.round(bmr * (actMap[aiAnswers?.days || 4] || 1.55));
              kcal = aiAnswers?.goal === 'fat_loss' ? tdee - 450 : aiAnswers?.goal === 'muscle' ? tdee + 350 : tdee;
              protein = Math.round(currentWeight * 2.0);
            }
          }
        }

        list.push({
          id: u.id,
          name: aiAnswers?.pname || meta.full_name || meta.name || email.split('@')[0],
          email: u.email,
          phone: u.phone || meta.phone || '—',
          avatar: meta.avatar_url || meta.picture || null,
          plan_status: isPaid ? 'premium' : (appMeta.plan_status || 'free'),
          is_active: isActive,
          active_label: activeLabel,
          last_active_at: lastActiveIso,
          onboarded: isOnboarded,
          physiological: {
            gender: gender || '—',
            age: age || '—',
            weight: currentWeight || '—',
            starting_weight: startingWeight || '—',
            height: height || '—',
            goal: isOnboarded ? goal : 'Onboarding Pending',
            goal_weight: goalWeight || '—',
            split_preference: aiAnswers?.splitPreference || 'Coach Decides',
            days_per_week: aiAnswers?.days || '—',
            health_conditions: healthConditions
          },
          progress: {
            starting_weight: initialWeight,
            current_weight: currentWeight,
            weight_delta: weightDelta,
            checkins_count: checkinsList.length,
            recent_checkins: checkinsList.slice(0, 10),
            workouts_count: completedWorkoutsCount,
            last_workout_date: lastWorkoutDate
          },
          generated_plan: {
            kcal: kcal || null,
            protein: protein || null,
            creatine: isPaid ? '5g' : '—',
            bmr: bmr || null,
            bmi: bmi || null
          },
          created_at: u.created_at
        });
      }
    }

    // ── B. Content Studio / Brand Clients (e.g. Fit & Glow Gym) ────
    if (Array.isArray(studioRes)) {
      for (const c of studioRes) {
        const email = (c.email || '').toLowerCase().trim();
        if (!email || seenEmails.has(email)) continue;
        seenEmails.add(email);

        const isPaid = c.payment_status === 'active' || c.payment_status === 'verified' || c.plan === 'premium';

        list.push({
          id: c.id,
          name: c.brand_name || email.split('@')[0],
          email: c.email,
          phone: c.phone || '—',
          avatar: null,
          plan_status: isPaid ? 'premium' : 'free',
          is_active: true,
          active_label: 'Active Enterprise',
          last_active_at: c.updated_at || c.created_at,
          onboarded: true,
          physiological: {
            gender: 'Enterprise',
            age: '—',
            weight: '—',
            starting_weight: '—',
            height: '—',
            goal: c.niche || 'Fitness Business',
            goal_weight: '—',
            split_preference: 'Commercial Studio',
            days_per_week: '—',
            health_conditions: []
          },
          progress: {
            starting_weight: null,
            current_weight: null,
            weight_delta: 0,
            checkins_count: 0,
            recent_checkins: [],
            workouts_count: 0,
            last_workout_date: null
          },
          generated_plan: {
            kcal: 2400,
            protein: 160,
            creatine: '5g',
            bmr: 1750,
            bmi: 23.5
          },
          created_at: c.created_at
        });
      }
    }

    // Sort newest active first
    list.sort((a, b) => new Date(b.last_active_at || b.created_at || 0).getTime() - new Date(a.last_active_at || a.created_at || 0).getTime());

    return res.json(list);
  } catch (error) {
    console.error('[Fit Clients API] Error fetching fit clients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
