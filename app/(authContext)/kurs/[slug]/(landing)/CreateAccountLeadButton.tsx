'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { sendGAEvent } from '@next/third-parties/google';

type Props = {
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  className: string;
};

const CreateAccountLeadButton = ({
  color,
  backgroundColor,
  children,
  className,
}: Props) => {
  return (
    <Button
      onClick={() =>
        sendGAEvent('event', 'generate_lead', {
          event: 'generate_lead',
          value: 'create_account_lead',
        })
      }
      sx={{
        color: color,
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
        '&:hover': {
          backgroundColor: backgroundColor,
        },
      }}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CreateAccountLeadButton;
