import React, { useState } from 'react';

import { CourseSubscription } from '@/services/graphql/course/subscriptions/types';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import Button from '@/components/materialUI/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useErrorState } from '@/contexts/ErrorContext';
import { useParams } from 'next/navigation';
import axios from 'axios';

type Props = {
  subscription: CourseSubscription;
};

const PayForPlan = ({ subscription }: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const setErrorMessage = useErrorState();

  const handleInitiatePayment = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.post<{ paymentUrl: string }>(
        `/api/courses/${slug}/subscriptions/${subscription.id}/payments`
      );

      showSnackbar('Pomyślnie rozpoczęto płatność');

      if (!response.data.paymentUrl) {
        throw new Error('Brak URL do płatności!');
      }

      const { paymentUrl } = response.data;

      window.location.href = paymentUrl;
    } catch (error) {
      setErrorMessage('Nie udało się zainicjalizować płatności!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MBox className="tw-flex tw-flex-col tw-items-center">
      <MTypography className="tw-my-4 tw-text-center tw-max-w-screen-sm">
        Aby zweryfikować swój kurs, konieczne jest opłacenie subskrypcji. Po
        pomyślnym zakończeniu procesu weryfikacji Twój kurs zostanie
        opublikowany. Subskrypcja będzie aktywna przez miesiąc, licząc od dnia
        naszej weryfikacji.
      </MTypography>
      <MBox className="tw-mt-4 tw-w-fit tw-flex tw-items-center tw-gap-12 tw-bg-background-paper tw-border-primary-light tw-border tw-rounded-lg tw-p-4">
        <MBox>
          <MTypography className="tw-mb-2 tw-text-xl tw-font-semibold tw-text-primary-main">
            {subscription.courseSubscriptionPlan.name}
          </MTypography>
          <MTypography>
            {subscription.courseSubscriptionPlan.description}
          </MTypography>
        </MBox>
        <MTypography className="tw-font-bold tw-text-2xl">
          {subscription.courseSubscriptionPlan.price} zł
        </MTypography>
      </MBox>
      <MBox>
        <Button
          isLoading={isLoading}
          onClick={handleInitiatePayment}
          className="tw-w-fit tw-mt-8"
          primary
        >
          Opłać subskrybcję
        </Button>
      </MBox>
    </MBox>
  );
};

export default PayForPlan;
