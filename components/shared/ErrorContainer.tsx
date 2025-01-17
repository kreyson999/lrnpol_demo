import React from 'react';
import Button from '../materialUI/Button';
import MContainer from '@mui/material/Container';
import MTypography from '@mui/material/Typography';

type Props = {
  children: React.ReactNode;
};

const ErrorContainer = ({ children }: Props) => {
  return (
    <MContainer
      maxWidth="sm"
      className="tw-flex tw-flex-col tw-justify-center tw-grow tw-text-white tw-pt-12 tw-pb-16"
    >
      <MTypography className="tw-text-primary-main tw-text-center tw-text-5xl tw-font-extrabold tw-uppercase">
        ERROR
      </MTypography>

      <MTypography className="tw-text-xl tw-text-center tw-text-red-500 tw-mt-4">
        {children}
      </MTypography>

      <Button href="/" className="tw-mt-8 ">
        Strona główna
      </Button>
    </MContainer>
  );
};

export default ErrorContainer;
