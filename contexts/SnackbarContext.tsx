'use client';

import React from 'react';

import { SnackbarVariant } from '@/constants/enums';
import { useSnackbar as useSnackbarComponent } from '@/hooks/useSnackbar';

type SnackbarContext = {
  showSnackbar: (message: string, variant?: SnackbarVariant) => void;
};

const SnackbarContext = React.createContext<SnackbarContext>({
  showSnackbar: () => {},
});

type Props = {
  children: React.ReactNode;
};

const SnackbarContextProvider = ({ children }: Props) => {
  const { showSnackbar, SnackbarComponent } = useSnackbarComponent();

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {SnackbarComponent}
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;

export const useSnackbar = () => React.useContext(SnackbarContext);
