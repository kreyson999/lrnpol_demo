'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';

import {
  DashboardCourseSections,
  DashboardCourseSectionStep,
} from '@/services/graphql/course/contentSection/types';

import { useErrorState } from '@/contexts/ErrorContext';
import { parseError } from '@/helpers/parseError';

import ContentSectionModal from './ContentSectionModal';
import ContentSection from './ContentSection';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import PageLoader from '@/components/shared/PageLoader';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { UpdateCourseSectionInput } from '@/services/API';
import { useFetchedCourse } from '../../CourseContext';
import { UpdateSection } from '@/services/graphql/course/contentSection/mutations';
import { generateClient } from 'aws-amplify/api';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/materialUI/Button';
import { getDashboardCourseSectionsWithSteps } from '@/services/graphql/course/contentSection/queries';

type Props = {
  params: {
    slug: string;
  };
};

const CourseContent = ({ params }: Props) => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();
  const { course } = useFetchedCourse();

  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<DashboardCourseSections[]>([]);
  const [isSectionModalOpen, toggleSectionModal, sectionModalState] = useModal<{
    id?: string;
    title?: string;
    position?: number;
  }>({});

  type SectionInput = {
    id: string;
    position: number;
  };

  const handleUpdateSection = async (section: SectionInput) => {
    const client = generateClient({ authMode: 'userPool' });

    const input: UpdateCourseSectionInput = {
      id: section.id,
      position: section.position,
    };
    const { errors } = await client.graphql({
      query: UpdateSection,
      variables: { input },
    });
    if (errors) throw parseError(errors.map((error) => error.message));
  };

  const handleUpdateSectionPosition = (
    updatedSections: DashboardCourseSections[]
  ) => {
    const changedSections: { id: string; position: number }[] = [];
    updatedSections.forEach((section, index) => {
      if (section.id !== sections[index].id) {
        changedSections.push({ id: section.id, position: index });
      }
    });

    Promise.all(changedSections.map(handleUpdateSection))
      .then(() => {
        showSnackbar('Pomyślnie zaktualizowano pozycje sekcji.');
      })
      .catch((error) => {
        console.error(error);
      });

    setSections(updatedSections);
  };

  const handleUpdateStepsPositions = (
    sectionId: string,
    steps: DashboardCourseSectionStep[]
  ) => {
    setSections((state) =>
      state.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            courseSectionSteps: {
              ...section.courseSectionSteps,
              items: steps,
            },
          };
        }
        return section;
      })
    );
  };

  const fetchCourseSections = useCallback(
    async (slug: string) => {
      try {
        const client = generateClient({ authMode: 'userPool' });

        const { data, errors } = await client.graphql({
          query: getDashboardCourseSectionsWithSteps,
          variables: {
            filter: {
              courseCourseSectionsSlug: {
                eq: slug,
              },
            },
          },
        });
        if (errors) throw parseError(errors.map((error) => error.message));
        setSections(
          data.listCourseSections.items
            .sort((a, b) => (a.position > b.position ? 1 : -1))
            .map((section) => {
              return {
                ...section,
                courseSectionSteps: {
                  items: section.courseSectionSteps!.items.sort((a, b) =>
                    a!.position > b!.position ? 1 : -1
                  ),
                },
              };
            })
        );
      } catch (errors) {
        setErrorMessage(errors as string);
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorMessage]
  );

  const handleFetchCourses = useCallback(() => {
    setIsLoading(true);
    void fetchCourseSections(params.slug);
  }, [fetchCourseSections, params.slug]);

  useEffect(() => {
    if (course === null) return;
    handleFetchCourses();
  }, [handleFetchCourses, course]);

  return (
    <MBox className="tw-pt-4 tw-px-4 md:tw-px-0 tw-mb-16">
      <ContentSectionModal
        isOpen={isSectionModalOpen}
        {...sectionModalState}
        onRefresh={handleFetchCourses}
        onClose={() => toggleSectionModal(null)}
      />

      <Button
        primary
        onClick={() => toggleSectionModal(null, { position: sections.length })}
        className="tw-w-min tw-whitespace-nowrap"
      >
        Dodaj sekcję
      </Button>
      <PageLoader isLoading={isLoading}>
        <MBox className="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
          {sections.length === 0 ? (
            <MTypography className="tw-text-secondary-contrastText">
              Nie dodano jeszcze żadnych sekcji!
            </MTypography>
          ) : (
            <Reorder.Group
              values={sections}
              onReorder={handleUpdateSectionPosition}
            >
              {sections.map((section, index) => (
                <ContentSection
                  courseSlug={params.slug}
                  index={index + 1}
                  key={section.title}
                  value={section}
                  toggleSectionModal={toggleSectionModal}
                  refreshAllSections={handleFetchCourses}
                  updateStepsPositions={handleUpdateStepsPositions}
                />
              ))}
            </Reorder.Group>
          )}
        </MBox>
      </PageLoader>
    </MBox>
  );
};

export default CourseContent;
