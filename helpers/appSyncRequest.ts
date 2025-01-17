import { GeneratedQuery, GeneratedMutation } from '@/constants/types';
import { makeSignedAppSyncRequest } from './makeSignedAppSyncRequest';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';
import { ClientGraphQLError } from '@/constants/types/ClientGraphQLError';

type ExtractInputType<Query> =
  | (Query extends GeneratedQuery<infer InputType, unknown> ? InputType : never)
  | (Query extends GeneratedMutation<infer InputType, unknown>
      ? InputType
      : never);

type ExtractOutputType<Query> =
  | (Query extends GeneratedQuery<unknown, infer OutputType>
      ? OutputType
      : never)
  | (Query extends GeneratedMutation<unknown, infer OutputType>
      ? OutputType
      : never);

export async function appSyncRequest<
  Query extends
    | GeneratedQuery<unknown, unknown>
    | GeneratedMutation<unknown, unknown>
>(
  query: Query,
  variables: ExtractInputType<Query>
): Promise<
  [
    ExtractOutputType<Query> | undefined,
    ClientGraphQLError['errors'] | undefined
  ]
> {
  const request = await makeSignedAppSyncRequest(
    JSON.stringify({
      query: query,
      variables: variables,
      authMode: 'AWS_IAM',
    })
  );

  const { data, errors } = (await request.json()) as AppSyncResponse<
    ExtractOutputType<Query>
  >;

  return [data, errors];
}
