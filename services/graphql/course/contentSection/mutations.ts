import * as APITypes from '@/services/API';

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const CreateSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateCourseSectionInput!
    $condition: ModelCourseSectionConditionInput
  ) {
    createCourseSection(input: $input, condition: $condition) {
      id
      position
      title
    }
  }
` as GeneratedMutation<
  APITypes.CreateSectionMutationVariables,
  APITypes.CreateSectionMutation
>;

export const UpdateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateCourseSectionInput!
    $condition: ModelCourseSectionConditionInput
  ) {
    updateCourseSection(input: $input, condition: $condition) {
      id
      position
      title
    }
  }
` as GeneratedMutation<
  APITypes.UpdateSectionMutationVariables,
  APITypes.UpdateSectionMutation
>;
