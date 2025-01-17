'use client';

import { useErrorState } from '@/contexts/ErrorContext';
import { createURLFromDomain } from '@/helpers/createURLFromDomain';
import { signAmplifyServerImage } from '@/helpers/signAmplifyServerImage';
import { CourseStatus } from '@/services/API';
import { listRecommendedCourses } from '@/services/graphql/course/queries';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { generateClient } from 'aws-amplify/api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  backgroundColor: string;
  titleTextColor: string;
  subtitleTextColor: string;
  courseTitleTextColor: string;
  courseSlugs: (string | null)[];
};

type RecommendedCourse = {
  slug: string;
  domain: string;
  title: string;
  image: string | null;
};

const RecommendedCoursesSection = (props: Props) => {
  const [courses, setCourses] = useState<RecommendedCourse[]>([]);
  const setErrorMessage = useErrorState();

  const fetchCourses = useCallback(async () => {
    try {
      const client = generateClient({ authMode: 'apiKey' });

      const result = await client.graphql({
        query: listRecommendedCourses,
        variables: {
          filter: {
            or: props.courseSlugs.map((slug) => ({
              slug: { eq: slug },
            })),
            and: [
              {
                status: { eq: CourseStatus.PUBLISHED },
              },
            ],
          },
        },
      });

      const recommendedCourses = await Promise.all(
        result.data.listCourses.items.map(
          async ({ slug, domain, title, courseLandingPage }) => {
            const imageKey = courseLandingPage?.fixedCard.imageKey ?? null;
            const image = imageKey
              ? await signAmplifyServerImage(imageKey)
              : null;

            return { slug, domain, title, image };
          }
        )
      );

      setCourses(recommendedCourses);
    } catch (error) {
      setErrorMessage(String(error));
    }
  }, [props.courseSlugs, setErrorMessage]);

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  return (
    <Box sx={{ backgroundColor: props.backgroundColor }} component={'section'}>
      <Container
        maxWidth="xl"
        className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8 tw-px-0"
      >
        <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center tw-text-center">
          <Typography
            sx={{ color: props.titleTextColor }}
            className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
          >
            Zobacz też to
          </Typography>
          <Typography
            sx={{ color: props.subtitleTextColor }}
            className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg xl:tw-text-xl  tw-mt-4 tw-text-secondary-main"
          >
            Kursy, który mogą Ci się spodobać znajdziesz poniżej!
          </Typography>
        </Box>

        <Container
          maxWidth="md"
          className="tw-overflow-hidden xl:tw-col-start-2 tw-col-span-8 tw-mt-8 tw-flex tw-flex-col tw-px-0 md:tw-px-4 tw-w-full "
        >
          <Box
            sx={{
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              ['&::-webkit-scrollbar']: {
                display: 'none',
              },
            }}
            className="tw-shrink-0 tw-flex sm:tw-grid md:tw-grid-cols-3 tw-gap-4 sm:tw-place-content-center tw-overflow-x-auto tw-pb-4 tw-snap-x tw-snap-mandatory "
          >
            {courses.map((course) => {
              return (
                <Link
                  key={course.slug}
                  href={createURLFromDomain(course.domain)}
                >
                  <Card
                    elevation={0}
                    className={`first:tw-ml-4 sm:first:tw-ml-0 last:tw-mr-4 sm:last:tw-mr-0 tw-w-[300px] md:tw-w-[unset] tw-snap-center tw-shrink-0 tw-drop-shadow-lg tw-bg-transparent tw-rounded-xl tw-flex tw-flex-col`}
                  >
                    <CardActionArea>
                      <CardMedia sx={{ position: 'relative' }}>
                        <Image
                          className="tw-rounded-xl "
                          src={course.image ?? '/assets/course_empty_image.png'}
                          width={640}
                          height={360}
                          alt={`Zdjęcie kursu: ${course.title}`}
                          style={{ objectFit: 'cover' }}
                        />
                      </CardMedia>
                      <CardContent className="tw-py-2">
                        <Typography
                          sx={{
                            color: props.courseTitleTextColor,
                          }}
                          className="tw-text-xl lg:tw-text-lg tw-text-center tw-font-extrabold"
                        >
                          {course.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              );
            })}
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default RecommendedCoursesSection;
