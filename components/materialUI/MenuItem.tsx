import React from 'react';

import MMenuItem from '@mui/material/MenuItem';
import MListItemIcon from '@mui/material/ListItemIcon';
import MListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

type Props = {
  icon?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const MenuItem = ({ icon, children, href, className, onClick }: Props) => {
  const menuItem = (
    <MMenuItem
      className={`${className} hover:tw-bg-background-default tw-pl-2 tw-pr-4`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
    >
      {icon && <MListItemIcon>{icon}</MListItemIcon>}
      <MListItemText className="tw-text-primary-contrastText">
        {children}
      </MListItemText>
    </MMenuItem>
  );

  if (onClick) {
    return menuItem;
  }
  return <Link href={href ?? ''}>{menuItem}</Link>;
};

export default MenuItem;
