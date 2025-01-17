import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import amplifyConfig from '@/amplifyconfiguration.json';
import { getCourseSlugByDomain } from './services/graphql/course/queries';
import { ClientGraphQLError } from './constants/types/ClientGraphQLError';
import { GetCourseSlugByDomainQuery } from './services/API';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const hostname = request.headers.get('host')!;

  const path = url.pathname;

  if (hostname.includes('learnpool.pl')) {
    const subdomain = hostname.split('.')[0];

    // handle no subdomain or www with base path
    if (subdomain === 'www' || subdomain === '') {
      return NextResponse.rewrite(request.url);
    }

    // subdomains
    if (subdomain !== 'local') {
      return NextResponse.rewrite(
        new URL(`/kurs/${subdomain}${path === '/' ? '' : path}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // dwa przypadki np. kursinf.pl lub wwww.kursinf.pl
  // ma customową domenę

  try {
    let domain = hostname;
    if (domain.startsWith('www.')) {
      domain = hostname.replace('www.', '');
    }

    domain = domain.split(':')[0];

    const courseResponse = await fetch(
      amplifyConfig.aws_appsync_graphqlEndpoint,
      {
        headers: {
          ['x-api-key']: amplifyConfig.aws_appsync_apiKey,
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          query: getCourseSlugByDomain,
          variables: {
            domain,
          },
        }),
      }
    );

    const { data, errors } = (await courseResponse.json()) as {
      errors: ClientGraphQLError;
      data: GetCourseSlugByDomainQuery;
    };

    const slug = data.courseByDomain?.items[0]?.slug;

    if (errors || !slug) {
      throw Error();
    }

    return NextResponse.rewrite(
      new URL(`/kurs/${slug}${path === '/' ? '' : path}`, request.url)
    );
  } catch (error) {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public
     */
    '/((?!api/|_next/|assets/|_static/|[\\w-]+\\.\\w+).*)',
  ],
};
