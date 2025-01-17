import React from 'react';

import MBox from '@mui/material/Box';
import DrawerListItem from './DrawerListItem';
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  toggleDrawer: () => void;
};

const DrawerAuthButtons = ({ toggleDrawer }: Props) => {
  const { user, isAuthLoading } = useAuth();

  return (
    !user &&
    !isAuthLoading && (
      <MBox className="tw-flex tw-flex-col tw-gap-2 tw-mt-auto">
        <DrawerListItem
          toggleDrawer={toggleDrawer}
          title="Zaloguj się"
          href="/zaloguj"
        />
        <DrawerListItem
          toggleDrawer={toggleDrawer}
          title="Stwórz konto"
          href="/stworzkonto"
        />
      </MBox>
    )
  );
};

export default DrawerAuthButtons;
