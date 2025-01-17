'use client';

import React, { useState } from 'react';

import Menu from '../materialUI/Menu';
import MenuItem from '../materialUI/MenuItem';
import MTypography from '@mui/material/Typography';
import MBox from '@mui/material/Box';
import MButton from '@mui/material/Button';
import { useWindowSize } from '@/hooks/useWindowSize';
import MIconButton from '@mui/material/IconButton';
import { AuthService } from '@/services/authService';
import AppBarLink from './AppBarLink';
import { useAuth } from '@/contexts/AuthContext';
import { isDevEnv } from '@/helpers/isDevEnv';

import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

type Props = {
  isCourseDashboardLayout?: boolean;
};

const AppBarUserContainer = ({ isCourseDashboardLayout }: Props) => {
  const { user } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [windowWidth] = useWindowSize();

  const onClose = () => {
    setMenuAnchorEl(null);
  };

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleSignOutUser = () => {
    AuthService.signOut()
      .then(() => {
        console.log('LOGGED OUT');
        onClose();
      })
      .catch((error) => {
        console.error('SIGN OUT ERROR: ', error);
      });
  };

  return user !== null ? (
    <MBox>
      <MIconButton
        onClick={onMenuOpen}
        id="appBarUserContainer-button"
        aria-controls={menuAnchorEl ? 'appBarUserContainer-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuAnchorEl ? 'true' : undefined}
        className="md:tw-hidden tw-border tw-border-solid tw-border-primary-light"
      >
        <PersonRoundedIcon className="tw-text-primary-contrastText" />
      </MIconButton>
      <MButton
        onClick={onMenuOpen}
        id="appBarUserContainer-button"
        aria-controls={menuAnchorEl ? 'appBarUserContainer-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuAnchorEl ? 'true' : undefined}
        endIcon={
          <ExpandMoreRoundedIcon className="tw-text-primary-contrastText" />
        }
        classes={{
          root: `tw-hidden md:tw-flex tw-text-primary-contrastText tw-rounded-lg tw-border tw-border-solid tw-border-primary-light tw-min-w-[200px] ${
            windowWidth < 768 ? 'tw-w-full' : ''
          }`,
        }}
      >
        <MTypography className="tw-text-primary-contrastText">
          {user.firstName} {user.lastName}
        </MTypography>
      </MButton>
      <Menu
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={menuAnchorEl}
        onClose={onClose}
        id="appBarUserContainer-menu"
        buttonId="appBarUserContainer-button"
      >
        {!isCourseDashboardLayout && (
          <MenuItem
            href={
              isDevEnv()
                ? `https://local.learnpool.pl:3000/dashboard`
                : 'https://www.learnpool.pl/dashboard'
            }
            icon={<DashboardRoundedIcon />}
          >
            Instruktor
          </MenuItem>
        )}
        <MenuItem onClick={handleSignOutUser} icon={<LogoutRoundedIcon />}>
          Wyloguj się
        </MenuItem>
      </Menu>
    </MBox>
  ) : (
    <MBox className="tw-hidden md:tw-flex tw-gap-4">
      <AppBarLink href={'/zaloguj'} isProtected={false}>
        Zaloguj się
      </AppBarLink>
      <AppBarLink href={'/stworzkonto'} isProtected={false}>
        Stwórz konto
      </AppBarLink>
    </MBox>
  );
};

export default AppBarUserContainer;
