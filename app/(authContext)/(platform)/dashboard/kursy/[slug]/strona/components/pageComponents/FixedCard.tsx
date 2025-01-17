import React from 'react';
import Image from 'next/image';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import EditMenu from '../editorComponents/EditMenu';
import FileInput from '@/components/shared/FileInput';
import { getLocalImageURL } from '@/helpers/getLocalImageURL';
import { onInputFileChange } from '@/helpers/onInputFileChange';
import { FixedCardProps } from '../../types/FixedCardProps';
import { useFetchedCourse } from '../../../CourseContext';
import DoneIcon from '@mui/icons-material/Done';

type Props = FixedCardProps & {
  setFixedCard: React.Dispatch<React.SetStateAction<FixedCardProps>>;
};

const FixedCard = ({ setFixedCard, ...props }: Props) => {
  const { course } = useFetchedCourse();
  const productAddons = [
    'Wysoka jakość audio i wideo!',
    'Najniższa cena na rynku!',
    'Dostęp od razu po kupnie!',
  ];

  return (
    <EditMenu
      className="tw-rounded-3xl tw-shadow-lg tw-fixed tw-max-w-[350px] lg:tw-mr-4"
      inputs={[
        {
          title: 'Tło',
          value: props.backgroundColor,
          onChange: (value) =>
            setFixedCard((state) => ({
              ...state,
              backgroundColor: value,
            })),
        },
      ]}
      id="headerCardBackgroundMenu"
    >
      <Card
        className="tw-rounded-3xl"
        elevation={0}
        sx={{ backgroundColor: props.backgroundColor }}
      >
        <CardMedia sx={{ position: 'relative' }}>
          <FileInput
            onClick={(e) => e.stopPropagation()}
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) =>
              onInputFileChange(e, (file) =>
                setFixedCard({ ...props, image: file })
              )
            }
          >
            {props.image ? (
              <Box className="tw-relative tw-aspect-video ">
                <Image
                  src={getLocalImageURL(props.image)}
                  alt="Miniaturka kursu"
                  width={640}
                  height={360}
                />
              </Box>
            ) : (
              <Box className="tw-py-2 tw-aspect-video tw-text-center tw-rounded-t-3xl tw-border-2 tw-border-dashed tw-border-primary-main">
                <Typography>Miniaturka kursu</Typography>
              </Box>
            )}
          </FileInput>
        </CardMedia>
        <CardContent className="tw-pb-4">
          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: props.titleTextColor,
                onChange: (value) =>
                  setFixedCard((state) => ({
                    ...state,
                    titleTextColor: value,
                  })),
              },
            ]}
            id="headerCardBackgroundMenu"
          >
            <Typography
              sx={{
                color: props.titleTextColor,
              }}
              className="tw-text-lg"
            >
              {course!.title}{' '}
              <i className="tw-text-xs">(widoczne na telefonie)</i>
            </Typography>
          </EditMenu>

          <Box className="tw-flex tw-items-end tw-gap-2">
            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.priceTextColor,
                  onChange: (value) =>
                    setFixedCard((state) => ({
                      ...state,
                      priceTextColor: value,
                    })),
                },
              ]}
              id="headerCardBackgroundMenu"
            >
              <Typography
                sx={{
                  color: props.priceTextColor,
                }}
                className="tw-text-4xl 2xl:tw-text-5xl  tw-font-extrabold"
              >
                39,99 zł
              </Typography>
            </EditMenu>

            <EditMenu
              inputs={[
                {
                  title: 'Kolor',
                  value: props.discountPriceTextColor,
                  onChange: (value) =>
                    setFixedCard((state) => ({
                      ...state,
                      discountPriceTextColor: value,
                    })),
                },
              ]}
              id="headerCardBackgroundMenu"
            >
              <Typography
                sx={{
                  color: props.discountPriceTextColor,
                }}
                className="tw-text-xl 2xl:tw-text-2xl tw-line-through "
              >
                59,99 zł
              </Typography>
            </EditMenu>
          </Box>

          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: props.descriptionTextColor,
                onChange: (value) =>
                  setFixedCard((state) => ({
                    ...state,
                    descriptionTextColor: value,
                  })),
              },
            ]}
            id="headerCardBackgroundMenu"
          >
            <Typography
              sx={{
                color: props.descriptionTextColor,
              }}
              className="tw-mt-4 tw-text-lg lg:tw-text-base 2xl:tw-text-lg"
            >
              Kup i od razu zacznij się uczyć, a podziękujesz sobie w
              przyszłości!
            </Typography>
          </EditMenu>

          <List className="lg:tw-mt-2 xl:tw-mt-4 lg:tw-hidden xl:tw-block ">
            {productAddons.map((addon) => (
              <ListItem
                key={addon}
                className="tw-px-0 tw-py-1 lg:tw-py-0.5 xl:tw-py-1"
              >
                <ListItemIcon className="tw-min-w-10">
                  <EditMenu
                    inputs={[
                      {
                        title: 'Kolor',
                        value: props.featureCheckboxTextColor,
                        onChange: (value) =>
                          setFixedCard((state) => ({
                            ...state,
                            featureCheckboxTextColor: value,
                          })),
                      },
                      {
                        title: 'Tło',
                        value: props.featureCheckboxBackgroundColor,
                        onChange: (value) =>
                          setFixedCard((state) => ({
                            ...state,
                            featureCheckboxBackgroundColor: value,
                          })),
                      },
                    ]}
                    id="headerCardBackgroundMenu"
                  >
                    <Box
                      sx={{
                        backgroundColor: props.featureCheckboxBackgroundColor,
                        color: props.featureCheckboxTextColor,
                      }}
                      className="tw-grid tw-p-1 tw-rounded-full"
                    >
                      <DoneIcon className="tw-text-base" />
                    </Box>
                  </EditMenu>
                </ListItemIcon>
                <EditMenu
                  inputs={[
                    {
                      title: 'Kolor',
                      value: props.featureTextColor,
                      onChange: (value) =>
                        setFixedCard((state) => ({
                          ...state,
                          featureTextColor: value,
                        })),
                    },
                  ]}
                  id="headerCardBackgroundMenu"
                >
                  <ListItemText
                    sx={{
                      color: props.featureTextColor,
                    }}
                    primary={addon}
                  />
                </EditMenu>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className="tw-pb-4 tw-px-4 tw-pt-0">
          <EditMenu
            inputs={[
              {
                title: 'Kolor',
                value: props.buttonTextColor,
                onChange: (value) =>
                  setFixedCard((state) => ({
                    ...state,
                    buttonTextColor: value,
                  })),
              },
              {
                title: 'Tło',
                value: props.buttonBackgroundColor,
                onChange: (value) =>
                  setFixedCard((state) => ({
                    ...state,
                    buttonBackgroundColor: value,
                  })),
              },
            ]}
            className="tw-w-full"
            id="headerCardBackgroundMenu"
          >
            <Button
              sx={{
                color: props.buttonTextColor,
                backgroundColor: props.buttonBackgroundColor,
                '&:hover': {
                  backgroundColor: props.buttonBackgroundColor,
                },
              }}
              className={`tw-w-full tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-px-6 tw-py-3 tw-normal-case tw-text-lg`}
            >
              Kup dostęp
            </Button>
          </EditMenu>
        </CardActions>
      </Card>
    </EditMenu>
  );
};

export default FixedCard;
