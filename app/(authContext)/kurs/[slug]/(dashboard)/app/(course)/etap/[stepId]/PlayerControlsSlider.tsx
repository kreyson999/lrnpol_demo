import React from 'react';

import MTypography from '@mui/material/Typography';
import MBox from '@mui/material/Box';
import Slider from '@/components/materialUI/Slider';
import { getFormattedDuration } from '@/helpers/getFormattedDuration';

type Props = {
  title: string;
  duration: number;
  playedSeconds: number;
  onSeeking: (percent: number) => void;
};

const PlayerControlsSlider = ({
  title,
  playedSeconds,
  duration,
  onSeeking,
}: Props) => {
  return (
    <>
      <MBox className="tw-grow tw-bg-primary-light tw-rounded-lg tw-p-2 tw-relative tw-overflow-hidden">
        <MBox className="tw-flex tw-flex-col tw-cursor-pointer">
          <MTypography className="tw-text-sm">{title}</MTypography>
          <MBox className="tw-flex tw-justify-between">
            <MTypography className="tw-text-xs">
              {getFormattedDuration(playedSeconds * 1000)}
            </MTypography>
            <MTypography className="tw-text-xs">
              {getFormattedDuration(duration)}
            </MTypography>
          </MBox>
        </MBox>
        <Slider
          value={(playedSeconds * 1000) / duration}
          min={0}
          max={1}
          style="tw-absolute tw-bottom-0 tw-left-0"
          onChange={(e) => onSeeking(e as number)}
          hideThumb={true}
        />
      </MBox>
    </>
  );
};

export default PlayerControlsSlider;
