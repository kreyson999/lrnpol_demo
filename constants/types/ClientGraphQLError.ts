export type ClientGraphQLError = {
  errors: Array<{
    errorType: string;
    message: string;
  }>;
};
