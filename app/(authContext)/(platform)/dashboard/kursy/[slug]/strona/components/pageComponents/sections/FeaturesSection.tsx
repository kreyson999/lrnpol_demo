import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import EditMenu from '../../editorComponents/EditMenu';
import {
  FeaturesSectionProps,
  FeaturesSectionPropsItem,
} from '../../../types/sections/FeaturesSectionProps';
import DevicesIcon from '@mui/icons-material/Devices';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import QuizIcon from '@mui/icons-material/Quiz';

type Props = FeaturesSectionProps & {
  onUpdate: (section: FeaturesSectionProps) => void;
};

const FeaturesSection = ({ onUpdate, ...props }: Props) => {
  const features = [
    {
      id: 0,
      icon: <DevicesIcon />,
      text: 'Możliwość nauki na wielu urządzeniach',
    },
    {
      id: 1,
      icon: <LiveTvIcon />,
      text: 'Wysoka jakość i dostęp na zawsze',
    },
    {
      id: 2,
      icon: <QuizIcon />,
      text: 'Intuicyjna platforma kursowa',
    },
  ];

  const handleUpdateFeaturesItem = (
    index: number,
    key: keyof FeaturesSectionPropsItem,
    value: string
  ) => {
    onUpdate({
      ...props,
      features: {
        ...props.features,
        items: props.features.items.map((feature, itemIndex) => {
          if (itemIndex === index) {
            return {
              ...feature,
              [key]: value,
            };
          }
          return feature;
        }),
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
      <Box sx={{ backgroundColor: props.backgroundColor }} component="section">
        <Container maxWidth="xl" className="tw-grid lg:tw-grid-cols-12">
          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 md:tw-gap-8 lg:tw-gap-4 md:tw-space-y-0 tw-space-y-8 tw-my-12 lg:tw-my-16">
            {features.map((feature, index) => {
              return (
                <Box
                  key={feature.id}
                  className={`tw-flex tw-items-center tw-space-x-4 `}
                >
                  <EditMenu
                    inputs={[
                      {
                        title: 'Tło',
                        value: props.features.items[index].backgroundColor,
                        onChange: (value) =>
                          handleUpdateFeaturesItem(
                            index,
                            'backgroundColor',
                            value
                          ),
                      },
                    ]}
                    id="featuresSectionBackgroundMenu"
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          props.features.items[index].backgroundColor,
                      }}
                      className={`tw-grid tw-place-content-center tw-p-4 lg:tw-p-3 tw-w-min tw-rounded-full`}
                    >
                      <EditMenu
                        inputs={[
                          {
                            title: 'Tło',
                            value: props.features.items[index].iconColor,
                            onChange: (value) =>
                              handleUpdateFeaturesItem(
                                index,
                                'iconColor',
                                value
                              ),
                          },
                        ]}
                        id="featuresSectionBackgroundMenu"
                      >
                        <Box
                          sx={{
                            color: props.features.items[index].iconColor,
                          }}
                        >
                          {feature.icon}
                        </Box>
                      </EditMenu>
                    </Box>
                  </EditMenu>

                  <EditMenu
                    inputs={[
                      {
                        title: 'Kolor',
                        value: props.features.items[index].textColor,
                        onChange: (value) =>
                          handleUpdateFeaturesItem(index, 'textColor', value),
                      },
                    ]}
                    id="featuresSectionBackgroundMenu"
                  >
                    <Typography
                      sx={{
                        color: props.features.items[index].textColor,
                      }}
                      className="xl:tw-text-lg"
                    >
                      {feature.text}
                    </Typography>
                  </EditMenu>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </EditMenu>
  );
};

export default FeaturesSection;
