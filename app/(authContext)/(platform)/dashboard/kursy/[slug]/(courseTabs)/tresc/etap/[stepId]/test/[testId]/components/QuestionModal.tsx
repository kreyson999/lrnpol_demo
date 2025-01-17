'use client';

import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CourseSectionStepTestQuestionType } from '@/services/API';

import Modal from '@/components/materialUI/Modal';
import TextInput from '@/components/materialUI/TextInput';
import MBox from '@mui/material/Box';
import Button from '@/components/materialUI/Button';
import Select from '@/components/materialUI/Select';
import { Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { useErrorState } from '@/contexts/ErrorContext';
import { generateClient } from 'aws-amplify/api';
import { QuestionTypeTranslations } from '@/constants/QuestionTypeTranslations';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { getCourseSectionStepTestQuestion } from '@/services/graphql/queries';
import PageLoader from '@/components/shared/PageLoader';
import { validateCreateTestQuestionSchema } from '@/app/api/Validations';
import CoursesService from '@/services/api/CourseService';
import { useParams } from 'next/navigation';
import { UpdateCourseStepTestQuestion } from '@/services/graphql/course/contentSection/step/test/question/mutations';

type FormikForm = {
  text: string;
  answers: {
    id: string;
    text: string;
  }[];
  type: CourseSectionStepTestQuestionType;
  correctAnswers: string[];
  position: number;
};

const INITIAL_VALUES = {
  text: 'Tutaj wpisz swoje pytanie',
  answers: [
    {
      id: uuidv4(),
      text: 'Pierwsza odpowiedź',
    },
    { id: uuidv4(), text: 'Druga odpowiedź' },
    { id: uuidv4(), text: 'Trzecia odpowiedź' },
    { id: uuidv4(), text: 'Czwarta odpowiedź' },
  ],
  type: CourseSectionStepTestQuestionType.MULTIPLE_CHOICE,
  correctAnswers: [],
};

type Props = {
  questionId: string | null;
  isOpen: boolean;
  testId: string;
  nextQuestionPosition: number;
  onRefresh: () => void;
  onClose: () => void;
};

const QuestionModal = ({
  testId,
  questionId,
  isOpen,
  nextQuestionPosition,
  onRefresh,
  onClose,
}: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    formik.resetForm();
    onClose();
  };

  const handleAddQuestion = async (data: FormikForm) => {
    setIsLoading(true);

    try {
      await CoursesService.course(slug)
        .tests()
        .test(testId)
        .questions()
        .create(data);

      showSnackbar('Pomyślnie dodano pytanie!');
      onRefresh();
      handleCloseModal();
    } catch (error) {
      setErrorMessage('Nie udało się dodać pytania do tego testu!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuestion = async (id: string, data: FormikForm) => {
    setIsLoading(true);

    try {
      const client = generateClient({ authMode: 'oidc' });

      await client.graphql({
        query: UpdateCourseStepTestQuestion,
        variables: {
          input: {
            id,
            text: data.text,
            answers: data.answers,
            type: data.type,
            correctAnswers: data.correctAnswers,
          },
        },
      });

      showSnackbar('Pomyślnie zaktualizowano pytanie!');
      onRefresh();
      handleCloseModal();
    } catch (error) {
      setErrorMessage('Nie udało się zaktualizować pytania!');
    } finally {
      setIsLoading(false);
    }
  };

  const { setValues, ...formik } = useFormik<FormikForm>({
    initialValues: {
      ...INITIAL_VALUES,
      position: nextQuestionPosition,
    },
    validationSchema: validateCreateTestQuestionSchema,
    onSubmit: (form) => {
      if (questionId) {
        void handleUpdateQuestion(questionId, form);
        return;
      }
      void handleAddQuestion(form);
    },
  });

  const handleFetchQuestion = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const client = generateClient({ authMode: 'userPool' });

        const result = await client.graphql({
          query: getCourseSectionStepTestQuestion,
          variables: {
            id,
          },
        });

        const question = result.data.getCourseSectionStepTestQuestion;

        if (question) {
          await setValues({
            text: question.text ?? '',
            answers: question.answers
              ? question.answers
                  ?.filter((answer) => answer !== null)
                  .map((answer) => {
                    return {
                      id: answer!.id ?? '',
                      text: answer!.text ?? '',
                    };
                  })
              : INITIAL_VALUES.answers,
            type: question.type,
            correctAnswers: question.correctAnswers
              ? (question.correctAnswers.filter(
                  (answer) => answer !== null
                ) as string[])
              : [],
            position: question.position,
          });
        }
      } catch (error) {
        setErrorMessage('Nie udało się pobrać pytania!');
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorMessage, setValues]
  );

  const onSelectCorrectAnswer = (id: string) => {
    void formik.setFieldValue(
      'correctAnswers',
      formik.values.correctAnswers.includes(id)
        ? formik.values.correctAnswers.filter((answerId) => answerId !== id)
        : [...formik.values.correctAnswers, id]
    );
  };

  useEffect(() => {
    if (questionId) {
      void handleFetchQuestion(questionId);
    }
  }, [handleFetchQuestion, questionId]);

  return (
    <>
      <Modal open={isOpen} onClose={handleCloseModal} title="Dodaj pytanie">
        <PageLoader isLoading={isLoading}>
          <MBox
            className="tw-flex tw-flex-col"
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Select
              id="type"
              label="Typ pytania"
              name="type"
              value={formik.values.type}
              items={Object.values(CourseSectionStepTestQuestionType).map(
                (state) => ({
                  title: QuestionTypeTranslations[state],
                  value: state,
                })
              )}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextInput
              className="tw-mt-4"
              id="text"
              label="Pytanie"
              name="text"
              value={formik.values.text}
              helperText={formik.touched.text && formik.errors.text}
              error={formik.touched.text && Boolean(formik.errors.text)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <MBox>
              {formik.values.answers.map((answer, index) => {
                const error = formik.errors.answers?.[index];

                const isCorrect = formik.values.correctAnswers.includes(
                  answer.id
                );

                return (
                  <TextInput
                    appendBeforeInput={
                      <MBox
                        onClick={() => onSelectCorrectAnswer(answer.id)}
                        className={`${
                          isCorrect ? 'tw-bg-green-600' : ''
                        } tw-cursor-pointer tw-grid tw-place-content-center tw-p-2 tw-rounded-lg tw-my-auto`}
                      >
                        <Typography>
                          {String.fromCharCode(65 + index)}.
                        </Typography>
                      </MBox>
                    }
                    key={answer.id}
                    className="tw-mt-4"
                    id={answer.id}
                    name={`answers[${index}].text`}
                    value={answer.text}
                    helperText={
                      typeof error !== 'string' ? error?.text : undefined
                    }
                    error={
                      typeof error !== 'string'
                        ? Boolean(error?.text)
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                );
              })}
              {!!formik.errors.correctAnswers && (
                <Typography className="tw-mt-4 tw-text-sm" color="error">
                  {formik.errors.correctAnswers}
                </Typography>
              )}
            </MBox>
            <Button
              type="submit"
              isLoading={isLoading}
              primary
              className="tw-mt-4 "
            >
              {questionId ? 'Zapisz' : 'Dodaj'}
            </Button>
          </MBox>
        </PageLoader>
      </Modal>
    </>
  );
};

export default QuestionModal;
