import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import React from 'react';
import EditMenu from '../../editorComponents/EditMenu';

import { RecommendedCoursesSectionProps } from '../../../types/sections/RecommendedCoursesSectionProps.ts';
import Image from 'next/image';
import CourseRecommendationsModal from '../../editorComponents/CourseRecommendationsModal';

type Props = RecommendedCoursesSectionProps & {
  onUpdate: (section: RecommendedCoursesSectionProps) => void;
};

const RecommendedCoursesSection = ({ onUpdate, ...props }: Props) => {
  return (
    <EditMenu
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) => onUpdate({ ...props, backgroundColor: value }),
        },
      ]}
      id="recommendedCoursesSectionBackgroundMenu"
    >
      <Box
        sx={{ backgroundColor: props.backgroundColor }}
        component={'section'}
      >
        <Container
          maxWidth="xl"
          className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
        >
          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center tw-text-center">
            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.recommendedCourses.titleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      recommendedCourses: {
                        ...props.recommendedCourses,
                        titleTextColor: value,
                      },
                    }),
                },
              ]}
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.recommendedCourses.titleTextColor }}
                className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
              >
                Zobacz też to!
              </Typography>
            </EditMenu>

            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.recommendedCourses.subtitleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      recommendedCourses: {
                        ...props.recommendedCourses,
                        subtitleTextColor: value,
                      },
                    }),
                },
              ]}
              className="tw-mt-4"
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.recommendedCourses.subtitleTextColor }}
                className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg  xl:tw-text-xl tw-text-secondary-main"
              >
                Kursy, który mogą Ci się spodobać znajdziesz poniżej!
              </Typography>
            </EditMenu>
          </Box>

          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center tw-gap-24 lg:tw-gap-24 tw-mt-12">
            <Card
              elevation={0}
              className={`tw-max-w-[350px] tw-drop-shadow-lg tw-bg-transparent tw-rounded-xl  tw-flex tw-flex-col`}
            >
              <CardMedia sx={{ position: 'relative' }}>
                <Image
                  className="tw-rounded-xl "
                  src="/assets/course_empty_image.png"
                  width={640}
                  height={360}
                  alt={`Zdjęcie kursu `}
                  style={{ objectFit: 'cover' }}
                />
              </CardMedia>
              <CardContent>
                <EditMenu
                  inputs={[
                    {
                      title: 'Kolor',
                      value: props.recommendedCourses.courseTitleTextColor,
                      onChange: (value) =>
                        onUpdate({
                          ...props,
                          recommendedCourses: {
                            ...props.recommendedCourses,
                            courseTitleTextColor: value,
                          },
                        }),
                    },
                  ]}
                  id="featuresSectionBackgroundMenu"
                >
                  <Typography
                    sx={{
                      color: props.recommendedCourses.courseTitleTextColor,
                    }}
                    className="tw-text-xl tw-text-center tw-font-extrabold"
                  >
                    Tytuł kursu
                  </Typography>
                </EditMenu>
              </CardContent>
            </Card>
          </Box>
          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-mx-auto">
            <CourseRecommendationsModal
              courseSlugs={props.recommendedCourses.courseSlugs}
              onSaveCourseSlugs={(courseSlugs) =>
                onUpdate({
                  ...props,
                  recommendedCourses: {
                    ...props.recommendedCourses,
                    courseSlugs,
                  },
                })
              }
            />
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default RecommendedCoursesSection;
