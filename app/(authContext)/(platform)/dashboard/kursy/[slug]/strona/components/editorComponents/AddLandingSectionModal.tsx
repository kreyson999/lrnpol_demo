'use client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useModal } from '@/hooks/useModal';
import { useSnackbar } from '@/contexts/SnackbarContext';

import Modal from '@/components/materialUI/Modal';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import Select from '@/components/materialUI/Select';
import { CourseLandingPageSections } from '@/constants/enums/CourseLandingPageSections';
import { Sections } from '../../types/sections/Sections';
import { CourseLandingPageSectionTranslations } from '@/constants/CourseLandingPageSectionTranslations';

const addLandingSectionSchema = yup.object({
  type: yup
    .string()
    .oneOf(
      Object.values(CourseLandingPageSections),
      'Proszę wybrać prawidłowy typ sekcji!'
    )
    .required('Typ etapu jest wymagany!'),
});

type Props = {
  onSectionAdd: (section: Sections) => void;
};

const AddLandingSectionModal = ({ onSectionAdd }: Props) => {
  const [isActionOpen, toggleAction] = useModal();
  const { showSnackbar } = useSnackbar();

  const handleAddSection = (type: CourseLandingPageSections) => {
    switch (type) {
      case CourseLandingPageSections.FEATURES:
        onSectionAdd({
          backgroundColor: '#FFFFFF',
          features: {
            items: [
              {
                backgroundColor: '#67A1F2',
                textColor: '#242424',
                iconColor: '#FFFFFF',
              },
              {
                backgroundColor: '#67A1F2',
                textColor: '#242424',
                iconColor: '#FFFFFF',
              },
              {
                backgroundColor: '#67A1F2',
                textColor: '#242424',
                iconColor: '#FFFFFF',
              },
            ],
          },
        });
        break;

      case CourseLandingPageSections.ABOUT_COURSE:
        onSectionAdd({
          backgroundColor: '#FFFFFF',
          aboutCourse: {
            title: 'Opis kursu',
            titleTextColor: '#242424',
            content: '',
            contentTextColor: '#242424',
          },
        });
        break;
      case CourseLandingPageSections.SUBJECTS:
        onSectionAdd({
          backgroundColor: '#FFFFFF',
          subjects: {
            title: 'Tematy',
            titleTextColor: '#242424',
            subtitle: 'Tutaj dodaj tematy swojego kursu!',
            subtitleTextColor: '#242424',
            subjects: [],
          },
        });
        break;
      case CourseLandingPageSections.COURSE_CONTENT:
        onSectionAdd({
          backgroundColor: '#FFFFFF',
          courseContent: {
            title: 'Treść kursu',
            titleTextColor: '#242424',
            subtitle: 'Zobacz czego nauczysz się w naszym kursie!',
            subtitleTextColor: '#242424',

            sectionTitleBackgroundColor: '#FFFFFF',
            sectionTitleTextColor: '#242424',
            sectionArrowTextColor: '#242424',

            stepBackgroundColor: '#FFFFFF',
            stepTextColor: '#242424',
            stepIconColor: '#242424',
            stepDurationColor: '#242424',

            sectionBorderColor: '#242424',
            stepsDividerColor: '#242424',
          },
        });
        break;

      case CourseLandingPageSections.RECOMMENDED_COURSES:
        onSectionAdd({
          backgroundColor: '#FFFFFF',
          recommendedCourses: {
            titleTextColor: '#242424',
            subtitleTextColor: '#4D4D4D',

            courseTitleTextColor: '#242424',
            courseSlugs: [],
          },
        });
        break;

      default:
        break;
    }

    formik.resetForm();
    toggleAction(null);
    showSnackbar('Pomyślnie dodano sekcję do strony głównej!');
  };

  const formik = useFormik<{
    type: CourseLandingPageSections;
  }>({
    initialValues: {
      type: CourseLandingPageSections.FEATURES,
    },
    validationSchema: addLandingSectionSchema,
    onSubmit: ({ type }) => {
      if (!type) return;
      handleAddSection(type);
    },
  });

  return (
    <>
      <Button onClick={toggleAction} primary>
        Dodaj sekcję
      </Button>
      <Modal open={isActionOpen} onClose={toggleAction} title="Dodaj sekcję">
        <MBox
          className="tw-flex tw-flex-col"
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Select
            id="type"
            label="Typ sekcji"
            name="type"
            value={formik.values.type}
            items={Object.values(CourseLandingPageSections).map((section) => ({
              title: CourseLandingPageSectionTranslations[section],
              value: section,
            }))}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button primary className="tw-mt-4 ">
            Dodaj sekcję
          </Button>
        </MBox>
      </Modal>
    </>
  );
};

export default AddLandingSectionModal;
