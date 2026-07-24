import crypto from 'crypto';

const KV_URL   = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const r = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    const d = await r.json();
    return d.result ? JSON.parse(d.result) : null;
  } catch { return null; }
}

async function kvSet(key, value) {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(value) })
    });
    return true;
  } catch { return false; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-razorpay-signature');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // If no webhook secret configured, just verify payment ID format
  if (!webhookSecret) {
    const { paymentId } = req.body;
    if (!paymentId || !paymentId.startsWith('pay_') || paymentId.length < 14) {
      return res.status(400).json({ verified: false, error: 'Invalid payment ID format.' });
    }
    // In dev/test mode: accept any valid-format payment ID
    console.log(`[DEV] Payment ID accepted: ${paymentId}`);
    return res.json({ verified: true, mode: 'dev', paymentId });
  }

  // ── PRODUCTION: Verify Razorpay webhook signature ──
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ verified: false, error: 'Invalid signature.' });
    }

    const event = req.body;

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const paymentId = payment.id;
      const amount = payment.amount / 100; // paise → rupees
      const email = payment.email;
      const phone = payment.contact;
      const notes = payment.notes || {};

      console.log(`✅ Payment captured: ${paymentId} | ₹${amount} | ${email}`);

      // Sync to backend clients store
      try {
        const clientData = {
          paymentId,
          subscriptionId: payment.subscription_id || null,
          email: email.toLowerCase().trim(),
          phone,
          amount,
          planName: notes.plan || 'Unknown',
          brandName: notes.brand || 'Unknown',
          paymentStatus: 'verified',
          joinDate: new Date().toLocaleDateString('en-IN'),
          verifiedAt: new Date().toISOString(),
        };

        if (KV_URL && KV_TOKEN) {
          // Direct sync to Redis (Production)
          console.log('[Webhook] Syncing directly to Redis');
          const stored = await kvGet('sn_clients') || [];
          const idx = stored.findIndex(c => c.email?.toLowerCase().trim() === clientData.email);
          if (idx >= 0) {
            stored[idx] = { ...stored[idx], ...clientData, id: stored[idx].id || `client_${Date.now()}` };
          } else {
            clientData.id = `client_${Date.now()}`;
            stored.push(clientData);
          }
          await kvSet('sn_clients', stored);
        } else {
          // Local development fallback
          const targetUrl = process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}/api/data?resource=clients`
            : 'http://localhost:3001/api/clients';
          console.log(`[Webhook] Syncing via fetch to ${targetUrl}`);
          await fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
          });
        }
      } catch (e) {
        console.error('Failed to sync payment to clients:', e);
      }

      return res.json({ verified: true, paymentId, event: 'payment.captured' });
    }

    // Handle subscription events
    if (event.event === 'subscription.activated') {
      const sub = event.payload.subscription.entity;
      console.log(`✅ Subscription activated: ${sub.id} | Plan: ${sub.plan_id}`);
      
      // Update local status in KV if possible
      if (KV_URL && KV_TOKEN) {
        const stored = await kvGet('sn_clients') || [];
        const email = sub.notes?.email || (sub.notes?.brand_email);
        let updated = false;
        for (let i = 0; i < stored.length; i++) {
          if (
            (email && stored[i].email?.toLowerCase().trim() === email.toLowerCase().trim()) ||
            (stored[i].subscriptionId === sub.id)
          ) {
            stored[i].subscriptionId = sub.id;
            stored[i].paymentStatus = 'verified';
            stored[i].active = true;
            updated = true;
          }
        }
        if (updated) await kvSet('sn_clients', stored);
      }
      return res.json({ verified: true, subscriptionId: sub.id, event: 'subscription.activated' });
    }

    if (
      event.event === 'subscription.cancelled' ||
      event.event === 'subscription.halted' ||
      event.event === 'subscription.expired' ||
      event.event === 'subscription.paused'
    ) {
      const sub = event.payload.subscription.entity;
      const email = sub.notes?.email || (sub.notes?.brand_email);
      console.log(`[Webhook] Subscription ${event.event}: ${sub.id} | Email: ${email}`);

      if (KV_URL && KV_TOKEN) {
        const stored = await kvGet('sn_clients') || [];
        let updated = false;
        for (let i = 0; i < stored.length; i++) {
          if (
            (email && stored[i].email?.toLowerCase().trim() === email.toLowerCase().trim()) ||
            (stored[i].subscriptionId === sub.id) ||
            (stored[i].paymentId === sub.id)
          ) {
            stored[i].paymentStatus = 'expired';
            stored[i].active = false;
            updated = true;
          }
        }
        if (updated) {
          await kvSet('sn_clients', stored);
          console.log(`[Webhook] Client membership set to expired for sub ${sub.id}`);
        }
      }
      return res.json({ verified: true, subscriptionId: sub.id, event: event.event });
    }

    return res.json({ verified: true, event: event.event, message: 'Event received' });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
}
