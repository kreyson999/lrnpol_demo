import { UserOrderStatus } from '@/services/API';

export type UserCourse = {
  id: string;
  status: UserOrderStatus | null;
  updatedAt: string;
  createdAt: string;
  course: {
    slug: string;
    title: string;
    thumbnail: string;
  };
};
