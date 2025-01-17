import React from 'react';

import MBox from '@mui/material/Box';
import ProgressCircular from '../materialUI/ProgressCircular';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

const PageLoader = ({ isLoading, children }: Props) => {
  return isLoading ? (
    <MBox className="tw-grow tw-grid tw-place-content-center">
      <ProgressCircular />
    </MBox>
  ) : (
    children
  );
};

export default PageLoader;
