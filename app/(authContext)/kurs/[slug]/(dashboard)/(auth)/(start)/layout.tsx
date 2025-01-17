'use client';

import React, { useEffect, useState } from 'react';
import MContainer from '@mui/material/Container';
import { usePathname } from 'next/navigation';
import Stepper from '@/components/shared/Stepper';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

type Props = {
  children: React.ReactNode;
};

const steps = [
  {
    title: 'Stwórz konto',
    href: '/stworzkonto',
    icon: <PersonRoundedIcon />,
  },
  {
    title: 'Zapłać',
    href: '/zaplac',
    icon: <PaymentsRoundedIcon />,
  },
  {
    title: 'Zacznij naukę',
    href: '/app/etap',
    icon: <VerifiedRoundedIcon />,
  },
];

const StartLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(() => {
      if (pathname.includes('stworzkonto')) {
        return 0;
      }
      return 1;
    });
  }, [pathname]);

  return (
    <MContainer maxWidth="md" className="tw-grow tw-mt-16 tw-flex tw-flex-col">
      <Stepper activeStep={activeIndex} steps={steps} />
      {children}
    </MContainer>
  );
};

export default StartLayout;
