'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/materialUI/Modal';
import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useFormik } from 'formik';
import MBox from '@mui/material/Box';
import {
  CreateContentSectionSchema,
  validateCreateContentSectionSchema,
} from '@/app/api/Validations';
import CoursesService from '@/services/api/CourseService';
import { generateClient } from 'aws-amplify/api';
import { UpdateCourseSectionInput } from '@/services/API';
import { UpdateSection } from '@/services/graphql/course/contentSection/mutations';
import { useParams } from 'next/navigation';

type Props = {
  isOpen: boolean;
  id?: string;
  title?: string;
  position?: number;
  onRefresh: () => void;
  onClose: () => void;
};

const AddContentSection = ({
  isOpen,
  id,
  title,
  position,
  onRefresh,
  onClose,
}: Props) => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddSection = async (input: CreateContentSectionSchema) => {
    try {
      await CoursesService.course(input.courseSlug).createSection(input);

      formik.resetForm();
      showSnackbar('Pomyślnie dodano sekcje!');
      onRefresh();
      onClose();
    } catch (errors) {
      console.error('CONTENT SECTION ADD ERROR: ', errors);
      setErrorMessage('Nie udało się dodać sekcji!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSection = async ({
    id,
    title,
  }: UpdateCourseSectionInput) => {
    try {
      const client = generateClient({ authMode: 'oidc' });
      const input: UpdateCourseSectionInput = {
        id,
        title,
      };
      await client.graphql({
        query: UpdateSection,
        variables: { input },
      });
      formik.resetForm();
      showSnackbar('Pomyślnie zaktualizowano sekcje!');
      onRefresh();
      onClose();
    } catch (errors) {
      console.error('CONTENT SECTION UPDATE ERROR: ', errors);
      setErrorMessage('Nie udało się zaktualizować sekcji!');
    } finally {
      setIsLoading(false);
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      title: title ?? '',
      position: position ?? 0,
      courseSlug: params.slug as string,
    },
    validationSchema: validateCreateContentSectionSchema,
    onSubmit: (data) => {
      setIsLoading(true);
      if (id) {
        void handleUpdateSection({ id, ...data });
      } else {
        void handleAddSection(data);
      }
    },
  });

  useEffect(() => {
    if (id) {
      void setFieldValue('title', title ?? '');
      return;
    }
    void setFieldValue('position', position ?? 0);
  }, [position, setFieldValue, id, title]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={id ? 'Edytuj sekcję' : 'Dodaj sekcję'}
    >
      <MBox
        className="tw-flex tw-flex-col"
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextInput
          id="title"
          label="Tytuł sekcji"
          name="title"
          value={formik.values.title}
          helperText={formik.touched.title && formik.errors.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button isLoading={isLoading} primary className="tw-mt-4 ">
          {id ? 'Zapisz' : 'Dodaj'}
        </Button>
      </MBox>
    </Modal>
  );
};

export default AddContentSection;
