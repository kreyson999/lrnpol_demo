import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import EditMenu from '../../editorComponents/EditMenu';

import { CourseContentSectionProps } from '../../../types/sections/CourseContentSectionProps';
import { getFormattedDuration } from '@/helpers/getFormattedDuration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MovieIcon from '@mui/icons-material/Movie';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';

type Props = CourseContentSectionProps & {
  onUpdate: (section: CourseContentSectionProps) => void;
};

const CourseContentSection = ({ onUpdate, ...props }: Props) => {
  const courseSections = [
    {
      title: 'Pierwsza sekcja kursu',
      steps: [
        {
          title: 'Pierwszy etap',
          duration: 300000,
        },
        {
          title: 'Drugi etap',
          duration: 300000,
        },
      ],
    },
    {
      title: 'Druga sekcja kursu',
      steps: [
        {
          title: 'Pierwszy etap',
          duration: 300000,
        },
        {
          title: 'Drugi etap',
          duration: 300000,
        },
      ],
    },
  ];

  return (
    <EditMenu
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) => onUpdate({ ...props, backgroundColor: value }),
        },
      ]}
      id="featuresSectionBackgroundMenu"
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
                  value: props.courseContent.titleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      courseContent: {
                        ...props.courseContent,
                        titleTextColor: value,
                      },
                    }),
                },
                {
                  title: 'Tekst',
                  type: 'text',
                  value: props.courseContent.title,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      courseContent: { ...props.courseContent, title: value },
                    }),
                },
              ]}
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.courseContent.titleTextColor }}
                className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
              >
                {props.courseContent.title}
              </Typography>
            </EditMenu>

            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.courseContent.subtitleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      courseContent: {
                        ...props.courseContent,
                        subtitleTextColor: value,
                      },
                    }),
                },
                {
                  title: 'Tekst',
                  type: 'text',
                  value: props.courseContent.subtitle,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      courseContent: {
                        ...props.courseContent,
                        subtitle: value,
                      },
                    }),
                },
              ]}
              className="tw-mt-4"
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.courseContent.subtitleTextColor }}
                className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg  xl:tw-text-xl   tw-text-secondary-main"
              >
                {props.courseContent.subtitle}
              </Typography>
            </EditMenu>
          </Box>

          <Container
            maxWidth="sm"
            className="xl:tw-col-start-2 tw-col-span-8 tw-mt-8 tw-flex tw-flex-col tw-space-y-4 tw-px-0 tw-w-full"
          >
            {courseSections.map((section, index) => {
              return (
                <EditMenu
                  key={index}
                  inputs={[
                    {
                      title: 'Tło sekcji',
                      value: props.courseContent.sectionTitleBackgroundColor,
                      onChange: (value) =>
                        onUpdate({
                          ...props,
                          courseContent: {
                            ...props.courseContent,
                            sectionTitleBackgroundColor: value,
                          },
                        }),
                    },
                    {
                      title: 'Kolor tytułu',
                      value: props.courseContent.sectionTitleTextColor,
                      onChange: (value) =>
                        onUpdate({
                          ...props,
                          courseContent: {
                            ...props.courseContent,
                            sectionTitleTextColor: value,
                          },
                        }),
                    },
                    {
                      title: 'Kolor strzałki',
                      value: props.courseContent.sectionArrowTextColor,
                      onChange: (value) =>
                        onUpdate({
                          ...props,
                          courseContent: {
                            ...props.courseContent,
                            sectionArrowTextColor: value,
                          },
                        }),
                    },
                    {
                      title: 'Kolor obramowania',
                      value: props.courseContent.sectionBorderColor,
                      onChange: (value) =>
                        onUpdate({
                          ...props,
                          courseContent: {
                            ...props.courseContent,
                            sectionBorderColor: value,
                          },
                        }),
                    },
                  ]}
                  className="tw-flex tw-flex-col"
                  id="featuresSectionBackgroundMenu"
                >
                  <Box
                    className="tw-border-2 tw-rounded-lg tw-overflow-hidden"
                    sx={{
                      borderColor: props.courseContent.sectionBorderColor,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          props.courseContent.sectionTitleBackgroundColor,
                      }}
                      className={`tw-flex tw-justify-between tw-p-4`}
                    >
                      <Typography
                        className="tw-font-bold"
                        sx={{
                          color: props.courseContent.sectionTitleTextColor,
                        }}
                      >
                        {index + 1}. {section.title}
                      </Typography>
                      <Box
                        sx={{
                          color: props.courseContent.sectionArrowTextColor,
                        }}
                      >
                        <KeyboardArrowDownIcon className={`tw-text-2xl`} />
                      </Box>
                    </Box>
                    {section.steps.map((step, stepIndex) => {
                      return (
                        <EditMenu
                          key={`section_${index}_step_${stepIndex}`}
                          inputs={[
                            {
                              title: 'Tło',
                              value: props.courseContent.stepBackgroundColor,
                              onChange: (value) =>
                                onUpdate({
                                  ...props,
                                  courseContent: {
                                    ...props.courseContent,
                                    stepBackgroundColor: value,
                                  },
                                }),
                            },
                            {
                              title: 'Kolor linii oddzielającej',
                              value: props.courseContent.stepsDividerColor,
                              onChange: (value) =>
                                onUpdate({
                                  ...props,
                                  courseContent: {
                                    ...props.courseContent,
                                    stepsDividerColor: value,
                                  },
                                }),
                            },
                            {
                              title: 'Kolor ikony',
                              value: props.courseContent.stepIconColor,
                              onChange: (value) =>
                                onUpdate({
                                  ...props,
                                  courseContent: {
                                    ...props.courseContent,
                                    stepIconColor: value,
                                  },
                                }),
                            },
                            {
                              title: 'Kolor tytułu',
                              value: props.courseContent.stepTextColor,
                              onChange: (value) =>
                                onUpdate({
                                  ...props,
                                  courseContent: {
                                    ...props.courseContent,
                                    stepTextColor: value,
                                  },
                                }),
                            },
                            {
                              title: 'Kolor długości',
                              value: props.courseContent.stepDurationColor,
                              onChange: (value) =>
                                onUpdate({
                                  ...props,
                                  courseContent: {
                                    ...props.courseContent,
                                    stepDurationColor: value,
                                  },
                                }),
                            },
                          ]}
                          className="last:tw-border-b-0 last:tw-rounded-b-lg"
                          id="featuresSectionBackgroundMenu"
                        >
                          <Box
                            sx={{
                              borderColor:
                                props.courseContent.stepsDividerColor,
                              backgroundColor:
                                props.courseContent.stepBackgroundColor,
                            }}
                            className={`tw-border-t   tw-px-4 tw-py-3 tw-flex tw-items-center tw-gap-2 `}
                          >
                            <Box
                              sx={{
                                color: props.courseContent.stepIconColor,
                              }}
                            >
                              <MovieIcon className={`tw-text-lg `} />
                            </Box>

                            <Box className="tw-flex tw-w-full  tw-justify-between tw-items-center">
                              <Typography
                                sx={{
                                  color: props.courseContent.stepTextColor,
                                }}
                              >
                                {step.title}
                              </Typography>

                              <Typography
                                sx={{
                                  color: props.courseContent.stepDurationColor,
                                }}
                                className={`tw-flex tw-items-center tw-text-xs`}
                              >
                                <ScheduleRoundedIcon className="tw-text-sm tw-mr-1" />
                                {getFormattedDuration(step.duration)}
                              </Typography>
                            </Box>
                          </Box>
                        </EditMenu>
                      );
                    })}
                  </Box>
                </EditMenu>
              );
            })}
          </Container>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default CourseContentSection;
