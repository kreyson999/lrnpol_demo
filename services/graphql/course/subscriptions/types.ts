import { CourseSubscriptionStatus } from '@/services/API';

export type CourseSubscription = {
  __typename: 'CourseSubscription';
  id: string;
  courseSlug: string;
  courseSubscriptionPlanId: string;
  courseSubscriptionPlan: {
    __typename: 'CourseSubscriptionPlan';
    id: string;
    name: string;
    description: string;
    price: number;
  };
  startDate: string;
  expirationDate: string;
  status?: CourseSubscriptionStatus | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
};
