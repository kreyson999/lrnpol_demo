import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import EditMenu from '../../editorComponents/EditMenu';

import {
  SubjectsSectionProps,
  SubjectsSubjectSectionProps,
} from '../../../types/sections/SubjectsSectionProps';
import Button from '@/components/materialUI/Button';
import SubjectInSubjectsSection from './SubjectInSubjectsSection';

type Props = SubjectsSectionProps & {
  onUpdate: (section: SubjectsSectionProps) => void;
};

const SubjectsSection = ({ onUpdate, ...props }: Props) => {
  const handleAddSubject = () => {
    const newSubject: SubjectsSubjectSectionProps = {
      indexColor: '#67A1F2',
      title: `Temat nr. ${props.subjects.subjects.length + 1}`,
      titleTextColor: '#242424',
      content: 'Tutaj wpisz opis tematu.',
      contentTextColor: '#242424',
      image: null,
      imageBoxColor: '#67A1F2',
    };

    onUpdate({
      ...props,
      subjects: {
        ...props.subjects,
        subjects: [...props.subjects.subjects, newSubject],
      },
    });
  };

  const handleUpdateSubject = (
    index: number,
    subject: SubjectsSubjectSectionProps
  ) => {
    const copyOfSubjects = [...props.subjects.subjects];
    copyOfSubjects[index] = subject;
    onUpdate({
      ...props,
      subjects: {
        ...props.subjects,
        subjects: copyOfSubjects,
      },
    });
  };

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
                  value: props.subjects.titleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      subjects: {
                        ...props.subjects,
                        titleTextColor: value,
                      },
                    }),
                },
                {
                  title: 'Tekst',
                  type: 'text',
                  value: props.subjects.title,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      subjects: { ...props.subjects, title: value },
                    }),
                },
              ]}
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.subjects.titleTextColor }}
                className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
              >
                {props.subjects.title}
              </Typography>
            </EditMenu>

            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.subjects.subtitleTextColor,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      subjects: {
                        ...props.subjects,
                        subtitleTextColor: value,
                      },
                    }),
                },
                {
                  title: 'Tekst',
                  type: 'text',
                  value: props.subjects.subtitle,
                  onChange: (value) =>
                    onUpdate({
                      ...props,
                      subjects: { ...props.subjects, subtitle: value },
                    }),
                },
              ]}
              className="tw-mt-4"
              id="featuresSectionBackgroundMenu"
            >
              <Typography
                sx={{ color: props.subjects.subtitleTextColor }}
                className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg  xl:tw-text-xl tw-text-secondary-main"
              >
                {props.subjects.subtitle}
              </Typography>
            </EditMenu>
          </Box>

          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-gap-24 lg:tw-gap-24 tw-mt-12">
            {props.subjects.subjects.map((subject, index) => (
              <SubjectInSubjectsSection
                key={index}
                {...subject}
                index={index}
                onUpdate={(updatedSubject) =>
                  handleUpdateSubject(index, updatedSubject)
                }
              />
            ))}
          </Box>
          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-mx-auto">
            <Button onClick={handleAddSubject}>Dodaj temat</Button>
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default SubjectsSection;
