import React from 'react';

import MSelect, { SelectChangeEvent } from '@mui/material/Select';

import MBox from '@mui/material/Box';
import MInputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  name: string;
  label?: string;
  id: string;
  value: string | undefined;
  items: {
    title: string;
    value: string;
  }[];
  boxClassName?: string;
  selectClassName?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: (e: SelectChangeEvent) => void;
};

const Select = ({
  label,
  id,
  value,
  items,
  name,
  boxClassName,
  selectClassName,
  onChange,
  onBlur,
}: Props) => {
  return (
    <MBox className={`tw-flex tw-flex-col ${boxClassName ?? ''}`}>
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
      <MSelect
        variant="filled"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        fullWidth
        classes={{
          outlined: 'tw-border-0',
          select: 'tw-py-3.5 tw-bg-transparent',
          root: `${
            selectClassName ?? ''
          } tw-h-[50px] before:tw-border-0 after:tw-border-0 tw-mt-2 tw-rounded-lg tw-text-white tw-bg-background-paper tw-border tw-border-primary-light`,
        }}
        id={id}
      >
        {items.map((item) => (
          <MenuItem
            classes={{
              root: 'tw-text-white',
            }}
            key={item.value}
            value={item.value}
          >
            {item.title}
          </MenuItem>
        ))}
      </MSelect>
    </MBox>
  );
};

export default Select;
