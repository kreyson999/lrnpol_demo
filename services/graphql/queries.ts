/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCourseSectionStepTest = /* GraphQL */ `query GetCourseSectionStepTest($id: ID!) {
  getCourseSectionStepTest(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSectionStepTestQueryVariables,
  APITypes.GetCourseSectionStepTestQuery
>;
export const listCourseSectionStepTests = /* GraphQL */ `query ListCourseSectionStepTests(
  $id: ID
  $filter: ModelCourseSectionStepTestFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCourseSectionStepTests(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSectionStepTestsQueryVariables,
  APITypes.ListCourseSectionStepTestsQuery
>;
export const getCourseSectionStepTestQuestion = /* GraphQL */ `query GetCourseSectionStepTestQuestion($id: ID!) {
  getCourseSectionStepTestQuestion(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSectionStepTestQuestionQueryVariables,
  APITypes.GetCourseSectionStepTestQuestionQuery
>;
export const listCourseSectionStepTestQuestions = /* GraphQL */ `query ListCourseSectionStepTestQuestions(
  $id: ID
  $filter: ModelCourseSectionStepTestQuestionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCourseSectionStepTestQuestions(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      type
      position
      text
      imageKey
      correctAnswers
      testId
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSectionStepTestQuestionsQueryVariables,
  APITypes.ListCourseSectionStepTestQuestionsQuery
>;
export const courseSectionStepTestQuestionByTest = /* GraphQL */ `query CourseSectionStepTestQuestionByTest(
  $testId: ID!
  $position: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCourseSectionStepTestQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  courseSectionStepTestQuestionByTest(
    testId: $testId
    position: $position
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      position
      text
      imageKey
      correctAnswers
      testId
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CourseSectionStepTestQuestionByTestQueryVariables,
  APITypes.CourseSectionStepTestQuestionByTestQuery
>;
export const getCourseSubscriptionPlan = /* GraphQL */ `query GetCourseSubscriptionPlan($id: ID!) {
  getCourseSubscriptionPlan(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSubscriptionPlanQueryVariables,
  APITypes.GetCourseSubscriptionPlanQuery
>;
export const listCourseSubscriptionPlans = /* GraphQL */ `query ListCourseSubscriptionPlans(
  $filter: ModelCourseSubscriptionPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSubscriptionPlans(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSubscriptionPlansQueryVariables,
  APITypes.ListCourseSubscriptionPlansQuery
>;
export const getCourseSubscription = /* GraphQL */ `query GetCourseSubscription($id: ID!) {
  getCourseSubscription(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSubscriptionQueryVariables,
  APITypes.GetCourseSubscriptionQuery
>;
export const listCourseSubscriptions = /* GraphQL */ `query ListCourseSubscriptions(
  $filter: ModelCourseSubscriptionFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSubscriptions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSubscriptionsQueryVariables,
  APITypes.ListCourseSubscriptionsQuery
>;
export const subscriptionByCourseSlug = /* GraphQL */ `query SubscriptionByCourseSlug(
  $courseSlug: String!
  $startDate: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCourseSubscriptionFilterInput
  $limit: Int
  $nextToken: String
) {
  subscriptionByCourseSlug(
    courseSlug: $courseSlug
    startDate: $startDate
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SubscriptionByCourseSlugQueryVariables,
  APITypes.SubscriptionByCourseSlugQuery
>;
export const getCourseSubscriptionPayment = /* GraphQL */ `query GetCourseSubscriptionPayment($id: ID!) {
  getCourseSubscriptionPayment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSubscriptionPaymentQueryVariables,
  APITypes.GetCourseSubscriptionPaymentQuery
>;
export const listCourseSubscriptionPayments = /* GraphQL */ `query ListCourseSubscriptionPayments(
  $filter: ModelCourseSubscriptionPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSubscriptionPayments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      subscriptionId
      amount
      paymentMethod
      status
      owner
      createdAt
      updatedAt
      courseSubscriptionPaymentsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSubscriptionPaymentsQueryVariables,
  APITypes.ListCourseSubscriptionPaymentsQuery
>;
export const getCourseVerification = /* GraphQL */ `query GetCourseVerification($id: ID!) {
  getCourseVerification(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseVerificationQueryVariables,
  APITypes.GetCourseVerificationQuery
>;
export const listCourseVerifications = /* GraphQL */ `query ListCourseVerifications(
  $filter: ModelCourseVerificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseVerifications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseVerificationsQueryVariables,
  APITypes.ListCourseVerificationsQuery
>;
export const verificationByCourseSlug = /* GraphQL */ `query VerificationByCourseSlug(
  $courseSlug: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseVerificationFilterInput
  $limit: Int
  $nextToken: String
) {
  verificationByCourseSlug(
    courseSlug: $courseSlug
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      courseSlug
      message
      status
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VerificationByCourseSlugQueryVariables,
  APITypes.VerificationByCourseSlugQuery
>;
export const getCourseLandingPage = /* GraphQL */ `query GetCourseLandingPage($id: ID!) {
  getCourseLandingPage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseLandingPageQueryVariables,
  APITypes.GetCourseLandingPageQuery
>;
export const listCourseLandingPages = /* GraphQL */ `query ListCourseLandingPages(
  $filter: ModelCourseLandingPageFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseLandingPages(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseLandingPagesQueryVariables,
  APITypes.ListCourseLandingPagesQuery
>;
export const getCourse = /* GraphQL */ `query GetCourse($slug: String!) {
  getCourse(slug: $slug) {
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
` as GeneratedQuery<APITypes.GetCourseQueryVariables, APITypes.GetCourseQuery>;
export const listCourses = /* GraphQL */ `query ListCourses(
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoursesQueryVariables,
  APITypes.ListCoursesQuery
>;
export const courseByDomain = /* GraphQL */ `query CourseByDomain(
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CourseByDomainQueryVariables,
  APITypes.CourseByDomainQuery
>;
export const courseByStatus = /* GraphQL */ `query CourseByStatus(
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CourseByStatusQueryVariables,
  APITypes.CourseByStatusQuery
>;
export const courseByOwner = /* GraphQL */ `query CourseByOwner(
  $owner: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  courseByOwner(
    owner: $owner
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CourseByOwnerQueryVariables,
  APITypes.CourseByOwnerQuery
>;
export const getCourseSection = /* GraphQL */ `query GetCourseSection($id: ID!) {
  getCourseSection(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSectionQueryVariables,
  APITypes.GetCourseSectionQuery
>;
export const listCourseSections = /* GraphQL */ `query ListCourseSections(
  $filter: ModelCourseSectionFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      position
      title
      owner
      createdAt
      updatedAt
      courseCourseSectionsSlug
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSectionsQueryVariables,
  APITypes.ListCourseSectionsQuery
>;
export const getCourseSectionStep = /* GraphQL */ `query GetCourseSectionStep($id: ID!) {
  getCourseSectionStep(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSectionStepQueryVariables,
  APITypes.GetCourseSectionStepQuery
>;
export const listCourseSectionSteps = /* GraphQL */ `query ListCourseSectionSteps(
  $filter: ModelCourseSectionStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSectionSteps(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSectionStepsQueryVariables,
  APITypes.ListCourseSectionStepsQuery
>;
export const getCourseSectionStepVideo = /* GraphQL */ `query GetCourseSectionStepVideo($id: ID!) {
  getCourseSectionStepVideo(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCourseSectionStepVideoQueryVariables,
  APITypes.GetCourseSectionStepVideoQuery
>;
export const listCourseSectionStepVideos = /* GraphQL */ `query ListCourseSectionStepVideos(
  $filter: ModelCourseSectionStepVideoFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourseSectionStepVideos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      duration
      owner
      createdAt
      updatedAt
      courseSectionStepVideoCourseSectionStepId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCourseSectionStepVideosQueryVariables,
  APITypes.ListCourseSectionStepVideosQuery
>;
export const getReferralCode = /* GraphQL */ `query GetReferralCode($code: String!) {
  getReferralCode(code: $code) {
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
` as GeneratedQuery<
  APITypes.GetReferralCodeQueryVariables,
  APITypes.GetReferralCodeQuery
>;
export const listReferralCodes = /* GraphQL */ `query ListReferralCodes(
  $code: String
  $filter: ModelReferralCodeFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listReferralCodes(
    code: $code
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      code
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReferralCodesQueryVariables,
  APITypes.ListReferralCodesQuery
>;
export const referralCodesByOwner = /* GraphQL */ `query ReferralCodesByOwner(
  $owner: String!
  $sortDirection: ModelSortDirection
  $filter: ModelReferralCodeFilterInput
  $limit: Int
  $nextToken: String
) {
  referralCodesByOwner(
    owner: $owner
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      code
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ReferralCodesByOwnerQueryVariables,
  APITypes.ReferralCodesByOwnerQuery
>;
export const getUserOrder = /* GraphQL */ `query GetUserOrder($id: ID!) {
  getUserOrder(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserOrderQueryVariables,
  APITypes.GetUserOrderQuery
>;
export const listUserOrders = /* GraphQL */ `query ListUserOrders(
  $filter: ModelUserOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      status
      paymentMethod
      price
      courseSlug
      owner
      createdAt
      updatedAt
      referralCodeOrdersCode
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserOrdersQueryVariables,
  APITypes.ListUserOrdersQuery
>;
export const userOrderByCourseSlug = /* GraphQL */ `query UserOrderByCourseSlug(
  $courseSlug: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  userOrderByCourseSlug(
    courseSlug: $courseSlug
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      paymentMethod
      price
      courseSlug
      owner
      createdAt
      updatedAt
      referralCodeOrdersCode
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserOrderByCourseSlugQueryVariables,
  APITypes.UserOrderByCourseSlugQuery
>;
export const userOrderByOwnerAndCourse = /* GraphQL */ `query UserOrderByOwnerAndCourse(
  $owner: String!
  $courseSlug: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  userOrderByOwnerAndCourse(
    owner: $owner
    courseSlug: $courseSlug
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      paymentMethod
      price
      courseSlug
      owner
      createdAt
      updatedAt
      referralCodeOrdersCode
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserOrderByOwnerAndCourseQueryVariables,
  APITypes.UserOrderByOwnerAndCourseQuery
>;
export const getUserCourseStepProgress = /* GraphQL */ `query GetUserCourseStepProgress($id: ID!) {
  getUserCourseStepProgress(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserCourseStepProgressQueryVariables,
  APITypes.GetUserCourseStepProgressQuery
>;
export const listUserCourseStepProgresses = /* GraphQL */ `query ListUserCourseStepProgresses(
  $filter: ModelUserCourseStepProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserCourseStepProgresses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stepID
      durationInMs
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserCourseStepProgressesQueryVariables,
  APITypes.ListUserCourseStepProgressesQuery
>;
export const userCourseStepProgressByOwnerAndStep = /* GraphQL */ `query UserCourseStepProgressByOwnerAndStep(
  $owner: String!
  $stepID: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserCourseStepProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  userCourseStepProgressByOwnerAndStep(
    owner: $owner
    stepID: $stepID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stepID
      durationInMs
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserCourseStepProgressByOwnerAndStepQueryVariables,
  APITypes.UserCourseStepProgressByOwnerAndStepQuery
>;
