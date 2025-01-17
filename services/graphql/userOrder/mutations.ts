import * as APITypes from '@/services/API';

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const startUserOrder = /* GraphQL */ `
  mutation StartUserOrder(
    $input: CreateUserOrderInput!
    $condition: ModelUserOrderConditionInput
  ) {
    createUserOrder(input: $input, condition: $condition) {
      id
      paymentMethod
      courseSlug
      owner
      createdAt
      updatedAt
      __typename
    }
  }
` as GeneratedMutation<
  APITypes.StartUserOrderMutationVariables,
  APITypes.StartUserOrderMutation
>;
