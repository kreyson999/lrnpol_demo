import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import {
  CourseSubscriptionPaymentStatus,
  CourseSubscriptionStatus,
  PaymentMethod,
} from '@/services/API';
import { validateStartCourseSubscriptionSchema } from '@/app/api/Validations';
import {
  getCourse,
  getCourseSubscriptionPlan,
} from '@/services/graphql/queries';
import { isDevEnv } from '@/helpers/isDevEnv';
import { OrderType } from '@/constants/enums/OrderType';
import {
  createCourseSubscription,
  createCourseSubscriptionPayment,
} from '@/services/graphql/mutations';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import { startPayment } from '@/helpers/startPayment';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  try {
    const { slug } = response.params;

    const { planId } = await validateStartCourseSubscriptionSchema.validate(
      await request.json()
    );

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    // check if course exists
    const [courseData, courseErrors] = await appSyncRequest(getCourse, {
      slug,
    });

    if (courseErrors || !courseData) {
      throw new Error('Kurs nie istnieje!');
    }

    if (courseData.getCourse?.owner !== userId) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const [coursePlanData, coursePlanErrors] = await appSyncRequest(
      getCourseSubscriptionPlan,
      {
        id: planId,
      }
    );

    if (coursePlanErrors || !coursePlanData?.getCourseSubscriptionPlan) {
      throw new Error('Plan stworzenia kursu nie istnieje!');
    }

    const startDate = new Date().toISOString();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const [subscriptionData, subscriptionErrors] = await appSyncRequest(
      createCourseSubscription,
      {
        input: {
          courseSubscriptionPlanId: planId,
          courseSlug: slug,
          status: CourseSubscriptionStatus.NOT_STARTED,
          startDate,
          expirationDate: expirationDate.toISOString(),
          owner: `${userId}::${userId}`,
        },
      }
    );

    if (subscriptionErrors || !subscriptionData?.createCourseSubscription) {
      throw new Error('Nie udało się stworzyć subskrypcji!');
    }

    // create payment with status none
    const [createPaymentData, createPaymentErrors] = await appSyncRequest(
      createCourseSubscriptionPayment,
      {
        input: {
          subscriptionId: subscriptionData.createCourseSubscription.id,
          paymentMethod: PaymentMethod.HOTPAY,
          amount: coursePlanData.getCourseSubscriptionPlan.price,
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
      coursePlanData.getCourseSubscriptionPlan;

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
    console.log('Error:', JSON.stringify(error));
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
