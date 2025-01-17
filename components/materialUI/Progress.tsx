import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Progress({ percent }: { percent: number }) {
  return (
    <div className="tw-relative">
      <div className="tw-flex tw-items-center tw-justify-center">
        <CircularProgress
          variant="determinate"
          value={percent}
          className="tw-text-green-400"
        />
        <div className="tw-text-[0.7rem] tw-absolute">{percent}%</div>
      </div>
    </div>
  );
}
