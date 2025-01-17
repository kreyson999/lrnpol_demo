import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import {
  CourseSubscriptionStatus,
  CourseSubscriptionPaymentStatus,
  UserOrderStatus,
} from '@/services/API';
import { OrderType } from '@/constants/enums/OrderType';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import * as mutations from '@/services/graphql/mutations';
import { getCoursePriceByUserOrder } from '@/services/graphql/userOrder/queries';

type StripeOrderMetadata = {
  orderId: string;
  amount: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();

  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;

  const sig = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return new Response(`Webhook Error: ${String(err)}`, {
      status: 400,
    });
  }

  const { type: eventType } = event;

  if (
    eventType !== 'checkout.session.completed' &&
    eventType !== 'checkout.session.async_payment_succeeded'
  ) {
    return new Response('Server Error', {
      status: 500,
    });
  }

  const data = event.data.object;
  const transactionData = data.metadata as StripeOrderMetadata;

  try {
    const [orderType, orderId] = transactionData.orderId.split(':') as [
      OrderType,
      string
    ];

    if (orderType === OrderType.COURSE_CREATION_SUBSCRIPTION) {
      const [subscriptionPayment, subscriptionPaymentErrors] =
        await appSyncRequest(mutations.updateCourseSubscriptionPayment, {
          input: {
            id: orderId,
            status: CourseSubscriptionPaymentStatus.COMPLETED,
          },
        });

      if (
        !subscriptionPayment?.updateCourseSubscriptionPayment ||
        subscriptionPaymentErrors
      ) {
        throw Error(`Nie udało się zaktualizować płatności!`);
      }

      const [, updateSubscriptionErrors] = await appSyncRequest(
        mutations.updateCourseSubscription,
        {
          input: {
            id: subscriptionPayment.updateCourseSubscriptionPayment
              .subscriptionId,
            status: CourseSubscriptionStatus.ACTIVE,
          },
        }
      );

      if (updateSubscriptionErrors?.length) {
        throw new Error('Nie udało się zatwierdzić subskrybcji!');
      }
    } else {
      const [orderData, orderErrors] = await appSyncRequest(
        getCoursePriceByUserOrder,
        { id: orderId }
      );

      if (!orderData?.getUserOrder || orderErrors) {
        throw Error(`Nie udało się pobrać zamowienia!`);
      }

      const [, orderMutationErrors] = await appSyncRequest(
        mutations.updateUserOrder,
        {
          input: {
            id: orderId,
            status: UserOrderStatus.PAID,
          },
        }
      );

      if (orderMutationErrors?.length) {
        throw Error(`Nie udało się zaktualizować zamowienia!`);
      }
    }

    return new Response('Payment added', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Server error', {
      status: 500,
    });
  }
}
