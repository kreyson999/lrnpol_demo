import React from 'react';

import MCircularProgress from '@mui/material/CircularProgress';

type Props = {
  variant?: 'determinate';
  value?: number;
};

const ProgressCircular = ({ variant, value }: Props) => {
  return <MCircularProgress variant={variant} value={value} />;
};

export default ProgressCircular;
