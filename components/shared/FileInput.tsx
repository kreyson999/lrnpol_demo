import React from 'react';

import MBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MFormHelperText from '@mui/material/FormHelperText';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  name: string;
  accept: string;
  helperText?: string | undefined | false;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const FileInput = ({
  onChange,
  onClick,
  accept,
  name,
  helperText,
  children,
}: Props) => {
  return (
    <MBox onClick={onClick} className="tw-flex tw-flex-col tw-grow">
      <MBox
        component="label"
        className="tw-cursor-pointer tw-grow tw-flex tw-flex-col"
        htmlFor={name}
      >
        <VisuallyHiddenInput
          type="file"
          onChange={onChange}
          accept={accept}
          name={name}
          id={name}
        />
        {children}
        {/* {children ? (
          children
        ) : (
          <>
            <Icon className="tw-text-3xl ">image</Icon>
            <MTypography>{actionText ?? 'Kliknij, aby przesłać!'}</MTypography>
           
          </>
        )} */}
      </MBox>
      {helperText && (
        <MFormHelperText className="tw-text-red-500">
          {helperText}
        </MFormHelperText>
      )}
    </MBox>
  );
};

export default FileInput;
