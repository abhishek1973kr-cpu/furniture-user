import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Razorpay secret key is not configured in server environment.',
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required Razorpay payment verification parameters.',
        },
        { status: 400 }
      );
    }

    // Razorpay signature verification logic:
    // HMAC-SHA256 of `${order_id}|${payment_id}` using `secret`
    const dataToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(dataToSign)
      .digest('hex');

    const isValidSignature = generatedSignature === razorpay_signature;

    if (!isValidSignature) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Payment signature verification failed. Transaction cannot be validated.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error: any) {
    console.error('Razorpay Verify Payment API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Payment verification failed',
      },
      { status: 500 }
    );
  }
}
