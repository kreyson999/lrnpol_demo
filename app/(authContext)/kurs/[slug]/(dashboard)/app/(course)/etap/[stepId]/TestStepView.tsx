import React, { useState } from 'react';

import { GetCourseSectionStepWithVideoAndProgressQuery } from '@/services/API';

import MBox from '@mui/material/Box';
import MCard from '@mui/material/Card';
import MCardContent from '@mui/material/CardContent';
import MCardActionsArea from '@mui/material/CardActionArea';
import MTypography from '@mui/material/Typography';
import Stepper from '@/components/shared/Stepper';
import { Container } from '@mui/material';
import Button from '@/components/materialUI/Button';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

type Props = {
  step: NonNullable<
    GetCourseSectionStepWithVideoAndProgressQuery['getCourseSectionStep']
  >;
};

const TestStepView = ({ step }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState<
    Set<string>
  >(new Set([]));
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

  const questions =
    step.courseSectionStepTest?.questions?.items.sort((a, b) =>
      a!.position > b!.position ? 1 : -1
    ) ?? [];
  if (!questions.length) {
    return (
      <MBox className="tw-flex tw-flex-col tw-py-8">
        <MTypography className="tw-text-center tw-text-primary-contrastText">
          Ten etap nie zawiera jeszcze pytań lub nie udało się ich pobrać!
        </MTypography>
      </MBox>
    );
  }

  const handleSelectAnswer = (answer: string) => {
    if (hasCheckedAnswer) return;
    setCurrentQuestionAnswer((state) => {
      const newState = new Set(state);
      if (newState.has(answer)) {
        newState.delete(answer);
      } else {
        newState.add(answer);
      }
      return newState;
    });
  };

  const handleCheckAnswer = () => {
    setHasCheckedAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((state) => state + 1);
      setCurrentQuestionAnswer(new Set([]));
      setHasCheckedAnswer(false);
    }
  };

  const getAnswerColorClass = (answerId: string) => {
    if (hasCheckedAnswer) {
      const correctAnswers = questions[currentQuestion]?.correctAnswers ?? [];
      if (correctAnswers.includes(answerId)) {
        return 'tw-bg-green-900';
      }

      if (currentQuestionAnswer.has(answerId)) {
        return 'tw-bg-red-900';
      }
    }

    return 'tw-bg-background-paper';
  };

  return (
    <MBox className="tw-flex tw-flex-col tw-grow tw-pt-8">
      <Stepper
        activeStep={currentQuestion}
        steps={questions.map((_, index) => ({
          title: `Pytanie ${index + 1}`,
          icon: <QuestionMarkRoundedIcon />,
        }))}
      />

      <Container
        maxWidth="md"
        className="tw-grow tw-flex tw-flex-col tw-mt-8 tw-py-8"
      >
        <MBox className="tw-bg-primary-main tw-rounded-lg tw-p-4">
          <MTypography className="tw-text-lg tw-text-center tw-text-primary-contrastText">
            {questions[currentQuestion]?.text}
          </MTypography>
        </MBox>

        <MBox className="tw-mt-4  tw-grid  tw-gap-4">
          {questions[currentQuestion]?.answers?.map((answer, index) => {
            return (
              <MCard
                elevation={0}
                key={answer!.id}
                onClick={() => handleSelectAnswer(answer!.id)}
                className="tw-rounded-lg  tw-bg-background-paper tw-border tw-border-primary-light"
              >
                <MCardActionsArea>
                  <MCardContent
                    className={`tw-py-4 ${getAnswerColorClass(answer!.id)}`}
                  >
                    <MTypography
                      className={`${
                        currentQuestionAnswer.has(answer!.id) &&
                        !hasCheckedAnswer
                          ? 'tw-text-primary-main'
                          : 'tw-text-primary-contrastText'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}. {answer!.text}
                    </MTypography>
                  </MCardContent>
                </MCardActionsArea>
              </MCard>
            );
          })}
        </MBox>

        <MBox className="tw-flex tw-justify-center tw-mt-8">
          <MBox>
            {hasCheckedAnswer && currentQuestion < questions.length - 1 && (
              <Button onClick={handleNextQuestion} primary className="tw-mr-4">
                Następne pytanie
              </Button>
            )}
            {!hasCheckedAnswer && (
              <Button onClick={handleCheckAnswer} primary>
                Sprawdź odpowiedź
              </Button>
            )}
          </MBox>
        </MBox>
      </Container>
    </MBox>
  );
};

export default TestStepView;
