import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Razorpay credentials not configured in environment.',
        },
        { status: 401 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const { amount, currency = 'INR', receipt, notes, isPaise } = body;

    const numericVal = Number(amount);
    if (isNaN(numericVal) || numericVal <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid amount is required.' },
        { status: 400 }
      );
    }

    // Minimum amount: 100 paise (1 INR)
    // If isPaise is true, amount is already in paise. Otherwise convert INR to paise.
    const amountInPaise = isPaise ? Math.round(numericVal) : Math.round(numericVal * 100);

    if (amountInPaise < 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Amount must be at least 100 paise (₹1).',
        },
        { status: 400 }
      );
    }

    let razorpay: Razorpay;
    try {
      razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    } catch (authErr: any) {
      return NextResponse.json(
        { success: false, error: authErr?.message || 'Authentication error with Razorpay SDK' },
        { status: 401 }
      );
    }

    const orderOptions = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      keyId: keyId,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    // If Razorpay returns an auth error (statusCode 401)
    if (error?.statusCode === 401) {
      return NextResponse.json(
        { success: false, error: 'Razorpay authentication failed. Invalid API keys.' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error?.error?.description || error?.message || 'Internal server error creating Razorpay order',
      },
      { status: 500 }
    );
  }
}

