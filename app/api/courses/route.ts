import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import {
  createCourse,
  createCourseLandingPage,
} from '@/services/graphql/mutations';
import {
  CourseStatus,
  CreateCourseInput,
  CreateCourseLandingPageInput,
  CreateCourseLandingPageMutation,
  CreateCourseMutation,
} from '@/services/API';
import { makeSignedAppSyncRequest } from '@/helpers/makeSignedAppSyncRequest';
import { isDevEnv } from '@/helpers/isDevEnv';
import { validateCreateCourseSchema } from '../Validations';
import { AppSyncResponse } from '@/constants/types/AppSyncResponse';

export async function POST(request: NextRequest) {
  try {
    const { title, slug } = await validateCreateCourseSchema.validate(
      await request.json()
    );

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    // create landing page
    const createCourseLandingPageInput: CreateCourseLandingPageInput = {
      backgroundColor: '#ffffff',
      appBar: {
        backgroundColor: '#00032e',
        watchCourseTextColor: '#ffffff',
      },
      header: {
        title: 'Naucz się czegoś razem ze mną!',
        titleColor: '#ffffff',
        subtitle:
          'Zamierzam Cię nauczyć czegoś czego jeszcze nikt Cię nie nauczył.',
        subtitleColor: '#d1d1d1',
        backgroundColor: '#00032e',
        callToActionBackgroundColor: '#3844f2',
        callToActionTextColor: '#ffffff',
        statsTitleTextColor: '#d1d1d1',
        statsValueTextColor: '#ffffff',
      },
      fixedCard: {
        backgroundColor: '#ffffff',
        buttonBackgroundColor: '#3844f2',
        buttonTextColor: '#ffffff',
        priceTextColor: '#242424',
        discountPriceTextColor: '#444444',
        titleTextColor: '#242424',
        descriptionTextColor: '#444444',
        featureCheckboxBackgroundColor: '#3844f2',
        featureCheckboxTextColor: '#ffffff',
        featureTextColor: '#444444',
      },
      footer: {
        backgroundColor: '#000000',
        courseDomainTextColor: '#ffffff',
        poweredByTextColor: '#ffffff',
      },
      owner: `${userId}::${userId}`,
    };

    const createCourseLandingPageRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: createCourseLandingPage,
        variables: {
          input: createCourseLandingPageInput,
        },
        authMode: 'AWS_IAM',
      })
    );

    const {
      data: createCourseLandingPageData,
      errors: createCourseLandingPageErrors,
    } =
      (await createCourseLandingPageRequest.json()) as AppSyncResponse<CreateCourseLandingPageMutation>;

    if (
      createCourseLandingPageErrors ||
      !createCourseLandingPageData?.createCourseLandingPage
    ) {
      throw new Error('Nie udało się stworzyć strony sprzedażowej kursu!');
    }

    const domainSuffix = isDevEnv() ? 'local.learnpool.pl' : 'learnpool.pl';

    const createCourseInput: CreateCourseInput = {
      title,
      slug,
      domain: `${slug}.${domainSuffix}`,
      status: CourseStatus.DRAFT,
      courseCourseLandingPageId:
        createCourseLandingPageData.createCourseLandingPage.id,
      owner: `${userId}::${userId}`,
    };

    const createCourseRequest = await makeSignedAppSyncRequest(
      JSON.stringify({
        query: createCourse,
        variables: {
          input: createCourseInput,
        },
        authMode: 'AWS_IAM',
      })
    );

    const createCourseResponse =
      (await createCourseRequest.json()) as AppSyncResponse<CreateCourseMutation>;

    return Response.json(createCourseResponse, { status: 200 });
  } catch (error) {
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
