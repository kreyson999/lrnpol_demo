import { AboutCourseSectionProps } from './AboutCourseSectionProps';
import { CourseContentSectionProps } from './CourseContentSectionProps';
import { FeaturesSectionProps } from './FeaturesSectionProps';
import { RecommendedCoursesSectionProps } from './RecommendedCoursesSectionProps.ts';
import { SubjectsSectionProps } from './SubjectsSectionProps';

export type Sections =
  | FeaturesSectionProps
  | AboutCourseSectionProps
  | SubjectsSectionProps
  | CourseContentSectionProps
  | RecommendedCoursesSectionProps;
