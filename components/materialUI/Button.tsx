import React, { MouseEvent } from 'react';
import Link from 'next/link';

import MLoadingButton from '@mui/lab/LoadingButton';
import MButton from '@mui/material/Button';

type Props = {
  primary?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement> | null) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  href?: string;
  isLoading?: boolean;
  type?: 'submit' | 'button';
  size?: 'large' | 'medium' | 'small';
};

const Button = ({
  children,
  className,
  borderColor,
  href,
  onClick,
  primary,
  isLoading,
  type,
  size,
}: Props) => {
  const buttonClassName = ` tw-rounded-lg tw-normal-case hover:tw-opacity-90 tw-transition-opacity ${
    primary
      ? 'tw-bg-primary-main'
      : 'tw-bg-background-paper tw-border-primary-light'
  } ${size ? '' : 'tw-min-h-[48px]'} tw-w-full ${className}`;

  const button = (
    <MLoadingButton
      size={size ? size : 'large'}
      onClick={onClick}
      loading={isLoading}
      type={type ?? 'submit'}
      classes={{
        label: isLoading ? 'tw-text-transparent' : 'tw-text-white',
        root: buttonClassName,
        loadingIndicator: 'tw-text-primary-contrastText ',
      }}
      sx={{
        borderColor: borderColor ?? undefined,
        ['&:hover']: {
          borderColor: borderColor ?? undefined,
        },
      }}
      variant="outlined"
    >
      {children}
    </MLoadingButton>
  );

  if (href) {
    return (
      <Link className={className} href={href}>
        <MButton
          variant="outlined"
          type={type ?? 'submit'}
          size={size ? size : 'large'}
          className={`${buttonClassName} tw-text-white`}
        >
          {children}
        </MButton>
      </Link>
    );
  }
  return button;
};

export default Button;
