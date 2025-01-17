import { GeneratedQuery } from '@/constants/types';
import * as APITypes from '@/services/API';

export const getAdminListCourse = /* GraphQL */ `
  query GetAdminListCourse(
    $slug: String
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCourses(
      slug: $slug
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        slug
        status
        title
        price
        logoKey
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.GetAdminListCourseQueryVariables,
  APITypes.GetAdminListCourseQuery
>;

export const getInstructorContextCourse =
  /* GraphQL */ `query GetInstructorContextCourse($slug: String!) {
  getCourse(slug: $slug) {
    slug
    title
    price
    discountPrice
    facebookPixelId
    logoKey
    status
    owner
    createdAt
    updatedAt
    courseCourseLandingPageId
  }
}
` as GeneratedQuery<
    APITypes.GetInstructorContextCourseQueryVariables,
    APITypes.GetInstructorContextCourseQuery
  >;

export const getCourseVerificationAndSubscribtion =
  /* GraphQL */ `query GetCourseVerificationAndSubscribtion($slug: String!) {
  getCourse(slug: $slug) {
    slug
    verification {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
    }
    subscriptions {
      items {
        id
        courseSlug
        courseSubscriptionPlanId
        courseSubscriptionPlan {
          id
          name
          description
          price
        }
        startDate
        expirationDate
        status
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
` as GeneratedQuery<
    APITypes.GetCourseVerificationAndSubscribtionQueryVariables,
    APITypes.GetCourseVerificationAndSubscribtionQuery
  >;

export const getInstructorListCourse = /* GraphQL */ `
  query GetInstructorListCourse(
    $owner: String!
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    courseByOwner(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        slug
        status
        title
        price
        logoKey
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.GetInstructorListCourseQueryVariables,
  APITypes.GetInstructorListCourseQuery
>;

export const getCoursesByStatusAndGetSubscriptionPlans =
  `query GetCoursesByStatusAndGetSubscriptionPlans(
  $status: CourseStatus!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  courseByStatus(
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      courseLandingPage {
        fixedCard {
          imageKey
        }
      }
      status
      slug
      title
    }
    nextToken
    __typename
  }
  listCourseSubscriptionPlans {
    items {
      id
      name
      description
      price
      features
      maxHours
      createdAt
      updatedAt
      __typename
    }
  }
}
` as GeneratedQuery<
    APITypes.GetCoursesByStatusAndGetSubscriptionPlansQueryVariables,
    APITypes.GetCoursesByStatusAndGetSubscriptionPlansQuery
  >;

export const getPublicCourseData =
  /* GraphQL */ `query GetPublicCourseData($slug: String!) {
  getCourse(slug: $slug) {
    slug
    title
    price
    discountPrice
    logoKey
    facebookPixelId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetPublicCourseDataQueryVariables,
    APITypes.GetPublicCourseDataQuery
  >;

export const getLandingPagePublicCourseWithSteps = /* GraphQL */ `
  query GetLandingPagePublicCourseWithSteps($slug: String!) {
    getCourse(slug: $slug) {
      slug
      title
      price
      discountPrice
      facebookPixelId
      logoKey
      status
      courseLandingPage {
        appBar {
          backgroundColor
          logoKey
          watchCourseTextColor
        }
        backgroundColor
        fixedCard {
          backgroundColor
          buttonBackgroundColor
          buttonTextColor
          descriptionTextColor
          discountPriceTextColor
          featureCheckboxBackgroundColor
          featureCheckboxTextColor
          featureTextColor
          imageKey
          priceTextColor
          titleTextColor
        }
        footer {
          backgroundColor
          courseDomainTextColor
          poweredByTextColor
        }
        header {
          backgroundColor
          callToActionBackgroundColor
          callToActionTextColor
          statsTitleTextColor
          statsValueTextColor
          subtitle
          subtitleColor
          title
          titleColor
        }
        id
        tawkPropertyId
        tawkWidgetId
        sections {
          backgroundColor
          subjects {
            subjects {
              content
              contentTextColor
              imageBoxColor
              imageKey
              indexColor
              title
              titleTextColor
            }
            subtitle
            subtitleTextColor
            title
            titleTextColor
          }
          aboutCourse {
            content
            contentTextColor
            title
            titleTextColor
          }
          courseContent {
            sectionArrowTextColor
            sectionBorderColor
            sectionTitleBackgroundColor
            sectionTitleTextColor
            stepBackgroundColor
            stepDurationColor
            stepIconColor
            stepTextColor
            stepsDividerColor
            subtitle
            subtitleTextColor
            title
            titleTextColor
          }
          features {
            items {
              backgroundColor
              iconColor
              textColor
            }
          }
          recommendedCourses {
            titleTextColor
            subtitleTextColor
            courseTitleTextColor
            courseSlugs
          }
        }
      }
      courseSections {
        items {
          id
          position
          title
          courseSectionSteps(filter: {status: {eq: PUBLISHED}}) {
            items {
              id
              position
              title
              type
              courseSectionStepVideo {
                id
                duration
              }
              courseSectionStepTest {
                questions {
                  items {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
` as GeneratedQuery<
  APITypes.GetLandingPagePublicCourseWithStepsQueryVariables,
  APITypes.GetLandingPagePublicCourseWithStepsQuery
>;

export const getPublicCourseMetaData = /* GraphQL */ `
  query GetPublicCourseMetaData($slug: String!) {
    getCourse(slug: $slug) {
      domain
      slug
      title
      courseLandingPage {
        fixedCard {
          imageKey
        }
        tawkPropertyId
        tawkWidgetId
        metaTitle
        metaDescription
        faviconKey
      }
      createdAt
      updatedAt
      __typename
    }
  }
` as GeneratedQuery<
  APITypes.GetPublicCourseMetaDataQueryVariables,
  APITypes.GetPublicCourseMetaDataQuery
>;

export const getCourseSlugByDomain = /* GraphQL */ `query GetCourseSlugByDomain(
  $domain: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  courseByDomain(
    domain: $domain
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      slug
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCourseSlugByDomainQueryVariables,
  APITypes.GetCourseSlugByDomainQuery
>;

export const listRecommendedCourses =
  /* GraphQL */ `query ListRecommendedCourses(
  $slug: String
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCourses(
    slug: $slug
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      slug
      domain
      title
      status
      courseLandingPage {
        fixedCard {
          imageKey
        }
      }
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListRecommendedCoursesQueryVariables,
    APITypes.ListRecommendedCoursesQuery
  >;

export const listCoursesSlugs = /* GraphQL */ `query ListCoursesSlugs(
  $slug: String
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCourses(
    slug: $slug
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      slug
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoursesSlugsQueryVariables,
  APITypes.ListCoursesSlugsQuery
>;
