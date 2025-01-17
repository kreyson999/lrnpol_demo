import React, { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import ProgressCircular from '@/components/materialUI/ProgressCircular';
import MBox from '@mui/material/Box';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const PageProtector = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && user === null) {
      router.push('/zaloguj');
    }
  });

  return isAuthLoading || !user ? (
    <MBox className="tw-grow tw-grid tw-place-content-center">
      <ProgressCircular />
    </MBox>
  ) : (
    children
  );
};

export default PageProtector;
