import { NextRequest, NextResponse } from 'next/server';

import { createHash } from 'node:crypto';

import * as mutations from '@/services/graphql/mutations';
import {
  CourseSubscriptionPaymentStatus,
  CourseSubscriptionStatus,
  UserOrderStatus,
} from '@/services/API';
import { getCoursePriceByUserOrder } from '@/services/graphql/userOrder/queries';
import { OrderType } from '@/constants/enums/OrderType';
import { appSyncRequest } from '@/helpers/appSyncRequest';

export async function POST(request: NextRequest) {
  // const allowedAddresses = [
  //   '18.197.55.26',
  //   '3.126.108.86',
  //   '3.64.128.101',
  //   '18.184.99.42',
  //   '3.72.152.155',
  //   '35.159.7.168',
  // ];

  try {
    const HOTPAY_SHOP_PASSWORD = process.env.HOTPAY_SHOP_PASSWORD;

    const data = Object.fromEntries(await request.formData()) as {
      KWOTA: string;
      ID_PLATNOSCI: string;
      ID_ZAMOWIENIA: string;
      STATUS: 'SUCCESS' | 'FAILURE';
      SEKRET: string;
      HASH: string;
      SECURE: string;
    };

    console.log(JSON.stringify(data));

    const newHotPayHash = createHash('sha2-256')
      .update(
        HOTPAY_SHOP_PASSWORD +
          ';' +
          data.KWOTA +
          ';' +
          data.ID_PLATNOSCI +
          ';' +
          data.ID_ZAMOWIENIA +
          ';' +
          data.STATUS +
          ';' +
          data.SECURE +
          ';' +
          data.SEKRET
      )
      .digest('hex');

    console.log(newHotPayHash, data.HASH);

    if (newHotPayHash !== data.HASH) {
      throw new Error('Hash płatności jest nieprawidłowy!');
    }

    const [orderType, orderId] = data.ID_ZAMOWIENIA.split(':') as [
      OrderType,
      string
    ];

    if (orderType === OrderType.COURSE_CREATION_SUBSCRIPTION) {
      const [subscriptionPayment, subscriptionPaymentErrors] =
        await appSyncRequest(mutations.updateCourseSubscriptionPayment, {
          input: {
            id: orderId,
            status:
              data.STATUS === 'SUCCESS'
                ? CourseSubscriptionPaymentStatus.COMPLETED
                : CourseSubscriptionPaymentStatus.FAILED,
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

      return new NextResponse(`Pomyślnie kupiono`, {
        status: 200,
      });
    }

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
          status:
            data.STATUS === 'SUCCESS'
              ? UserOrderStatus.PAID
              : UserOrderStatus.FAIL,
        },
      }
    );

    if (orderMutationErrors?.length) {
      throw Error(`Nie udało się zaktualizować zamowienia!`);
    }

    return new NextResponse(`Pomyślnie kupiono`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal Server: ${JSON.stringify(error)}`, {
      status: 500,
    });
  }
}
