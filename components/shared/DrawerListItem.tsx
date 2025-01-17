import React from 'react';
import MListItem from '@mui/material/ListItem';
import MListItemText from '@mui/material/ListItemText';
import MListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
  toggleDrawer: () => void;
};

const DrawerListItem = ({ title, href, toggleDrawer }: Props) => {
  return (
    <Link href={href} onClick={toggleDrawer}>
      <MListItem disablePadding>
        <MListItemButton
          classes={{
            root: 'tw-rounded-lg tw-mx-2 tw-px-2 tw-border tw-border-solid tw-border-primary-light tw-bg-background-default tw-text-primary-contrastText',
          }}
        >
          <MListItemText primary={title} />
        </MListItemButton>
      </MListItem>
    </Link>
  );
};

export default DrawerListItem;
