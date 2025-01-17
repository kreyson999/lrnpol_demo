import React from 'react';
import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';

import config from '@/amplifyconfiguration.json';
import { getPublicCourseMetaData } from '@/services/graphql/course/queries';
import { signAmplifyServerImage } from '@/helpers/signAmplifyServerImage';

type Props = {
  children: React.ReactNode;
};

export const revalidate = 3600;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const hostname = headers().get('host');

  try {
    const amplifyServerClient = generateServerClientUsingCookies({
      config,
      cookies,
      authMode: 'apiKey',
    });

    const {
      data: { getCourse },
    } = await amplifyServerClient.graphql({
      query: getPublicCourseMetaData,
      variables: { slug },
    });

    if (!getCourse?.courseLandingPage)
      throw 'Kurs pod takim adresem URL nie istnieje!';

    const { courseLandingPage, domain } = getCourse;
    const { metaTitle, metaDescription, fixedCard, faviconKey } =
      courseLandingPage;

    const metadata = {
      metadataBase: new URL(`https://${domain}`),
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle ?? undefined,
        description: metaDescription ?? undefined,
        type: 'website',
        images: fixedCard.imageKey
          ? {
              url: await signAmplifyServerImage(fixedCard.imageKey),
            }
          : undefined,
      },
      icons: faviconKey && {
        icon: await signAmplifyServerImage(faviconKey),
      },
      robots:
        hostname && domain && hostname.includes(domain)
          ? 'index, follow'
          : 'noindex, nofollow',
    };

    return metadata;
  } catch (error) {
    return {
      title: slug,
    };
  }
}

const CourseRootLayout = ({ children }: Props) => {
  return children;
};

export default CourseRootLayout;
