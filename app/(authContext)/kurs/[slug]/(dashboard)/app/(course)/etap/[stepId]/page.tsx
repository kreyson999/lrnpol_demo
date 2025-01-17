'use client';

import React, { useState, useEffect, useCallback } from 'react';

import MBox from '@mui/material/Box';

import { useErrorState } from '@/contexts/ErrorContext';
import PageLoader from '@/components/shared/PageLoader';

import {
  CourseSectionStepType,
  GetCourseSectionStepWithVideoAndProgressQuery,
} from '@/services/API';
import CoursesService from '@/services/api/CourseService';
import { UserCourseStepProgress } from '@/constants/types/UserCourseProgress';
import VideoStepView from './VideoStepView';
import { Typography } from '@mui/material';
import TestStepView from './TestStepView';

type StepType =
  GetCourseSectionStepWithVideoAndProgressQuery['getCourseSectionStep'];

const Page = ({ params }: { params: { slug: string; stepId: string } }) => {
  const setErrorMessage = useErrorState();

  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<StepType | null>(null);
  const [userProgress, setUserProgress] =
    useState<UserCourseStepProgress | null>(null);

  const fetchCourseStep = useCallback(async () => {
    try {
      const response = await CoursesService.course(params.slug)
        .steps()
        .step(params.stepId)
        .get();
      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }
      setStep(response.data.getCourseSectionStep);
      const progress =
        response.data.userCourseStepProgressByOwnerAndStep?.items.at(0);
      if (progress) {
        setUserProgress({
          id: progress.id,
          durationInMs: progress.durationInMs,
        });
      }
    } catch (error) {
      setErrorMessage(
        `Wystąpił błąd podczas pobierania etapu kursu. Skontatkuj się z administratorem!`
      );
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, params.slug, params.stepId]);

  useEffect(() => {
    void fetchCourseStep();
  }, [fetchCourseStep]);

  const getStepView = (step: NonNullable<StepType>): React.ReactNode => {
    switch (step.type) {
      case CourseSectionStepType.VIDEO:
        return <VideoStepView step={step} userProgress={userProgress} />;
      case CourseSectionStepType.TEST:
        return <TestStepView step={step} />;
      default:
        return null;
    }
  };

  return (
    <PageLoader isLoading={isLoading}>
      <MBox className="tw-grow tw-flex tw-flex-col">
        {step ? (
          getStepView(step)
        ) : (
          <MBox className="tw-grid tw-place-content-center tw-mt-4">
            <Typography className="tw-text-primary-contrastText ">
              Nie udało się załadować etapu!
            </Typography>
          </MBox>
        )}
      </MBox>
    </PageLoader>
  );
};

export default Page;
