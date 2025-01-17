import React from 'react';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <MBox
      sx={{
        borderTop: '1px solid',
        borderTopWidth: '1px',
        borderImageSlice: 1,
        borderImageSource:
          'linear-gradient(90deg, #1A151F 1%, #1A151F 1.01%, #5F5767 51%, #1A151F 100%)',
      }}
      className="tw-bg-background-paper "
      component="footer"
    >
      <MBox className="tw-flex tw-flex-col tw-items-center sm:tw-justify-between tw-text-center sm:tw-flex-row tw-p-4 ">
        <MBox className="tw-text-secondary-contrastText tw-flex tw-flex-col tw-items-center sm:tw-flex-row tw-gap-4">
          <Link className="tw-mt-1" href="https://www.learnpool.pl/">
            <Image
              className="tw-h-4 tw-w-min tw-object-contain"
              src={'/assets/logo.svg'}
              width={300}
              height={100}
              alt="Logo LearnPool.PL"
            />
          </Link>
          <Link
            href="https://www.learnpool.pl/"
            className="hover:tw-text-primary-contrastText"
          >
            <MTypography>Stwórz swój kurs i zarabiaj!</MTypography>
          </Link>
        </MBox>

        <MBox className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-mt-0 sm:tw-space-y-0 sm:tw-space-x-2 tw-mt-4 tw-space-y-2 tw-text-secondary-contrastText tw-text-sm">
          <Link target="_blank" href="/regulamin.pdf">
            <MTypography>Regulamin</MTypography>
          </Link>
          <Link target="_blank" href="/polityka_prywatnosci.pdf">
            <MTypography>Polityka prywatności</MTypography>
          </Link>
        </MBox>
      </MBox>
    </MBox>
  );
};

export default Footer;
