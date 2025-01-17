import * as APITypes from '@/services/API';

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const CreateSectionStep = /* GraphQL */ `mutation CreateSectionStep(
  $input: CreateCourseSectionStepInput!
  $condition: ModelCourseSectionStepConditionInput
) {
  createCourseSectionStep(input: $input, condition: $condition) {
    id
    position
    title
    type
    status
    createdAt
    updatedAt
    courseSectionCourseSectionStepsId
    courseSectionStepCourseSectionStepVideoId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSectionStepMutationVariables,
  APITypes.CreateSectionStepMutation
>;

export const CreateSectionStepTest =
  /* GraphQL */ `mutation CreateSectionStepTest(
  $input: CreateCourseSectionStepTestInput!
  $condition: ModelCourseSectionStepTestConditionInput
) {
  createCourseSectionStepTest(input: $input, condition: $condition) {
    id
  }
}
` as GeneratedMutation<
    APITypes.CreateSectionStepTestMutationVariables,
    APITypes.CreateSectionStepTestMutation
  >;

export const UpdateSectionStep = /* GraphQL */ `
  mutation UpdateSectionStep(
    $input: UpdateCourseSectionStepInput!
    $condition: ModelCourseSectionStepConditionInput
  ) {
    updateCourseSectionStep(input: $input, condition: $condition) {
      id
      position
      title
    }
  }
` as GeneratedMutation<
  APITypes.UpdateSectionStepMutationVariables,
  APITypes.UpdateSectionStepMutation
>;

export const UpdateSectionStepVideo = /* GraphQL */ `
  mutation UpdateSectionStepVideo(
    $input: UpdateCourseSectionStepInput!
    $condition: ModelCourseSectionStepConditionInput
  ) {
    updateCourseSectionStep(input: $input, condition: $condition) {
      id
      uploadedVideo {
        key
        size
        fileName
      }
    }
  }
` as GeneratedMutation<
  APITypes.UpdateSectionStepMutationVariables,
  APITypes.UpdateSectionStepMutation
>;

export const DeleteSectionStep = /* GraphQL */ `mutation DeleteSectionStep(
  $input: DeleteCourseSectionStepInput!
  $condition: ModelCourseSectionStepConditionInput
) {
  deleteCourseSectionStep(input: $input, condition: $condition) {
    id
  }
}
` as GeneratedMutation<
  APITypes.DeleteSectionStepMutationVariables,
  APITypes.DeleteSectionStepMutation
>;
