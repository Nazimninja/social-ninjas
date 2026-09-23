import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-razorpay-signature');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // 1. Verify Razorpay webhook signature if secret configured
  if (webhookSecret) {
    try {
      const signature = req.headers['x-razorpay-signature'];
      if (!signature) {
        return res.status(400).json({ error: 'Missing x-razorpay-signature header' });
      }

      let rawBody = '';
      if (typeof req.body === 'string') {
        rawBody = req.body;
      } else if (Buffer.isBuffer(req.body)) {
        rawBody = req.body.toString('utf8');
      } else {
        rawBody = JSON.stringify(req.body);
      }

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(400).json({ verified: false, error: 'Invalid webhook signature.' });
      }
    } catch (sigErr) {
      console.error('[Social Ninjas Webhook] Signature verification error:', sigErr);
      return res.status(400).json({ error: 'Signature verification failed' });
    }
  }

  // 2. Parse payload event
  const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const eventName = event?.event || '';
  console.log(`[Social Ninjas Webhook] Received Razorpay event: ${eventName}`);

  const isExpiredEvent = [
    'subscription.cancelled',
    'subscription.halted',
    'subscription.expired',
    'subscription.paused'
  ].includes(eventName);

  const isActivatedEvent = [
    'subscription.activated',
    'subscription.charged',
    'subscription.authenticated',
    'payment.captured',
    'order.paid'
  ].includes(eventName);

  try {
    let targetStatus = null;
    let userId = null;
    let email = null;
    let phone = null;
    let name = null;
    let amount = 99;
    let subscriptionId = null;

    const subEntity = event?.payload?.subscription?.entity;
    const payEntity = event?.payload?.payment?.entity;
    const orderEntity = event?.payload?.order?.entity;
    const entity = subEntity || payEntity || orderEntity || {};

    if (isExpiredEvent) {
      targetStatus = 'free';
      subscriptionId = subEntity?.id || entity.notes?.subscription_id;
      userId = entity.notes?.user_id;
      email = entity.notes?.email || entity.notes?.brand_email || entity.email || entity.customer_details?.email;
      phone = entity.notes?.phone || entity.contact || entity.customer_details?.contact;
      name = entity.notes?.name || entity.customer_details?.name || entity.notes?.full_name || 'Athlete';
    } else if (isActivatedEvent) {
      targetStatus = 'premium';
      subscriptionId = subEntity?.id || (entity.id?.startsWith('sub_') ? entity.id : null) || entity.notes?.subscription_id;
      userId = entity.notes?.user_id;
      email = entity.notes?.email || entity.email || entity.customer_details?.email || subEntity?.notes?.email || payEntity?.email;
      phone = entity.notes?.phone || entity.contact || entity.customer_details?.contact || subEntity?.notes?.phone || payEntity?.contact;
      name = entity.notes?.name || entity.customer_details?.name || entity.notes?.full_name || subEntity?.notes?.name || 'Athlete';

      const chargedPaise = payEntity?.amount || entity.amount;
      if (chargedPaise) {
        amount = Math.round(chargedPaise / 100);
      } else {
        amount = 99;
      }
    }

    if (targetStatus) {
      const cleanEmail = (email || '').toLowerCase().trim();
      const rawPhone = String(phone || '').trim();
      let digits = rawPhone.replace(/\D/g, '');
      if (digits.length === 10) {
        digits = '91' + digits;
      } else if (digits.length === 11 && digits.startsWith('0')) {
        digits = '91' + digits.slice(1);
      }
      const e164Phone = digits ? `+${digits}` : rawPhone;
      const local10 = digits.length >= 10 ? digits.slice(-10) : digits;

      // ── A. FORWARD ONBOARDING EVENT TO RAILWAY N8N FOR AUTOMATED WHATSAPP ──
      if (targetStatus === 'premium') {
        try {
          const n8nWebhookUrl = process.env.N8N_FITNINJA_WELCOME_WEBHOOK || 'https://n8n-production-29f31.up.railway.app/webhook/fitninja-welcome';
          const n8nPayload = {
            event: 'member.onboarded',
            name: name || 'Athlete',
            phone: e164Phone,
            whatsapp: digits,
            contact: digits,
            phone_number: digits,
            mobile: digits,
            digits_phone: digits,
            formatted_phone: e164Phone,
            local_phone: local10,
            wa_link: digits ? `https://wa.me/${digits}` : '',
            to: digits,
            recipient: digits,
            email: cleanEmail,
            amount,
            subscriptionId: subscriptionId || payEntity?.id || 'sub_manual',
            razorpay_payment_id: payEntity?.id || subscriptionId || '',
            plan: 'Fit Ninja Pro',
            source: 'socialninjas_server_webhook',
            timestamp: new Date().toISOString()
          };

          const n8nRes = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(n8nPayload)
          });
          console.log(`[Social Ninjas Webhook] Dispatched welcome payload to n8n (Status ${n8nRes.status}) for ${cleanEmail || digits}`);
        } catch (n8nErr) {
          console.warn('[Social Ninjas Webhook] Failed to forward to n8n:', n8nErr);
        }
      }

      // ── B. RESILIENT SUPABASE RECORDING (scripts & leads tables) ──
      const supabaseUrl = process.env.SUPABASE_URL || process.env.SUPABASE_CRM_URL || 'https://mocqyvmntemsnmdusjcy.supabase.co';
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_CRM_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3F5dm1udGVtc25tZHVzamN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDg5MzAzMCwiZXhwIjoyMTAwNDY5MDMwfQ.3D1lYMhzIql9On42MvLq2B0iKAebqtdUKJvOxF1uxpE';

      if (supabaseUrl && serviceRoleKey) {
        const topicKey = cleanEmail || digits || 'athlete';

        // 1. Record in scripts table for membership verification
        try {
          const scriptsPayload = {
            profile: 'fitninja_membership',
            topic: topicKey,
            section1: JSON.stringify({
              email: cleanEmail,
              name: name || 'Athlete',
              phone: e164Phone || digits,
              paid: targetStatus === 'premium',
              status: targetStatus === 'premium' ? 'active' : 'cancelled',
              plan: 'Fit Ninja Pro',
              subscriptionId: subscriptionId || payEntity?.id || 'sub_manual',
              amount: amount,
              updated_at: new Date().toISOString()
            }),
            caption: targetStatus === 'premium' ? 'active' : 'cancelled'
          };

          const checkRes = await fetch(`${supabaseUrl}/rest/v1/scripts?profile=eq.fitninja_membership&topic=eq.${encodeURIComponent(topicKey)}&select=id`, {
            headers: {
              'apikey': serviceRoleKey,
              'Authorization': `Bearer ${serviceRoleKey}`
            }
          });
          const existing = await checkRes.json().catch(() => []);

          if (Array.isArray(existing) && existing.length > 0) {
            await fetch(`${supabaseUrl}/rest/v1/scripts?id=eq.${existing[0].id}`, {
              method: 'PATCH',
              headers: {
                'apikey': serviceRoleKey,
                'Authorization': `Bearer ${serviceRoleKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(scriptsPayload)
            });
          } else {
            await fetch(`${supabaseUrl}/rest/v1/scripts`, {
              method: 'POST',
              headers: {
                'apikey': serviceRoleKey,
                'Authorization': `Bearer ${serviceRoleKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(scriptsPayload)
            });
          }
          console.log(`[Social Ninjas Webhook] Saved fitninja_membership to scripts table for ${topicKey}`);
        } catch (sErr) {
          console.warn('[Social Ninjas Webhook] Failed to write to scripts table:', sErr);
        }

        // 2. Record in leads table (Agency CRM & Admin Dashboard)
        try {
          await fetch(`${supabaseUrl}/rest/v1/leads`, {
            method: 'POST',
            headers: {
              'apikey': serviceRoleKey,
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              name: name || 'Athlete',
              email: cleanEmail || `${digits || 'athlete'}@fitninja.app`,
              phone: e164Phone || digits || '',
              status: targetStatus === 'premium' ? 'PAID PRO MEMBER' : 'CANCELLED',
              notes: `Razorpay payment: ${subscriptionId || payEntity?.id || 'verified'}`
            })
          });
          console.log(`[Social Ninjas Webhook] Saved lead to CRM leads table for ${cleanEmail || digits}`);
        } catch (leadErr) {
          console.warn('[Social Ninjas Webhook] Failed to write to leads table:', leadErr);
        }

        // 3. Update Supabase Auth user metadata
        if (userId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
          try {
            await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
              method: 'PUT',
              headers: {
                'apikey': serviceRoleKey,
                'Authorization': `Bearer ${serviceRoleKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                app_metadata: { plan_status: targetStatus, paid: targetStatus === 'premium' }
              })
            });
          } catch (_) {}
        }
      }

      return res.status(200).json({ success: true, updated: true, status: targetStatus });
    }

    return res.status(200).json({ success: true, message: 'Event acknowledged' });
  } catch (error) {
    console.error('[Social Ninjas Webhook] Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
}
