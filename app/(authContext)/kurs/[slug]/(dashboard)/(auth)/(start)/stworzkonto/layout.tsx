import React from 'react';
import PageProtector from '../../../PageProtector';

type Props = {
  children: React.ReactNode;
};

const PayLayout = ({ children }: Props) => {
  return <PageProtector redirectIfAuthenticated>{children}</PageProtector>;
};

export default PayLayout;
