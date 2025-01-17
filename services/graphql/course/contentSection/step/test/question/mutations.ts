import * as APITypes from '@/services/API';

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const UpdateCourseStepTestQuestion =
  /* GraphQL */ `mutation UpdateCourseStepTestQuestion(
  $input: UpdateCourseSectionStepTestQuestionInput!
  $condition: ModelCourseSectionStepTestQuestionConditionInput
) {
  updateCourseSectionStepTestQuestion(input: $input, condition: $condition) {
    id
    type
    position
    text
    imageKey
    answers {
      id
      text
      imageKey
      __typename
    }
    correctAnswers
  }
}
` as GeneratedMutation<
    APITypes.UpdateCourseSectionStepTestQuestionMutationVariables,
    APITypes.UpdateCourseSectionStepTestQuestionMutation
  >;
