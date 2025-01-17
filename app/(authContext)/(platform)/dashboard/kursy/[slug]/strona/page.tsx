'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'next/navigation';

import { useFetchedCourse } from '../CourseContext';
import PageLoader from '@/components/shared/PageLoader';
import { useErrorState } from '@/contexts/ErrorContext';

import AppBar from './components/pageComponents/AppBar';
import { Box, IconButton, Typography } from '@mui/material';
import Header from './components/pageComponents/Header';
import FixedCard from './components/pageComponents/FixedCard';
import FeaturesSection from './components/pageComponents/sections/FeaturesSection';
import AddLandingSectionModal from './components/editorComponents/AddLandingSectionModal';
import { getCourseLandingPageWithSections } from '@/services/graphql/course/landingPage/queries';
import Button from '@/components/materialUI/Button';
import Link from 'next/link';
import { AppBarProps } from './types/AppBarProps';
import { HeaderProps } from './types/HeaderProps';
import { FixedCardProps } from './types/FixedCardProps';
import { Sections } from './types/sections/Sections';
import AboutCourseSection from './components/pageComponents/sections/AboutCourseSection';
import SubjectsSection from './components/pageComponents/sections/SubjectsSection';
import CourseContentSection from './components/pageComponents/sections/CourseContentSection';
import { updateLandingPageWithSections } from '@/services/graphql/course/landingPage/mutations';
import {
  CourseLandingPageAppBarInput,
  CourseLandingPageFixedCardInput,
  CourseLandingPageSectionInput,
  CourseLandingPageSectionSubjectsSubjectInput,
  GetCourseLandingPageWithSectionsQuery,
  UpdateLandingPageWithSectionsMutation,
} from '@/services/API';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { uploadData } from 'aws-amplify/storage';
import { getSignedImageURL } from '@/helpers/getSignedImageURL';
import Footer from './components/pageComponents/Footer';
import { FooterProps } from './types/FooterProps';
import PageSettingsModal from './components/editorComponents/PageSettingsModal';
import RecommendedCoursesSection from './components/pageComponents/sections/RecommendedCoursesSection';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type Props = {
  params: {
    slug: string;
  };
};

const CourseLandingPageEditor = ({ params: { slug } }: Props) => {
  const { course } = useFetchedCourse();
  const setErrorMessage = useErrorState();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [isSaving, setIsSaving] = useState(false);

  const [appBar, setAppBar] = useState<AppBarProps>();

  const [header, setHeader] = useState<HeaderProps>();

  const [footer, setFooter] = useState<FooterProps>();

  const [fixedCard, setFixedCard] = useState<FixedCardProps>();

  const [sections, setSections] = useState<Sections[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddSection = (section: Sections) => {
    setSections((state) => [...state, section]);
  };

  const handleUpdateSection = (index: number, section: Sections) => {
    setSections((state) => {
      const copySections = [...state];
      copySections[index] = section;
      return copySections;
    });
  };

  const handleUpdateLandingPageState = async (
    data:
      | GetCourseLandingPageWithSectionsQuery['getCourseLandingPage']
      | UpdateLandingPageWithSectionsMutation['updateCourseLandingPage']
  ): Promise<void> => {
    const { appBar, header, fixedCard, sections, footer } = data!;

    setAppBar({
      ...appBar,
      logo: appBar.logoKey ? await getSignedImageURL(appBar.logoKey) : null,
    });
    setHeader(header);
    setFooter(footer);

    setFixedCard({
      ...fixedCard,
      image: fixedCard.imageKey
        ? await getSignedImageURL(fixedCard.imageKey)
        : null,
    });

    const sectionsFromDb = await Promise.all(
      (sections ?? [])
        .filter((section) => section !== null)
        .map(async (section) => {
          if ('subjects' in section! && section.subjects) {
            return {
              ...section,
              subjects: {
                ...section.subjects,
                subjects: await Promise.all(
                  section.subjects.subjects?.map(async (subject) => {
                    return {
                      ...subject,
                      image: subject?.imageKey
                        ? await getSignedImageURL(subject?.imageKey)
                        : null,
                    };
                  }) ?? []
                ),
              },
            } as unknown as Sections;
          }
          return section as unknown as Sections;
        })
    );

    setSections(sectionsFromDb);
  };

  const fetchCourseLandingPage = useCallback(
    (id: string) => {
      const client = generateClient();

      client
        .graphql({
          query: getCourseLandingPageWithSections,
          variables: { id },
        })
        .then((response) => {
          if (!response.data.getCourseLandingPage) {
            router.push(`/dashboard/kursy/${course!.slug}`);
            return;
          }
          void handleUpdateLandingPageState(response.data.getCourseLandingPage);
        })
        .catch(() => {
          setErrorMessage(`Nie udało się pobrać strony sprzedażowej kursu!`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setErrorMessage, course, router]
  );

  const handleUploadImage = useCallback(
    async (file: File, fileName: string): Promise<string> => {
      const extension = file.name.split('.').at(-1);
      // get the file extension from the end of the file name
      const result = await uploadData({
        key: `${course!.slug}/landing_page/assets/${fileName}.${extension}`,
        data: file,
        options: {
          contentType: file.type,
        },
      }).result;

      return result.key;
    },
    [course]
  );

  const handleSaveCourseLandingPage = async () => {
    const client = generateClient();

    const { logo, ...appBarInput } = appBar!;
    const { image, ...fixedCardInput } = fixedCard!;

    const appBarToDb: CourseLandingPageAppBarInput = {
      ...appBarInput,
    };

    const imageToDb: CourseLandingPageFixedCardInput = {
      ...fixedCardInput,
    };

    const sectionsToDb: CourseLandingPageSectionInput[] = await Promise.all(
      sections.map(async (section) => {
        if ('subjects' in section && section.subjects) {
          return {
            ...section,
            subjects: {
              ...section.subjects,
              subjects: await Promise.all(
                section.subjects.subjects.map(async (subject, index) => {
                  const { image, ...rest } = subject;

                  const subjectToDb: CourseLandingPageSectionSubjectsSubjectInput =
                    { ...rest };
                  if (image instanceof File) {
                    subjectToDb.imageKey = await handleUploadImage(
                      image,
                      `image_${index}`
                    );
                  }
                  return subjectToDb;
                })
              ),
            },
          };
        }
        return section;
      })
    );

    if (image instanceof File) {
      imageToDb.imageKey = await handleUploadImage(image, 'image');
    }

    if (logo instanceof File) {
      appBarToDb.logoKey = await handleUploadImage(logo, 'logo');
    }

    try {
      const response = await client.graphql({
        query: updateLandingPageWithSections,
        variables: {
          input: {
            id: course!.courseCourseLandingPageId!,
            appBar: appBarToDb,
            header: header,
            footer: footer,
            fixedCard: imageToDb,
            sections: sectionsToDb,
          },
        },
      });
      showSnackbar('Pomyślnie zapisano stronę sprzedażową kursu!');
      void handleUpdateLandingPageState(response.data.updateCourseLandingPage);
    } catch (error) {
      setErrorMessage('Nie udało się zapisać strony sprzedażowej!');
    } finally {
      setIsSaving(false);
    }
  };

  const onCourseLandingPageSave = () => {
    setIsSaving(true);
    void handleSaveCourseLandingPage();
  };

  useEffect(() => {
    if (!course) return;
    const landingPageId = course.courseCourseLandingPageId;
    if (landingPageId) {
      fetchCourseLandingPage(landingPageId);
    } else {
      setErrorMessage('Ten kurs nie ma utworzonej strony sprzedażowej!');
      router.push(`/dashboard/kursy/${slug}`);
    }
  }, [setErrorMessage, slug, course, fetchCourseLandingPage, router]);

  return (
    <Box className="tw-flex tw-flex-col ">
      <Box className="tw-px-4 tw-py-2 tw-bg-primary-main tw-flex tw-items-center  tw-justify-between tw-gap-4">
        <Box className="tw-flex tw-items-center  tw-gap-2">
          <Link href={`/dashboard/kursy/${course!.slug}`}>
            <IconButton className="-tw-ml-2">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography className="tw-text-primary-contrastText tw-text-xl ">
            Edytujesz stronę kursu: {course?.title ?? 'Błąd wczytywania kursu'}
          </Typography>
        </Box>
        <Box className="tw-flex tw-gap-4 tw-items-center">
          <PageSettingsModal />
          <Button
            isLoading={isSaving}
            onClick={onCourseLandingPageSave}
            className="tw-w-min "
          >
            Zapisz
          </Button>
        </Box>
      </Box>
      <PageLoader isLoading={isLoading}>
        {appBar && (
          <AppBar
            {...appBar}
            setAppBar={
              setAppBar as React.Dispatch<React.SetStateAction<AppBarProps>>
            }
          />
        )}

        {header && (
          <Header
            {...header}
            setHeader={
              setHeader as React.Dispatch<React.SetStateAction<HeaderProps>>
            }
          >
            {fixedCard && (
              <FixedCard
                {...fixedCard}
                setFixedCard={
                  setFixedCard as React.Dispatch<
                    React.SetStateAction<FixedCardProps>
                  >
                }
              />
            )}
          </Header>
        )}

        {sections.map((section, index) => {
          if ('features' in section && section.features) {
            return (
              <FeaturesSection
                key={index}
                {...section}
                onUpdate={(value) => handleUpdateSection(index, value)}
              />
            );
          }
          if ('aboutCourse' in section && section.aboutCourse) {
            return (
              <AboutCourseSection
                key={index}
                {...section}
                onUpdate={(value) => handleUpdateSection(index, value)}
              />
            );
          }
          if ('subjects' in section && section.subjects) {
            return (
              <SubjectsSection
                key={index}
                {...section}
                onUpdate={(value) => handleUpdateSection(index, value)}
              />
            );
          }
          if ('courseContent' in section && section.courseContent) {
            return (
              <CourseContentSection
                key={index}
                {...section}
                onUpdate={(value) => handleUpdateSection(index, value)}
              />
            );
          }
          if ('recommendedCourses' in section && section.recommendedCourses) {
            return (
              <RecommendedCoursesSection
                key={index}
                {...section}
                onUpdate={(value) => handleUpdateSection(index, value)}
              />
            );
          }
        })}
        <Box className="tw-self-center tw-my-4">
          <AddLandingSectionModal onSectionAdd={handleAddSection} />
        </Box>
        {footer && (
          <Footer
            {...footer}
            setFooter={
              setFooter as React.Dispatch<React.SetStateAction<FooterProps>>
            }
          />
        )}
      </PageLoader>
    </Box>
  );
};

export default CourseLandingPageEditor;
