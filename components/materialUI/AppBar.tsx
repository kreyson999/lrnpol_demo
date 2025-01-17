import React from 'react';
import Image from 'next/image';

import MAppBar from '@mui/material/AppBar';
import MToolbar from '@mui/material/Toolbar';
// import MContainer from '@mui/material/Container';
import MBox from '@mui/material/Box';

import AppBarUserContainer from '../shared/AppBarUserContainer';
import Drawer from './Drawer';
import Link from 'next/link';

type Props = {
  children?: React.ReactNode;
  drawerChildren?: React.ReactNode;
  appBarChildren?: React.ReactNode;
  isDrawerOpen?: boolean;
  toggleDrawer?: () => void;
  logo?: string;
  isCourseDashboardLayout?: boolean;
};

const AppBar = ({
  children,
  drawerChildren,
  appBarChildren,
  isDrawerOpen,
  toggleDrawer,
  logo,
  isCourseDashboardLayout,
}: Props) => {
  return (
    <>
      <MAppBar position="fixed" elevation={0}>
        <MBox
          className="tw-px-4"
          sx={{
            zIndex: 1201,
            borderBottom: '1px solid',
            borderBottomWidth: '1px',
            borderImageSlice: 1,
            borderImageSource:
              'linear-gradient(90deg, #1A151F 1%, #1A151F 1.01%, #5F5767 51%, #1A151F 100%)',
          }}
          // maxWidth="xl"
        >
          <MToolbar disableGutters className="tw-flex tw-justify-between">
            <MBox className="tw-flex">
              <Link href="/">
                <Image
                  priority
                  className="tw-h-5 tw-w-min tw-object-contain"
                  src={logo ? logo : '/assets/logo.svg'}
                  width={300}
                  height={100}
                  alt="Logo"
                />
              </Link>
              <MBox className="tw-hidden tw-ml-8 md:tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-4">
                {children}
              </MBox>
            </MBox>
            <MBox className="tw-flex tw-items-center tw-space-x-2">
              <AppBarUserContainer
                isCourseDashboardLayout={isCourseDashboardLayout}
              />
              {isDrawerOpen !== undefined && toggleDrawer !== undefined && (
                <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                  {drawerChildren}
                </Drawer>
              )}
            </MBox>
          </MToolbar>
        </MBox>
        {appBarChildren}
      </MAppBar>
    </>
  );
};

export default AppBar;
