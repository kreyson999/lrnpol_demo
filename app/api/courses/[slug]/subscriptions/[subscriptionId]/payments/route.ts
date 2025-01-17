import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { CourseSubscriptionPaymentStatus, PaymentMethod } from '@/services/API';
import {
  getCourseSubscription,
  getCourseSubscriptionPlan,
} from '@/services/graphql/queries';
import { isDevEnv } from '@/helpers/isDevEnv';
import { OrderType } from '@/constants/enums/OrderType';
import { createCourseSubscriptionPayment } from '@/services/graphql/mutations';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import { startPayment } from '@/helpers/startPayment';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { subscriptionId: string; slug: string } }
) {
  try {
    const { subscriptionId, slug } = response.params;

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const [subscriptionData, subscriptionErrors] = await appSyncRequest(
      getCourseSubscription,
      {
        id: subscriptionId,
      }
    );

    if (subscriptionErrors || !subscriptionData) {
      throw new Error('Subskrybcja nie istnieje!');
    }

    if (subscriptionData.getCourseSubscription?.owner !== userId) {
      throw new Error('Subskrybcja nie należy do użytkownika!');
    }

    const [planData, planErrors] = await appSyncRequest(
      getCourseSubscriptionPlan,
      {
        id: subscriptionData.getCourseSubscription.courseSubscriptionPlanId,
      }
    );

    if (planErrors || !planData?.getCourseSubscriptionPlan) {
      throw new Error('Plan stworzenia kursu nie istnieje!');
    }

    const [createPaymentData, createPaymentErrors] = await appSyncRequest(
      createCourseSubscriptionPayment,
      {
        input: {
          subscriptionId,
          paymentMethod: PaymentMethod.HOTPAY,
          amount: planData.getCourseSubscriptionPlan.price,
          status: CourseSubscriptionPaymentStatus.PENDING,
          owner: `${userId}::${userId}`,
        },
      }
    );

    if (
      createPaymentErrors ||
      !createPaymentData?.createCourseSubscriptionPayment
    ) {
      throw new Error('Nie udało się stworzyć płatności do tej subskrybcji!');
    }

    const { price: planPrice, name: planName } =
      planData.getCourseSubscriptionPlan;

    const paymentResponse = await startPayment({
      id: `${OrderType.COURSE_CREATION_SUBSCRIPTION}:${createPaymentData.createCourseSubscriptionPayment.id}`,
      price: planPrice,
      serviceName: `Opłata za stworzenie kursu ${slug} z planem ${planName}`,
      successUrl: `https://${isDevEnv() ? 'local' : 'www'}.learnpool.pl${
        isDevEnv() ? ':3000' : ''
      }/dashboard/kursy/${slug}/weryfikacja`,
      cancelUrl: `https://${isDevEnv() ? 'local' : 'www'}.learnpool.pl${
        isDevEnv() ? ':3000' : ''
      }/dashboard/kursy/${slug}/weryfikacja`,
    });

    return Response.json(paymentResponse, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się zainicjalizować płatności',
      }),
      {
        status: 400,
      }
    );
  }
}
