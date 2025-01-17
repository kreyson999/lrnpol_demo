import { UserGroup } from '../enums';

export type AuthenticatedUser = {
  id: string;
  identityId: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: UserGroup[];
};
