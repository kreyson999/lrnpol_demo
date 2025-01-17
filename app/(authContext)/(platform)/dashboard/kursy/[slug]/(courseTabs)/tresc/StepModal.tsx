'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CourseSectionStepType } from '@/services/API';

import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

import Modal from '@/components/materialUI/Modal';
import TextInput from '@/components/materialUI/TextInput';
import MBox from '@mui/material/Box';
import Button from '@/components/materialUI/Button';
import Select from '@/components/materialUI/Select';

import { StepTypeTranslations } from '@/constants/Translations';
import {
  CreateStepSchema,
  UpdateStepSchema,
  validateCreateStepSchema,
  validateUpdateStepSchema,
} from '@/app/api/Validations';
import CourseService from '@/services/api/CourseService';
import { useParams } from 'next/navigation';
import { generateClient } from 'aws-amplify/api';
import { UpdateSectionStep } from '@/services/graphql/course/contentSection/step/mutations';

type Props = {
  isOpen: boolean;
  id?: string;
  title?: string;
  sectionId: string;
  nextStepPosition: number;
  onClose: () => void;
  refreshAllSections: () => void;
};

const StepModal = ({
  isOpen,
  id,
  title,
  sectionId,
  nextStepPosition,
  refreshAllSections,
  onClose,
}: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateStep = async (data: CreateStepSchema) => {
    try {
      await CourseService.course(slug).section(sectionId).createStep(data);

      formik.resetForm();

      showSnackbar('Pomyślnie dodano etap!');
      onClose();
      refreshAllSections();
    } catch (errors) {
      setErrorMessage('Nie udało się stworzyć etapu!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStep = async (id: string, { title }: UpdateStepSchema) => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      await client.graphql({
        query: UpdateSectionStep,
        variables: { input: { id: id, title: title } },
      });

      showSnackbar('Pomyślnie dodano etap!');
      onClose();
      refreshAllSections();
    } catch (error) {
      setErrorMessage('Nie udało się edytować etapu!');
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      type: CourseSectionStepType.VIDEO,
      title: title ?? '',
      position: nextStepPosition,
    },
    validationSchema: id ? validateUpdateStepSchema : validateCreateStepSchema,
    onSubmit: (data) => {
      setIsLoading(true);
      if (id) {
        void handleUpdateStep(id, data);
        return;
      }
      void handleCreateStep(data);
    },
  });

  useEffect(() => {
    if (title) {
      void setFieldValue('title', title);
    }
  }, [setFieldValue, title]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={id ? 'Edytuj etap' : 'Stwórz etap'}
    >
      <MBox
        className="tw-flex tw-flex-col"
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextInput
          className={!id ? 'tw-mb-4' : ''}
          id="title"
          label="Tytuł etapu"
          name="title"
          value={formik.values.title}
          helperText={formik.touched.title && formik.errors.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {!id && (
          <Select
            id="type"
            label="Typ etapu"
            name="type"
            value={formik.values.type}
            items={Object.values(CourseSectionStepType).map((state) => ({
              title: StepTypeTranslations[state],
              value: state,
            }))}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}

        <Button isLoading={isLoading} primary className="tw-mt-4 ">
          {id ? 'Zapisz' : 'Dodaj'}
        </Button>
      </MBox>
    </Modal>
  );
};

export default StepModal;
