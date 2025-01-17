import React from 'react';
import Image from 'next/image';

import { Box, Button, Container, Typography } from '@mui/material';
import EditMenu from '../editorComponents/EditMenu';
import FileInput from '@/components/shared/FileInput';
import { getLocalImageURL } from '@/helpers/getLocalImageURL';
import { onInputFileChange } from '@/helpers/onInputFileChange';
import { AppBarProps } from '../../types/AppBarProps';

type Props = AppBarProps & {
  setAppBar: React.Dispatch<React.SetStateAction<AppBarProps>>;
};

const AppBar = ({ setAppBar, ...props }: Props) => {
  return (
    <EditMenu
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) =>
            setAppBar((state) => ({
              ...state,
              backgroundColor: value,
            })),
        },
      ]}
      id="appBarBackgroundEditMenu"
    >
      <Box
        sx={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <Container
          maxWidth="xl"
          className="lg:tw-grid lg:tw-grid-cols-12 tw-gap-8"
        >
          <Box className="lg:tw-col-span-12 xl:tw-col-span-11 xl:tw-col-start-2 tw-flex tw-justify-between tw-items-center tw-px-0 tw-py-2">
            <Box className="tw-relative">
              <FileInput
                onClick={(e) => e.stopPropagation()}
                name="logo"
                accept="image/png, image/jpeg"
                onChange={(e) =>
                  onInputFileChange(e, (file) =>
                    setAppBar({ ...props, logo: file })
                  )
                }
              >
                {props.logo ? (
                  <Box className="tw-relative -tw-left-4 tw-px-4 tw-py-2 ">
                    <Image
                      src={getLocalImageURL(props.logo)}
                      alt="Logo kursu"
                      width={200}
                      height={80}
                    />
                  </Box>
                ) : (
                  <Box className="tw-py-2 tw-min-w-[150px] tw-text-center tw-border-2 tw-border-dashed tw-border-primary-main">
                    <Typography>Logo</Typography>
                  </Box>
                )}
              </FileInput>
            </Box>

            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.watchCourseTextColor,
                  onChange: (value) =>
                    setAppBar((state) => ({
                      ...state,
                      watchCourseTextColor: value,
                    })),
                },
              ]}
              id="appBarWatchCourseButtonEditMenu"
            >
              <Button
                className={`tw-bg-transparent tw-rounded-full tw-normal-case tw-text-base`}
                sx={{
                  color: props.watchCourseTextColor,
                }}
              >
                Zaloguj się
              </Button>
            </EditMenu>
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default AppBar;
