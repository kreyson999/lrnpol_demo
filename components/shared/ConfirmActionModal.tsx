'use client';

import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import Modal from '@/components/materialUI/Modal';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  e: string;
  callback: (e: string) => Promise<void>;
  title: string;
  description: string;
  confirmButton: string;
  children?: React.ReactNode;
};

const ConfirmActionModal = ({
  e,
  callback,
  title,
  description,
  confirmButton,
  children,
}: Props) => {
  const [isActionOpen, toggleAction] = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true);

    callback(e)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        toggleAction(null);
      });
  };

  const onCancel = () => {
    toggleAction(null);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: () => toggleAction(null),
          } as React.HTMLAttributes<HTMLElement>);
        }
        return (
          <IconButton onClick={toggleAction}>
            <DeleteIcon />
          </IconButton>
        );
      })}

      <Modal open={isActionOpen} onClose={toggleAction} title={title}>
        <MTypography className="tw-text-lg">{description}</MTypography>
        <MBox className="tw-grid tw-grid-cols-2 tw-mt-4 tw-gap-4">
          <Button onClick={onCancel}>Anuluj</Button>
          <Button isLoading={isLoading} onClick={onConfirm} primary>
            {confirmButton}
          </Button>
        </MBox>
      </Modal>
    </>
  );
};

export default ConfirmActionModal;
