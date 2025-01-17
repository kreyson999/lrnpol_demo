import {
  CourseSectionStepType,
  CourseSectionStepVideoStatus,
} from '@/services/API';

export type CourseSectionVideoStep = {
  id: string;
  position: number;
  title: string;
  type: CourseSectionStepType;
  courseSectionStepVideo?: {
    id: string;
    status: CourseSectionStepVideoStatus;
    duration: number;
  } | null;
  userCourseStepProgress?: {
    __typename: 'ModelUserCourseStepProgressConnection';
    items: Array<{
      __typename: 'UserCourseStepProgress';
      id: string;
      durationInMs: number;
    } | null>;
  } | null;
  courseSectionStepCourseSectionStepTestId?: string | null;
};

export type DashboardCourseSectionStep = {
  id: string;
  position: number;
  title: string;
  type: CourseSectionStepType;
  uploadedVideo?: {
    __typename: 'UploadedVideo';
    key: string;
    size: number;
    fileName: string;
  } | null;
  courseSectionStepVideo?: {
    __typename: 'CourseSectionStepVideo';
    id: string;
    status: CourseSectionStepVideoStatus;
    duration: number;
  } | null;
  courseSectionStepCourseSectionStepTestId?: string | null;
};

export type DashboardCourseSections = {
  id: string;
  position: number;
  title: string;
  courseSectionSteps?: {
    items: Array<{
      id: string;
      position: number;
      title: string;
      type: CourseSectionStepType;
      uploadedVideo?: {
        __typename: 'UploadedVideo';
        key: string;
        size: number;
        fileName: string;
      } | null;
      courseSectionStepVideo?: {
        __typename: 'CourseSectionStepVideo';
        id: string;
        status: CourseSectionStepVideoStatus;
        duration: number;
      } | null;
      courseSectionStepCourseSectionStepTestId?: string | null;
    } | null>;
  } | null;
};

export type CourseSectionWithStepsAndStepVideos = {
  id: string;
  position: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  courseSectionSteps?: {
    items: Array<{
      id: string;
      position: number;
      title: string;
      type: CourseSectionStepType;
      courseSectionStepVideo?: {
        id: string;
        status: CourseSectionStepVideoStatus;
        duration: number;
      } | null;
      userCourseStepProgress?: {
        __typename: 'ModelUserCourseStepProgressConnection';
        items: Array<{
          __typename: 'UserCourseStepProgress';
          id: string;
          durationInMs: number;
        } | null>;
      } | null;
    } | null>;
  } | null;
};

export type CourseSectionWithSteps = {
  __typename: 'CourseSection';
  id: string;
  position: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  courseSectionSteps?: {
    __typename: 'ModelCourseSectionStepConnection';
    items: Array<{
      __typename: 'CourseSectionStep';
      id: string;
      position: number;
      title: string;
      type: CourseSectionStepType;
      updatedAt: string;
      createdAt: string;
    } | null>;
  } | null;
};

export type VideoPlayerCourseSectionWithSteps = {
  id: string;
  position: number;
  title: string;
  courseSectionSteps: {
    id: string;
    position: number;
    title: string;
    type: CourseSectionStepType;
    courseSectionStepVideo: {
      id: string;
      duration: number;
    };
  }[];
  courseCourseSectionsSlug: string;
};
