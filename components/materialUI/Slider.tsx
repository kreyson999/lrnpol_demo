import React from 'react';
import Slider from '@mui/material/Slider';

type Props = {
  value: number;
  min?: number;
  max?: number;
  style?: string;
  onChange: (value: number | number[]) => void;
  hideThumb: boolean;
};

export default function ContinuousSlider({
  value,
  min,
  max,
  style,
  onChange,
  hideThumb,
}: Props) {
  return (
    <Slider
      classes={{
        thumb: `${hideThumb ? 'tw-hidden' : 'tw-flex'}`,
        root: 'tw-p-0', //padding
      }}
      onChange={(_, value) => onChange(value)}
      value={value}
      min={min}
      max={max}
      className={`${style}`}
      step={0.01}
    />
  );
}
