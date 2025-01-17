import { CourseSectionStepType } from '@/services/API';

export type CourseFeature = {
  value: string;
  subtitle: string;
};

export type CourseStats = {
  sectionsQuantity: number;
  stepsQuantity: number;
  stepsHours: number;
  questionsQuantity: number;
};

type CourseSection = {
  courseSectionSteps: {
    id: string;
    title: string;
    type: CourseSectionStepType;
    courseSectionStepVideo?: {
      id: string;
      duration: number;
    };
    courseSectionStepTest?: {
      questions: number;
    };
  }[];
};

export const calculateCourseStats = (
  sections: CourseSection[]
): CourseStats => {
  const sectionsQuantity = sections.length ?? 0;

  const stepsQuantity =
    sections.reduce(
      (prev, curr) =>
        prev +
        (curr?.courseSectionSteps?.filter(
          (step) => step?.type === CourseSectionStepType.VIDEO
        ).length ?? 0),
      0
    ) ?? 0;

  const courseSectionsStepsDuration =
    sections.reduce((prev, curr) => {
      const stepsDuration =
        curr?.courseSectionSteps?.reduce(
          (prevStep, currStep) =>
            prevStep + (currStep?.courseSectionStepVideo?.duration ?? 0),
          0
        ) ?? 0;
      return prev + stepsDuration;
    }, 0) ?? 0;

  const stepsHours = Math.round(courseSectionsStepsDuration / (1000 * 60 * 60));

  const questionsQuantity =
    sections.reduce(
      (prev, curr) =>
        prev +
        (curr?.courseSectionSteps?.reduce(
          (prevValue, currStep) =>
            prevValue + (currStep?.courseSectionStepTest?.questions ?? 0),
          0
        ) ?? 0),
      0
    ) ?? 0;

  return {
    sectionsQuantity,
    stepsHours,
    stepsQuantity,
    questionsQuantity,
  };
};

export const getCourseFeatures = (stats: CourseStats): CourseFeature[] => {
  const features = [
    {
      value: `${stats.stepsQuantity}`,
      subtitle: 'Ilość lekcji',
    },
    {
      value: `${stats.stepsHours}h`,
      subtitle: 'Łączny czas',
    },
  ];

  if (stats.questionsQuantity >= 5) {
    features.push({
      value: `${stats.questionsQuantity}`,
      subtitle: 'Pytań',
    });
  } else {
    features.unshift({
      value: `${stats.sectionsQuantity}`,
      subtitle: 'Rozdziały',
    });
  }

  return features;
};
