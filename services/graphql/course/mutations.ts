import { GeneratedMutation } from '@/constants/types';
import * as APITypes from '@/services/API';

export const updateDashboardCourse = /* GraphQL */ `
  mutation UpdateDashboardCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      title
      price
      discountPrice
      logoKey
    }
  }
` as GeneratedMutation<
  APITypes.UpdateDashboardCourseMutationVariables,
  APITypes.UpdateDashboardCourseMutation
>;

export const updateCourseDomain = /* GraphQL */ `
  mutation UpdateCourseDomain(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      domain
    }
  }
` as GeneratedMutation<
  APITypes.UpdateCourseDomainMutationVariables,
  APITypes.UpdateCourseDomainMutation
>;
