import * as APITypes from '@/services/API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createShortUserCourseStepProgress = /* GraphQL */ `
  mutation CreateShortUserCourseStepProgress(
    $input: CreateUserCourseStepProgressInput!
    $condition: ModelUserCourseStepProgressConditionInput
  ) {
    createUserCourseStepProgress(input: $input, condition: $condition) {
      id
      stepID
      durationInMs
    }
  }
` as GeneratedMutation<
  APITypes.CreateShortUserCourseStepProgressMutationVariables,
  APITypes.CreateShortUserCourseStepProgressMutation
>;
