'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MBox from '@mui/material/Box';
import CourseContextProvider from './CourseContext';
import { useErrorState } from '@/contexts/ErrorContext';
import { GetInstructorContextCourseQuery } from '@/services/API';
import { getInstructorContextCourse } from '@/services/graphql/course/queries';
import { generateClient } from 'aws-amplify/api';
import PageLoader from '@/components/shared/PageLoader';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const CourseLayout = ({ children, params }: Props) => {
  const setErrorMessage = useErrorState();

  const [course, setCourse] =
    useState<GetInstructorContextCourseQuery['getCourse']>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourse = useCallback(
    (slug: string) => {
      setIsLoading(true);
      const client = generateClient();

      client
        .graphql({
          query: getInstructorContextCourse,
          variables: { slug },
        })
        .then(({ data }) => {
          setCourse(data.getCourse);
        })
        .catch(() => {
          setErrorMessage('Nie udało się pobrać kursu!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setErrorMessage]
  );

  useEffect(() => {
    fetchCourse(params.slug);
  }, [fetchCourse, params.slug]);

  const value = useMemo(() => {
    return {
      course,
      refresh: () => fetchCourse(params.slug),
    };
  }, [params.slug, fetchCourse, course]);

  return (
    <MBox className="tw-flex tw-flex-col">
      <PageLoader isLoading={isLoading}>
        <CourseContextProvider value={value}>{children}</CourseContextProvider>
      </PageLoader>
    </MBox>
  );
};

export default CourseLayout;
