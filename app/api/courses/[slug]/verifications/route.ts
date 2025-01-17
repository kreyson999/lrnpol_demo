import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { BackendErrors } from '@/constants/enums/BackendErrors';

import { getCourse } from '@/services/graphql/queries';
import { appSyncRequest } from '@/helpers/appSyncRequest';
import {
  createCourseVerification,
  updateCourse,
  updateCourseVerification,
} from '@/services/graphql/mutations';
import { CourseVerificationStatus } from '@/services/API';

export async function POST(
  request: NextRequest,
  response: NextResponse & { params: { slug: string } }
) {
  try {
    const { slug } = response.params;

    const { userId } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    // sprawdzic czy kurs istnieje
    const [courseData, courseErrors] = await appSyncRequest(getCourse, {
      slug,
    });

    if (courseErrors || !courseData?.getCourse) {
      throw new Error('Nie udało się pobrać kursu!');
    }

    // sprawdzic czy jest wlascicielem kursu
    if (courseData.getCourse.owner !== userId) {
      throw new Error('Użytkownik nie jest włascicielem kursu!');
    }

    // sprawdzic czy ten kurs nie ma juz stworzonej weryfikacji

    const verification = courseData.getCourse?.verification ?? null;

    // jesli ma juz stworzoną weryfikacje i ta weryfikacja ma status NOT_SUITABLE to zmienić ją na pending

    if (verification) {
      if (verification.status === CourseVerificationStatus.NOT_SUITABLE) {
        const [, updateVerificationErrors] = await appSyncRequest(
          updateCourseVerification,
          {
            input: {
              id: verification.id,
              status: CourseVerificationStatus.PENDING,
            },
          }
        );

        if (updateVerificationErrors?.length) {
          throw new Error('Nie udało się zaktualizować weryfikacji!');
        }

        return new Response('Pomyślnie zmieniono status weryfikacji!', {
          status: 200,
        });
      }

      return new Response(
        'Status weryfikacji musi być NOT_SUITABLE, aby ponownie poprosić o weryfikację!',
        {
          status: 200,
        }
      );
    }

    const [createVerificationData, verificationErrors] = await appSyncRequest(
      createCourseVerification,
      {
        input: {
          courseSlug: slug,
          status: CourseVerificationStatus.PENDING,
          owner: `${userId}::${userId}`,
        },
      }
    );

    if (verificationErrors?.length) {
      throw new Error('Nie udało się stworzyć prośby o weryfikacje');
    }

    const [, updateCourseErrors] = await appSyncRequest(updateCourse, {
      input: {
        slug,
        verificationId: createVerificationData?.createCourseVerification?.id,
      },
    });

    if (updateCourseErrors?.length) {
      throw new Error('Nie udało się zaktualizować kursu!');
    }

    return new Response('Pomyślnie stworzono prośbę o weryfikację', {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: BackendErrors.AMPLIFY_API_ERROR,
        message: 'Nie udało się zainicjalizować płatności',
      }),
      {
        status: 400,
      }
    );
  }
}
