import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId.includes('YOUR_KEY') || keySecret.includes('YOUR_KEY')) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Razorpay API Keys are not configured yet in .env.local. Please add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
          missingKeys: true,
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing amount for order creation.' },
        { status: 400 }
      );
    }

    // Razorpay requires amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(numericAmount * 100);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const orderOptions = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {
        store: 'LivFabs Space-Saving Luxury Living',
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to create Razorpay order',
      },
      { status: 500 }
    );
  }
}
