import axios from 'axios';
import {
  CreateCourseMutation,
  GetCourseSectionStepWithVideoAndProgressQuery,
} from '../API';
import { ClientGraphQLError } from '@/constants/types/ClientGraphQLError';
import { StepProgressData } from '@/constants/types/StepProgressData';
import { BackendErrors } from '@/constants/enums/BackendErrors';
import {
  CreateContentSectionSchema,
  CreateCourseSchema,
  CreateStepSchema,
  CreateTestQuestionSchema,
} from '@/app/api/Validations';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';

class CoursesCourseStepProgressService {
  private slug: string;
  private stepId: string;

  constructor(slug: string, stepId: string) {
    this.slug = slug;
    this.stepId = stepId;
  }

  public update = async (input: StepProgressData): Promise<void> => {
    await axios.post(
      `/api/courses/${this.slug}/steps/${this.stepId}/progress`,
      input
    );
  };

  public updateAsBeacon = (input: StepProgressData) => {
    navigator.sendBeacon(
      `/api/courses/${this.slug}/steps/${this.stepId}/progress`,
      JSON.stringify(input)
    );
  };
}

class CoursesCourseDomainService {
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public create = async (input: {
    domain: string;
    addWWWSubdomain: boolean;
  }): Promise<{
    data: {
      domainName: string;
      domainStatus: 'CREATING' | 'FAILED';
    } | null;
    errors:
      | {
          code: BackendErrors;
          message: string;
        }[]
      | null;
  }> => {
    return await axios.post(`/api/courses/${this.slug}/domain`, input);
  };

  public get = async (): Promise<void> => {
    return await axios.get(`/api/courses/${this.slug}/domain`);
  };
}

class CoursesCourseStepService {
  private slug: string;
  private stepId: string;

  constructor(slug: string, stepId: string) {
    this.slug = slug;
    this.stepId = stepId;
  }

  public get = async () => {
    return (
      await axios.get<
        {
          data: GetCourseSectionStepWithVideoAndProgressQuery;
        } & ClientGraphQLError
      >(`/api/courses/${this.slug}/steps/${this.stepId}`)
    ).data;
  };

  public progress = () =>
    new CoursesCourseStepProgressService(this.slug, this.stepId);
}

class CoursesCourseStepsService {
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public step = (stepId: string) =>
    new CoursesCourseStepService(this.slug, stepId);
}

class CoursesCourseTestQuestionsService {
  private slug: string;
  private testId: string;

  constructor(slug: string, testId: string) {
    this.slug = slug;
    this.testId = testId;
  }

  public create = async (input: CreateTestQuestionSchema) => {
    return await axios.post(
      `/api/courses/${this.slug}/tests/${this.testId}/questions`,
      input
    );
  };
}

class CoursesCourseTestService {
  private slug: string;
  private testId: string;

  constructor(slug: string, testId: string) {
    this.slug = slug;
    this.testId = testId;
  }

  public questions = () =>
    new CoursesCourseTestQuestionsService(this.slug, this.testId);
}

class CoursesCourseTestsService {
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public test = (testId: string) =>
    new CoursesCourseTestService(this.slug, testId);
}

class CoursesCourseService {
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public createSection = async (input: CreateContentSectionSchema) => {
    return await axios.post(`/api/courses/${this.slug}/sections`, input);
  };

  public section = (sectionId: string) =>
    new CoursesCourseSectionService(this.slug, sectionId);

  public steps = () => new CoursesCourseStepsService(this.slug);

  public tests = () => new CoursesCourseTestsService(this.slug);

  public domain = () => new CoursesCourseDomainService(this.slug);
}

class CoursesCourseSectionService {
  private slug: string;
  private sectionId: string;

  constructor(slug: string, sectionId: string) {
    this.slug = slug;
    this.sectionId = sectionId;
  }

  public createStep = async (input: CreateStepSchema) => {
    return await axios.post(
      `/api/courses/${this.slug}/sections/${this.sectionId}/steps`,
      input
    );
  };
}

export default class CoursesService {
  public static create = async (input: CreateCourseSchema) => {
    return (
      await axios.post<AppSyncResponse<CreateCourseMutation>>(
        `/api/courses`,
        input
      )
    ).data;
  };

  public static course = (slug: string) => new CoursesCourseService(slug);
}
