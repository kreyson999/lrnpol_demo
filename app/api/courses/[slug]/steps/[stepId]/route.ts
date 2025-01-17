import { getCurrentUser } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import config from '@/amplifyconfiguration.json';
import * as queries from '@/services/graphql/queries';

import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import getStepWithVideoAndProgress from '@/services/graphql/course/step/getStepWithVideoAndProgress';
import {
  CourseSectionStepType,
  GetCourseSectionStepWithVideoAndProgressQuery,
  UserOrderStatus,
} from '@/services/API';
import { ClientGraphQLError } from '@/constants/types/ClientGraphQLError';
import { makeSignedAppSyncRequest } from '@/helpers/makeSignedAppSyncRequest';
import { setVideoStepCookies } from './helpers';

export async function GET(
  request: NextRequest,
  response: NextResponse & { params: { slug: string; stepId: string } }
) {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });

  const userClient = generateServerClientUsingCookies({
    config,
    cookies,
    authMode: 'oidc',
  });

  const userOrders = await userClient.graphql({
    query: queries.userOrderByOwnerAndCourse,
    variables: {
      owner: `${user.userId}::${user.userId}`,
      courseSlug: {
        eq: response.params.slug,
      },
      limit: 10000,
      filter: {
        status: {
          eq: UserOrderStatus.PAID,
        },
      },
    },
  });

  if (
    userOrders.errors ||
    userOrders.data.userOrderByOwnerAndCourse.items.length === 0
  ) {
    return NextResponse.json({
      data: null,
      errors: [
        {
          code: BackendErrors.USER_DIDNT_PAY_FOR_COURSE,
          message: 'Nie masz dostępu do tego kursu!',
        },
      ],
    });
  }

  const stepResponse = await makeSignedAppSyncRequest(
    JSON.stringify({
      query: getStepWithVideoAndProgress,
      variables: {
        id: response.params.stepId,
        owner: `${user.userId}::${user.userId}`,
        stepID: {
          eq: response.params.stepId,
        },
      },
    })
  );

  const stepBody = (await stepResponse.json()) as {
    data: GetCourseSectionStepWithVideoAndProgressQuery;
  } & ClientGraphQLError;

  const {
    errors,
    data: { getCourseSectionStep },
  } = stepBody;

  if ((errors && errors.length) || !getCourseSectionStep) {
    return NextResponse.json({
      data: null,
      errors: [
        {
          code: BackendErrors.AMPLIFY_API_ERROR,
          message: 'Nie udało się pobrać etapu z bazy danych!',
        },
      ],
    });
  }

  const { type, courseSectionStepVideo } = getCourseSectionStep;

  switch (type) {
    case CourseSectionStepType.VIDEO:
      if (!courseSectionStepVideo?.url) {
        return NextResponse.json({
          data: null,
          errors: [
            {
              code: BackendErrors.AMPLIFY_API_ERROR,
              message: 'Wystąpił problem z pobraniem wideo dla tego etapu!',
            },
          ],
        });
      }
      setVideoStepCookies(courseSectionStepVideo.url.url);
      return NextResponse.json(stepBody);

    case CourseSectionStepType.TEST:
      return NextResponse.json(stepBody);

    default:
      return NextResponse.json({
        data: null,
        errors: [
          {
            code: BackendErrors.AMPLIFY_API_ERROR,
            message: 'Wystąpił problem z pobraniem tego etapu!',
          },
        ],
      });
  }
}
