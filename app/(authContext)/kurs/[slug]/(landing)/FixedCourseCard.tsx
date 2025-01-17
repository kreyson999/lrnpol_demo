import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Link from 'next/link';
import CreateAccountLeadButton from './CreateAccountLeadButton';
import DoneIcon from '@mui/icons-material/Done';
type Props = {
  slug: string;
  className?: string;
  imageUrl: string | null;
  title: string;
  price: number;
  backgroundColor?: string;
  discountPrice?: number;
  priceTextColor?: string;
  discountPriceTextColor?: string;
  descriptionTextColor?: string;
  featureCheckboxBackgroundColor?: string;
  featureCheckboxTextColor?: string;
  featureTextColor?: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
};

const FixedCourseCard = ({
  slug,
  className,
  imageUrl,
  title,
  price,
  discountPrice,
  descriptionTextColor,
  priceTextColor,
  discountPriceTextColor,
  featureCheckboxBackgroundColor,
  featureCheckboxTextColor,
  featureTextColor,
  backgroundColor,
  buttonBackgroundColor,
  buttonTextColor,
}: Props) => {
  const BASE_URL = `https://${slug}.${process.env.NEXT_PUBLIC_BASE_URL}`;

  const productAddons = [
    'Wysoka jakość audio i wideo!',
    'Najniższa cena na rynku!',
    'Dostęp od razu po kupnie!',
  ];

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor }}
      className={`${className} tw-rounded-3xl tw-shadow-lg  tw-max-w-[350px] tw-top-16 xl:tw-top-[unset] lg:tw-mr-4`}
    >
      {imageUrl && (
        <CardMedia sx={{ position: 'relative' }}>
          <Image
            src={imageUrl}
            width={640}
            height={360}
            className="tw-aspect-video"
            alt={`Zdjęcie kursu: ${title}`}
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
      )}
      <CardContent>
        <Box className="tw-flex tw-items-end tw-gap-2">
          <Typography
            sx={{
              color: priceTextColor,
            }}
            className="tw-text-4xl 2xl:tw-text-5xl  tw-font-extrabold"
          >
            {price} zł
          </Typography>
          {discountPrice && (
            <Typography
              sx={{
                color: discountPriceTextColor,
              }}
              className="tw-text-xl 2xl:tw-text-2xl tw-line-through "
            >
              {discountPrice} zł
            </Typography>
          )}
        </Box>

        <Typography
          sx={{
            color: descriptionTextColor,
          }}
          className="tw-mt-4 tw-text-lg lg:tw-text-base 2xl:tw-text-lg"
        >
          Kup i od razu zacznij się uczyć, a podziękujesz sobie w przyszłości!
        </Typography>

        <List className="lg:tw-mt-2 xl:tw-mt-4  xl:tw-block ">
          {productAddons.map((addon) => (
            <ListItem
              key={addon}
              className="tw-px-0 tw-py-1 lg:tw-py-0.5 xl:tw-py-1"
            >
              <ListItemIcon className="tw-min-w-10">
                <Box
                  sx={{
                    backgroundColor: featureCheckboxBackgroundColor,
                    color: featureCheckboxTextColor,
                  }}
                  className="tw-grid tw-p-1 tw-rounded-full"
                >
                  <DoneIcon className="tw-text-base" />
                </Box>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: featureTextColor,
                }}
                primary={addon}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className="tw-pb-4 tw-px-4 tw-pt-0">
        <Link href={`${BASE_URL}/stworzkonto`} className="tw-w-full">
          <CreateAccountLeadButton
            color={buttonTextColor}
            backgroundColor={buttonBackgroundColor}
            className="tw-w-full tw-rounded-full tw-flex tw-transition-transform hover:-tw-translate-y-1  tw-flex-col tw-justify-center tw-px-6 tw-py-3 tw-normal-case tw-text-lg"
          >
            Kup dostęp
          </CreateAccountLeadButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default FixedCourseCard;
