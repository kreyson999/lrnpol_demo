import * as APITypes from '@/services/API';

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listUserCourses = /* GraphQL */ `
  query ListUserCourses(
    $filter: ModelUserOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        updatedAt
        createdAt
        course {
          slug
          title
        }
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.ListUserCoursesQueryVariables,
  APITypes.ListUserCoursesQuery
>;

export const getCoursePriceByUserOrder = /* GraphQL */ `
  query GetCoursePriceByUserOrder($id: ID!) {
    getUserOrder(id: $id) {
      id
      course {
        price
      }
    }
  }
` as GeneratedQuery<
  APITypes.GetCoursePriceByUserOrderQueryVariables,
  APITypes.GetCoursePriceByUserOrderQuery
>;
