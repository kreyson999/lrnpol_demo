'use client';

import React, { useState, useContext, useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@/components/materialUI/Modal';

type ErrorContext = (message: string) => void;

export const ErrorContext = React.createContext<ErrorContext>(() => {});

type Props = {
  children: React.ReactNode;
};

const ErrorContextProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSetMessage = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const handleClearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const contextValue = useMemo(() => handleSetMessage, [handleSetMessage]);

  return (
    <ErrorContext.Provider value={contextValue}>
      <Modal
        title="Wystąpił błąd"
        open={message !== null}
        onClose={handleClearMessage}
      >
        <Typography className="tw-text-red-500">{message}</Typography>
      </Modal>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;

export const useErrorState = () => useContext(ErrorContext);
