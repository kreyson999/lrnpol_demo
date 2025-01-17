'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useErrorState } from '@/contexts/ErrorContext';
import { parseError } from '@/helpers/parseError';

import MTypography from '@mui/material/Typography';
import PageLoader from '@/components/shared/PageLoader';
import MBox from '@mui/material/Box';
import { getSignedImageURL } from '@/helpers/getSignedImageURL';
import { generateClient } from 'aws-amplify/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { UserGroup } from '@/constants/enums';
import {
  getAdminListCourse,
  getInstructorListCourse,
} from '@/services/graphql/course/queries';
import { IconButton } from '@mui/material';
import Button from '@/components/materialUI/Button';
import Chip from '@mui/material/Chip';
import { useWindowSize } from '@/hooks/useWindowSize';

import AddIcon from '@mui/icons-material/Add';
import { CourseStatus } from '@/services/API';

type Course = {
  slug: string;
  title: string;
  logo: string | null;
  price: number;
  status: CourseStatus;
};

const InstructorDashboardCourses = () => {
  const setErrorMessage = useErrorState();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [windowWidth] = useWindowSize();

  const fetchCourses = useCallback(async () => {
    try {
      const client = generateClient();

      const { data, errors } = await client.graphql({
        query: auth.user?.groups.includes(UserGroup.ADMIN)
          ? getAdminListCourse
          : getInstructorListCourse,
        variables: {
          owner: `${auth.user!.id}::${auth.user!.id}`,
        },
      });

      if (errors) throw parseError(errors.map((error) => error.message));

      const listCourses =
        'listCourses' in data ? data.listCourses : data.courseByOwner;

      const courses = await Promise.all(
        listCourses.items.map(async (course) => {
          const returnedCourse: Course = {
            slug: course.slug,
            title: course.title,
            logo: null,
            price: course.price ?? 0,
            status: course.status,
          };
          if (course.logoKey) {
            returnedCourse.logo = await getSignedImageURL(course.logoKey);
          }

          return returnedCourse;
        })
      );

      setCourses(courses);
    } catch (errors) {
      setErrorMessage(errors as string);
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, auth.user]);

  useEffect(() => {
    setIsLoading(true);
    void fetchCourses();
  }, [fetchCourses]);

  return (
    <>
      <MBox className="md:tw-pl-4 md:tw-pt-4 tw-flex tw-justify-between tw-items-center md:tw-items-start tw-mx-4 tw-gap-4 tw-my-4 md:tw-mt-0 md:tw-ml-0">
        <MTypography className="tw-text-xl tw-font-semibold tw-uppercase">
          Stworzone kursy:
        </MTypography>
        <Link href="/dashboard/kursy/stworz">
          {windowWidth < 768 ? (
            <IconButton>
              <AddIcon />
            </IconButton>
          ) : (
            <MBox className="tw-w-fit">
              <Button primary>Stwórz kurs</Button>
            </MBox>
          )}
        </Link>
      </MBox>
      <PageLoader isLoading={isLoading}>
        <MBox className="tw-flex tw-flex-col tw-gap-4 tw-px-4 tw-mb-16">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Link key={course.slug} href={`/dashboard/kursy/${course.slug}`}>
                <Card
                  classes={{
                    root: 'tw-px-4 tw-py-4 tw-rounded-lg tw-border tw-border-primary-light tw-flex tw-flex-col',
                  }}
                  elevation={0}
                >
                  {course.logo && (
                    <CardMedia
                      classes={{
                        root: 'tw-flex',
                      }}
                    >
                      <MBox className="tw-mb-4">
                        <Image
                          src={course.logo}
                          alt={`Logo kursu: ${course.title}`}
                          width={200}
                          height={30}
                        />
                      </MBox>
                    </CardMedia>
                  )}
                  <CardContent
                    classes={{
                      root: 'tw-flex tw-flex-col tw-gap-2  tw-text-primary-contrastText tw-py-0 tw-px-0',
                    }}
                  >
                    <MBox className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 sm:tw-gap-6">
                      <MBox className="tw-text-secondary-contrastText">
                        <MTypography className="tw-text-sm ">
                          Nazwa kursu:
                        </MTypography>
                        <MTypography className="tw-text-xl tw-font-bold">
                          {course.title}
                        </MTypography>
                      </MBox>
                      <MBox className="tw-flex tw-flex-col">
                        <MTypography className="tw-text-sm tw-text-secondary-contrastText">
                          Cena kursu:
                        </MTypography>
                        <MTypography className="tw-text-xl tw-font-bold">
                          {course.price} PLN
                        </MTypography>
                      </MBox>
                      <MBox className="tw-flex tw-flex-col">
                        <MTypography className="tw-text-sm tw-text-secondary-contrastText">
                          Status:
                        </MTypography>
                        <Chip
                          size="small"
                          className="tw-mt-1 tw-w-fit"
                          color={
                            course.status === CourseStatus.DRAFT
                              ? 'default'
                              : 'success'
                          }
                          label={
                            course.status === CourseStatus.DRAFT
                              ? 'Wersja robocza'
                              : 'Opublikowany'
                          }
                        />
                      </MBox>
                    </MBox>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <MBox className="tw-my-8 tw-flex tw-flex-col tw-grow tw-items-center tw-justify-center">
              <Image
                src="/assets/empty_courses.svg"
                alt="Brak stworzonych kursów"
                width={300}
                height={200}
              />
              <MTypography className="tw-text-lg tw-text-center tw-mt-8">
                Nie ma jeszcze żadnych kursów!
              </MTypography>
              <MBox className="tw-mt-4">
                <Button href="/dashboard/kursy/stworz" primary>
                  Stwórz go teraz!
                </Button>
              </MBox>
            </MBox>
          )}
        </MBox>
      </PageLoader>
    </>
  );
};

export default InstructorDashboardCourses;
