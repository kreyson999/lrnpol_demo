import { GeneratedQuery } from '@/constants/types';
import * as APITypes from '@/services/API';

export const getCourseLandingPageWithSections =
  `query GetCourseLandingPageWithSections($id: ID!) {
  getCourseLandingPage(id: $id) {
    metaTitle
    metaDescription
    faviconKey
    tawkPropertyId
    tawkWidgetId
    appBar {
      backgroundColor
      logoKey
      watchCourseTextColor
    }
    backgroundColor
    createdAt
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
    updatedAt
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
}
` as GeneratedQuery<
    APITypes.GetCourseLandingPageWithSectionsQueryVariables,
    APITypes.GetCourseLandingPageWithSectionsQuery
  >;

export const getCourseLandingPageSEOSettings =
  `query GetCourseLandingPageSEOSettings($id: ID!) {
  getCourseLandingPage(id: $id) {
    metaTitle
    metaDescription
    faviconKey
    id
  }
}
` as GeneratedQuery<
    APITypes.GetCourseLandingPageSEOSettingsQueryVariables,
    APITypes.GetCourseLandingPageSEOSettingsQuery
  >;

export const getCourseLandingPageIntegrationsSettings =
  `query GetCourseLandingPageIntegrationsSettings($id: ID!) {
  getCourseLandingPage(id: $id) {
    tawkPropertyId
    tawkWidgetId
    id
  }
}
` as GeneratedQuery<
    APITypes.GetCourseLandingPageIntegrationsSettingsQueryVariables,
    APITypes.GetCourseLandingPageIntegrationsSettingsQuery
  >;
