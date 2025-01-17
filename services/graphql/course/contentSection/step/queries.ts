import * as APITypes from '@/services/API';

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listCourseSectionStepTestQuestionsWithAnswers =
  /* GraphQL */ `query ListCourseSectionStepTestQuestionsWithAnswers(
  $testId: ID!
  $position: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCourseSectionStepTestQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  courseSectionStepTestQuestionByTest(
    testId: $testId
    position: $position
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      position
      text
      imageKey
      correctAnswers
      answers {
        id
        imageKey
        text
      }
      testId
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListCourseSectionStepTestQuestionsWithAnswersQueryVariables,
    APITypes.ListCourseSectionStepTestQuestionsWithAnswersQuery
  >;
