'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { uploadData } from 'aws-amplify/storage';

import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useFetchedCourse } from '../CourseContext';
import { UpdateCourseInput } from '@/services/API';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import FileInput from '@/components/shared/FileInput';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { getLocalImageURL } from '@/helpers/getLocalImageURL';
import { getSignedImageURL } from '@/helpers/getSignedImageURL';
import { onInputFileChange } from '@/helpers/onInputFileChange';
import { updateDashboardCourse } from '@/services/graphql/course/mutations';
import { generateClient } from 'aws-amplify/api';

import UploadIcon from '@mui/icons-material/Upload';

const updateCourseValidationSchema = yup.object({
  title: yup
    .string()
    .min(4, 'Tytuł kursu musi mieć przynajmniej 4 znaki!')
    .max(128, 'Tytuł kursu może mieć maksymalnie 128 znaków!')
    .required('Tytuł kursu jest wymagany!'),
  price: yup
    .number()
    .positive('Cena musi być liczbą większa od 0.')
    .required('Cena jest wymagana!'),
  discountPrice: yup
    .number()
    .positive('Cena przed przeceną musi być liczbą większa od 0.')
    .nullable(),
  facebookPixelId: yup.string().optional(),
});

type FormData = {
  title: string;
  price: string;
  logo: File | string | null;
  discountPrice: string;
  facebookPixelId: string;
};

const DashboardCoursePage = () => {
  const { course, refresh: refreshCourse } = useFetchedCourse();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [isCourseDiscounted, setIsCourseDiscounted] = useState(
    !!course?.discountPrice
  );

  const handleUploadFile = useCallback(
    async (logo: File, fileName: string): Promise<string | null> => {
      if (logo && typeof logo === 'object') {
        const fileExtension = logo.name.split('.').at(-1);
        try {
          const result = await uploadData({
            key: `${course!.slug}/${fileName}.${fileExtension}`,
            data: logo,
            options: {
              contentType: logo.type,
            },
          }).result;

          return result.key;
        } catch (error) {
          setErrorMessage(`Nie udało się przesłać: ${logo.name}`);
        }
      }
      return null;
    },
    [course, setErrorMessage]
  );

  const handleUpdateCourse = useCallback(
    async (data: FormData) => {
      try {
        const client = generateClient({ authMode: 'userPool' });
        const { logo, ...rest } = data;

        const input: UpdateCourseInput = {
          slug: course!.slug,
          ...rest,
          price: rest.price ? parseFloat(rest.price) : null,
          discountPrice: rest.discountPrice
            ? parseFloat(rest.discountPrice)
            : null,
        };

        if (logo instanceof File) {
          input.logoKey = await handleUploadFile(logo, 'logo');
        }

        const { errors: courseErrors } = await client.graphql({
          query: updateDashboardCourse,
          variables: { input },
        });

        if (courseErrors) throw Error('Nie udało się zaktualizować kursu!');

        showSnackbar('Pomyślnie zaaktualizowano kurs!');
        refreshCourse();
      } catch (errors) {
        setErrorMessage('Wystąpił błąd podczas aktualizacji kursu!');
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorMessage, refreshCourse, showSnackbar, course, handleUploadFile]
  );

  const {
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<FormData>({
    initialValues: {
      title: course?.title ?? '',
      price: String(course?.price) ?? '',
      discountPrice: course?.discountPrice ? String(course?.discountPrice) : '',
      logo: null,
      facebookPixelId: course?.facebookPixelId ?? '',
    },
    validationSchema: updateCourseValidationSchema,
    onSubmit: (e) => {
      setIsLoading(true);
      void handleUpdateCourse(e);
    },
  });

  const getFormImages = useCallback(async () => {
    if (!course) return;

    if (course.logoKey) {
      const url = await getSignedImageURL(course.logoKey);
      void setFieldValue('logo', url);
    }
  }, [course, setFieldValue]);

  const handleTogglePriceDiscount = () => {
    setIsCourseDiscounted((state) => {
      if (state === true) {
        void setFieldValue('discountPrice', '');
      }
      return !state;
    });
  };

  useEffect(() => {
    void getFormImages();
  }, [getFormImages]);

  return (
    <MBox
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="tw-pt-4 tw-pr-4 md:tw-px-0 tw-flex tw-flex-col tw-gap-4 tw-mb-16"
    >
      <FileInput
        name="logo"
        accept="image/png, image/jpeg"
        onChange={(e) =>
          onInputFileChange(e, (file) => void setFieldValue('logo', file))
        }
        helperText={errors.logo}
      >
        <MBox className="tw-rounded-lg tw-flex tw-flex-col tw-border tw-border-dashed tw-border-primary-light tw-p-4 tw-items-center tw-gap-4">
          {values.logo ? (
            <Image
              src={
                values.logo instanceof File
                  ? getLocalImageURL(values.logo)
                  : values.logo
              }
              alt="Logo kursu"
              width={200}
              height={100}
            />
          ) : (
            <>
              <UploadIcon className="tw-text-4xl" />
              <Typography>Logo kursu na platformie kursowej</Typography>
            </>
          )}
        </MBox>
      </FileInput>
      <TextInput
        id="title"
        label="Tytuł"
        name="title"
        value={values.title}
        helperText={touched.title && errors.title}
        error={touched.title && Boolean(errors.title)}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <TextInput
        id="price"
        label="Cena"
        name="price"
        type="number"
        value={values.price}
        helperText={touched.price && errors.price}
        error={touched.price && Boolean(errors.price)}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Switch
            onChange={handleTogglePriceDiscount}
            value={isCourseDiscounted}
          />
        }
        label="Czy kurs jest przeceniony?"
      />

      {isCourseDiscounted && (
        <TextInput
          id="discountPrice"
          label="Cena przed przeceną"
          name="discountPrice"
          type="number"
          value={values.discountPrice}
          helperText={touched.discountPrice && errors.discountPrice}
          error={touched.discountPrice && Boolean(errors.discountPrice)}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      )}

      <Typography>Integracje</Typography>
      <TextInput
        id="facebookPixelId"
        label="Identyfikator Facebook Pixel"
        name="facebookPixelId"
        value={values.facebookPixelId}
        helperText={touched.facebookPixelId && errors.facebookPixelId}
        error={touched.facebookPixelId && Boolean(errors.facebookPixelId)}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <MBox className="tw-flex tw-flex-col md:tw-grid md:tw-self-end  tw-gap-4">
        <Button
          className="md:tw-hidden"
          href={`/dashboard/kursy/${course?.slug}/strona`}
        >
          Edytuj stronę kursu
        </Button>
        <Button primary type="submit" isLoading={isLoading}>
          Zapisz
        </Button>
      </MBox>
    </MBox>
  );
};

export default DashboardCoursePage;
