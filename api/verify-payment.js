// Verify a Razorpay payment ID via Razorpay API
// Called by frontend after user completes payment

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { paymentId, planId, brandName, email } = req.body;

  if (!paymentId) return res.status(400).json({ error: 'Payment ID required.' });

  // Basic format check
  if (!paymentId.startsWith('pay_') || paymentId.length < 14) {
    return res.status(400).json({ 
      verified: false, 
      error: 'Invalid payment ID. It should start with pay_ followed by letters and numbers.' 
    });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // Dev mode: accept valid-format IDs without calling Razorpay API
  if (!keyId || !keySecret) {
    console.log(`[DEV MODE] Payment accepted: ${paymentId}`);
    return res.json({ 
      verified: true, 
      mode: 'dev', 
      paymentId,
      message: 'Payment accepted (dev mode — add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to verify live payments)'
    });
  }

  // Production: verify with Razorpay API
  try {
    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const rzRes = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Basic ${credentials}` }
    });

    if (!rzRes.ok) {
      const err = await rzRes.json();
      return res.status(400).json({ 
        verified: false, 
        error: err.error?.description || 'Payment not found. Please check the ID and try again.' 
      });
    }

    const payment = await rzRes.json();

    // Check payment status
    if (payment.status !== 'captured') {
      return res.status(400).json({ 
        verified: false, 
        error: `Payment status is "${payment.status}". Only captured payments are accepted.` 
      });
    }

    // Check amount matches plan (optional but recommended)
    const PLAN_AMOUNTS = {
      starter: 299900,  // ₹2,999 in paise
      growth:  549900,  // ₹5,499 in paise
      pro:     899900,  // ₹8,999 in paise
    };

    if (planId && PLAN_AMOUNTS[planId] && payment.amount !== PLAN_AMOUNTS[planId]) {
      console.warn(`Amount mismatch: expected ${PLAN_AMOUNTS[planId]}, got ${payment.amount}`);
      // Don't block — just log for manual review
    }

    console.log(`✅ Payment verified: ${paymentId} | ₹${payment.amount/100} | ${payment.email} | Status: ${payment.status}`);

    return res.json({
      verified: true,
      paymentId,
      amount: payment.amount / 100,
      currency: payment.currency,
      email: payment.email,
      status: payment.status,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ error: 'Failed to verify payment. Please try again.' });
  }
}
