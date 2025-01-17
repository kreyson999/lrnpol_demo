import React from 'react';
import Image from 'next/image';
import { SubjectsSubjectSectionProps } from '../../../types/sections/SubjectsSectionProps';
import { Box, Typography } from '@mui/material';

import FileInput from '@/components/shared/FileInput';
import { getLocalImageURL } from '@/helpers/getLocalImageURL';
import { onInputFileChange } from '@/helpers/onInputFileChange';
import EditMenu from '../../editorComponents/EditMenu';

type Props = SubjectsSubjectSectionProps & {
  index: number;
  onUpdate: (subject: SubjectsSubjectSectionProps) => void;
};

const SubjectInSubjectsSection = ({ onUpdate, index, ...subject }: Props) => {
  return (
    <Box className="tw-mx-auto w-max-w-screen-md lg:tw-max-w-screen-lg xl:tw-max-w-screen-xl  tw-flex tw-flex-col  md:tw-grid md:tw-grid-cols-2 tw-gap-8 xl:tw-gap-12">
      <Box
        className={`${
          index % 2 === 0 ? 'md:tw-order-1' : ''
        } tw-text-center md:tw-text-left tw-flex tw-flex-col md:tw-justify-center`}
      >
        <EditMenu
          inputs={[
            {
              title: 'Kolor',
              value: subject.indexColor,
              onChange: (value) =>
                onUpdate({
                  ...subject,
                  indexColor: value,
                }),
            },
          ]}
          id="appBarBackgroundEditMenu"
        >
          <Typography
            sx={{
              color: subject.indexColor,
            }}
            className={'tw-text-6xl  xl:tw-text-7xl '}
          >
            0{index + 1}
          </Typography>
        </EditMenu>

        <EditMenu
          inputs={[
            {
              title: 'Kolor',
              value: subject.titleTextColor,
              onChange: (value) =>
                onUpdate({
                  ...subject,
                  titleTextColor: value,
                }),
            },
            {
              title: 'Tekst',
              value: subject.title,
              type: 'text',
              onChange: (value) =>
                onUpdate({
                  ...subject,
                  title: value,
                }),
            },
          ]}
          className="tw-mt-4 "
          id="appBarBackgroundEditMenu"
        >
          <Typography
            sx={{
              color: subject.titleTextColor,
            }}
            className={
              ' tw-font-bold tw-text-4xl  xl:tw-text-5xl 2xl:tw-text-6xl'
            }
          >
            {subject.title}
          </Typography>
        </EditMenu>

        <EditMenu
          inputs={[
            {
              title: 'Kolor',
              value: subject.contentTextColor,
              onChange: (value) =>
                onUpdate({
                  ...subject,
                  contentTextColor: value,
                }),
            },
            {
              title: 'Tekst',
              value: subject.content,
              type: 'text',
              onChange: (value) =>
                onUpdate({
                  ...subject,
                  content: value,
                }),
            },
          ]}
          className="tw-mt-2 md:tw-mt-4 xl:tw-mt-8"
          id="appBarBackgroundEditMenu"
        >
          <Typography
            sx={{
              color: subject.contentTextColor,
            }}
            className={
              ' tw-text-xl lg:tw-text-lg  xl:tw-text-xl 2xl:tw-text-2xl'
            }
          >
            {subject.content}
          </Typography>
        </EditMenu>
      </Box>
      <Box
        className={`${
          index % 2 === 1 ? 'tw-pr-4' : 'tw-pl-4'
        }  tw-mt-12 tw-max-w-[400px] md:tw-max-w-[unset]`}
      >
        <Box className="tw-flex tw-flex-col  tw-relative tw-aspect-square">
          <Box
            className={`tw-relative tw-z-40 tw-grow tw-flex tw-flex-col tw-h-full tw-overflow-hidden  ${
              subject.image
                ? index % 2 === 1
                  ? 'tw-rounded-tr-[3rem] tw-rounded-bl-[3rem]'
                  : 'tw-rounded-br-[3rem] tw-rounded-tl-[3rem]'
                : ''
            } `}
          >
            <FileInput
              onClick={(e) => e.stopPropagation()}
              name={`subject_image_${index}`}
              accept="image/png, image/jpeg"
              onChange={(e) =>
                onInputFileChange(e, (file) =>
                  onUpdate({
                    ...subject,
                    image: file,
                  })
                )
              }
            >
              {subject.image ? (
                <Image
                  src={getLocalImageURL(subject.image)}
                  alt={`Zdjęcie tematu: ${subject.title}`}
                  width={600}
                  height={600}
                  className="tw-h-full tw-object-cover"
                />
              ) : (
                <Box className="tw-py-2 tw-h-full tw-text-center tw-border-2  tw-border-dashed tw-border-primary-main">
                  <Typography>Zdjęcie tematu</Typography>
                </Box>
              )}
            </FileInput>
          </Box>

          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: subject.imageBoxColor,
                onChange: (value) =>
                  onUpdate({
                    ...subject,
                    imageBoxColor: value,
                  }),
              },
            ]}
            className={`${
              index % 2 === 0 ? '-tw-left-4' : '-tw-right-4'
            } -tw-bottom-4  tw-w-2/3 tw-h-2/3 tw-absolute`}
            id="appBarBackgroundEditMenu"
          >
            <Box
              className="tw-w-full tw-h-full"
              sx={{
                backgroundColor: subject.imageBoxColor,
              }}
            />
          </EditMenu>
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectInSubjectsSection;
