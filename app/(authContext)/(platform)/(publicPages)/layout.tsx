'use client';

import React from 'react';

import { useState } from 'react';

import AppBar from '@/components/materialUI/AppBar';
import MBox from '@mui/material/Box';
import MToolbar from '@mui/material/Toolbar';

import MList from '@mui/material/List';
import Footer from '@/components/shared/Footer';

type Props = {
  children: React.ReactNode;
};

const PublicPagesLayout = ({ children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((state) => !state);
  };
  return (
    <>
      <AppBar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerChildren={
          <MList
            classes={{
              root: 'tw-flex tw-flex-col tw-space-y-2',
            }}
          >
            {/* {appBarLinks.map((link) => (
              <DrawerListItem
                toggleDrawer={toggleDrawer}
                key={link.title}
                title={link.title}
                href={link.href}
              />
            ))} */}
          </MList>
        }
      >
        {/* {appBarLinks.map((link) => (
          <AppBarLink
            key={link.title}
            href={link.href}
            isProtected={link.isProtected}
          >
            {link.title}
          </AppBarLink>
        ))} */}
      </AppBar>
      <MBox className="tw-grow tw-flex tw-flex-col">
        <MToolbar />
        {children}
      </MBox>
      <Footer />
    </>
  );
};

export default PublicPagesLayout;
