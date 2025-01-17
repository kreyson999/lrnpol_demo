import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { createCourseSectionStep } from '@/services/graphql/mutations';
import {
  CourseSectionStepStatus,
  CourseSectionStepType,
  CreateCourseSectionStepInput,
  CreateCourseSectionStepMutation,
  CreateSectionStepTestMutation,
  GetCourseSectionQuery,
} from '@/services/API';
import { makeSignedAppSyncRequest } from '@/helpers/makeSignedAppSyncRequest';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';
import { validateCreateStepSchema } from '@/app/api/Validations';
import { getCourseSection } from '@/services/graphql/queries';
import { CreateSectionStepTest } from '@/services/graphql/course/contentSection/step/mutations';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string; sectionId: string } }
) {
  try {
    const { sectionId } = response.params;
    const { title, type, position } = await validateCreateStepSchema.validate(
      await request.json()
    );

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const getCourseRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: getCourseSection,
        variables: {
          id: sectionId,
        },
        authMode: 'AWS_IAM',
      })
    );

    const getCourseResponse =
      (await getCourseRequest.json()) as AppSyncResponse<GetCourseSectionQuery>;

    if (
      getCourseResponse.errors ||
      getCourseResponse.data?.getCourseSection?.owner !== userId
    ) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    let testId: string | undefined = undefined;

    if (type === CourseSectionStepType.TEST) {
      const createCourseStepTestRequest = await makeSignedAppSyncRequest(
        JSON.stringify({
          query: CreateSectionStepTest,
          variables: {
            input: {
              owner: `${userId}::${userId}`,
            },
          },
          authMode: 'AWS_IAM',
        })
      );

      const {
        data: createCourseStepTestResponse,
        errors: createCourseStepTestErrors,
      } =
        (await createCourseStepTestRequest.json()) as AppSyncResponse<CreateSectionStepTestMutation>;

      if (createCourseStepTestErrors) {
        throw new Error('Nie udało się stworzyć testu!');
      }

      testId = createCourseStepTestResponse?.createCourseSectionStepTest?.id;
    }

    const createCourseStepInput: CreateCourseSectionStepInput = {
      title,
      type,
      position,
      status: CourseSectionStepStatus.DRAFT,
      courseSectionStepCourseSectionStepTestId: testId,
      courseSectionCourseSectionStepsId: sectionId,
      owner: `${userId}::${userId}`,
    };

    const createCourseStepRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: createCourseSectionStep,
        variables: {
          input: createCourseStepInput,
        },
        authMode: 'AWS_IAM',
      })
    );

    const createCourseStepResponse =
      (await createCourseStepRequest.json()) as AppSyncResponse<CreateCourseSectionStepMutation>;

    return Response.json(createCourseStepResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się stworzyć etapu w sekcji!',
      }),
      {
        status: 400,
      }
    );
  }
}
