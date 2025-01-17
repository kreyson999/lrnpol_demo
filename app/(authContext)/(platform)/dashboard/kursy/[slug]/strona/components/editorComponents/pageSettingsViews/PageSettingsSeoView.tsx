'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { uploadData } from 'aws-amplify/storage';

import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { UpdateCourseLandingPageInput } from '@/services/API';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import FileInput from '@/components/shared/FileInput';
import { Typography } from '@mui/material';
import { getLocalImageURL } from '@/helpers/getLocalImageURL';
import { getSignedImageURL } from '@/helpers/getSignedImageURL';
import { onInputFileChange } from '@/helpers/onInputFileChange';
import { generateClient } from 'aws-amplify/api';
import { useParams } from 'next/navigation';
import { useFetchedCourse } from '../../../../CourseContext';
import { updateLandingPageWithSections } from '@/services/graphql/course/landingPage/mutations';
import { getCourseLandingPageSEOSettings } from '@/services/graphql/course/landingPage/queries';
import PageLoader from '@/components/shared/PageLoader';
import UploadIcon from '@mui/icons-material/Upload';
const updateCourseSeoValidationSchema = yup.object({
  metaTitle: yup
    .string()
    .min(4, 'Tytuł kursu musi mieć przynajmniej 4 znaki!')
    .max(128, 'Tytuł kursu może mieć maksymalnie 128 znaków!')
    .required('Tytuł kursu jest wymagany!'),
  metaDescription: yup
    .string()
    .min(4, 'Tytuł kursu musi mieć przynajmniej 4 znaki!')
    .max(256, 'Tytuł kursu może mieć maksymalnie 128 znaków!')
    .required('Tytuł kursu jest wymagany!'),
  favicon: yup.mixed().required('Ikonka kursu jest wymagane!'),
});

type FormikData = {
  favicon: File | string | null;
  metaTitle: string;
  metaDescription: string;
};

const PageSettingsSeoView = () => {
  const { course } = useFetchedCourse();
  const setErrorMessage = useErrorState();
  const { slug } = useParams();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);

  const handleUploadFile = useCallback(
    async (logo: File, fileName: string): Promise<string | null> => {
      if (logo && typeof logo === 'object') {
        // get the file extension from the end of the file name
        const fileExtension = logo.name.split('.').at(-1);
        try {
          const result = await uploadData({
            key: `${String(slug)}/${fileName}.${fileExtension}`,
            data: logo,
            options: {
              contentType: logo.type, // contentType is optional
            },
          }).result;

          return result.key;
        } catch (error) {
          setErrorMessage(`Nie udało się przesłać: ${logo.name}`);
        }
      }
      return null;
    },
    [setErrorMessage, slug]
  );

  const handleUpdateCourseLandingPage = useCallback(
    async (data: FormikData) => {
      try {
        const client = generateClient({ authMode: 'userPool' });
        const { favicon, ...rest } = data;

        const input: UpdateCourseLandingPageInput = {
          id: course!.courseCourseLandingPageId!,
          ...rest,
        };

        if (favicon instanceof File) {
          input.faviconKey = await handleUploadFile(favicon, 'favicon');
        }

        await client.graphql({
          query: updateLandingPageWithSections,
          variables: { input },
        });

        showSnackbar('Pomyślnie zaaktualizowano kurs!');
      } catch (errors) {
        setErrorMessage('Wystąpił błąd podczas aktualizacji kursu!');
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorMessage, showSnackbar, course, handleUploadFile]
  );

  const {
    errors,
    values,
    touched,
    setValues,
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<FormikData>({
    initialValues: {
      favicon: null,
      metaTitle: '',
      metaDescription: '',
    },
    validationSchema: updateCourseSeoValidationSchema,
    onSubmit: (e) => {
      setIsLoading(true);
      void handleUpdateCourseLandingPage(e);
    },
  });

  const handleFetchSEOSettings = useCallback(async () => {
    try {
      const client = generateClient({ authMode: 'userPool' });
      const response = await client.graphql({
        query: getCourseLandingPageSEOSettings,
        variables: {
          id: course!.courseCourseLandingPageId!,
        },
      });

      if (!response.data.getCourseLandingPage) throw Error();

      const { faviconKey, metaTitle, metaDescription } =
        response.data.getCourseLandingPage;

      await setValues({
        favicon: faviconKey ? await getSignedImageURL(faviconKey) : null,
        metaTitle: metaTitle ?? '',
        metaDescription: metaDescription ?? '',
      });
    } catch (error) {
      setErrorMessage('Nie udało się pobrać informacji o domenie kursu!');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, course, setValues]);

  useEffect(() => {
    setIsLoading(true);
    void handleFetchSEOSettings();
  }, [handleFetchSEOSettings]);

  return (
    <PageLoader isLoading={isLoading}>
      <MBox
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="tw-pt-4 tw-px-4 md:tw-px-0 tw-flex tw-flex-col tw-gap-4"
      >
        <Typography>Tagi Meta (SEO)</Typography>
        <FileInput
          name="favicon"
          accept="image/png, image/jpeg, image/vnd.microsoft.icon"
          onChange={(e) =>
            onInputFileChange(e, (file) => void setFieldValue('favicon', file))
          }
          helperText={errors.favicon}
        >
          <MBox className="tw-rounded-lg tw-flex tw-flex-col tw-border tw-border-dashed tw-border-primary-light tw-p-4 tw-items-center tw-gap-4">
            {values.favicon ? (
              <Image
                src={
                  values.favicon instanceof File
                    ? getLocalImageURL(values.favicon)
                    : values.favicon
                }
                alt="Ikonka kursu"
                width={32}
                height={32}
              />
            ) : (
              <>
                <UploadIcon className="tw-text-4xl" />
                <Typography>
                  Prześlij ikonkę kursu (zalecany format .ico)
                </Typography>
              </>
            )}
          </MBox>
        </FileInput>
        <TextInput
          id="metaTitle"
          label="Tytuł strony"
          name="metaTitle"
          value={values.metaTitle}
          helperText={touched.metaTitle && errors.metaTitle}
          error={touched.metaTitle && Boolean(errors.metaTitle)}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextInput
          id="metaDescription"
          label="Opis strony"
          name="metaDescription"
          multiline
          value={values.metaDescription}
          helperText={touched.metaDescription && errors.metaDescription}
          error={touched.metaDescription && Boolean(errors.metaDescription)}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <MBox className="tw-flex tw-flex-col md:tw-grid md:tw-self-end  tw-gap-4">
          <Button primary type="submit" isLoading={isLoading}>
            Zapisz
          </Button>
        </MBox>
      </MBox>
    </PageLoader>
  );
};

export default PageSettingsSeoView;
