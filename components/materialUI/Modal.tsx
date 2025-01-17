import React, { MouseEventHandler } from 'react';

import MModal from '@mui/material/Modal';
import MBox from '@mui/material/Box';
import MContainer from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Breakpoint } from '@mui/material';

type Props = {
  open: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  children: React.ReactNode;
  className?: string;
  withoutPadding?: boolean;
  maxWidth?: Breakpoint;
};

const Modal = ({
  open,
  title,
  children,
  onClose,
  className,
  withoutPadding,
  maxWidth,
}: Props) => {
  return (
    <MModal open={open} aria-labelledby={title}>
      <MContainer
        onClick={(e) => e.stopPropagation()}
        maxWidth={maxWidth ?? 'sm'}
        className={`tw-w-[unset] tw-absolute tw-left-4 tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-bg-background-default tw-border tw-border-primary-light  tw-text-white ${
          withoutPadding ? 'tw-px-0' : 'tw-px-4 tw-pb-4'
        } tw-rounded-lg ${className}`}
      >
        <MBox
          className={`tw-flex tw-justify-between tw-items-center tw-py-2 ${
            withoutPadding ? 'tw-px-2' : ''
          }`}
        >
          <Typography
            className="tw-text-center tw-text-xl tw-font-semibold "
            variant="h2"
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </MBox>
        <MBox className="tw-flex tw-flex-col">{children}</MBox>
      </MContainer>
    </MModal>
  );
};

export default Modal;
