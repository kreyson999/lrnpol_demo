'use client';

import React, { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import MIconButton from '@mui/material/IconButton';
import ConfirmActionModal from '@/components/shared/ConfirmActionModal';
import Link from 'next/link';
import { useFetchedCourse } from '../CourseContext';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '@/services/graphql/mutations';

import { CourseStatus, DeleteCourseInput } from '@/services/API';
import { useSnackbar } from '@/hooks/useSnackbar';
import { parseError } from '@/helpers/parseError';
import { useErrorState } from '@/contexts/ErrorContext';
import IconButton from '@mui/material/IconButton';
import Menu from '@/components/materialUI/Menu';
import MenuItem from '@/components/materialUI/MenuItem';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DraftsIcon from '@mui/icons-material/Drafts';
import Button from '@/components/materialUI/Button';
import { useWindowSize } from '@/hooks/useWindowSize';
import Select from '@/components/materialUI/Select';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const subpages = [
  {
    title: 'Twój kurs',
    pathname: '',
  },
  {
    title: 'Treść kursu',
    pathname: '/tresc',
  },
  {
    title: 'Strona sprzedażowa',
    pathname: '/strona',
  },
  {
    title: 'Weryfikacja',
    pathname: '/weryfikacja',
  },
  {
    title: 'Analityka',
    pathname: '/analityka',
  },
];

const CourseTabsLayout = ({ children, params }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { course } = useFetchedCourse();
  const { showSnackbar } = useSnackbar();
  const setErrorMessage = useErrorState();
  const [windowWidth] = useWindowSize();

  const [courseMenuAnchorEl, setCourseMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const toggleCourseMenu = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.stopPropagation();
    setCourseMenuAnchorEl(e ? e.currentTarget : null);
  };

  const handleDeleteCourse = async (slug: string) => {
    try {
      const client = generateClient({ authMode: 'userPool' });
      const input: DeleteCourseInput = {
        slug,
      };

      const { errors } = await client.graphql({
        query: mutations.deleteCourse,
        variables: { input },
      });
      if (errors) throw parseError(errors.map((error) => error.message));
      showSnackbar('Pomyślnie usunięto kurs!');
      router.push('/dashboard/kursy');
    } catch (errors) {
      setErrorMessage(
        `Wystąpił błąd podczas usuwania kursu: ${JSON.stringify(errors)}`
      );
    }
  };

  return (
    <MBox className="tw-flex tw-flex-col">
      {!pathname.includes('/tresc/etap') && (
        <>
          <MBox className="tw-flex tw-flex-col md:tw-pt-4 tw-mt-4 tw-px-4 md:tw-mt-0 md:tw-px-0 ">
            <MBox className="md:tw-pl-4 tw-flex tw-items-start md:tw-items-center tw-justify-between tw-gap-4">
              <MBox className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-gap-2">
                <MBox className="tw-flex tw-items-center">
                  <Link href="/dashboard/kursy">
                    <MIconButton className="-tw-ml-2">
                      <ArrowBackIcon />
                    </MIconButton>
                  </Link>
                  <MTypography className="tw-mr-2 tw-text-primary-contrastText tw-text-xl tw-font-semibold">
                    {course?.title}
                  </MTypography>
                </MBox>
                <MBox>
                  {course?.status === CourseStatus.PUBLISHED ? (
                    <MBox
                      className={`tw-flex tw-items-center tw-text-green-500 tw-gap-2 tw-my-1`}
                    >
                      <CheckCircleIcon />
                      <MTypography>Opublikowano</MTypography>
                    </MBox>
                  ) : (
                    <MBox
                      className={`tw-flex tw-items-center tw-text-gray-500 tw-gap-2 tw-my-1`}
                    >
                      <DraftsIcon />
                      <MTypography>Wersja robocza</MTypography>
                    </MBox>
                  )}
                </MBox>
              </MBox>
              <MBox className="tw-flex tw-gap-4 ">
                <IconButton
                  id="course-menu-button"
                  aria-controls={courseMenuAnchorEl ? 'course-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={courseMenuAnchorEl ? 'true' : undefined}
                  onClick={toggleCourseMenu}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={courseMenuAnchorEl}
                  onClose={toggleCourseMenu}
                  id="actions-menu"
                  buttonId="actions-menu-button"
                >
                  <ConfirmActionModal
                    e={course!.slug}
                    callback={handleDeleteCourse}
                    title="Usuń kurs"
                    description="Czy na pewno chcesz usunąć kurs?"
                    confirmButton="Usuń kurs"
                  >
                    <MenuItem>Usuń kurs</MenuItem>
                  </ConfirmActionModal>
                </Menu>
              </MBox>
            </MBox>
          </MBox>
          <MBox
            sx={{
              borderBottom: '1px solid',
              borderImageSlice: 1,
              borderImageSource:
                'linear-gradient(90deg, #3F3846 0%, #1A151F 100%)',
            }}
            className="tw-px-4 md:tw-pr-4 tw-pb-4 tw-pt-2 tw-w-full tw-flex tw-gap-4 "
          >
            {windowWidth < 1024 ? (
              <Select
                id="page"
                name="page"
                boxClassName="tw-w-full"
                value={pathname}
                items={subpages.map((subpage) => ({
                  title: subpage.title,
                  value: `/dashboard/kursy/${params.slug}${subpage.pathname}`,
                }))}
                onChange={({ target }) => {
                  router.push(target.value);
                }}
              />
            ) : (
              subpages.map(({ title, pathname: pagePathname }) => (
                <Button
                  key={title}
                  size="medium"
                  primary={
                    pathname ===
                    `/dashboard/kursy/${params.slug}${pagePathname}`
                  }
                  href={`/dashboard/kursy/${params.slug}${pagePathname}`}
                >
                  {title}
                </Button>
              ))
            )}
          </MBox>
        </>
      )}
      <MBox className="tw-pl-4 tw-flex tw-flex-col tw-grow">{children}</MBox>
    </MBox>
  );
};

export default CourseTabsLayout;
