import crypto from 'crypto';

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
          email,
          phone,
          amount,
          planName: notes.plan || 'Unknown',
          brandName: notes.brand || 'Unknown',
          paymentStatus: 'verified',
          joinDate: new Date().toLocaleDateString('en-IN'),
          verifiedAt: new Date().toISOString(),
        };

        await fetch(`${process.env.VERCEL_URL || 'http://localhost:3001'}/api/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientData),
        });
      } catch (e) {
        console.error('Failed to sync payment to clients:', e);
      }

      return res.json({ verified: true, paymentId, event: 'payment.captured' });
    }

    // Handle subscription events
    if (event.event === 'subscription.activated') {
      const sub = event.payload.subscription.entity;
      console.log(`✅ Subscription activated: ${sub.id} | Plan: ${sub.plan_id}`);
      return res.json({ verified: true, subscriptionId: sub.id, event: 'subscription.activated' });
    }

    return res.json({ verified: true, event: event.event, message: 'Event received' });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
}
