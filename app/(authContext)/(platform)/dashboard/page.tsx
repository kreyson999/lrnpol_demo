import { redirect } from 'next/navigation';

const DashboardHomePage = () => {
  redirect('/dashboard/kursy');
};

export default DashboardHomePage;
