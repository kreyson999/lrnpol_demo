'use client';

import React, { useContext } from 'react';

import { AuthenticatedUser } from '@/constants/types';
import useAuthListener from '@/hooks/useAuthListener';

const AuthContext = React.createContext<{
  user: AuthenticatedUser | null;
  isAuthLoading: boolean;
}>({ user: null, isAuthLoading: false });

type Props = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [user, isAuthLoading] = useAuthListener();

  return (
    <AuthContext.Provider value={{ user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
