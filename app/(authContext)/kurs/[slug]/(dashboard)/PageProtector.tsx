'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import ProgressCircular from '@/components/materialUI/ProgressCircular';
import MBox from '@mui/material/Box';
import { useParams, useRouter } from 'next/navigation';
import * as queries from '@/services/graphql/queries';
import { UserOrderStatus } from '@/services/API';
import { parseError } from '@/helpers/parseError';
import { useErrorState } from '@/contexts/ErrorContext';
import { generateClient } from 'aws-amplify/api';
import { useCourse } from './CourseContext';
import { sendGAEvent } from '@next/third-parties/google';

type Props = {
  mustAuthenticated?: boolean;
  mustPaidForCourse?: boolean;
  redirectIfPaidForCourse?: boolean;
  redirectIfAuthenticated?: boolean;
  children: React.ReactNode;
};

const PageProtector = ({
  children,
  mustAuthenticated,
  mustPaidForCourse,
  redirectIfPaidForCourse,
  redirectIfAuthenticated,
}: Props) => {
  const { user, isAuthLoading } = useAuth();

  const router = useRouter();
  const { slug } = useParams();
  const setErrorMessage = useErrorState();
  const fetchedCourse = useCourse();
  const hasSentPurchaseEvent = useRef(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserOrder = useCallback(async () => {
    if (!user) return;
    const client = generateClient();
    try {
      const { data, errors } = await client.graphql({
        query: queries.userOrderByOwnerAndCourse,
        variables: {
          owner: `${user.id}::${user.id}`,
          courseSlug: {
            eq: String(slug),
          },
          limit: 10000,
          filter: {
            status: {
              eq: UserOrderStatus.PAID,
            },
          },
        },
      });

      if (data.userOrderByOwnerAndCourse) {
        return data;
      }

      if (errors) throw parseError(errors.map((error) => error.message));
      return null;
    } catch (errors) {
      setErrorMessage(errors as string);
      return null;
    }
    return null;
  }, [slug, setErrorMessage, user]);

  const isAuthenticated = useCallback(() => {
    if (user !== null) return true;

    return false;
  }, [user]);

  const hasPaidForCourse = useCallback(async () => {
    const order = await fetchUserOrder();

    if (!order) return false;

    if (order.userOrderByOwnerAndCourse.items.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      if (
        searchParams.get('analyticsEvent') &&
        hasSentPurchaseEvent.current === false
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        window.fbq('track', 'Purchase', {
          currency: 'PLN',
          value: fetchedCourse?.price ?? 0,
        });
        sendGAEvent('event', 'purchase', {
          event: 'purchase',
          transaction_id: order.userOrderByOwnerAndCourse.items[0].id,
          value: fetchedCourse?.price,
          currency: 'PLN',
          items: [
            {
              item_id: fetchedCourse?.slug,
              item_name: fetchedCourse?.title,
              price: fetchedCourse?.price,
              quantity: 1,
            },
          ],
        });
        hasSentPurchaseEvent.current = true;
      }

      return true;
    }

    return false;
  }, [fetchUserOrder, fetchedCourse]);

  const hasAccessToPage = useCallback(async () => {
    const authenticated = isAuthenticated();
    if (mustAuthenticated && authenticated === false) {
      router.replace('/zaloguj');
      return false;
    }

    let hasPaid = false;
    if (authenticated) {
      hasPaid = await hasPaidForCourse();

      if (mustPaidForCourse && hasPaid === false) {
        router.replace('/zaplac');
        return false;
      }
    }

    if (redirectIfAuthenticated && authenticated) {
      router.replace('/app');
      return false;
    }

    if (redirectIfPaidForCourse && hasPaid) {
      router.replace('/app');
      return false;
    }

    setIsLoading(false);
    return true;
  }, [
    redirectIfAuthenticated,
    redirectIfPaidForCourse,
    hasPaidForCourse,
    isAuthenticated,
    mustPaidForCourse,
    mustAuthenticated,
    router,
  ]);

  useEffect(() => {
    if (isAuthLoading) return;
    void hasAccessToPage();
  }, [isAuthLoading, hasAccessToPage]);

  // useEffect(() => {
  //   const ref = query.get('ref');

  //   if (!ref) return;
  //   localStorage.setItem('referralCode', ref);
  // }, [query]);

  return isLoading ? (
    <MBox className="tw-grow tw-grid tw-place-content-center">
      <ProgressCircular />
    </MBox>
  ) : (
    children
  );
};

export default PageProtector;
