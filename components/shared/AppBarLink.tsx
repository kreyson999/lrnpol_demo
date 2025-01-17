'use client';

import React from 'react';

import Link from 'next/link';
import MTypography from '@mui/material/Typography';
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  children: React.ReactNode;
  href: string;
  isProtected: boolean;
};

const AppBarLink = ({ children, href, isProtected }: Props) => {
  const { user } = useAuth();

  return (
    !(isProtected && user === null) && (
      <Link href={href}>
        <MTypography classes={{ root: 'tw-text-secondary-contrastText' }}>
          {children}
        </MTypography>
      </Link>
    )
  );
};

export default AppBarLink;
