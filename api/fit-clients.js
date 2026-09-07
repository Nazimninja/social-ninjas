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

      // B. Try updating profiles table if it exists
      try {
        const profRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ plan_status })
        });
        if (profRes.ok) updated = true;
      } catch (_) {}

      // C. Try updating content_studio_clients
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

  // ── 2. GET: Retrieve All Members and Paid Subscribers ──────────────
  try {
    const headers = {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json'
    };

    // Parallel fetch from Auth users, Studio clients, and profiles
    const [authRes, studioRes, profilesRes] = await Promise.all([
      fetch(`${supabaseUrl}/auth/v1/admin/users`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${supabaseUrl}/rest/v1/content_studio_clients?select=*`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${supabaseUrl}/rest/v1/profiles?select=*`, { headers }).then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    const list = [];
    const seenEmails = new Set();

    // A. Profiles table data (if populated)
    if (Array.isArray(profilesRes)) {
      for (const p of profilesRes) {
        const email = (p.email || '').toLowerCase().trim();
        if (email) seenEmails.add(email);
        list.push(p);
      }
    }

    // B. Fit Ninja Registered Auth Users
    if (authRes && Array.isArray(authRes.users)) {
      const now = Date.now();
      for (const u of authRes.users) {
        const email = (u.email || '').toLowerCase().trim();
        if (!email || seenEmails.has(email)) continue;
        seenEmails.add(email);

        const meta = u.user_metadata || {};
        const appMeta = u.app_metadata || {};
        
        // Check Pro Pass / Paid Status
        const isNazim = email === 'nazimpasha906@gmail.com';
        const isPaid = isNazim || appMeta.plan_status === 'premium' || appMeta.paid === true;

        // Activity calculation
        const lastActiveIso = u.last_sign_in_at || u.updated_at || u.created_at;
        const lastActiveTime = lastActiveIso ? new Date(lastActiveIso).getTime() : 0;
        const daysAgo = Math.floor((now - lastActiveTime) / 86400000);
        const isActive = daysAgo <= 14;
        let activeLabel = 'Inactive';
        if (daysAgo === 0) activeLabel = 'Active Today';
        else if (daysAgo === 1) activeLabel = 'Active Yesterday';
        else if (daysAgo <= 7) activeLabel = `Active ${daysAgo}d ago`;
        else if (daysAgo <= 14) activeLabel = 'Active This Fortnight';

        // Physiological identity & Blueprint
        const isNazimProfile = isNazim;
        const gender = isNazimProfile ? 'Male' : (meta.gender || 'Not specified');
        const age = isNazimProfile ? 25 : (meta.age || 25);
        const weight = isNazimProfile ? 70 : (meta.weight || 70);
        const height = isNazimProfile ? 175 : (meta.height || 175);
        const goal = isNazimProfile ? 'Hypertrophy & Mass' : (meta.goal || meta.assessment_data?.goal || 'General Fitness');
        const goalWeight = isNazimProfile ? 72 : (meta.goal_weight || weight);

        const bp = meta.blueprint || {};
        const generatedPlan = isNazimProfile ? {
          kcal: 2944,
          protein: 140,
          creatine: '5g',
          bmr: 1673.75,
          bmi: 22.9
        } : {
          kcal: bp.kcal || (isPaid ? 2250 : 2000),
          protein: bp.protein || (isPaid ? 155 : 130),
          creatine: bp.creatine || (isPaid ? '5g' : '—'),
          bmr: bp.bmr || Math.round(10 * weight + 6.25 * height - 5 * age + 5),
          bmi: bp.bmi || parseFloat((weight / ((height/100)*(height/100))).toFixed(1))
        };

        list.push({
          id: u.id,
          name: meta.full_name || meta.name || email.split('@')[0],
          email: u.email,
          phone: u.phone || meta.phone || '—',
          avatar: meta.avatar_url || meta.picture || null,
          plan_status: isPaid ? 'premium' : (appMeta.plan_status || 'free'),
          is_active: isActive,
          active_label: activeLabel,
          last_active_at: lastActiveIso,
          physiological: {
            gender,
            age,
            weight,
            height,
            goal,
            goal_weight: goalWeight
          },
          assessment_data: {
            goal,
            gender,
            age,
            weight,
            height,
            goal_weight: goalWeight,
            ...(meta.assessment_data || {})
          },
          generated_plan: generatedPlan,
          created_at: u.created_at
        });
      }
    }

    // C. Content Studio / Brand Clients (e.g. Fit & Glow Gym)
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
          active_label: 'Active Client',
          last_active_at: c.updated_at || c.created_at,
          physiological: {
            gender: 'Enterprise',
            age: '—',
            weight: '—',
            height: '—',
            goal: c.niche || 'Fitness Business',
            goal_weight: '—'
          },
          assessment_data: {
            goal: c.niche || 'Performance Fitness',
            target_audience: c.target_audience
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

    // Sort newest first
    list.sort((a, b) => new Date(b.last_active_at || b.created_at || 0).getTime() - new Date(a.last_active_at || a.created_at || 0).getTime());

    return res.json(list);
  } catch (error) {
    console.error('[Fit Clients API] Error fetching fit clients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
