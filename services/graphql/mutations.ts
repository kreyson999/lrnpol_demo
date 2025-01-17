/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCourseSectionStepTest = /* GraphQL */ `mutation CreateCourseSectionStepTest(
  $input: CreateCourseSectionStepTestInput!
  $condition: ModelCourseSectionStepTestConditionInput
) {
  createCourseSectionStepTest(input: $input, condition: $condition) {
    id
    questions {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSectionStepTestMutationVariables,
  APITypes.CreateCourseSectionStepTestMutation
>;
export const updateCourseSectionStepTest = /* GraphQL */ `mutation UpdateCourseSectionStepTest(
  $input: UpdateCourseSectionStepTestInput!
  $condition: ModelCourseSectionStepTestConditionInput
) {
  updateCourseSectionStepTest(input: $input, condition: $condition) {
    id
    questions {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSectionStepTestMutationVariables,
  APITypes.UpdateCourseSectionStepTestMutation
>;
export const deleteCourseSectionStepTest = /* GraphQL */ `mutation DeleteCourseSectionStepTest(
  $input: DeleteCourseSectionStepTestInput!
  $condition: ModelCourseSectionStepTestConditionInput
) {
  deleteCourseSectionStepTest(input: $input, condition: $condition) {
    id
    questions {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSectionStepTestMutationVariables,
  APITypes.DeleteCourseSectionStepTestMutation
>;
export const createCourseSectionStepTestQuestion = /* GraphQL */ `mutation CreateCourseSectionStepTestQuestion(
  $input: CreateCourseSectionStepTestQuestionInput!
  $condition: ModelCourseSectionStepTestQuestionConditionInput
) {
  createCourseSectionStepTestQuestion(input: $input, condition: $condition) {
    id
    type
    position
    text
    imageKey
    answers {
      id
      text
      imageKey
      __typename
    }
    correctAnswers
    testId
    test {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSectionStepTestQuestionMutationVariables,
  APITypes.CreateCourseSectionStepTestQuestionMutation
>;
export const updateCourseSectionStepTestQuestion = /* GraphQL */ `mutation UpdateCourseSectionStepTestQuestion(
  $input: UpdateCourseSectionStepTestQuestionInput!
  $condition: ModelCourseSectionStepTestQuestionConditionInput
) {
  updateCourseSectionStepTestQuestion(input: $input, condition: $condition) {
    id
    type
    position
    text
    imageKey
    answers {
      id
      text
      imageKey
      __typename
    }
    correctAnswers
    testId
    test {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSectionStepTestQuestionMutationVariables,
  APITypes.UpdateCourseSectionStepTestQuestionMutation
>;
export const deleteCourseSectionStepTestQuestion = /* GraphQL */ `mutation DeleteCourseSectionStepTestQuestion(
  $input: DeleteCourseSectionStepTestQuestionInput!
  $condition: ModelCourseSectionStepTestQuestionConditionInput
) {
  deleteCourseSectionStepTestQuestion(input: $input, condition: $condition) {
    id
    type
    position
    text
    imageKey
    answers {
      id
      text
      imageKey
      __typename
    }
    correctAnswers
    testId
    test {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSectionStepTestQuestionMutationVariables,
  APITypes.DeleteCourseSectionStepTestQuestionMutation
>;
export const createCourseSubscriptionPlan = /* GraphQL */ `mutation CreateCourseSubscriptionPlan(
  $input: CreateCourseSubscriptionPlanInput!
  $condition: ModelCourseSubscriptionPlanConditionInput
) {
  createCourseSubscriptionPlan(input: $input, condition: $condition) {
    id
    name
    description
    price
    features
    maxHours
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSubscriptionPlanMutationVariables,
  APITypes.CreateCourseSubscriptionPlanMutation
>;
export const updateCourseSubscriptionPlan = /* GraphQL */ `mutation UpdateCourseSubscriptionPlan(
  $input: UpdateCourseSubscriptionPlanInput!
  $condition: ModelCourseSubscriptionPlanConditionInput
) {
  updateCourseSubscriptionPlan(input: $input, condition: $condition) {
    id
    name
    description
    price
    features
    maxHours
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSubscriptionPlanMutationVariables,
  APITypes.UpdateCourseSubscriptionPlanMutation
>;
export const deleteCourseSubscriptionPlan = /* GraphQL */ `mutation DeleteCourseSubscriptionPlan(
  $input: DeleteCourseSubscriptionPlanInput!
  $condition: ModelCourseSubscriptionPlanConditionInput
) {
  deleteCourseSubscriptionPlan(input: $input, condition: $condition) {
    id
    name
    description
    price
    features
    maxHours
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSubscriptionPlanMutationVariables,
  APITypes.DeleteCourseSubscriptionPlanMutation
>;
export const createCourseSubscription = /* GraphQL */ `mutation CreateCourseSubscription(
  $input: CreateCourseSubscriptionInput!
  $condition: ModelCourseSubscriptionConditionInput
) {
  createCourseSubscription(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSubscriptionPlanId
    courseSubscriptionPlan {
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
    startDate
    expirationDate
    status
    payments {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSubscriptionPlanSubscriptionsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSubscriptionMutationVariables,
  APITypes.CreateCourseSubscriptionMutation
>;
export const updateCourseSubscription = /* GraphQL */ `mutation UpdateCourseSubscription(
  $input: UpdateCourseSubscriptionInput!
  $condition: ModelCourseSubscriptionConditionInput
) {
  updateCourseSubscription(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSubscriptionPlanId
    courseSubscriptionPlan {
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
    startDate
    expirationDate
    status
    payments {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSubscriptionPlanSubscriptionsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSubscriptionMutationVariables,
  APITypes.UpdateCourseSubscriptionMutation
>;
export const deleteCourseSubscription = /* GraphQL */ `mutation DeleteCourseSubscription(
  $input: DeleteCourseSubscriptionInput!
  $condition: ModelCourseSubscriptionConditionInput
) {
  deleteCourseSubscription(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSubscriptionPlanId
    courseSubscriptionPlan {
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
    startDate
    expirationDate
    status
    payments {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSubscriptionPlanSubscriptionsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSubscriptionMutationVariables,
  APITypes.DeleteCourseSubscriptionMutation
>;
export const createCourseSubscriptionPayment = /* GraphQL */ `mutation CreateCourseSubscriptionPayment(
  $input: CreateCourseSubscriptionPaymentInput!
  $condition: ModelCourseSubscriptionPaymentConditionInput
) {
  createCourseSubscriptionPayment(input: $input, condition: $condition) {
    id
    subscriptionId
    subscription {
      id
      courseSlug
      courseSubscriptionPlanId
      startDate
      expirationDate
      status
      owner
      createdAt
      updatedAt
      courseSubscriptionPlanSubscriptionsId
      __typename
    }
    amount
    paymentMethod
    status
    owner
    createdAt
    updatedAt
    courseSubscriptionPaymentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSubscriptionPaymentMutationVariables,
  APITypes.CreateCourseSubscriptionPaymentMutation
>;
export const updateCourseSubscriptionPayment = /* GraphQL */ `mutation UpdateCourseSubscriptionPayment(
  $input: UpdateCourseSubscriptionPaymentInput!
  $condition: ModelCourseSubscriptionPaymentConditionInput
) {
  updateCourseSubscriptionPayment(input: $input, condition: $condition) {
    id
    subscriptionId
    subscription {
      id
      courseSlug
      courseSubscriptionPlanId
      startDate
      expirationDate
      status
      owner
      createdAt
      updatedAt
      courseSubscriptionPlanSubscriptionsId
      __typename
    }
    amount
    paymentMethod
    status
    owner
    createdAt
    updatedAt
    courseSubscriptionPaymentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSubscriptionPaymentMutationVariables,
  APITypes.UpdateCourseSubscriptionPaymentMutation
>;
export const deleteCourseSubscriptionPayment = /* GraphQL */ `mutation DeleteCourseSubscriptionPayment(
  $input: DeleteCourseSubscriptionPaymentInput!
  $condition: ModelCourseSubscriptionPaymentConditionInput
) {
  deleteCourseSubscriptionPayment(input: $input, condition: $condition) {
    id
    subscriptionId
    subscription {
      id
      courseSlug
      courseSubscriptionPlanId
      startDate
      expirationDate
      status
      owner
      createdAt
      updatedAt
      courseSubscriptionPlanSubscriptionsId
      __typename
    }
    amount
    paymentMethod
    status
    owner
    createdAt
    updatedAt
    courseSubscriptionPaymentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSubscriptionPaymentMutationVariables,
  APITypes.DeleteCourseSubscriptionPaymentMutation
>;
export const createCourseVerification = /* GraphQL */ `mutation CreateCourseVerification(
  $input: CreateCourseVerificationInput!
  $condition: ModelCourseVerificationConditionInput
) {
  createCourseVerification(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    message
    status
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseVerificationMutationVariables,
  APITypes.CreateCourseVerificationMutation
>;
export const updateCourseVerification = /* GraphQL */ `mutation UpdateCourseVerification(
  $input: UpdateCourseVerificationInput!
  $condition: ModelCourseVerificationConditionInput
) {
  updateCourseVerification(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    message
    status
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseVerificationMutationVariables,
  APITypes.UpdateCourseVerificationMutation
>;
export const deleteCourseVerification = /* GraphQL */ `mutation DeleteCourseVerification(
  $input: DeleteCourseVerificationInput!
  $condition: ModelCourseVerificationConditionInput
) {
  deleteCourseVerification(input: $input, condition: $condition) {
    id
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    message
    status
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseVerificationMutationVariables,
  APITypes.DeleteCourseVerificationMutation
>;
export const createCourseLandingPage = /* GraphQL */ `mutation CreateCourseLandingPage(
  $input: CreateCourseLandingPageInput!
  $condition: ModelCourseLandingPageConditionInput
) {
  createCourseLandingPage(input: $input, condition: $condition) {
    id
    backgroundColor
    appBar {
      logoKey
      backgroundColor
      watchCourseTextColor
      __typename
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
      __typename
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
      __typename
    }
    footer {
      backgroundColor
      courseDomainTextColor
      poweredByTextColor
      __typename
    }
    sections {
      backgroundColor
      __typename
    }
    metaTitle
    metaDescription
    faviconKey
    tawkPropertyId
    tawkWidgetId
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseLandingPageMutationVariables,
  APITypes.CreateCourseLandingPageMutation
>;
export const updateCourseLandingPage = /* GraphQL */ `mutation UpdateCourseLandingPage(
  $input: UpdateCourseLandingPageInput!
  $condition: ModelCourseLandingPageConditionInput
) {
  updateCourseLandingPage(input: $input, condition: $condition) {
    id
    backgroundColor
    appBar {
      logoKey
      backgroundColor
      watchCourseTextColor
      __typename
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
      __typename
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
      __typename
    }
    footer {
      backgroundColor
      courseDomainTextColor
      poweredByTextColor
      __typename
    }
    sections {
      backgroundColor
      __typename
    }
    metaTitle
    metaDescription
    faviconKey
    tawkPropertyId
    tawkWidgetId
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseLandingPageMutationVariables,
  APITypes.UpdateCourseLandingPageMutation
>;
export const deleteCourseLandingPage = /* GraphQL */ `mutation DeleteCourseLandingPage(
  $input: DeleteCourseLandingPageInput!
  $condition: ModelCourseLandingPageConditionInput
) {
  deleteCourseLandingPage(input: $input, condition: $condition) {
    id
    backgroundColor
    appBar {
      logoKey
      backgroundColor
      watchCourseTextColor
      __typename
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
      __typename
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
      __typename
    }
    footer {
      backgroundColor
      courseDomainTextColor
      poweredByTextColor
      __typename
    }
    sections {
      backgroundColor
      __typename
    }
    metaTitle
    metaDescription
    faviconKey
    tawkPropertyId
    tawkWidgetId
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseLandingPageMutationVariables,
  APITypes.DeleteCourseLandingPageMutation
>;
export const createCourse = /* GraphQL */ `mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
    slug
    domain
    title
    price
    discountPrice
    logoKey
    status
    courseSections {
      nextToken
      __typename
    }
    courseLandingPage {
      id
      backgroundColor
      metaTitle
      metaDescription
      faviconKey
      tawkPropertyId
      tawkWidgetId
      owner
      createdAt
      updatedAt
      __typename
    }
    facebookPixelId
    orders {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    verificationId
    verification {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseLandingPageId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseMutationVariables,
  APITypes.CreateCourseMutation
>;
export const updateCourse = /* GraphQL */ `mutation UpdateCourse(
  $input: UpdateCourseInput!
  $condition: ModelCourseConditionInput
) {
  updateCourse(input: $input, condition: $condition) {
    slug
    domain
    title
    price
    discountPrice
    logoKey
    status
    courseSections {
      nextToken
      __typename
    }
    courseLandingPage {
      id
      backgroundColor
      metaTitle
      metaDescription
      faviconKey
      tawkPropertyId
      tawkWidgetId
      owner
      createdAt
      updatedAt
      __typename
    }
    facebookPixelId
    orders {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    verificationId
    verification {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseLandingPageId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseMutationVariables,
  APITypes.UpdateCourseMutation
>;
export const deleteCourse = /* GraphQL */ `mutation DeleteCourse(
  $input: DeleteCourseInput!
  $condition: ModelCourseConditionInput
) {
  deleteCourse(input: $input, condition: $condition) {
    slug
    domain
    title
    price
    discountPrice
    logoKey
    status
    courseSections {
      nextToken
      __typename
    }
    courseLandingPage {
      id
      backgroundColor
      metaTitle
      metaDescription
      faviconKey
      tawkPropertyId
      tawkWidgetId
      owner
      createdAt
      updatedAt
      __typename
    }
    facebookPixelId
    orders {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    verificationId
    verification {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseLandingPageId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseMutationVariables,
  APITypes.DeleteCourseMutation
>;
export const createCourseSection = /* GraphQL */ `mutation CreateCourseSection(
  $input: CreateCourseSectionInput!
  $condition: ModelCourseSectionConditionInput
) {
  createCourseSection(input: $input, condition: $condition) {
    id
    position
    title
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSectionSteps {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseSectionsSlug
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSectionMutationVariables,
  APITypes.CreateCourseSectionMutation
>;
export const updateCourseSection = /* GraphQL */ `mutation UpdateCourseSection(
  $input: UpdateCourseSectionInput!
  $condition: ModelCourseSectionConditionInput
) {
  updateCourseSection(input: $input, condition: $condition) {
    id
    position
    title
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSectionSteps {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseSectionsSlug
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSectionMutationVariables,
  APITypes.UpdateCourseSectionMutation
>;
export const deleteCourseSection = /* GraphQL */ `mutation DeleteCourseSection(
  $input: DeleteCourseSectionInput!
  $condition: ModelCourseSectionConditionInput
) {
  deleteCourseSection(input: $input, condition: $condition) {
    id
    position
    title
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    courseSectionSteps {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseCourseSectionsSlug
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSectionMutationVariables,
  APITypes.DeleteCourseSectionMutation
>;
export const createCourseSectionStep = /* GraphQL */ `mutation CreateCourseSectionStep(
  $input: CreateCourseSectionStepInput!
  $condition: ModelCourseSectionStepConditionInput
) {
  createCourseSectionStep(input: $input, condition: $condition) {
    id
    position
    title
    type
    status
    uploadedVideo {
      identityId
      key
      size
      fileName
      __typename
    }
    courseSectionStepVideo {
      id
      status
      duration
      owner
      createdAt
      updatedAt
      courseSectionStepVideoCourseSectionStepId
      __typename
    }
    courseSectionStepTest {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    courseSection {
      id
      position
      title
      owner
      createdAt
      updatedAt
      courseCourseSectionsSlug
      __typename
    }
    userCourseStepProgress {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionCourseSectionStepsId
    courseSectionStepCourseSectionStepVideoId
    courseSectionStepCourseSectionStepTestId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSectionStepMutationVariables,
  APITypes.CreateCourseSectionStepMutation
>;
export const updateCourseSectionStep = /* GraphQL */ `mutation UpdateCourseSectionStep(
  $input: UpdateCourseSectionStepInput!
  $condition: ModelCourseSectionStepConditionInput
) {
  updateCourseSectionStep(input: $input, condition: $condition) {
    id
    position
    title
    type
    status
    uploadedVideo {
      identityId
      key
      size
      fileName
      __typename
    }
    courseSectionStepVideo {
      id
      status
      duration
      owner
      createdAt
      updatedAt
      courseSectionStepVideoCourseSectionStepId
      __typename
    }
    courseSectionStepTest {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    courseSection {
      id
      position
      title
      owner
      createdAt
      updatedAt
      courseCourseSectionsSlug
      __typename
    }
    userCourseStepProgress {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionCourseSectionStepsId
    courseSectionStepCourseSectionStepVideoId
    courseSectionStepCourseSectionStepTestId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSectionStepMutationVariables,
  APITypes.UpdateCourseSectionStepMutation
>;
export const deleteCourseSectionStep = /* GraphQL */ `mutation DeleteCourseSectionStep(
  $input: DeleteCourseSectionStepInput!
  $condition: ModelCourseSectionStepConditionInput
) {
  deleteCourseSectionStep(input: $input, condition: $condition) {
    id
    position
    title
    type
    status
    uploadedVideo {
      identityId
      key
      size
      fileName
      __typename
    }
    courseSectionStepVideo {
      id
      status
      duration
      owner
      createdAt
      updatedAt
      courseSectionStepVideoCourseSectionStepId
      __typename
    }
    courseSectionStepTest {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    courseSection {
      id
      position
      title
      owner
      createdAt
      updatedAt
      courseCourseSectionsSlug
      __typename
    }
    userCourseStepProgress {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionCourseSectionStepsId
    courseSectionStepCourseSectionStepVideoId
    courseSectionStepCourseSectionStepTestId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSectionStepMutationVariables,
  APITypes.DeleteCourseSectionStepMutation
>;
export const createCourseSectionStepVideo = /* GraphQL */ `mutation CreateCourseSectionStepVideo(
  $input: CreateCourseSectionStepVideoInput!
  $condition: ModelCourseSectionStepVideoConditionInput
) {
  createCourseSectionStepVideo(input: $input, condition: $condition) {
    id
    status
    url {
      resolution
      url
      __typename
    }
    duration
    courseSectionStep {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionStepVideoCourseSectionStepId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseSectionStepVideoMutationVariables,
  APITypes.CreateCourseSectionStepVideoMutation
>;
export const updateCourseSectionStepVideo = /* GraphQL */ `mutation UpdateCourseSectionStepVideo(
  $input: UpdateCourseSectionStepVideoInput!
  $condition: ModelCourseSectionStepVideoConditionInput
) {
  updateCourseSectionStepVideo(input: $input, condition: $condition) {
    id
    status
    url {
      resolution
      url
      __typename
    }
    duration
    courseSectionStep {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionStepVideoCourseSectionStepId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseSectionStepVideoMutationVariables,
  APITypes.UpdateCourseSectionStepVideoMutation
>;
export const deleteCourseSectionStepVideo = /* GraphQL */ `mutation DeleteCourseSectionStepVideo(
  $input: DeleteCourseSectionStepVideoInput!
  $condition: ModelCourseSectionStepVideoConditionInput
) {
  deleteCourseSectionStepVideo(input: $input, condition: $condition) {
    id
    status
    url {
      resolution
      url
      __typename
    }
    duration
    courseSectionStep {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    owner
    createdAt
    updatedAt
    courseSectionStepVideoCourseSectionStepId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseSectionStepVideoMutationVariables,
  APITypes.DeleteCourseSectionStepVideoMutation
>;
export const createReferralCode = /* GraphQL */ `mutation CreateReferralCode(
  $input: CreateReferralCodeInput!
  $condition: ModelReferralCodeConditionInput
) {
  createReferralCode(input: $input, condition: $condition) {
    code
    orders {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReferralCodeMutationVariables,
  APITypes.CreateReferralCodeMutation
>;
export const updateReferralCode = /* GraphQL */ `mutation UpdateReferralCode(
  $input: UpdateReferralCodeInput!
  $condition: ModelReferralCodeConditionInput
) {
  updateReferralCode(input: $input, condition: $condition) {
    code
    orders {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReferralCodeMutationVariables,
  APITypes.UpdateReferralCodeMutation
>;
export const deleteReferralCode = /* GraphQL */ `mutation DeleteReferralCode(
  $input: DeleteReferralCodeInput!
  $condition: ModelReferralCodeConditionInput
) {
  deleteReferralCode(input: $input, condition: $condition) {
    code
    orders {
      nextToken
      __typename
    }
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReferralCodeMutationVariables,
  APITypes.DeleteReferralCodeMutation
>;
export const createUserOrder = /* GraphQL */ `mutation CreateUserOrder(
  $input: CreateUserOrderInput!
  $condition: ModelUserOrderConditionInput
) {
  createUserOrder(input: $input, condition: $condition) {
    id
    status
    paymentMethod
    price
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    referralCode {
      code
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    referralCodeOrdersCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserOrderMutationVariables,
  APITypes.CreateUserOrderMutation
>;
export const updateUserOrder = /* GraphQL */ `mutation UpdateUserOrder(
  $input: UpdateUserOrderInput!
  $condition: ModelUserOrderConditionInput
) {
  updateUserOrder(input: $input, condition: $condition) {
    id
    status
    paymentMethod
    price
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    referralCode {
      code
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    referralCodeOrdersCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserOrderMutationVariables,
  APITypes.UpdateUserOrderMutation
>;
export const deleteUserOrder = /* GraphQL */ `mutation DeleteUserOrder(
  $input: DeleteUserOrderInput!
  $condition: ModelUserOrderConditionInput
) {
  deleteUserOrder(input: $input, condition: $condition) {
    id
    status
    paymentMethod
    price
    courseSlug
    course {
      slug
      domain
      title
      price
      discountPrice
      logoKey
      status
      facebookPixelId
      verificationId
      owner
      createdAt
      updatedAt
      courseCourseLandingPageId
      __typename
    }
    referralCode {
      code
      owner
      createdAt
      updatedAt
      __typename
    }
    owner
    createdAt
    updatedAt
    referralCodeOrdersCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserOrderMutationVariables,
  APITypes.DeleteUserOrderMutation
>;
export const createUserCourseStepProgress = /* GraphQL */ `mutation CreateUserCourseStepProgress(
  $input: CreateUserCourseStepProgressInput!
  $condition: ModelUserCourseStepProgressConditionInput
) {
  createUserCourseStepProgress(input: $input, condition: $condition) {
    id
    stepID
    step {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    durationInMs
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserCourseStepProgressMutationVariables,
  APITypes.CreateUserCourseStepProgressMutation
>;
export const updateUserCourseStepProgress = /* GraphQL */ `mutation UpdateUserCourseStepProgress(
  $input: UpdateUserCourseStepProgressInput!
  $condition: ModelUserCourseStepProgressConditionInput
) {
  updateUserCourseStepProgress(input: $input, condition: $condition) {
    id
    stepID
    step {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    durationInMs
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserCourseStepProgressMutationVariables,
  APITypes.UpdateUserCourseStepProgressMutation
>;
export const deleteUserCourseStepProgress = /* GraphQL */ `mutation DeleteUserCourseStepProgress(
  $input: DeleteUserCourseStepProgressInput!
  $condition: ModelUserCourseStepProgressConditionInput
) {
  deleteUserCourseStepProgress(input: $input, condition: $condition) {
    id
    stepID
    step {
      id
      position
      title
      type
      status
      owner
      createdAt
      updatedAt
      courseSectionCourseSectionStepsId
      courseSectionStepCourseSectionStepVideoId
      courseSectionStepCourseSectionStepTestId
      __typename
    }
    durationInMs
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserCourseStepProgressMutationVariables,
  APITypes.DeleteUserCourseStepProgressMutation
>;
