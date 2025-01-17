import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { createCourseSection } from '@/services/graphql/mutations';
import {
  CreateCourseSectionInput,
  CreateCourseSectionMutation,
  GetCourseQuery,
} from '@/services/API';
import { makeSignedAppSyncRequest } from '@/helpers/makeSignedAppSyncRequest';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';
import { validateCreateContentSectionSchema } from '@/app/api/Validations';
import { getCourse } from '@/services/graphql/queries';

export async function POST(request: NextRequest) {
  try {
    const { title, courseSlug, position } =
      await validateCreateContentSectionSchema.validate(await request.json());

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    // pobrac kurs po slug
    const getCourseRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: getCourse,
        variables: {
          slug: courseSlug,
        },
        authMode: 'AWS_IAM',
      })
    );

    const getCourseResponse =
      (await getCourseRequest.json()) as AppSyncResponse<GetCourseQuery>;

    if (
      getCourseResponse.errors ||
      getCourseResponse.data?.getCourse?.owner !== userId
    ) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const createCourseSectionInput: CreateCourseSectionInput = {
      title,
      courseCourseSectionsSlug: courseSlug,
      position,
      owner: `${userId}::${userId}`,
    };

    const createCourseSectionRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: createCourseSection,
        variables: {
          input: createCourseSectionInput,
        },
        authMode: 'AWS_IAM',
      })
    );

    const createCourseSectionResponse =
      (await createCourseSectionRequest.json()) as AppSyncResponse<CreateCourseSectionMutation>;

    return Response.json(createCourseSectionResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się stworzyć kursu!',
      }),
      {
        status: 400,
      }
    );
  }
}
