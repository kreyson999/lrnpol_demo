import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import EditMenu from '../../editorComponents/EditMenu';

import { AboutCourseSectionProps } from '../../../types/sections/AboutCourseSectionProps';
import { isEditorStateEmpty } from '@/helpers/isEditorStateEmpty';
import RichTextEditor from '@/components/shared/RichTextEditor';

type Props = AboutCourseSectionProps & {
  onUpdate: (section: AboutCourseSectionProps) => void;
};

const AboutCourseSection = ({ onUpdate, ...props }: Props) => {
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
                  value: props.aboutCourse.titleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      aboutCourse: {
                        ...props.aboutCourse,
                        titleTextColor: value,
                      },
                    }),
                },
                {
                  title: 'Tekst',
                  value: props.aboutCourse.title,
                  type: 'text',
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      aboutCourse: { ...props.aboutCourse, title: value },
                    }),
                },
              ]}
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.aboutCourse.titleTextColor }}
                className="tw-text-4xl sm:tw-text-5xl  tw-font-extrabold"
              >
                {props.aboutCourse.title}
              </Typography>
            </EditMenu>

            <RichTextEditor
              contentBackgroundColor={props.backgroundColor}
              onChange={(state) => {
                if (isEditorStateEmpty(state)) return;
                onUpdate({
                  ...props,
                  aboutCourse: {
                    ...props.aboutCourse,
                    content: JSON.stringify(state.toJSON()),
                  },
                });
              }}
              value={
                props.aboutCourse.content.length > 0
                  ? props.aboutCourse.content
                  : undefined
              }
              label="Tekst"
            />
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default AboutCourseSection;
