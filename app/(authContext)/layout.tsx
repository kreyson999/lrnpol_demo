import React from 'react';

import AuthContextProvider from '@/contexts/AuthContext';
import ErrorContextProvider from '@/contexts/ErrorContext';
import SnackbarContextProvider from '@/contexts/SnackbarContext';

type Props = {
  children: React.ReactNode;
};

const AuthContextLayout = ({ children }: Props) => {
  return (
    <AuthContextProvider>
      <ErrorContextProvider>
        <SnackbarContextProvider>{children}</SnackbarContextProvider>
      </ErrorContextProvider>
    </AuthContextProvider>
  );
};

export default AuthContextLayout;
