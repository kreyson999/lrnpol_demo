import React from 'react';
import MBox from '@mui/material/Box';
import MInputLabel from '@mui/material/InputLabel';
import MInput from '@mui/material/Input';
import MFormHelperText from '@mui/material/FormHelperText';

type Props = {
  id: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  helperText?: string | false;
  className?: string;
  error?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  appendAfterInput?: React.ReactNode;
  appendBeforeInput?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const TextInput = ({
  id,
  label,
  multiline,
  className,
  type,
  disabled,
  error,
  value,
  name,
  helperText,
  endAdornment,
  appendAfterInput,
  appendBeforeInput,
  onBlur,
  onChange,
}: Props) => {
  return (
    <MBox className={className}>
      {label && (
        <MInputLabel
          classes={{
            root: 'tw-text-sm',
          }}
          htmlFor={id}
        >
          {label}
        </MInputLabel>
      )}
      <MBox className="tw-flex tw-gap-4 tw-mt-2">
        {appendBeforeInput}
        <MInput
          multiline={multiline}
          placeholder={label}
          fullWidth
          type={type ?? 'text'}
          disabled={disabled}
          error={error}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className="before:tw-border-0 after:tw-border-0  tw-rounded-lg tw-text-white tw-bg-background-paper tw-border tw-border-primary-light [&:-webkit-autofill]:tw-bg-background-paper [&:-webkit-autofill]:tw-text-white 
          [&:-webkit-autofill_selected]:tw-bg-background-paper"
          sx={{
            ['&.MuiInputBase-root']: {
              padding: '0.5rem',
            },
            ['&.MuiInputBase-multiline textarea']: {
              minHeight: '32px !important',
            },
            ['& input:-webkit-autofill']: {
              WebkitBoxShadow: '0 0 0 30px #211928 inset !important',
              boxShadow: '0 0 0 30px #211928 inset !important',
              WebkitTextFillColor: 'white !important',
            },
            ['& input::-webkit-calendar-picker-indicator']: {
              filter: 'invert(1)',
            },
          }}
          endAdornment={endAdornment}
          id={id}
        />
        {appendAfterInput}
      </MBox>
      <MFormHelperText className="tw-text-red-500">
        {helperText}
      </MFormHelperText>
    </MBox>
  );
};

export default TextInput;
