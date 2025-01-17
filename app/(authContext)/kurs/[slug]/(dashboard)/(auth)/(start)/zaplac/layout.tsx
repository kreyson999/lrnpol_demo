import React from 'react';
import PageProtector from '../../../PageProtector';

type Props = {
  children: React.ReactNode;
};

const PayLayout = ({ children }: Props) => {
  return (
    <PageProtector mustAuthenticated redirectIfPaidForCourse>
      {children}
    </PageProtector>
  );
};

export default PayLayout;
