import { CourseVerificationStatus } from '@/services/API';

export type CourseVerification = {
  __typename: 'CourseVerification';
  id: string;
  courseSlug: string;
  message?: string | null;
  status: CourseVerificationStatus;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
};
