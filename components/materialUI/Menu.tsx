import React from 'react';

import MMenu from '@mui/material/Menu';
import MMenuList from '@mui/material/MenuList';
import type { PopoverOrigin } from '@mui/material';

type Props = {
  children: React.ReactNode;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  id: string;
  buttonId: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  container?: HTMLElement;
};

const Menu = ({
  container,
  children,
  anchorEl,
  onClose,
  buttonId,
  id,
  anchorOrigin,
  transformOrigin,
}: Props) => {
  return (
    <MMenu
      container={container}
      classes={{
        root: 'tw-rounded-lg',
        paper: 'tw-rounded-lg',
        list: 'tw-rounded-lg  tw-py-0 tw-border tw-border-primary-light tw-bg-background-paper',
      }}
      id={id}
      open={Boolean(anchorEl)}
      onClose={() => onClose()}
      anchorEl={anchorEl}
      anchorOrigin={
        anchorOrigin ?? {
          vertical: 'bottom',
          horizontal: 'center',
        }
      }
      transformOrigin={
        transformOrigin ?? {
          vertical: 'top',
          horizontal: 'center',
        }
      }
      MenuListProps={{
        'aria-labelledby': buttonId,
      }}
      sx={{
        width: 320,
        maxWidth: '100%',
        '.MuiList-root': {
          paddingTop: '0px',
          paddingBottom: '0px',
        },
      }}
    >
      <MMenuList>{children}</MMenuList>
    </MMenu>
  );
};

export default Menu;
