import { GeneratedMutation } from '@/constants/types';
import * as APITypes from '@/services/API';

export const updateLandingPageWithSections =
  `mutation UpdateLandingPageWithSections(
  $input: UpdateCourseLandingPageInput!
  $condition: ModelCourseLandingPageConditionInput
) {
  updateCourseLandingPage(input: $input, condition: $condition) {
    id
    backgroundColor
    metaTitle
    metaDescription
    faviconKey
    tawkPropertyId
    tawkWidgetId
    appBar {
      logoKey
      backgroundColor
      watchCourseTextColor
    }
    header {
      title
      titleColor
      subtitle
      subtitleColor
      backgroundColor
      callToActionBackgroundColor
      callToActionTextColor
      statsTitleTextColor
      statsValueTextColor
    }
    fixedCard {
      imageKey
      backgroundColor
      buttonBackgroundColor
      buttonTextColor
      priceTextColor
      discountPriceTextColor
      titleTextColor
      descriptionTextColor
      featureCheckboxBackgroundColor
      featureCheckboxTextColor
      featureTextColor
    }
    footer {
      backgroundColor
      courseDomainTextColor
      poweredByTextColor
    }
    sections {
      backgroundColor
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
        titleTextColor
        title
      }
      features {
        items {
          backgroundColor
          iconColor
          textColor
        }
      }
      subjects {
        subtitle
        subtitleTextColor
        title
        titleTextColor
        subjects {
          content
          contentTextColor
          imageBoxColor
          imageKey
          indexColor
          title
          titleTextColor
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
` as GeneratedMutation<
    APITypes.UpdateLandingPageWithSectionsMutationVariables,
    APITypes.UpdateLandingPageWithSectionsMutation
  >;
