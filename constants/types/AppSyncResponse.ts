import { ClientGraphQLError } from './ClientGraphQLError';

export interface AppSyncResponse<T> {
  data?: T;
  errors?: ClientGraphQLError['errors'];
}
