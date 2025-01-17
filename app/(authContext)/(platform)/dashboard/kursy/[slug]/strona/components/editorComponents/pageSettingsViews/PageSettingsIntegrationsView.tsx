'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { UpdateCourseLandingPageInput } from '@/services/API';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import { Typography } from '@mui/material';

import { generateClient } from 'aws-amplify/api';
import { useFetchedCourse } from '../../../../CourseContext';
import { updateLandingPageWithSections } from '@/services/graphql/course/landingPage/mutations';
import { getCourseLandingPageIntegrationsSettings } from '@/services/graphql/course/landingPage/queries';
import PageLoader from '@/components/shared/PageLoader';

const updateCourseSeoValidationSchema = yup.object({
  tawkPropertyId: yup.string().optional(),
  tawkWidgetId: yup.string().optional(),
});

type FormikData = {
  tawkPropertyId: string;
  tawkWidgetId: string;
};

const PageSettingsIntegrationsView = () => {
  const { course } = useFetchedCourse();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateCourseLandingPage = useCallback(
    async (data: FormikData) => {
      try {
        const client = generateClient({ authMode: 'userPool' });

        const input: UpdateCourseLandingPageInput = {
          id: course!.courseCourseLandingPageId!,
          ...data,
        };

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
    [setErrorMessage, showSnackbar, course]
  );

  const {
    errors,
    values,
    touched,
    setValues,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<FormikData>({
    initialValues: {
      tawkPropertyId: '',
      tawkWidgetId: '',
    },
    validationSchema: updateCourseSeoValidationSchema,
    onSubmit: (e) => {
      setIsLoading(true);
      void handleUpdateCourseLandingPage(e);
    },
  });

  const handleFetchIntegrationsSettings = useCallback(async () => {
    try {
      const client = generateClient({ authMode: 'userPool' });
      const response = await client.graphql({
        query: getCourseLandingPageIntegrationsSettings,
        variables: {
          id: course!.courseCourseLandingPageId!,
        },
      });

      if (!response.data.getCourseLandingPage) throw Error();

      const { tawkPropertyId, tawkWidgetId } =
        response.data.getCourseLandingPage;

      await setValues({
        tawkPropertyId: tawkPropertyId ?? '',
        tawkWidgetId: tawkWidgetId ?? '',
      });
    } catch (error) {
      setErrorMessage('Nie udało się pobrać informacji o domenie kursu!');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, course, setValues]);

  useEffect(() => {
    setIsLoading(true);
    void handleFetchIntegrationsSettings();
  }, [handleFetchIntegrationsSettings]);

  return (
    <PageLoader isLoading={isLoading}>
      <MBox
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="tw-pt-4 tw-px-4 md:tw-px-0 tw-flex tw-flex-col tw-gap-4"
      >
        <Typography>Integracja Tawk.to</Typography>
        <TextInput
          id="tawkPropertyId"
          label="Tawk To Property Id"
          name="tawkPropertyId"
          value={values.tawkPropertyId}
          helperText={touched.tawkPropertyId && errors.tawkPropertyId}
          error={touched.tawkPropertyId && Boolean(errors.tawkPropertyId)}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextInput
          id="tawkWidgetId"
          label="Tawk To Widget Id"
          name="tawkWidgetId"
          value={values.tawkWidgetId}
          helperText={touched.tawkWidgetId && errors.tawkWidgetId}
          error={touched.tawkWidgetId && Boolean(errors.tawkWidgetId)}
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

export default PageSettingsIntegrationsView;
