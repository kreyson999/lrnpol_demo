'use client';

import React, { useState } from 'react';

import MContainer from '@mui/material/Container';
import MTypography from '@mui/material/Typography';
import MBox from '@mui/material/Box';

import { useCourse } from '@/app/(authContext)/kurs/[slug]/(dashboard)/CourseContext';
import Button from '@/components/materialUI/Button';
import { useParams } from 'next/navigation';
import { PaymentMethod } from '@/services/API';
import { useErrorState } from '@/contexts/ErrorContext';
import { sendGAEvent } from '@next/third-parties/google';
import axios from 'axios';
import { useSnackbar } from '@/contexts/SnackbarContext';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

const ConfirmAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const course = useCourse();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const PAYMENT_PROVIDER =
    (process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER as PaymentMethod) || 'HOTPAY';

  const handleInitiatePayment = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.post<{
        result:
          | {
              paymentUrl: string;
            }
          | Stripe.Checkout.Session;
      }>(`/api/courses/${slug}/purchases`);

      sendGAEvent('event', 'set_checkout_option', {
        event: 'set_checkout_option',
        value: PAYMENT_PROVIDER,
      });
      sendGAEvent('event', 'begin_checkout', {
        event: 'begin_checkout',
      });

      showSnackbar('Pomyślnie rozpoczęto płatność');

      if (!response.data.result) {
        throw new Error('Nie udało się zainicjalizować płatności!');
      }

      if ('paymentUrl' in response.data.result) {
        const { paymentUrl } = response.data.result;

        window.location.href = paymentUrl;
      } else {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        );

        if (!stripe) {
          throw Error('Nie udało się załadować Stripe!');
        }

        await stripe.redirectToCheckout({
          sessionId: response.data.result.id,
        });
      }
    } catch (error) {
      setErrorMessage(
        'Nie udało się zainicjalizować płatności! Spróbuj ponownie lub skontakuj się z administratorem!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MContainer
      maxWidth="sm"
      className="tw-flex tw-flex-col tw-pt-20 tw-text-white tw-pb-16"
    >
      <MTypography className="tw-text-primary-main tw-text-center md:tw-text-5xl tw-text-4xl tw-font-extrabold tw-uppercase">
        Zapłać za kurs
      </MTypography>

      <MTypography className="tw-text-lg md:tw-text-xl tw-text-center tw-mt-4 tw-text-secondary-contrastText">
        Kliknij przycisk poniżej, postępuj zgodnie z instrukcją i zacznij się
        uczyć.
      </MTypography>

      <MBox className="tw-mt-6 tw-flex tw-justify-between tw-gap-12 tw-bg-background-paper tw-border-primary-light tw-border tw-rounded-lg tw-p-4">
        <MBox>
          <MTypography className="tw-text-xl tw-font-semibold tw-text-primary-main">
            {course?.title}
          </MTypography>
          <MTypography className=" tw-text-secondary-contrastText">
            Dostęp do kursu na zawsze!
          </MTypography>
        </MBox>
        <MBox className="tw-flex tw-flex-col tw-text-right">
          <MTypography className="tw-font-bold tw-text-lg">
            {course?.price} zł
          </MTypography>
          {course?.discountPrice && (
            <MTypography className="tw-text-secondary-contrastText tw-line-through tw-text-sm">
              {course?.discountPrice} zł
            </MTypography>
          )}
        </MBox>
      </MBox>

      <hr className="tw-mt-4 tw-h-0.5 tw-border-primary-light tw-w-full" />

      <MTypography className="tw-mt-4 tw-text-lg">
        Kwota do zapłaty:{' '}
        <span className="tw-font-semibold tw-text-primary-contrastText">
          {course?.price} zł
        </span>
      </MTypography>

      <Button
        onClick={handleInitiatePayment}
        primary
        type="submit"
        className="tw-mt-4 "
      >
        Zapłać za kurs
      </Button>
    </MContainer>
  );
};

export default ConfirmAccount;
