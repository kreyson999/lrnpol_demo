import { Metadata } from 'next';
import React from 'react';
import TawkToIntegration from './TawkToIntegration';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TawkToIntegration />
      {children}
    </>
  );
};

export default PlatformLayout;
