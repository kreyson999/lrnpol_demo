import { GeneratedQuery } from '@/constants/types';
import * as APITypes from '@/services/API';

const getStepWithVideoAndProgress = /* GraphQL */ `
  query GetCourseSectionStepWithVideoAndProgress(
    $id: ID!
    $stepID: ModelIDKeyConditionInput
    $owner: String!
  ) {
    getCourseSectionStep(id: $id) {
      id
      title
      type
      courseSectionStepVideo {
        id
        duration
        url {
          url
        }
      }
      courseSectionStepTest {
        id
        questions {
          items {
            id
            type
            text
            position
            imageKey
            correctAnswers
            answers {
              id
              imageKey
              text
            }
          }
        }
      }
    }
    userCourseStepProgressByOwnerAndStep(owner: $owner, stepID: $stepID) {
      items {
        id
        owner
        durationInMs
      }
    }
  }
` as GeneratedQuery<
  APITypes.GetCourseSectionStepWithVideoAndProgressQueryVariables,
  APITypes.GetCourseSectionStepWithVideoAndProgressQuery
>;

export default getStepWithVideoAndProgress;
