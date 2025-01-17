'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import MIconButton from '@mui/material/IconButton';
import { generateClient } from 'aws-amplify/api';
import { useErrorState } from '@/contexts/ErrorContext';
import { useRouter } from 'next/navigation';
import { getCourseSectionStep } from '@/services/graphql/queries';
import { GetCourseSectionStepQuery } from '@/services/API';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
    stepId: string;
  };
};

const CourseContentStepLayout = ({ children, params }: Props) => {
  const router = useRouter();
  const setErrorMessage = useErrorState();

  const [step, setStep] = useState<
    null | GetCourseSectionStepQuery['getCourseSectionStep']
  >(null);

  const backRoute = `/dashboard/kursy/${params.slug}/tresc`;

  const fetchStep = useCallback(async (): Promise<void> => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      const result = await client.graphql({
        query: getCourseSectionStep,
        variables: {
          id: params.stepId,
        },
      });

      setStep(result.data.getCourseSectionStep);
    } catch (error) {
      setErrorMessage('Nie udało się pobrać testu do tego etapu!');
      router.push(backRoute);
    }
  }, [router, setErrorMessage, params.stepId, backRoute]);

  useEffect(() => {
    void fetchStep();
  }, [fetchStep]);

  return (
    <MBox className="tw-flex tw-flex-col">
      <MBox className="tw-flex tw-flex-col tw-mt-4 tw-px-4 md:tw-mt-0 md:tw-px-0 ">
        <MBox className="tw-flex tw-items-center tw-justify-between tw-gap-4">
          <MBox className="tw-flex tw-items-center tw-gap-2">
            <Link href={backRoute}>
              <MIconButton className="-tw-ml-2">
                <ArrowBackIcon />
              </MIconButton>
            </Link>
            <MTypography className="tw-text-primary-contrastText tw-text-xl tw-font-semibold">
              {step?.title}
            </MTypography>
          </MBox>
        </MBox>
      </MBox>
      {children}
    </MBox>
  );
};

export default CourseContentStepLayout;
