import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import EditMenu from '../editorComponents/EditMenu';

import { FooterProps } from '../../types/FooterProps';
import Image from 'next/image';

type Props = FooterProps & {
  setFooter: React.Dispatch<React.SetStateAction<FooterProps>>;
};

const Footer = ({ setFooter, ...props }: Props) => {
  return (
    <EditMenu
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) =>
            setFooter((state) => ({
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
          className="tw-px-4 tw-pt-8 tw-text-center tw-pb-24 lg:tw-pb-8"
        >
          <Box className=" tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
            <Box className="tw-mt-6 md:tw-mt-0 tw-order-2 md:tw-order-1 tw-flex tw-flex-col">
              <Box className="tw-flex tw-flex-col md:tw-flex-row tw-gap-2 md:tw-gap-4">
                <EditMenu
                  inputs={[
                    {
                      title: 'Kolor',
                      value: props.courseDomainTextColor,
                      onChange: (value) =>
                        setFooter((state) => ({
                          ...state,
                          courseDomainTextColor: value,
                        })),
                    },
                  ]}
                  id="appBarBackgroundEditMenu"
                >
                  <Typography
                    sx={{
                      color: props.courseDomainTextColor,
                    }}
                  >
                    Polityka prywatności
                  </Typography>
                </EditMenu>
                <EditMenu
                  inputs={[
                    {
                      title: 'Kolor',
                      value: props.courseDomainTextColor,
                      onChange: (value) =>
                        setFooter((state) => ({
                          ...state,
                          courseDomainTextColor: value,
                        })),
                    },
                  ]}
                  id="appBarBackgroundEditMenu"
                >
                  <Typography
                    sx={{
                      color: props.courseDomainTextColor,
                    }}
                  >
                    Regulamin
                  </Typography>
                </EditMenu>
              </Box>
              <EditMenu
                inputs={[
                  {
                    title: 'Kolor',
                    value: props.poweredByTextColor,
                    onChange: (value) =>
                      setFooter((state) => ({
                        ...state,
                        poweredByTextColor: value,
                      })),
                  },
                ]}
                id="appBarBackgroundEditMenu"
              >
                <Typography
                  className="tw-mt-2 md:tw-text-left"
                  sx={{
                    color: props.poweredByTextColor,
                  }}
                >
                  Stwórz swój własny kurs na{' '}
                  <span className="tw-font-bold">LearnPool.pl</span>
                </Typography>
              </EditMenu>
            </Box>
            <a
              className="tw-order-1 md:tw-order-2"
              href="https://www.hotpay.pl/"
            >
              <Image
                src="/assets/system-hotpay-white.png"
                height={44.75}
                width={237.5}
                alt="Płatności obsługuje HOTPAY"
              />
            </a>
          </Box>
        </Container>
      </Box>
      {/* <Box
        sx={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <Container
          maxWidth="xl"
          className="tw-px-4 tw-pt-8 tw-pb-24 lg:tw-pb-8 tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center"
        >
          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: props.courseDomainTextColor,
                onChange: (value) =>
                  setFooter((state) => ({
                    ...state,
                    courseDomainTextColor: value,
                  })),
              },
            ]}
            id="appBarBackgroundEditMenu"
          >
            <Typography sx={{ color: props.courseDomainTextColor }}>
              {course!.title}
            </Typography>
          </EditMenu>

          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: props.poweredByTextColor,
                onChange: (value) =>
                  setFooter((state) => ({
                    ...state,
                    poweredByTextColor: value,
                  })),
              },
            ]}
            id="appBarBackgroundEditMenu"
          >
            <Typography sx={{ color: props.poweredByTextColor }}>
              Obsługiwane przez: LearnPool.pl
            </Typography>
          </EditMenu>
        </Container>
      </Box> */}
    </EditMenu>
  );
};

export default Footer;
