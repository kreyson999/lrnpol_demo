'use client';

import MDrawer from '@mui/material/Drawer';

import MBox from '@mui/material/Box';
import MToolbar from '@mui/material/Toolbar';
import MIconButton from '@mui/material/IconButton';
import DrawerAuthButtons from '../shared/DrawerAuthButtons';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  children: React.ReactNode;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer = ({ children, isDrawerOpen, toggleDrawer }: Props) => {
  return (
    <>
      <MIconButton
        className="tw-grid tw-place-content-center md:tw-hidden"
        onClick={toggleDrawer}
      >
        {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
      </MIconButton>
      <MDrawer
        open={isDrawerOpen}
        classes={{
          modal: 'tw-z-50',
        }}
        anchor="right"
        variant="temporary"
        sx={(theme) => ({
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            backgroundColor: `${theme.palette.background.paper} !important`,
            backgroundImage: 'unset',
            boxSizing: 'border-box',
            borderLeft: (theme) => `1px solid ${theme.palette.primary.light}`,
          },
        })}
      >
        <MToolbar />
        <MBox
          className="tw-flex tw-flex-col tw-h-full tw-pb-2"
          sx={{ overflow: 'auto' }}
        >
          {children}
          <DrawerAuthButtons toggleDrawer={toggleDrawer} />
        </MBox>
      </MDrawer>
    </>
  );
};

export default Drawer;
