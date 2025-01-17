'use client';

import React, { useState } from 'react';

import Button from '@/components/materialUI/Button';

import MBox from '@mui/material/Box';
import MCardContent from '@mui/material/CardContent';
import MList from '@mui/material/List';
import MListItem from '@mui/material/ListItem';
import MListItemIcon from '@mui/material/ListItemIcon';
import MListItemText from '@mui/material/ListItemText';
import MCardActions from '@mui/material/CardActions';
import MCard from '@mui/material/Card';
import MTypography from '@mui/material/Typography';

import DoneIcon from '@mui/icons-material/Done';
import { CourseSubscriptionPlan as CourseSubscriptionPlanType } from '@/services/API';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

type Props =
  | {
      plan: CourseSubscriptionPlanType;
    } & (
      | {
          actionType: 'INITIATE_PAYMENT';
        }
      | {
          actionType: 'NAVIGATE_TO_DASHBOARD';
          href: string;
        }
    );

const CreateCoursePlan = (props: Props) => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);

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
      }>(`/api/courses/${slug}/subscriptions`, {
        planId: props.plan.id,
      });

      showSnackbar('Pomyślnie rozpoczęto płatność');

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
      setErrorMessage('Nie udało się zainicjalizować płatności!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCard
      sx={{
        backgroundImage: 'unset',
      }}
      elevation={0}
      className={`tw-w-full tw-drop-shadow-lg tw-border tw-border-primary-light tw-text-white tw-rounded-xl tw-bg-background-default tw-flex tw-flex-col`}
    >
      <MCardContent className="tw-grow tw-text-primary-main tw-bg-background-default">
        <MTypography className="tw-text-xl md:tw-text-2xl tw-font-semibold">
          {props.plan.name}
        </MTypography>
        <MTypography className="tw-mt-2 md:tw-text-base tw-text-secondary-contrastText">
          {props.plan.description}
        </MTypography>
        <MBox className="tw-flex tw-items-end tw-gap-2">
          <MTypography className="tw-mt-4 tw-text-4xl tw-font-extrabold tw-text-white">
            {props.plan.price} zł
          </MTypography>
          <MTypography className="tw-text-base tw-text-secondary-contrastText">
            miesięcznie
          </MTypography>
        </MBox>
        <MList>
          {props.plan.features.map((item) => (
            <MListItem key={item} className="tw-px-0">
              <MListItemIcon className=" tw-min-w-10">
                <MBox className="tw-bg-primary-main tw-grid tw-p-1 tw-rounded-full">
                  <DoneIcon className="tw-text-base" />
                </MBox>
              </MListItemIcon>
              <MListItemText className="tw-text-white" primary={item} />
            </MListItem>
          ))}
        </MList>
      </MCardContent>
      <MCardActions className="tw-flex tw-flex-col">
        {props.actionType === 'NAVIGATE_TO_DASHBOARD' ? (
          <Button
            className="tw-w-full"
            isLoading={isLoading}
            href={props.href}
            primary
          >
            Stwórz i zapłać później
          </Button>
        ) : (
          <Button isLoading={isLoading} onClick={handleInitiatePayment} primary>
            Wybierz plan
          </Button>
        )}
      </MCardActions>
    </MCard>
  );
};

export default CreateCoursePlan;
