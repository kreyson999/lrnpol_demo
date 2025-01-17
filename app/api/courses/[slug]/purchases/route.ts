import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { PaymentMethod, UserOrderStatus } from '@/services/API';
import { getCourse, userOrderByCourseSlug } from '@/services/graphql/queries';
import { isDevEnv } from '@/helpers/isDevEnv';
import { OrderType } from '@/constants/enums/OrderType';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import { startUserOrder } from '@/services/graphql/userOrder/mutations';
import { startPayment } from '@/helpers/startPayment';

export async function GET(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    console.log(startDate, endDate);

    const { slug } = response.params;

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const [courseData, courseErrors] = await appSyncRequest(getCourse, {
      slug,
    });

    if (courseErrors || !courseData?.getCourse?.owner) {
      throw new Error('Nie udało się pobrać danych kursu!');
    }

    if (courseData.getCourse.owner !== userId) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const [userOrders, userOrderErrors] = await appSyncRequest(
      userOrderByCourseSlug,
      {
        courseSlug: slug,
        filter: {
          and: [
            {
              updatedAt: {
                between: [
                  `${startDate}T00:00:00.000Z`,
                  `${endDate}T23:59:59.999Z`,
                ],
              },
            },
            {
              status: {
                eq: UserOrderStatus.PAID,
              },
            },
            {
              price: {
                ne: null,
              },
            },
          ],
        },
      }
    );

    if (!userOrders?.userOrderByCourseSlug?.items || userOrderErrors?.length) {
      throw new Error('Nie udało się pobrać zamówień!');
    }

    return Response.json(
      {
        orders: userOrders.userOrderByCourseSlug.items,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się pobrać listy zamówień.',
      }),
      {
        status: 400,
      }
    );
  }
}

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  try {
    const { slug } = response.params;

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const [courseData, courseErrors] = await appSyncRequest(getCourse, {
      slug,
    });

    if (courseErrors || !courseData?.getCourse?.price) {
      throw new Error('Nie udało się pobrać danych kursu!');
    }

    const PAYMENT_PROVIDER =
      (process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER as PaymentMethod) || 'HOTPAY';

    const [orderData, orderErrors] = await appSyncRequest(startUserOrder, {
      input: {
        price: courseData.getCourse.price,
        paymentMethod: PAYMENT_PROVIDER,
        courseSlug: slug,
        owner: `${userId}::${userId}`,
      },
    });

    if (orderErrors || !orderData?.createUserOrder) {
      throw new Error('Nie udało się stworzyć zamówienia! ');
    }

    const urlPrefix = `https://${slug}${
      isDevEnv() ? '.local' : ''
    }.learnpool.pl${isDevEnv() ? ':3000' : ''}`;

    const paymentResponse = await startPayment({
      id: `${OrderType.COURSE_PURCHASE}:${orderData.createUserOrder.id}`,
      price: courseData.getCourse.price,
      serviceName: `Dostęp do kursu: ${slug}`,
      successUrl: `${urlPrefix}/app?analyticsEvent=purchase`,
      cancelUrl: `${urlPrefix}/app`,
    });

    return Response.json(paymentResponse, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
