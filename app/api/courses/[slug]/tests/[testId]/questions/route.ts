import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { createCourseSectionStepTestQuestion } from '@/services/graphql/mutations';
import {
  CreateCourseSectionStepMutation,
  GetCourseSectionStepTestQuery,
} from '@/services/API';
import { makeSignedAppSyncRequest } from '@/helpers/makeSignedAppSyncRequest';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';
import { validateCreateTestQuestionSchema } from '@/app/api/Validations';
import { getCourseSectionStepTest } from '@/services/graphql/queries';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string; testId: string } }
) {
  try {
    const { testId } = response.params;
    const { type, text, answers, correctAnswers, position } =
      await validateCreateTestQuestionSchema.validate(await request.json());

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const getCourseRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: getCourseSectionStepTest,
        variables: {
          id: testId,
        },
        authMode: 'AWS_IAM',
      })
    );

    const getCourseResponse =
      (await getCourseRequest.json()) as AppSyncResponse<GetCourseSectionStepTestQuery>;

    if (
      getCourseResponse.errors ||
      getCourseResponse.data?.getCourseSectionStepTest?.owner !== userId
    ) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const createCourseStepTestQuestionRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: createCourseSectionStepTestQuestion,
        variables: {
          input: {
            text,
            testId,
            position,
            answers,
            type,
            correctAnswers,
            owner: `${userId}::${userId}`,
          },
        },
        authMode: 'AWS_IAM',
      })
    );

    const createCourseStepTestQuestionResponse =
      (await createCourseStepTestQuestionRequest.json()) as AppSyncResponse<CreateCourseSectionStepMutation>;

    return Response.json(createCourseStepTestQuestionResponse, { status: 200 });
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
