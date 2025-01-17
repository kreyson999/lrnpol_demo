import { GeneratedQuery } from '@/constants/types';
import * as APITypes from '@/services/API';

export const getSubscriptionByCourseSlug =
  /* GraphQL */ `query GetSubscriptionByCourseSlug(
  $courseSlug: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseSubscriptionFilterInput
  $limit: Int
  $nextToken: String
) {
  subscriptionByCourseSlug(
    courseSlug: $courseSlug
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      courseSlug
      courseSubscriptionPlan {
        id
        name
        price
        description
      }
      startDate
      expirationDate
      status
      createdAt
      owner
    }
  }
}
` as GeneratedQuery<
    APITypes.GetSubscriptionByCourseSlugQueryVariables,
    APITypes.GetSubscriptionByCourseSlugQuery
  >;
