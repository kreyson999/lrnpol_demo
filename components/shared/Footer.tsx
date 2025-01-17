import React from 'react';
import MBox from '@mui/material/Box';
// import MContainer from '@mui/material/Container';
import MTypography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  logo?: string;
};

const Footer = ({ logo }: Props) => {
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
      <MBox
        // maxWidth="xl"
        className="tw-flex tw-flex-col tw-items-center sm:tw-justify-between tw-text-center sm:tw-flex-row tw-p-4 "
      >
        <Image
          priority
          className="tw-h-4 tw-w-min tw-object-contain"
          src={logo ? logo : '/assets/logo.svg'}
          width={300}
          height={100}
          alt="Logo"
        />

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
