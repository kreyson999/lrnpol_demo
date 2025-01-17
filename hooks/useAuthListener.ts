import { useState, useEffect } from 'react';

import { AuthenticatedUser } from '@/constants/types';
import { Hub } from 'aws-amplify/utils';
import { AuthService } from '@/services/authService';

const useAuthListener = (): [
  user: AuthenticatedUser | null,
  isLoading: boolean
] => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthenticatedUser = () => {
    AuthService.getCurrentAuthenticatedUser()
      .then((response) => {
        setAuthenticatedUser(response);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      console.log({ authEvent: payload.event });
      switch (payload.event) {
        case 'signedIn':
          getAuthenticatedUser();
          break;
        case 'signedOut':
          getAuthenticatedUser();
          break;
      }
    });
  }, []);

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return [authenticatedUser, isLoading];
};

export default useAuthListener;
