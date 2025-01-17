import config from '@/amplifyconfiguration.json';
import * as queries from '@/services/graphql/queries';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import {
  AmplifyClient,
  CreateDomainAssociationCommand,
  DeleteDomainAssociationCommand,
  GetDomainAssociationCommand,
} from '@aws-sdk/client-amplify';
import { BackendErrors } from '@/constants/enums/BackendErrors';
import { updateCourseDomain } from '@/services/graphql/course/mutations';
import { validateUpdatingDomain } from '@/app/api/Validations';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import { isDevEnv } from '@/helpers/isDevEnv';

export async function GET(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  const { slug } = response.params;

  try {
    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const [courseData, courseErrors] = await appSyncRequest(queries.getCourse, {
      slug,
    });

    if (courseErrors || !courseData?.getCourse?.owner) {
      throw new Error('Nie udało się pobrać danych kursu!');
    }

    if (courseData.getCourse.owner !== userId) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const amplifyClient = new AmplifyClient({
      region: config.aws_project_region,
      credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
      },
    });

    try {
      const getDomainCommand = new GetDomainAssociationCommand({
        appId: process.env.NEXT_AMPLIFY_APP_ID!,
        domainName: courseData.getCourse.domain,
      });

      const { domainAssociation } = await amplifyClient.send(getDomainCommand);

      return NextResponse.json(
        { data: domainAssociation },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { data: null },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        code: BackendErrors.GETTING_COURSE_DOMAIN_ERROR,
        message: 'Nie udało się pobrać domeny kursu.',
      },
      {
        status: 400,
      }
    );
  }
}

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  const { slug } = response.params;

  const amplifyClient = new AmplifyClient({
    region: config.aws_project_region,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const handleCreateDomain = async (domain: string, includeWWW: boolean) => {
    await amplifyClient.send(
      new CreateDomainAssociationCommand({
        appId: process.env.NEXT_AMPLIFY_APP_ID!,
        domainName: domain,
        enableAutoSubDomain: false,
        subDomainSettings: [
          {
            prefix: '',
            branchName: isDevEnv() ? 'dev' : 'master',
          },
          ...(includeWWW
            ? [
                {
                  prefix: 'www',
                  branchName: isDevEnv() ? 'dev' : 'master',
                },
              ]
            : []),
        ],
        certificateSettings: {
          type: 'AMPLIFY_MANAGED',
        },
      })
    );

    const [, updateCourseErrors] = await appSyncRequest(updateCourseDomain, {
      input: {
        slug,
        domain: domain,
      },
    });

    if (updateCourseErrors?.length) {
      throw new Error('Nie udało się zaktualizować domeny kursu!');
    }
  };

  const handleDeleteDomain = async (domain: string) => {
    await amplifyClient.send(
      new DeleteDomainAssociationCommand({
        appId: process.env.NEXT_AMPLIFY_APP_ID!,
        domainName: domain,
      })
    );
  };

  try {
    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const { includeWWW, domain } = await validateUpdatingDomain.validate(
      await request.json()
    );

    const [courseData, courseErrors] = await appSyncRequest(queries.getCourse, {
      slug,
    });

    if (courseErrors || !courseData?.getCourse?.owner) {
      throw new Error('Nie udało się pobrać danych kursu!');
    }

    if (courseData.getCourse.owner !== userId) {
      throw new Error('Kurs nienależy do użytkownika!');
    }

    const domainSuffix = isDevEnv() ? 'local.learnpool.pl' : 'learnpool.pl';

    // Check if domain already exists

    try {
      await amplifyClient.send(
        new GetDomainAssociationCommand({
          appId: process.env.NEXT_AMPLIFY_APP_ID!,
          domainName: domain,
        })
      );

      return Response.json(
        {
          code: BackendErrors.COURSE_DOMAIN_ALREADY_EXISTS,
          message: 'Podana domena już jest przypisana do innego kursu!',
        },
        {
          status: 400,
        }
      );
    } catch (error) {
      // Course domain does not exists, so let the program continue
    }

    if (courseData.getCourse.domain === `${slug}.${domainSuffix}`) {
      // First domain, so just create a new one
      await handleCreateDomain(domain, includeWWW);

      return Response.json('SUCCESS', {
        status: 200,
      });
    }

    // Delete old domain and create a new one
    await handleDeleteDomain(domain);
    await handleCreateDomain(domain, includeWWW);

    return NextResponse.json('SUCCESS', {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        errors: [
          {
            code: BackendErrors.UNDEFINED_ERROR,
            message: 'Nieznany błąd!',
          },
        ],
      },
      {
        status: 404,
      }
    );
  }
}
