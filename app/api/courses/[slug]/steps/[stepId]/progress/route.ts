import config from '@/amplifyconfiguration.json';
import { createShortUserCourseStepProgress } from '@/services/graphql/user/course/progress/createShortUserCourseStepProgress';
import { updateShortUserCourseStepProgress } from '@/services/graphql/user/course/progress/updateShortUserCourseStepProgress';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string; stepId: string } }
) {
  const client = generateServerClientUsingCookies({
    config,
    cookies,
    authMode: 'userPool',
  });

  const body = (await request.json()) as {
    durationInMs: number;
    userCourseStepProgressId?: string;
  };

  try {
    if (body.userCourseStepProgressId) {
      await client.graphql({
        query: updateShortUserCourseStepProgress,
        variables: {
          input: {
            id: body.userCourseStepProgressId,
            durationInMs: body.durationInMs,
          },
        },
      });
      return NextResponse.json({ message: 'Successfuly updated user data' });
    }

    await client.graphql({
      query: createShortUserCourseStepProgress,
      variables: {
        input: {
          durationInMs: body.durationInMs,
          stepID: response.params.stepId,
        },
      },
    });
    return NextResponse.json({ message: 'Successfuly saved user data' });
  } catch (error) {
    console.dir('ERROR SAVING USER DATA: ');
    return NextResponse.json({ message: 'Failed saving user data' });
  }
}
