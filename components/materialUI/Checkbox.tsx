import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MCheckbox from '@mui/material/Checkbox';
import MBox from '@mui/material/Box';

type Props = {
  value: boolean;
  name: string;
  ariaLabel: string;
  error?: boolean;
  helperText?: string | false;
  children: React.ReactNode;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  name,
  ariaLabel,
  helperText,
  error,
  children,
  onChange,
  onBlur,
  value,
}: Props) => {
  return (
    <MBox>
      <FormControlLabel
        classes={{
          label: 'tw-text-secondary-main',
        }}
        control={
          <MCheckbox
            name={name}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            inputProps={{ 'aria-label': ariaLabel }}
          />
        }
        label={children}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </MBox>
  );
};

export default Checkbox;
