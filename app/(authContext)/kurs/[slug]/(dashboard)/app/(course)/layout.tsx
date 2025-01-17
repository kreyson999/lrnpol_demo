'use client';

import React, { useCallback, useEffect, useState } from 'react';

import MBox from '@mui/material/Box';
import PageLoader from '@/components/shared/PageLoader';
import * as queries from '@/services/graphql/course/contentSection/queries';
import { parseError } from '@/helpers/parseError';
import { useErrorState } from '@/contexts/ErrorContext';
import { CourseSectionWithStepsAndStepVideos } from '@/services/graphql/course/contentSection/types';
import ContentSection from './ContentSection';
import ContentSectionStep from './ContentSectionStep';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useWindowSize } from '@/hooks/useWindowSize';
import { generateClient } from 'aws-amplify/api';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const CourseDashboardLayout = ({ children, params: { slug } }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitalized] = useState(false);
  const auth = useAuth();
  const setErrorMessage = useErrorState();
  const pathname = usePathname();
  const router = useRouter();
  const [width, height] = useWindowSize();

  const [sections, setSections] = useState<
    CourseSectionWithStepsAndStepVideos[]
  >([]);

  const getIsSectionCompleted = (
    steps: CourseSectionWithStepsAndStepVideos['courseSectionSteps']
  ) => {
    if (!steps?.items) return false;

    return (
      steps?.items.reduce((prev, curr) => {
        const progressItem = curr?.userCourseStepProgress?.items[0];
        const progressDuration = progressItem ? progressItem.durationInMs : 0;

        if (!curr || !curr.courseSectionStepVideo) {
          return prev;
        }
        return prev + progressDuration / curr.courseSectionStepVideo.duration;
      }, 0) >
      steps.items.length - steps.items.length * 0.08
    );
  };

  const fetchCourse = useCallback(async () => {
    try {
      const client = generateClient({ authMode: 'userPool' });
      const { data, errors } = await client.graphql({
        query: queries.getCourseSectionsWithStepsAndStepVideos,
        variables: {
          filter: {
            courseCourseSectionsSlug: {
              eq: slug,
            },
          },
        },
      });

      setSections(
        data.listCourseSections.items.sort((a, b) =>
          a.position > b.position ? 1 : -1
        )
      );

      setIsInitalized(false);

      if (errors) throw parseError(errors.map((error) => error.message));
    } catch (errors) {
      setErrorMessage(String(errors));
      setIsLoading(false);
    }
  }, [slug, setErrorMessage]);

  const routeToFirstStep = useCallback(() => {
    const allSteps = sections.reduce((prev, curr) => {
      if (!curr.courseSectionSteps) return prev;
      return [
        ...prev,
        ...curr.courseSectionSteps.items
          .sort((a, b) => a!.position - b!.position)
          .map((step) => ({
            id: step!.id,
          })),
      ];
    }, [] as { id: string }[]);

    if (allSteps.length > 0) {
      router.replace(`/app/etap/${allSteps[0].id}`);
    }
  }, [sections, router]);

  useEffect(() => {
    if (sections.length > 0 && !pathname.includes('etap')) {
      routeToFirstStep();
    } else {
      setIsLoading(false);
    }
  }, [pathname, slug, sections, routeToFirstStep]);

  useEffect(() => {
    if (auth.user && !isInitialized) {
      void fetchCourse();
    }
  }, [fetchCourse, auth, isInitialized]);

  return (
    <PageLoader isLoading={isLoading}>
      <MBox className="tw-grow tw-flex tw-flex-col lg:tw-grid lg:tw-grid-cols-5">
        <MBox
          sx={(theme) => ({
            borderRight: '1px solid',
            borderImageSlice: 1,
            maxHeight: width > 1024 ? height - 65 - 57 : 'unset',
            borderImageSource:
              'linear-gradient(180deg, #1A151F 1%, #1A151F 1.01%, #5F5767 51%, #1A151F 100%)',
            ['::-webkit-scrollbar']: {
              width: '5px',
            },
            ['::-webkit-scrollbar-thumb']: {
              backgroundColor: theme.palette.primary.light,
              borderRadius: '1rem',
            },
            ['::-webkit-scrollbar-thumb:hover']: {
              backgroundColor: theme.palette.primary.main,
            },
          })}
          className="tw-overflow-y-scroll tw-overflow-x-hidden tw-grow tw-order-2 lg:tw-order-1 lg:tw-col-span-1  tw-flex tw-flex-col"
        >
          {sections.map((section, index) => (
            <ContentSection
              key={section.id}
              index={index + 1}
              title={section.title}
              length={section.courseSectionSteps?.items.length ?? 0}
              isCompleted={getIsSectionCompleted(section.courseSectionSteps)}
            >
              {section.courseSectionSteps?.items
                .filter((step) => step !== null)
                .sort((a, b) => (a!.position > b!.position ? 1 : -1))
                .map((step) => (
                  <ContentSectionStep
                    key={step!.id}
                    id={step!.id}
                    title={step!.title}
                    type={step!.type}
                    videoDuration={step!.courseSectionStepVideo?.duration ?? 0}
                    progressDuration={
                      step!.userCourseStepProgress?.items[0]?.durationInMs ?? 0
                    }
                    isSectionCompleted={getIsSectionCompleted(
                      section.courseSectionSteps
                    )}
                  />
                ))}
            </ContentSection>
          ))}
        </MBox>
        <MBox className="tw-flex tw-flex-col lg:tw-grow tw-order-1 lg:tw-order-2 lg:tw-col-span-4">
          {children}
        </MBox>
      </MBox>
    </PageLoader>
  );
};

export default CourseDashboardLayout;
