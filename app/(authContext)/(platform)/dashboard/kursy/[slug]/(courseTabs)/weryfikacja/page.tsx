'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@/components/shared/Stepper';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import MContainer from '@mui/material/Container';
import { generateClient } from 'aws-amplify/api';
import { useErrorState } from '@/contexts/ErrorContext';
import ChoosePlan from './ChoosePlan';
import {
  CourseSubscriptionStatus,
  CourseVerificationStatus,
} from '@/services/API';
import WaitForVerification from './WaitForVerification';
import PayForPlan from './PayForPlan';
import PageLoader from '@/components/shared/PageLoader';
import { getCourseVerificationAndSubscribtion } from '@/services/graphql/course/queries';
import SuccessfullyVerified from './SuccessfullyVerified';

type Props = {
  params: {
    slug: string;
  };
};

const steps = [
  {
    title: 'Opłać plan',
    icon: <BookmarkBorderRounded />,
  },
  {
    title: 'Czekaj na weryfikację',
    icon: <VerifiedRoundedIcon />,
  },
  {
    title: 'Sprzedawaj kursy',
    icon: <SellRoundedIcon />,
  },
];

const VeryficationPage = ({ params: { slug } }: Props) => {
  const setErrorMessage = useErrorState();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<React.ReactNode>();
  const [stepIndex, setStepIndex] = useState<number>(0);

  const fetchSubscriptionsAndVerification = useCallback(async () => {
    try {
      const client = generateClient();

      const response = await client.graphql({
        query: getCourseVerificationAndSubscribtion,
        variables: {
          slug,
        },
      });

      const courseData = response.data.getCourse;

      if (!courseData)
        throw new Error(
          'Błąd podczas pobierania informacji o weryfikacji i subskrybcji!'
        );

      const verification = courseData.verification ?? null;
      const subscriptions = courseData.subscriptions?.items ?? [];

      if (verification) {
        if (verification.status === CourseVerificationStatus.VERIFIED) {
          setStepIndex(2);
          setCurrentView(<SuccessfullyVerified />);
        } else {
          setStepIndex(1);
          setCurrentView(
            <WaitForVerification
              verification={verification}
              refreshVerification={() =>
                void fetchSubscriptionsAndVerification()
              }
            />
          );
        }
      } else if (subscriptions.length) {
        const paidSubscription = subscriptions.find(
          (value) => value?.status === CourseSubscriptionStatus.ACTIVE
        );

        if (paidSubscription) {
          setStepIndex(1);
          setCurrentView(
            <WaitForVerification
              verification={verification}
              refreshVerification={() =>
                void fetchSubscriptionsAndVerification()
              }
            />
          );
        } else {
          const lastSubscription = subscriptions
            .filter((subscription) => subscription !== null)
            .sort((a, b) => (a!.createdAt > b!.createdAt ? 1 : -1));
          setCurrentView(<PayForPlan subscription={lastSubscription[0]!} />);
        }
      } else {
        setCurrentView(<ChoosePlan />);
      }
    } catch (error) {
      setErrorMessage('Nie udało się pobrać subskrybcji kursu!');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, slug]);

  useEffect(() => {
    void fetchSubscriptionsAndVerification();
  }, [fetchSubscriptionsAndVerification]);

  return (
    <Box className="tw-py-4 tw-pt-8 tw-flex tw-flex-col tw-items-center">
      <MContainer maxWidth="lg">
        <Stepper activeStep={stepIndex} steps={steps} />
      </MContainer>
      <MContainer
        maxWidth="md"
        className="tw-mt-8 tw-flex tw-justify-center  tw-gap-4 lg:tw-gap-6"
      >
        <PageLoader isLoading={isLoading}>{currentView}</PageLoader>
      </MContainer>
    </Box>
  );
};

export default VeryficationPage;
