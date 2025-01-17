import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import EditMenu from '../editorComponents/EditMenu';
import { HeaderProps } from '../../types/HeaderProps';

type Props = HeaderProps & {
  children: React.ReactNode;
  setHeader: React.Dispatch<React.SetStateAction<HeaderProps>>;
};

const Header = ({ children, setHeader, ...props }: Props) => {
  const stats = ['Sekcje', 'Etapy', 'Godziny'];

  return (
    <EditMenu
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) =>
            setHeader((state) => ({ ...state, backgroundColor: value })),
        },
      ]}
      id="headerBackgroundEditMenu"
    >
      <Box
        sx={{
          backgroundColor: props.backgroundColor,
        }}
        component={'header'}
      >
        <Container
          maxWidth="xl"
          className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
        >
          <Box className="tw-flex tw-flex-col xl:tw-col-start-2 lg:tw-col-span-8 xl:tw-col-span-8">
            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.titleColor,
                  onChange: (value) =>
                    setHeader((state) => ({ ...state, titleColor: value })),
                },
                {
                  title: 'Tekst',
                  value: props.title,
                  type: 'text',
                  onChange: (value) =>
                    setHeader((state) => ({ ...state, title: value })),
                },
              ]}
              id="headerTitleEditMenu"
            >
              <Typography
                variant="h1"
                sx={{
                  color: props.titleColor,
                }}
                className="lg:-tw-ml-1 tw-text-5xl sm:tw-text-6xl lg:tw-text-7xl xl:tw-text-8xl lg:tw-text-left tw-font-bold tw-leading-snug tw-text-center"
              >
                {props.title}
              </Typography>
            </EditMenu>
            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.subtitleColor,
                  onChange: (value) =>
                    setHeader((state) => ({ ...state, subtitleColor: value })),
                },
                {
                  title: 'Tekst',
                  value: props.subtitle,
                  type: 'text',
                  onChange: (value) =>
                    setHeader((state) => ({ ...state, subtitle: value })),
                },
              ]}
              className="tw-mt-4 lg:tw-mt-8"
              id="headerSubtitleEditMenu"
            >
              <Typography
                sx={{
                  color: props.subtitleColor,
                }}
                variant="subtitle1"
                className=" tw-text-xl sm:tw-text-2xl lg:tw-text-3xl  lg:tw-text-left  tw-text-secondary-main tw-text-center"
              >
                {props.subtitle}
              </Typography>
            </EditMenu>

            <Box className="tw-mt-8 lg:tw-mt-16 tw-grid tw-grid-cols-3 lg:tw-flex lg:tw-gap-16 tw-gap-4">
              {stats.map((item) => (
                <EditMenu
                  key={item}
                  inputs={[
                    {
                      title: 'Kolor wartości',
                      value: props.statsValueTextColor,
                      onChange: (value) =>
                        setHeader((state) => ({
                          ...state,
                          statsValueTextColor: value,
                        })),
                    },
                    {
                      title: 'Kolor tytułu',
                      value: props.statsTitleTextColor,
                      onChange: (value) =>
                        setHeader((state) => ({
                          ...state,
                          statsTitleTextColor: value,
                        })),
                    },
                  ]}
                  className="tw-mt-4 lg:tw-mt-8"
                  id="headerSubtitleEditMenu"
                >
                  <Box className="tw-flex tw-flex-col tw-items-center ">
                    <Typography
                      variant="h3"
                      sx={{
                        color: props.statsValueTextColor,
                      }}
                      className="tw-text-3xl tw-font-bold"
                    >
                      0
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: props.statsTitleTextColor,
                      }}
                      className="tw-text-lg"
                    >
                      {item}
                    </Typography>
                  </Box>
                </EditMenu>
              ))}
            </Box>
            <Box className="tw-mt-8 tw-flex tw-flex-col tw-items-center lg:tw-hidden">
              <EditMenu
                inputs={[
                  {
                    title: 'Kolor',
                    value: props.callToActionTextColor,
                    onChange: (value) =>
                      setHeader((state) => ({
                        ...state,
                        callToActionTextColor: value,
                      })),
                  },
                  {
                    title: 'Tło',
                    value: props.callToActionBackgroundColor,
                    onChange: (value) =>
                      setHeader((state) => ({
                        ...state,
                        callToActionBackgroundColor: value,
                      })),
                  },
                ]}
                className="tw-flex tw-flex-col tw-justify-center"
                id="headerCardBackgroundMenu"
              >
                <Button
                  sx={{
                    color: props.callToActionTextColor,
                    borderColor: props.callToActionBackgroundColor,
                    backgroundColor: props.callToActionBackgroundColor,
                    '&:hover': {
                      backgroundColor: props.callToActionBackgroundColor,
                    },
                  }}
                  className={`tw-rounded-full     tw-px-6 tw-py-3 tw-normal-case tw-text-lg`}
                >
                  Kup dostęp za XX.XX zł
                </Button>
              </EditMenu>
            </Box>
          </Box>
          <Box className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-col-span-4 xl:tw-col-span-3 lg:tw-relative ">
            {children}
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default Header;
