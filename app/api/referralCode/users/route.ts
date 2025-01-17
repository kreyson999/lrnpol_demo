import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    // you can implement some basic check here like, is user valid or not
    const data = (await request.json()) as { priceId: string; orderId: string };
    const priceId = data.priceId;
    const orderId = data.orderId;
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'blik', 'p24'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://kursinf.learnpool.pl/`,
        cancel_url: `https://kursinf.learnpool.pl/`,
        metadata: {
          orderId,
          priceId,
        },
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal Server: ${JSON.stringify(error)}`, {
      status: 500,
    });
  }
}
