'use client';

import React, { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';

import { useRouter } from 'next/navigation';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

import MContainer from '@mui/material/Container';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import { InputAdornment } from '@mui/material';
import CoursesService from '@/services/api/CourseService';
import { validateCreateCourseSchema } from '@/app/api/Validations';
import { isDevEnv } from '@/helpers/isDevEnv';

const DashboardCoursesCreateCourseForm = () => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCourse = async (title: string, slug: string) => {
    try {
      const { data, errors } = await CoursesService.create({ title, slug });

      if (errors) throw Error();

      formik.resetForm();
      router.push(`/dashboard/kursy/${data?.createCourse!.slug}`);
      showSnackbar('Pomyślnie utworzono kurs!');
    } catch (errors) {
      setErrorMessage(
        `Wystąpił błąd podczas tworzenia kursu, upewnij się, że Twój kurs ma unikalną nazwę!`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      slug: '',
    },
    validationSchema: validateCreateCourseSchema,
    onSubmit: ({ title, slug }) => {
      setIsLoading(true);
      void handleCreateCourse(title, slug);
    },
  });

  const handleUpdateSlug = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    void formik.setValues((state) => {
      return {
        ...state,
        slug: e.target.value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      };
    });
  };

  const domainSuffix = isDevEnv() ? '.local.learnpool.pl' : '.learnpool.pl';

  return (
    <MContainer
      maxWidth="sm"
      className="tw-flex tw-flex-col tw-justify-center   tw-grow tw-text-white tw-pt-12 tw-pb-16"
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <MTypography className="tw-mb-4 tw-text-primary-main tw-text-center tw-text-5xl tw-font-extrabold tw-uppercase">
        Stwórz kurs
      </MTypography>
      <MTypography className="tw-text-lg tw-text-center tw-mb-8 tw-text-secondary-contrastText">
        Aby rozpocząć tworzenie kursu, najpierw uzupełnij jego tytuł i adres.{' '}
        <span className="tw-text-red-500">
          Pamiętaj, że adresu nie będzie można później zmienić.
        </span>
      </MTypography>
      <MBox className="tw-flex tw-flex-col  tw-gap-4">
        <TextInput
          id="title"
          label="Tytuł kursu"
          name="title"
          value={formik.values.title}
          helperText={formik.touched.title && formik.errors.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          onBlur={formik.handleBlur}
          onChange={(e) => {
            handleUpdateSlug(e);
            formik.handleChange(e);
          }}
        />
        <TextInput
          id="slug"
          label="Adres kursu"
          name="slug"
          value={formik.values.slug}
          helperText={formik.touched.slug && formik.errors.slug}
          error={formik.touched.slug && Boolean(formik.errors.slug)}
          endAdornment={
            <InputAdornment position="end">{domainSuffix}</InputAdornment>
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </MBox>

      <Button isLoading={isLoading} primary className="tw-mt-4">
        Stwórz kurs
      </Button>
    </MContainer>
  );
};

export default DashboardCoursesCreateCourseForm;
