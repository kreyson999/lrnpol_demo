import * as APITypes from '@/services/API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const updateShortUserCourseStepProgress = /* GraphQL */ `
  mutation UpdateShortUserCourseStepProgress(
    $input: UpdateUserCourseStepProgressInput!
    $condition: ModelUserCourseStepProgressConditionInput
  ) {
    updateUserCourseStepProgress(input: $input, condition: $condition) {
      id
      durationInMs
    }
  }
` as GeneratedMutation<
  APITypes.UpdateShortUserCourseStepProgressMutationVariables,
  APITypes.UpdateShortUserCourseStepProgressMutation
>;
