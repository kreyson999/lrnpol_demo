import React from 'react';
import { cookies } from 'next/headers';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';

import AppBar from '@/components/materialUI/AppBar';
import MBox from '@mui/material/Box';
import MToolbar from '@mui/material/Toolbar';
import config from '@/amplifyconfiguration.json';

import { getPublicCourseData } from '@/services/graphql/course/queries';

import ErrorContainer from '@/components/shared/ErrorContainer';
import CourseContextProvider from './CourseContext';
import ThemeRegistry from '@/components/materialUI/ThemeRegistry';
import { theme } from '@/config/MaterialUITheme';
import FacebookPixel from '../FacebookPixel';
import { Metadata } from 'next';
import { signAmplifyServerImage } from '@/helpers/signAmplifyServerImage';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

const CourseLayout = async ({ children, params: { slug } }: Props) => {
  const amplifyServerClient = generateServerClientUsingCookies({
    config,
    cookies,
    authMode: 'apiKey',
  });

  const { data, errors } = await amplifyServerClient.graphql({
    query: getPublicCourseData,
    variables: {
      slug,
    },
  });

  if (!data.getCourse) {
    return (
      <ErrorContainer>
        Kurs, na który próbujesz wejść nie istnieje!
      </ErrorContainer>
    );
  }

  if (errors) {
    return (
      <ErrorContainer>
        Wystąpił błąd podczas pobierania kursu z bazy danych:{' '}
        {JSON.stringify(errors)}
      </ErrorContainer>
    );
  }

  const courseData = {
    ...data.getCourse,
    logo: data.getCourse.logoKey
      ? await signAmplifyServerImage(data.getCourse.logoKey)
      : undefined,
  };

  return (
    <>
      {data.getCourse.facebookPixelId && (
        <FacebookPixel id={data.getCourse.facebookPixelId} />
      )}
      <ThemeRegistry options={{ key: 'mui' }} theme={theme}>
        <AppBar logo={courseData.logo} isCourseDashboardLayout={true} />
        <MBox className="tw-grow tw-flex tw-flex-col">
          <MToolbar />
          <MBox className="tw-grow tw-flex tw-flex-col">
            <CourseContextProvider value={courseData}>
              {children}
            </CourseContextProvider>
          </MBox>
        </MBox>
        <Footer />
      </ThemeRegistry>
    </>
  );
};

export default CourseLayout;
