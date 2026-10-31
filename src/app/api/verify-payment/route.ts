import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Razorpay secret key not configured in environment.',
        },
        { status: 500 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    const orderId = body.razorpay_order_id || body.order_id;
    const paymentId = body.razorpay_payment_id || body.payment_id;
    const signature = body.razorpay_signature || body.signature;

    // Missing fields: return 400
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields (order_id, payment_id, signature).',
        },
        { status: 400 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const dataToSign = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(dataToSign)
      .digest('hex');

    const isMatch = generatedSignature === signature;

    // Signature mismatch: return 400, do NOT mark as paid
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Payment verification failed: Signature mismatch.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      order_id: orderId,
      payment_id: paymentId,
    });
  } catch (error: any) {
    console.error('Razorpay Verify Payment Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error verifying signature',
      },
      { status: 500 }
    );
  }
}
