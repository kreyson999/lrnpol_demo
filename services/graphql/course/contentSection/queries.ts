import * as APITypes from '@/services/API';

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPublicCourseSectionSteps = /* GraphQL */ `
  query GetPublicCourseSectionSteps(
    $filter: ModelCourseSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        position
        title
        createdAt
        updatedAt
        courseSectionSteps {
          items {
            id
            position
            title
            type
            courseSectionStepVideo {
              id
              duration
            }
            updatedAt
            createdAt
          }
        }
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.GetPublicCourseSectionStepsQueryVariables,
  APITypes.GetPublicCourseSectionStepsQuery
>;

export const getCourseSectionsWithStepsAndStepVideos = /* GraphQL */ `
  query GetCourseSectionsWithStepsAndStepVideos(
    $filter: ModelCourseSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        position
        title
        createdAt
        updatedAt
        courseSectionSteps(filter: {status: {eq: PUBLISHED}}) {
          items {
            id
            position
            title
            type
            courseSectionStepVideo {
              id
              status
              duration
            }
            userCourseStepProgress(limit: 1) {
              items {
                id
                durationInMs
              }
            }
            courseSectionStepCourseSectionStepTestId
            updatedAt
            createdAt
          }
        }
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.GetCourseSectionsWithStepsAndStepVideosQueryVariables,
  APITypes.GetCourseSectionsWithStepsAndStepVideosQuery
>;

export const getDashboardCourseSectionsWithSteps = /* GraphQL */ `
  query GetDashboardCourseSectionsWithSteps(
    $filter: ModelCourseSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        position
        title
        courseSectionSteps {
          items {
            id
            position
            title
            type
            uploadedVideo {
              key
              size
              fileName
            }
            courseSectionStepVideo {
              id
              status
              duration
            }
            courseSectionStepCourseSectionStepTestId
          }
        }
      }
    }
  }
` as GeneratedQuery<
  APITypes.GetDashboardCourseSectionsWithStepsQueryVariables,
  APITypes.GetDashboardCourseSectionsWithStepsQuery
>;
