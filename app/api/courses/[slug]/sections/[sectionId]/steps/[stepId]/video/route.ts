import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { getCourse, getCourseSectionStep } from '@/services/graphql/queries';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import {
  CognitoIdentityProviderClient,
  AdminListGroupsForUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import config from '@/aws-exports';

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function GET(
  request: NextRequest,
  response: NextResponse & {
    params: { slug: string; sectionId: string; stepId: string };
  }
) {
  try {
    const { stepId, slug } = response.params;

    const { username, userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const [courseData, courseErrors] = await appSyncRequest(getCourse, {
      slug,
    });

    if (courseErrors || !courseData) {
      throw new Error('Kurs nie istnieje!');
    }

    let hasAccess = false;

    if (courseData.getCourse?.owner === userId) {
      hasAccess = true;
    } else {
      const client = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
        },
      });

      const command = new AdminListGroupsForUserCommand({
        Username: username,
        UserPoolId: config.aws_user_pools_id,
      });

      const responseGroups = await client.send(command);

      const userGroups =
        responseGroups.Groups?.map((group) => group.GroupName) ?? [];

      if (userGroups.includes('admin')) hasAccess = true;
    }

    if (!hasAccess) {
      throw new Error('Nie masz dostępu do pobrania tego filmu!');
    }

    const [stepData, stepErrors] = await appSyncRequest(getCourseSectionStep, {
      id: stepId,
    });

    if (stepErrors || !stepData) {
      throw new Error('Ten etap nie istnieje!');
    }

    const stepVideo = stepData.getCourseSectionStep?.uploadedVideo;

    if (!stepVideo) {
      throw new Error('Ten etap nie przypisanego filmu podglądowego!');
    }

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
      },
    });

    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
      Key: `private/${stepVideo.identityId}/${stepVideo.key}`,
    });

    const url = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600,
    });

    return Response.json(
      {
        videoUrl: url,
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się pobrać etapu',
      }),
      {
        status: 400,
      }
    );
  }
}
