'use client';

import React, { useCallback, useEffect, useState } from 'react';

import MTypography from '@mui/material/Typography';
import MBox from '@mui/material/Box';
import { generateClient } from 'aws-amplify/api';
import { useErrorState } from '@/contexts/ErrorContext';
import PageLoader from '@/components/shared/PageLoader';
import { Reorder } from 'framer-motion';
import { listCourseSectionStepTestQuestionsWithAnswers } from '@/services/graphql/course/contentSection/step/queries';
import Question from './components/Question';
import { Question as QuestionType } from '@/constants/types/Question';
import QuestionModal from './components/QuestionModal';
import Button from '@/components/materialUI/Button';
import { useModal } from '@/hooks/useModal';
import { updateCourseSectionStepTestQuestion } from '@/services/graphql/mutations';
import { useSnackbar } from '@/contexts/SnackbarContext';

type Props = {
  params: {
    slug: string;
    stepId: string;
    testId: string;
  };
};

const CourseContentStepLayout = ({ params: { testId } }: Props) => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isQuestionModalOpen, toggleQuestionModal] = useModal();

  const fetchQuestions = useCallback(
    async (testId: string) => {
      setIsLoading(true);
      try {
        const client = generateClient({ authMode: 'userPool' });

        const result = await client.graphql({
          query: listCourseSectionStepTestQuestionsWithAnswers,
          variables: {
            testId,
          },
        });

        const { items } = result.data.courseSectionStepTestQuestionByTest;

        const questions: QuestionType[] = items
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((item) => ({
            id: item.id,
            text: item.text ?? '',
            answers: (item.answers ?? [])
              .filter((answer) => answer !== null)
              .map((answer) => ({
                id: answer!.id,
                text: answer!.text ?? null,
                imageKey: answer!.imageKey ?? null,
              })),
            correctAnswers: (item.correctAnswers ?? []).filter(
              (correctAnswer) => correctAnswer !== null
            ) as string[],
          }));

        setQuestions(questions);
      } catch (error) {
        setErrorMessage('Nie udało się pobrać pytań do tego testu!');
      } finally {
        setIsLoading(false);
      }
    },
    [setErrorMessage]
  );

  const handleUpdateQuestion = async (input: {
    id: string;
    position: number;
  }) => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      await client.graphql({
        query: updateCourseSectionStepTestQuestion,
        variables: { input },
      });
    } catch (error) {
      setErrorMessage('Nie udało się zaktualizować pozycji pytania!');
    }
  };

  const handleUpdateQuestionPositions = (updatedQuestions: QuestionType[]) => {
    const changedQuestions: { id: string; position: number }[] = [];
    updatedQuestions.forEach((section, index) => {
      if (section.id !== questions[index].id) {
        changedQuestions.push({ id: section.id, position: index });
      }
    });

    Promise.all(changedQuestions.map(handleUpdateQuestion))
      .then(() => {
        showSnackbar('Pomyślnie zaktualizowano pozycje pytania.');
      })
      .catch((error) => {
        console.error(error);
      });

    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (id: string) => {
    setSelectedQuestion(id);
    toggleQuestionModal(null);
  };

  const handleCloseQuestionModal = () => {
    setSelectedQuestion(null);
    toggleQuestionModal(null);
  };

  useEffect(() => {
    void fetchQuestions(testId);
  }, [testId, fetchQuestions]);

  return (
    <>
      <QuestionModal
        isOpen={isQuestionModalOpen}
        questionId={selectedQuestion}
        nextQuestionPosition={questions.length}
        testId={testId}
        onRefresh={() => void fetchQuestions(testId)}
        onClose={handleCloseQuestionModal}
      />
      <MBox className="tw-py-4 tw-flex tw-flex-col">
        <MBox className="tw-flex tw-flex-col tw-w-fit ">
          <Button
            onClick={toggleQuestionModal}
            className="tw-hidden md:tw-block"
            primary
          >
            Dodaj pytanie
          </Button>
        </MBox>
        <PageLoader isLoading={isLoading}>
          {questions.length === 0 ? (
            <MTypography className="tw-mt-4">
              Nie dodano jeszcze żadnych pytań!
            </MTypography>
          ) : (
            <Reorder.Group
              values={questions}
              onReorder={handleUpdateQuestionPositions}
            >
              {questions.map((question) => (
                <Question
                  key={question.id}
                  question={question}
                  onEdit={() => handleEditQuestion(question.id)}
                  onRefresh={() => void fetchQuestions(testId)}
                />
              ))}
            </Reorder.Group>
          )}
        </PageLoader>
      </MBox>
    </>
  );
};

export default CourseContentStepLayout;
