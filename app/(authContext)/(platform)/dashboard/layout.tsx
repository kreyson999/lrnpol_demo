'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import AppBar from '@/components/materialUI/AppBar';
import MBox from '@mui/material/Box';
import MToolbar from '@mui/material/Toolbar';
import MList from '@mui/material/List';

import Button from '@/components/materialUI/Button';
import DrawerListItem from '@/components/shared/DrawerListItem';
import Footer from '@/components/shared/Footer';

import { dashboardDrawerLinks } from '@/config/AppBarConfig';
import PageProtector from './PageProtector';

type Props = {
  children: React.ReactNode;
};

const InstructorDashboardLayout = ({ children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pathname = usePathname();

  const toggleDrawer = () => {
    setIsDrawerOpen((state) => !state);
  };

  const isDrawerVisible =
    pathname.includes('strona') ||
    pathname.startsWith('/dashboard/kursy/stworz');

  return (
    <>
      <AppBar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerChildren={
          <>
            <MList
              classes={{
                root: 'tw-flex tw-flex-col tw-space-y-2',
              }}
            >
              {dashboardDrawerLinks.map((link) => (
                <DrawerListItem
                  toggleDrawer={toggleDrawer}
                  key={link.title}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </MList>
          </>
        }
      ></AppBar>
      <PageProtector>
        <MBox className="tw-grow tw-flex tw-flex-col">
          <MToolbar />
          {isDrawerVisible ? (
            children
          ) : (
            <MBox className="tw-grow md:tw-grid md:tw-grid-cols-12 tw-px-0 md:tw-px-4">
              <MBox
                sx={{
                  borderRight: '1px solid',
                  borderImageSlice: 1,
                  borderImageSource:
                    'linear-gradient(180deg, #3F3846 0%, #1A151F 100%)',
                }}
                className="tw-relative tw-hidden md:tw-block  md:tw-col-span-3 xl:tw-col-span-2  md:tw-pt-4 md:tw-pr-4  "
              >
                <MBox className="tw-sticky md:tw-top-20 md:tw-flex md:tw-flex-col md:tw-space-y-4">
                  {dashboardDrawerLinks.map((link) => (
                    <Button key={link.title} href={link.href}>
                      {link.title}
                    </Button>
                  ))}
                </MBox>
              </MBox>
              <MBox className="tw-grow tw-flex tw-flex-col  md:tw-col-span-9 xl:tw-col-span-10  tw-text-white">
                {children}
              </MBox>
            </MBox>
          )}
        </MBox>
      </PageProtector>
      <Footer />
    </>
  );
};

export default InstructorDashboardLayout;
