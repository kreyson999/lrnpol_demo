/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCourseSectionStepTestInput = {
  id?: string | null,
  owner?: string | null,
};

export type ModelCourseSectionStepTestConditionInput = {
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepTestConditionInput | null > | null,
  or?: Array< ModelCourseSectionStepTestConditionInput | null > | null,
  not?: ModelCourseSectionStepTestConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CourseSectionStepTest = {
  __typename: "CourseSectionStepTest",
  id: string,
  questions?: ModelCourseSectionStepTestQuestionConnection | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCourseSectionStepTestQuestionConnection = {
  __typename: "ModelCourseSectionStepTestQuestionConnection",
  items:  Array<CourseSectionStepTestQuestion | null >,
  nextToken?: string | null,
};

export type CourseSectionStepTestQuestion = {
  __typename: "CourseSectionStepTestQuestion",
  id: string,
  type: CourseSectionStepTestQuestionType,
  position: number,
  text?: string | null,
  imageKey?: string | null,
  answers?:  Array<CourseSectionStepTestQuestionAnswer | null > | null,
  correctAnswers?: Array< string | null > | null,
  testId: string,
  test: CourseSectionStepTest,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum CourseSectionStepTestQuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}


export type CourseSectionStepTestQuestionAnswer = {
  __typename: "CourseSectionStepTestQuestionAnswer",
  id: string,
  text?: string | null,
  imageKey?: string | null,
};

export type UpdateCourseSectionStepTestInput = {
  id: string,
  owner?: string | null,
};

export type DeleteCourseSectionStepTestInput = {
  id: string,
};

export type CreateCourseSectionStepTestQuestionInput = {
  id?: string | null,
  type: CourseSectionStepTestQuestionType,
  position: number,
  text?: string | null,
  imageKey?: string | null,
  answers?: Array< CourseSectionStepTestQuestionAnswerInput | null > | null,
  correctAnswers?: Array< string | null > | null,
  testId: string,
  owner?: string | null,
};

export type CourseSectionStepTestQuestionAnswerInput = {
  id: string,
  text?: string | null,
  imageKey?: string | null,
};

export type ModelCourseSectionStepTestQuestionConditionInput = {
  type?: ModelCourseSectionStepTestQuestionTypeInput | null,
  position?: ModelIntInput | null,
  text?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  correctAnswers?: ModelIDInput | null,
  testId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepTestQuestionConditionInput | null > | null,
  or?: Array< ModelCourseSectionStepTestQuestionConditionInput | null > | null,
  not?: ModelCourseSectionStepTestQuestionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCourseSectionStepTestQuestionTypeInput = {
  eq?: CourseSectionStepTestQuestionType | null,
  ne?: CourseSectionStepTestQuestionType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCourseSectionStepTestQuestionInput = {
  id: string,
  type?: CourseSectionStepTestQuestionType | null,
  position?: number | null,
  text?: string | null,
  imageKey?: string | null,
  answers?: Array< CourseSectionStepTestQuestionAnswerInput | null > | null,
  correctAnswers?: Array< string | null > | null,
  testId?: string | null,
  owner?: string | null,
};

export type DeleteCourseSectionStepTestQuestionInput = {
  id: string,
};

export type CreateCourseSubscriptionPlanInput = {
  id?: string | null,
  name: string,
  description: string,
  price: number,
  features: Array< string >,
  maxHours: number,
};

export type ModelCourseSubscriptionPlanConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  features?: ModelStringInput | null,
  maxHours?: ModelIntInput | null,
  and?: Array< ModelCourseSubscriptionPlanConditionInput | null > | null,
  or?: Array< ModelCourseSubscriptionPlanConditionInput | null > | null,
  not?: ModelCourseSubscriptionPlanConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CourseSubscriptionPlan = {
  __typename: "CourseSubscriptionPlan",
  id: string,
  name: string,
  description: string,
  price: number,
  features: Array< string >,
  maxHours: number,
  subscriptions?: ModelCourseSubscriptionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCourseSubscriptionConnection = {
  __typename: "ModelCourseSubscriptionConnection",
  items:  Array<CourseSubscription | null >,
  nextToken?: string | null,
};

export type CourseSubscription = {
  __typename: "CourseSubscription",
  id: string,
  courseSlug: string,
  course: Course,
  courseSubscriptionPlanId: string,
  courseSubscriptionPlan: CourseSubscriptionPlan,
  startDate: string,
  expirationDate: string,
  status?: CourseSubscriptionStatus | null,
  payments?: ModelCourseSubscriptionPaymentConnection | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseSubscriptionPlanSubscriptionsId?: string | null,
};

export type Course = {
  __typename: "Course",
  slug: string,
  domain: string,
  title: string,
  price?: number | null,
  discountPrice?: number | null,
  logoKey?: string | null,
  status: CourseStatus,
  courseSections?: ModelCourseSectionConnection | null,
  courseLandingPage?: CourseLandingPage | null,
  facebookPixelId?: string | null,
  orders?: ModelUserOrderConnection | null,
  subscriptions?: ModelCourseSubscriptionConnection | null,
  verificationId?: string | null,
  verification?: CourseVerification | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseCourseLandingPageId?: string | null,
};

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}


export type ModelCourseSectionConnection = {
  __typename: "ModelCourseSectionConnection",
  items:  Array<CourseSection | null >,
  nextToken?: string | null,
};

export type CourseSection = {
  __typename: "CourseSection",
  id: string,
  position: number,
  title: string,
  course: Course,
  courseSectionSteps?: ModelCourseSectionStepConnection | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseCourseSectionsSlug?: string | null,
};

export type ModelCourseSectionStepConnection = {
  __typename: "ModelCourseSectionStepConnection",
  items:  Array<CourseSectionStep | null >,
  nextToken?: string | null,
};

export type CourseSectionStep = {
  __typename: "CourseSectionStep",
  id: string,
  position: number,
  title: string,
  type: CourseSectionStepType,
  status: CourseSectionStepStatus,
  uploadedVideo?: UploadedVideo | null,
  courseSectionStepVideo?: CourseSectionStepVideo | null,
  courseSectionStepTest?: CourseSectionStepTest | null,
  courseSection: CourseSection,
  userCourseStepProgress?: ModelUserCourseStepProgressConnection | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseSectionCourseSectionStepsId?: string | null,
  courseSectionStepCourseSectionStepVideoId?: string | null,
  courseSectionStepCourseSectionStepTestId?: string | null,
};

export enum CourseSectionStepType {
  VIDEO = "VIDEO",
  TEST = "TEST",
}


export enum CourseSectionStepStatus {
  DRAFT = "DRAFT",
  TO_REVIEW = "TO_REVIEW",
  PUBLISHED = "PUBLISHED",
}


export type UploadedVideo = {
  __typename: "UploadedVideo",
  identityId: string,
  key: string,
  size: number,
  fileName: string,
};

export type CourseSectionStepVideo = {
  __typename: "CourseSectionStepVideo",
  id: string,
  status: CourseSectionStepVideoStatus,
  url?: CourseSectionStepVideoURL | null,
  duration: number,
  courseSectionStep: CourseSectionStep,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseSectionStepVideoCourseSectionStepId: string,
};

export enum CourseSectionStepVideoStatus {
  PROCCESSING = "PROCCESSING",
  UPLOADED = "UPLOADED",
}


export type CourseSectionStepVideoURL = {
  __typename: "CourseSectionStepVideoURL",
  resolution: Array< CourseSectionStepVideoURLResolution >,
  url: string,
};

export enum CourseSectionStepVideoURLResolution {
  RES_360p = "RES_360p",
  RES_480p = "RES_480p",
  RES_720p = "RES_720p",
  RES_1080p = "RES_1080p",
}


export type ModelUserCourseStepProgressConnection = {
  __typename: "ModelUserCourseStepProgressConnection",
  items:  Array<UserCourseStepProgress | null >,
  nextToken?: string | null,
};

export type UserCourseStepProgress = {
  __typename: "UserCourseStepProgress",
  id: string,
  stepID: string,
  step: CourseSectionStep,
  durationInMs: number,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type CourseLandingPage = {
  __typename: "CourseLandingPage",
  id: string,
  backgroundColor: string,
  appBar: CourseLandingPageAppBar,
  header: CourseLandingPageHeader,
  fixedCard: CourseLandingPageFixedCard,
  footer: CourseLandingPageFooter,
  sections?:  Array<CourseLandingPageSection | null > | null,
  metaTitle?: string | null,
  metaDescription?: string | null,
  faviconKey?: string | null,
  tawkPropertyId?: string | null,
  tawkWidgetId?: string | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type CourseLandingPageAppBar = {
  __typename: "CourseLandingPageAppBar",
  logoKey?: string | null,
  backgroundColor: string,
  watchCourseTextColor: string,
};

export type CourseLandingPageHeader = {
  __typename: "CourseLandingPageHeader",
  title: string,
  titleColor: string,
  subtitle: string,
  subtitleColor: string,
  backgroundColor: string,
  callToActionBackgroundColor: string,
  callToActionTextColor: string,
  statsTitleTextColor: string,
  statsValueTextColor: string,
};

export type CourseLandingPageFixedCard = {
  __typename: "CourseLandingPageFixedCard",
  imageKey?: string | null,
  backgroundColor: string,
  buttonBackgroundColor: string,
  buttonTextColor: string,
  priceTextColor: string,
  discountPriceTextColor: string,
  titleTextColor: string,
  descriptionTextColor: string,
  featureCheckboxBackgroundColor: string,
  featureCheckboxTextColor: string,
  featureTextColor: string,
};

export type CourseLandingPageFooter = {
  __typename: "CourseLandingPageFooter",
  backgroundColor: string,
  courseDomainTextColor: string,
  poweredByTextColor: string,
};

export type CourseLandingPageSection = {
  __typename: "CourseLandingPageSection",
  backgroundColor: string,
  aboutCourse?: CourseLandingPageSectionAboutCourse | null,
  features?: CourseLandingPageSectionFeatures | null,
  courseContent?: CourseLandingPageSectionCourseContent | null,
  subjects?: CourseLandingPageSectionSubjects | null,
  recommendedCourses?: CourseLandingPageSectionRecommendedCourses | null,
};

export type CourseLandingPageSectionAboutCourse = {
  __typename: "CourseLandingPageSectionAboutCourse",
  title: string,
  titleTextColor: string,
  content: string,
  contentTextColor: string,
};

export type CourseLandingPageSectionFeatures = {
  __typename: "CourseLandingPageSectionFeatures",
  items?:  Array<CourseLandingPageSectionFeaturesItem | null > | null,
};

export type CourseLandingPageSectionFeaturesItem = {
  __typename: "CourseLandingPageSectionFeaturesItem",
  backgroundColor: string,
  textColor: string,
  iconColor: string,
};

export type CourseLandingPageSectionCourseContent = {
  __typename: "CourseLandingPageSectionCourseContent",
  title: string,
  titleTextColor: string,
  subtitle: string,
  subtitleTextColor: string,
  sectionTitleBackgroundColor: string,
  sectionTitleTextColor: string,
  sectionArrowTextColor: string,
  stepBackgroundColor: string,
  stepTextColor: string,
  stepIconColor: string,
  stepDurationColor: string,
  sectionBorderColor: string,
  stepsDividerColor: string,
};

export type CourseLandingPageSectionSubjects = {
  __typename: "CourseLandingPageSectionSubjects",
  title: string,
  titleTextColor: string,
  subtitle: string,
  subtitleTextColor: string,
  subjects?:  Array<CourseLandingPageSectionSubjectsSubject | null > | null,
};

export type CourseLandingPageSectionSubjectsSubject = {
  __typename: "CourseLandingPageSectionSubjectsSubject",
  indexColor: string,
  title: string,
  titleTextColor: string,
  content: string,
  contentTextColor: string,
  imageKey?: string | null,
  imageBoxColor: string,
};

export type CourseLandingPageSectionRecommendedCourses = {
  __typename: "CourseLandingPageSectionRecommendedCourses",
  titleTextColor: string,
  subtitleTextColor: string,
  courseTitleTextColor: string,
  courseSlugs: Array< string | null >,
};

export type ModelUserOrderConnection = {
  __typename: "ModelUserOrderConnection",
  items:  Array<UserOrder | null >,
  nextToken?: string | null,
};

export type UserOrder = {
  __typename: "UserOrder",
  id: string,
  status?: UserOrderStatus | null,
  paymentMethod: PaymentMethod,
  price?: number | null,
  courseSlug: string,
  course: Course,
  referralCode?: ReferralCode | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  referralCodeOrdersCode?: string | null,
};

export enum UserOrderStatus {
  PAID = "PAID",
  FAIL = "FAIL",
}


export enum PaymentMethod {
  HOTPAY = "HOTPAY",
  STRIPE = "STRIPE",
}


export type ReferralCode = {
  __typename: "ReferralCode",
  code: string,
  orders?: ModelUserOrderConnection | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type CourseVerification = {
  __typename: "CourseVerification",
  id: string,
  courseSlug: string,
  course: Course,
  message?: string | null,
  status: CourseVerificationStatus,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum CourseVerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  NOT_SUITABLE = "NOT_SUITABLE",
}


export enum CourseSubscriptionStatus {
  NOT_STARTED = "NOT_STARTED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
}


export type ModelCourseSubscriptionPaymentConnection = {
  __typename: "ModelCourseSubscriptionPaymentConnection",
  items:  Array<CourseSubscriptionPayment | null >,
  nextToken?: string | null,
};

export type CourseSubscriptionPayment = {
  __typename: "CourseSubscriptionPayment",
  id: string,
  subscriptionId: string,
  subscription: CourseSubscription,
  amount: number,
  paymentMethod: PaymentMethod,
  status: CourseSubscriptionPaymentStatus,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  courseSubscriptionPaymentsId?: string | null,
};

export enum CourseSubscriptionPaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}


export type UpdateCourseSubscriptionPlanInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  price?: number | null,
  features?: Array< string > | null,
  maxHours?: number | null,
};

export type DeleteCourseSubscriptionPlanInput = {
  id: string,
};

export type CreateCourseSubscriptionInput = {
  id?: string | null,
  courseSlug: string,
  courseSubscriptionPlanId: string,
  startDate: string,
  expirationDate: string,
  status?: CourseSubscriptionStatus | null,
  owner?: string | null,
  courseSubscriptionPlanSubscriptionsId?: string | null,
};

export type ModelCourseSubscriptionConditionInput = {
  courseSlug?: ModelStringInput | null,
  courseSubscriptionPlanId?: ModelIDInput | null,
  startDate?: ModelStringInput | null,
  expirationDate?: ModelStringInput | null,
  status?: ModelCourseSubscriptionStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSubscriptionConditionInput | null > | null,
  or?: Array< ModelCourseSubscriptionConditionInput | null > | null,
  not?: ModelCourseSubscriptionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseSubscriptionPlanSubscriptionsId?: ModelIDInput | null,
};

export type ModelCourseSubscriptionStatusInput = {
  eq?: CourseSubscriptionStatus | null,
  ne?: CourseSubscriptionStatus | null,
};

export type UpdateCourseSubscriptionInput = {
  id: string,
  courseSlug?: string | null,
  courseSubscriptionPlanId?: string | null,
  startDate?: string | null,
  expirationDate?: string | null,
  status?: CourseSubscriptionStatus | null,
  owner?: string | null,
  courseSubscriptionPlanSubscriptionsId?: string | null,
};

export type DeleteCourseSubscriptionInput = {
  id: string,
};

export type CreateCourseSubscriptionPaymentInput = {
  id?: string | null,
  subscriptionId: string,
  amount: number,
  paymentMethod: PaymentMethod,
  status: CourseSubscriptionPaymentStatus,
  owner?: string | null,
  courseSubscriptionPaymentsId?: string | null,
};

export type ModelCourseSubscriptionPaymentConditionInput = {
  subscriptionId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  status?: ModelCourseSubscriptionPaymentStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSubscriptionPaymentConditionInput | null > | null,
  or?: Array< ModelCourseSubscriptionPaymentConditionInput | null > | null,
  not?: ModelCourseSubscriptionPaymentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseSubscriptionPaymentsId?: ModelIDInput | null,
};

export type ModelPaymentMethodInput = {
  eq?: PaymentMethod | null,
  ne?: PaymentMethod | null,
};

export type ModelCourseSubscriptionPaymentStatusInput = {
  eq?: CourseSubscriptionPaymentStatus | null,
  ne?: CourseSubscriptionPaymentStatus | null,
};

export type UpdateCourseSubscriptionPaymentInput = {
  id: string,
  subscriptionId?: string | null,
  amount?: number | null,
  paymentMethod?: PaymentMethod | null,
  status?: CourseSubscriptionPaymentStatus | null,
  owner?: string | null,
  courseSubscriptionPaymentsId?: string | null,
};

export type DeleteCourseSubscriptionPaymentInput = {
  id: string,
};

export type CreateCourseVerificationInput = {
  id?: string | null,
  courseSlug: string,
  message?: string | null,
  status: CourseVerificationStatus,
  owner?: string | null,
};

export type ModelCourseVerificationConditionInput = {
  courseSlug?: ModelStringInput | null,
  message?: ModelStringInput | null,
  status?: ModelCourseVerificationStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseVerificationConditionInput | null > | null,
  or?: Array< ModelCourseVerificationConditionInput | null > | null,
  not?: ModelCourseVerificationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCourseVerificationStatusInput = {
  eq?: CourseVerificationStatus | null,
  ne?: CourseVerificationStatus | null,
};

export type UpdateCourseVerificationInput = {
  id: string,
  courseSlug?: string | null,
  message?: string | null,
  status?: CourseVerificationStatus | null,
  owner?: string | null,
};

export type DeleteCourseVerificationInput = {
  id: string,
};

export type CreateCourseLandingPageInput = {
  id?: string | null,
  backgroundColor: string,
  appBar: CourseLandingPageAppBarInput,
  header: CourseLandingPageHeaderInput,
  fixedCard: CourseLandingPageFixedCardInput,
  footer: CourseLandingPageFooterInput,
  sections?: Array< CourseLandingPageSectionInput | null > | null,
  metaTitle?: string | null,
  metaDescription?: string | null,
  faviconKey?: string | null,
  tawkPropertyId?: string | null,
  tawkWidgetId?: string | null,
  owner?: string | null,
};

export type CourseLandingPageAppBarInput = {
  logoKey?: string | null,
  backgroundColor: string,
  watchCourseTextColor: string,
};

export type CourseLandingPageHeaderInput = {
  title: string,
  titleColor: string,
  subtitle: string,
  subtitleColor: string,
  backgroundColor: string,
  callToActionBackgroundColor: string,
  callToActionTextColor: string,
  statsTitleTextColor: string,
  statsValueTextColor: string,
};

export type CourseLandingPageFixedCardInput = {
  imageKey?: string | null,
  backgroundColor: string,
  buttonBackgroundColor: string,
  buttonTextColor: string,
  priceTextColor: string,
  discountPriceTextColor: string,
  titleTextColor: string,
  descriptionTextColor: string,
  featureCheckboxBackgroundColor: string,
  featureCheckboxTextColor: string,
  featureTextColor: string,
};

export type CourseLandingPageFooterInput = {
  backgroundColor: string,
  courseDomainTextColor: string,
  poweredByTextColor: string,
};

export type CourseLandingPageSectionInput = {
  backgroundColor: string,
  aboutCourse?: CourseLandingPageSectionAboutCourseInput | null,
  features?: CourseLandingPageSectionFeaturesInput | null,
  courseContent?: CourseLandingPageSectionCourseContentInput | null,
  subjects?: CourseLandingPageSectionSubjectsInput | null,
  recommendedCourses?: CourseLandingPageSectionRecommendedCoursesInput | null,
};

export type CourseLandingPageSectionAboutCourseInput = {
  title: string,
  titleTextColor: string,
  content: string,
  contentTextColor: string,
};

export type CourseLandingPageSectionFeaturesInput = {
  items?: Array< CourseLandingPageSectionFeaturesItemInput | null > | null,
};

export type CourseLandingPageSectionFeaturesItemInput = {
  backgroundColor: string,
  textColor: string,
  iconColor: string,
};

export type CourseLandingPageSectionCourseContentInput = {
  title: string,
  titleTextColor: string,
  subtitle: string,
  subtitleTextColor: string,
  sectionTitleBackgroundColor: string,
  sectionTitleTextColor: string,
  sectionArrowTextColor: string,
  stepBackgroundColor: string,
  stepTextColor: string,
  stepIconColor: string,
  stepDurationColor: string,
  sectionBorderColor: string,
  stepsDividerColor: string,
};

export type CourseLandingPageSectionSubjectsInput = {
  title: string,
  titleTextColor: string,
  subtitle: string,
  subtitleTextColor: string,
  subjects?: Array< CourseLandingPageSectionSubjectsSubjectInput | null > | null,
};

export type CourseLandingPageSectionSubjectsSubjectInput = {
  indexColor: string,
  title: string,
  titleTextColor: string,
  content: string,
  contentTextColor: string,
  imageKey?: string | null,
  imageBoxColor: string,
};

export type CourseLandingPageSectionRecommendedCoursesInput = {
  titleTextColor: string,
  subtitleTextColor: string,
  courseTitleTextColor: string,
  courseSlugs: Array< string | null >,
};

export type ModelCourseLandingPageConditionInput = {
  backgroundColor?: ModelStringInput | null,
  metaTitle?: ModelStringInput | null,
  metaDescription?: ModelStringInput | null,
  faviconKey?: ModelStringInput | null,
  tawkPropertyId?: ModelStringInput | null,
  tawkWidgetId?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseLandingPageConditionInput | null > | null,
  or?: Array< ModelCourseLandingPageConditionInput | null > | null,
  not?: ModelCourseLandingPageConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCourseLandingPageInput = {
  id: string,
  backgroundColor?: string | null,
  appBar?: CourseLandingPageAppBarInput | null,
  header?: CourseLandingPageHeaderInput | null,
  fixedCard?: CourseLandingPageFixedCardInput | null,
  footer?: CourseLandingPageFooterInput | null,
  sections?: Array< CourseLandingPageSectionInput | null > | null,
  metaTitle?: string | null,
  metaDescription?: string | null,
  faviconKey?: string | null,
  tawkPropertyId?: string | null,
  tawkWidgetId?: string | null,
  owner?: string | null,
};

export type DeleteCourseLandingPageInput = {
  id: string,
};

export type CreateCourseInput = {
  slug: string,
  domain: string,
  title: string,
  price?: number | null,
  discountPrice?: number | null,
  logoKey?: string | null,
  status: CourseStatus,
  facebookPixelId?: string | null,
  verificationId?: string | null,
  owner?: string | null,
  courseCourseLandingPageId?: string | null,
};

export type ModelCourseConditionInput = {
  domain?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  discountPrice?: ModelFloatInput | null,
  logoKey?: ModelStringInput | null,
  status?: ModelCourseStatusInput | null,
  facebookPixelId?: ModelStringInput | null,
  verificationId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseCourseLandingPageId?: ModelIDInput | null,
};

export type ModelCourseStatusInput = {
  eq?: CourseStatus | null,
  ne?: CourseStatus | null,
};

export type UpdateCourseInput = {
  slug: string,
  domain?: string | null,
  title?: string | null,
  price?: number | null,
  discountPrice?: number | null,
  logoKey?: string | null,
  status?: CourseStatus | null,
  facebookPixelId?: string | null,
  verificationId?: string | null,
  owner?: string | null,
  courseCourseLandingPageId?: string | null,
};

export type DeleteCourseInput = {
  slug: string,
};

export type CreateCourseSectionInput = {
  id?: string | null,
  position: number,
  title: string,
  owner?: string | null,
  courseCourseSectionsSlug?: string | null,
};

export type ModelCourseSectionConditionInput = {
  position?: ModelIntInput | null,
  title?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSectionConditionInput | null > | null,
  or?: Array< ModelCourseSectionConditionInput | null > | null,
  not?: ModelCourseSectionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseCourseSectionsSlug?: ModelStringInput | null,
};

export type UpdateCourseSectionInput = {
  id: string,
  position?: number | null,
  title?: string | null,
  owner?: string | null,
  courseCourseSectionsSlug?: string | null,
};

export type DeleteCourseSectionInput = {
  id: string,
};

export type CreateCourseSectionStepInput = {
  id?: string | null,
  position: number,
  title: string,
  type: CourseSectionStepType,
  status: CourseSectionStepStatus,
  uploadedVideo?: UploadedVideoInput | null,
  owner?: string | null,
  courseSectionCourseSectionStepsId?: string | null,
  courseSectionStepCourseSectionStepVideoId?: string | null,
  courseSectionStepCourseSectionStepTestId?: string | null,
};

export type UploadedVideoInput = {
  identityId: string,
  key: string,
  size: number,
  fileName: string,
};

export type ModelCourseSectionStepConditionInput = {
  position?: ModelIntInput | null,
  title?: ModelStringInput | null,
  type?: ModelCourseSectionStepTypeInput | null,
  status?: ModelCourseSectionStepStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepConditionInput | null > | null,
  or?: Array< ModelCourseSectionStepConditionInput | null > | null,
  not?: ModelCourseSectionStepConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseSectionCourseSectionStepsId?: ModelIDInput | null,
  courseSectionStepCourseSectionStepVideoId?: ModelIDInput | null,
  courseSectionStepCourseSectionStepTestId?: ModelIDInput | null,
};

export type ModelCourseSectionStepTypeInput = {
  eq?: CourseSectionStepType | null,
  ne?: CourseSectionStepType | null,
};

export type ModelCourseSectionStepStatusInput = {
  eq?: CourseSectionStepStatus | null,
  ne?: CourseSectionStepStatus | null,
};

export type UpdateCourseSectionStepInput = {
  id: string,
  position?: number | null,
  title?: string | null,
  type?: CourseSectionStepType | null,
  status?: CourseSectionStepStatus | null,
  uploadedVideo?: UploadedVideoInput | null,
  owner?: string | null,
  courseSectionCourseSectionStepsId?: string | null,
  courseSectionStepCourseSectionStepVideoId?: string | null,
  courseSectionStepCourseSectionStepTestId?: string | null,
};

export type DeleteCourseSectionStepInput = {
  id: string,
};

export type CreateCourseSectionStepVideoInput = {
  id?: string | null,
  status: CourseSectionStepVideoStatus,
  url?: CourseSectionStepVideoURLInput | null,
  duration: number,
  owner?: string | null,
  courseSectionStepVideoCourseSectionStepId: string,
};

export type CourseSectionStepVideoURLInput = {
  resolution: Array< CourseSectionStepVideoURLResolution >,
  url: string,
};

export type ModelCourseSectionStepVideoConditionInput = {
  status?: ModelCourseSectionStepVideoStatusInput | null,
  duration?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepVideoConditionInput | null > | null,
  or?: Array< ModelCourseSectionStepVideoConditionInput | null > | null,
  not?: ModelCourseSectionStepVideoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  courseSectionStepVideoCourseSectionStepId?: ModelIDInput | null,
};

export type ModelCourseSectionStepVideoStatusInput = {
  eq?: CourseSectionStepVideoStatus | null,
  ne?: CourseSectionStepVideoStatus | null,
};

export type UpdateCourseSectionStepVideoInput = {
  id: string,
  status?: CourseSectionStepVideoStatus | null,
  url?: CourseSectionStepVideoURLInput | null,
  duration?: number | null,
  owner?: string | null,
  courseSectionStepVideoCourseSectionStepId?: string | null,
};

export type DeleteCourseSectionStepVideoInput = {
  id: string,
};

export type CreateReferralCodeInput = {
  code: string,
  owner?: string | null,
};

export type ModelReferralCodeConditionInput = {
  owner?: ModelStringInput | null,
  and?: Array< ModelReferralCodeConditionInput | null > | null,
  or?: Array< ModelReferralCodeConditionInput | null > | null,
  not?: ModelReferralCodeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateReferralCodeInput = {
  code: string,
  owner?: string | null,
};

export type DeleteReferralCodeInput = {
  code: string,
};

export type CreateUserOrderInput = {
  id?: string | null,
  status?: UserOrderStatus | null,
  paymentMethod: PaymentMethod,
  price?: number | null,
  courseSlug: string,
  owner?: string | null,
  referralCodeOrdersCode?: string | null,
};

export type ModelUserOrderConditionInput = {
  status?: ModelUserOrderStatusInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  price?: ModelFloatInput | null,
  courseSlug?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserOrderConditionInput | null > | null,
  or?: Array< ModelUserOrderConditionInput | null > | null,
  not?: ModelUserOrderConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  referralCodeOrdersCode?: ModelStringInput | null,
};

export type ModelUserOrderStatusInput = {
  eq?: UserOrderStatus | null,
  ne?: UserOrderStatus | null,
};

export type UpdateUserOrderInput = {
  id: string,
  status?: UserOrderStatus | null,
  paymentMethod?: PaymentMethod | null,
  price?: number | null,
  courseSlug?: string | null,
  owner?: string | null,
  referralCodeOrdersCode?: string | null,
};

export type DeleteUserOrderInput = {
  id: string,
};

export type CreateUserCourseStepProgressInput = {
  id?: string | null,
  stepID: string,
  durationInMs: number,
  owner?: string | null,
};

export type ModelUserCourseStepProgressConditionInput = {
  stepID?: ModelIDInput | null,
  durationInMs?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserCourseStepProgressConditionInput | null > | null,
  or?: Array< ModelUserCourseStepProgressConditionInput | null > | null,
  not?: ModelUserCourseStepProgressConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserCourseStepProgressInput = {
  id: string,
  stepID?: string | null,
  durationInMs?: number | null,
  owner?: string | null,
};

export type DeleteUserCourseStepProgressInput = {
  id: string,
};

export type ModelCourseSectionStepTestFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepTestFilterInput | null > | null,
  or?: Array< ModelCourseSectionStepTestFilterInput | null > | null,
  not?: ModelCourseSectionStepTestFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCourseSectionStepTestConnection = {
  __typename: "ModelCourseSectionStepTestConnection",
  items:  Array<CourseSectionStepTest | null >,
  nextToken?: string | null,
};

export type ModelCourseSectionStepTestQuestionFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelCourseSectionStepTestQuestionTypeInput | null,
  position?: ModelIntInput | null,
  text?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  correctAnswers?: ModelIDInput | null,
  testId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepTestQuestionFilterInput | null > | null,
  or?: Array< ModelCourseSectionStepTestQuestionFilterInput | null > | null,
  not?: ModelCourseSectionStepTestQuestionFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelCourseSubscriptionPlanFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  features?: ModelStringInput | null,
  maxHours?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSubscriptionPlanFilterInput | null > | null,
  or?: Array< ModelCourseSubscriptionPlanFilterInput | null > | null,
  not?: ModelCourseSubscriptionPlanFilterInput | null,
};

export type ModelCourseSubscriptionPlanConnection = {
  __typename: "ModelCourseSubscriptionPlanConnection",
  items:  Array<CourseSubscriptionPlan | null >,
  nextToken?: string | null,
};

export type ModelCourseSubscriptionFilterInput = {
  id?: ModelIDInput | null,
  courseSlug?: ModelStringInput | null,
  courseSubscriptionPlanId?: ModelIDInput | null,
  startDate?: ModelStringInput | null,
  expirationDate?: ModelStringInput | null,
  status?: ModelCourseSubscriptionStatusInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSubscriptionFilterInput | null > | null,
  or?: Array< ModelCourseSubscriptionFilterInput | null > | null,
  not?: ModelCourseSubscriptionFilterInput | null,
  courseSubscriptionPlanSubscriptionsId?: ModelIDInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCourseSubscriptionPaymentFilterInput = {
  id?: ModelIDInput | null,
  subscriptionId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  status?: ModelCourseSubscriptionPaymentStatusInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSubscriptionPaymentFilterInput | null > | null,
  or?: Array< ModelCourseSubscriptionPaymentFilterInput | null > | null,
  not?: ModelCourseSubscriptionPaymentFilterInput | null,
  courseSubscriptionPaymentsId?: ModelIDInput | null,
};

export type ModelCourseVerificationFilterInput = {
  id?: ModelIDInput | null,
  courseSlug?: ModelStringInput | null,
  message?: ModelStringInput | null,
  status?: ModelCourseVerificationStatusInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseVerificationFilterInput | null > | null,
  or?: Array< ModelCourseVerificationFilterInput | null > | null,
  not?: ModelCourseVerificationFilterInput | null,
};

export type ModelCourseVerificationConnection = {
  __typename: "ModelCourseVerificationConnection",
  items:  Array<CourseVerification | null >,
  nextToken?: string | null,
};

export type ModelCourseLandingPageFilterInput = {
  id?: ModelIDInput | null,
  backgroundColor?: ModelStringInput | null,
  metaTitle?: ModelStringInput | null,
  metaDescription?: ModelStringInput | null,
  faviconKey?: ModelStringInput | null,
  tawkPropertyId?: ModelStringInput | null,
  tawkWidgetId?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseLandingPageFilterInput | null > | null,
  or?: Array< ModelCourseLandingPageFilterInput | null > | null,
  not?: ModelCourseLandingPageFilterInput | null,
};

export type ModelCourseLandingPageConnection = {
  __typename: "ModelCourseLandingPageConnection",
  items:  Array<CourseLandingPage | null >,
  nextToken?: string | null,
};

export type ModelCourseFilterInput = {
  slug?: ModelStringInput | null,
  domain?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  discountPrice?: ModelFloatInput | null,
  logoKey?: ModelStringInput | null,
  status?: ModelCourseStatusInput | null,
  facebookPixelId?: ModelStringInput | null,
  verificationId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
  courseCourseLandingPageId?: ModelIDInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type ModelCourseSectionFilterInput = {
  id?: ModelIDInput | null,
  position?: ModelIntInput | null,
  title?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSectionFilterInput | null > | null,
  or?: Array< ModelCourseSectionFilterInput | null > | null,
  not?: ModelCourseSectionFilterInput | null,
  courseCourseSectionsSlug?: ModelStringInput | null,
};

export type ModelCourseSectionStepFilterInput = {
  id?: ModelIDInput | null,
  position?: ModelIntInput | null,
  title?: ModelStringInput | null,
  type?: ModelCourseSectionStepTypeInput | null,
  status?: ModelCourseSectionStepStatusInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepFilterInput | null > | null,
  or?: Array< ModelCourseSectionStepFilterInput | null > | null,
  not?: ModelCourseSectionStepFilterInput | null,
  courseSectionCourseSectionStepsId?: ModelIDInput | null,
  courseSectionStepCourseSectionStepVideoId?: ModelIDInput | null,
  courseSectionStepCourseSectionStepTestId?: ModelIDInput | null,
};

export type ModelCourseSectionStepVideoFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelCourseSectionStepVideoStatusInput | null,
  duration?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseSectionStepVideoFilterInput | null > | null,
  or?: Array< ModelCourseSectionStepVideoFilterInput | null > | null,
  not?: ModelCourseSectionStepVideoFilterInput | null,
  courseSectionStepVideoCourseSectionStepId?: ModelIDInput | null,
};

export type ModelCourseSectionStepVideoConnection = {
  __typename: "ModelCourseSectionStepVideoConnection",
  items:  Array<CourseSectionStepVideo | null >,
  nextToken?: string | null,
};

export type ModelReferralCodeFilterInput = {
  code?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReferralCodeFilterInput | null > | null,
  or?: Array< ModelReferralCodeFilterInput | null > | null,
  not?: ModelReferralCodeFilterInput | null,
};

export type ModelReferralCodeConnection = {
  __typename: "ModelReferralCodeConnection",
  items:  Array<ReferralCode | null >,
  nextToken?: string | null,
};

export type ModelUserOrderFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelUserOrderStatusInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  price?: ModelFloatInput | null,
  courseSlug?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserOrderFilterInput | null > | null,
  or?: Array< ModelUserOrderFilterInput | null > | null,
  not?: ModelUserOrderFilterInput | null,
  referralCodeOrdersCode?: ModelStringInput | null,
};

export type ModelUserCourseStepProgressFilterInput = {
  id?: ModelIDInput | null,
  stepID?: ModelIDInput | null,
  durationInMs?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserCourseStepProgressFilterInput | null > | null,
  or?: Array< ModelUserCourseStepProgressFilterInput | null > | null,
  not?: ModelUserCourseStepProgressFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateCourseSectionStepTestMutationVariables = {
  input: CreateCourseSectionStepTestInput,
  condition?: ModelCourseSectionStepTestConditionInput | null,
};

export type CreateCourseSectionStepTestMutation = {
  createCourseSectionStepTest?:  {
    __typename: "CourseSectionStepTest",
    id: string,
    questions?:  {
      __typename: "ModelCourseSectionStepTestQuestionConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseSectionStepTestMutationVariables = {
  input: UpdateCourseSectionStepTestInput,
  condition?: ModelCourseSectionStepTestConditionInput | null,
};

export type UpdateCourseSectionStepTestMutation = {
  updateCourseSectionStepTest?:  {
    __typename: "CourseSectionStepTest",
    id: string,
    questions?:  {
      __typename: "ModelCourseSectionStepTestQuestionConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseSectionStepTestMutationVariables = {
  input: DeleteCourseSectionStepTestInput,
  condition?: ModelCourseSectionStepTestConditionInput | null,
};

export type DeleteCourseSectionStepTestMutation = {
  deleteCourseSectionStepTest?:  {
    __typename: "CourseSectionStepTest",
    id: string,
    questions?:  {
      __typename: "ModelCourseSectionStepTestQuestionConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseSectionStepTestQuestionMutationVariables = {
  input: CreateCourseSectionStepTestQuestionInput,
  condition?: ModelCourseSectionStepTestQuestionConditionInput | null,
};

export type CreateCourseSectionStepTestQuestionMutation = {
  createCourseSectionStepTestQuestion?:  {
    __typename: "CourseSectionStepTestQuestion",
    id: string,
    type: CourseSectionStepTestQuestionType,
    position: number,
    text?: string | null,
    imageKey?: string | null,
    answers?:  Array< {
      __typename: "CourseSectionStepTestQuestionAnswer",
      id: string,
      text?: string | null,
      imageKey?: string | null,
    } | null > | null,
    correctAnswers?: Array< string | null > | null,
    testId: string,
    test:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseSectionStepTestQuestionMutationVariables = {
  input: UpdateCourseSectionStepTestQuestionInput,
  condition?: ModelCourseSectionStepTestQuestionConditionInput | null,
};

export type UpdateCourseSectionStepTestQuestionMutation = {
  updateCourseSectionStepTestQuestion?:  {
    __typename: "CourseSectionStepTestQuestion",
    id: string,
    type: CourseSectionStepTestQuestionType,
    position: number,
    text?: string | null,
    imageKey?: string | null,
    answers?:  Array< {
      __typename: "CourseSectionStepTestQuestionAnswer",
      id: string,
      text?: string | null,
      imageKey?: string | null,
    } | null > | null,
    correctAnswers?: Array< string | null > | null,
    testId: string,
    test:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseSectionStepTestQuestionMutationVariables = {
  input: DeleteCourseSectionStepTestQuestionInput,
  condition?: ModelCourseSectionStepTestQuestionConditionInput | null,
};

export type DeleteCourseSectionStepTestQuestionMutation = {
  deleteCourseSectionStepTestQuestion?:  {
    __typename: "CourseSectionStepTestQuestion",
    id: string,
    type: CourseSectionStepTestQuestionType,
    position: number,
    text?: string | null,
    imageKey?: string | null,
    answers?:  Array< {
      __typename: "CourseSectionStepTestQuestionAnswer",
      id: string,
      text?: string | null,
      imageKey?: string | null,
    } | null > | null,
    correctAnswers?: Array< string | null > | null,
    testId: string,
    test:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseSubscriptionPlanMutationVariables = {
  input: CreateCourseSubscriptionPlanInput,
  condition?: ModelCourseSubscriptionPlanConditionInput | null,
};

export type CreateCourseSubscriptionPlanMutation = {
  createCourseSubscriptionPlan?:  {
    __typename: "CourseSubscriptionPlan",
    id: string,
    name: string,
    description: string,
    price: number,
    features: Array< string >,
    maxHours: number,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseSubscriptionPlanMutationVariables = {
  input: UpdateCourseSubscriptionPlanInput,
  condition?: ModelCourseSubscriptionPlanConditionInput | null,
};

export type UpdateCourseSubscriptionPlanMutation = {
  updateCourseSubscriptionPlan?:  {
    __typename: "CourseSubscriptionPlan",
    id: string,
    name: string,
    description: string,
    price: number,
    features: Array< string >,
    maxHours: number,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseSubscriptionPlanMutationVariables = {
  input: DeleteCourseSubscriptionPlanInput,
  condition?: ModelCourseSubscriptionPlanConditionInput | null,
};

export type DeleteCourseSubscriptionPlanMutation = {
  deleteCourseSubscriptionPlan?:  {
    __typename: "CourseSubscriptionPlan",
    id: string,
    name: string,
    description: string,
    price: number,
    features: Array< string >,
    maxHours: number,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseSubscriptionMutationVariables = {
  input: CreateCourseSubscriptionInput,
  condition?: ModelCourseSubscriptionConditionInput | null,
};

export type CreateCourseSubscriptionMutation = {
  createCourseSubscription?:  {
    __typename: "CourseSubscription",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSubscriptionPlanId: string,
    courseSubscriptionPlan:  {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    },
    startDate: string,
    expirationDate: string,
    status?: CourseSubscriptionStatus | null,
    payments?:  {
      __typename: "ModelCourseSubscriptionPaymentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPlanSubscriptionsId?: string | null,
  } | null,
};

export type UpdateCourseSubscriptionMutationVariables = {
  input: UpdateCourseSubscriptionInput,
  condition?: ModelCourseSubscriptionConditionInput | null,
};

export type UpdateCourseSubscriptionMutation = {
  updateCourseSubscription?:  {
    __typename: "CourseSubscription",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSubscriptionPlanId: string,
    courseSubscriptionPlan:  {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    },
    startDate: string,
    expirationDate: string,
    status?: CourseSubscriptionStatus | null,
    payments?:  {
      __typename: "ModelCourseSubscriptionPaymentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPlanSubscriptionsId?: string | null,
  } | null,
};

export type DeleteCourseSubscriptionMutationVariables = {
  input: DeleteCourseSubscriptionInput,
  condition?: ModelCourseSubscriptionConditionInput | null,
};

export type DeleteCourseSubscriptionMutation = {
  deleteCourseSubscription?:  {
    __typename: "CourseSubscription",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSubscriptionPlanId: string,
    courseSubscriptionPlan:  {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    },
    startDate: string,
    expirationDate: string,
    status?: CourseSubscriptionStatus | null,
    payments?:  {
      __typename: "ModelCourseSubscriptionPaymentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPlanSubscriptionsId?: string | null,
  } | null,
};

export type CreateCourseSubscriptionPaymentMutationVariables = {
  input: CreateCourseSubscriptionPaymentInput,
  condition?: ModelCourseSubscriptionPaymentConditionInput | null,
};

export type CreateCourseSubscriptionPaymentMutation = {
  createCourseSubscriptionPayment?:  {
    __typename: "CourseSubscriptionPayment",
    id: string,
    subscriptionId: string,
    subscription:  {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    },
    amount: number,
    paymentMethod: PaymentMethod,
    status: CourseSubscriptionPaymentStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPaymentsId?: string | null,
  } | null,
};

export type UpdateCourseSubscriptionPaymentMutationVariables = {
  input: UpdateCourseSubscriptionPaymentInput,
  condition?: ModelCourseSubscriptionPaymentConditionInput | null,
};

export type UpdateCourseSubscriptionPaymentMutation = {
  updateCourseSubscriptionPayment?:  {
    __typename: "CourseSubscriptionPayment",
    id: string,
    subscriptionId: string,
    subscription:  {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    },
    amount: number,
    paymentMethod: PaymentMethod,
    status: CourseSubscriptionPaymentStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPaymentsId?: string | null,
  } | null,
};

export type DeleteCourseSubscriptionPaymentMutationVariables = {
  input: DeleteCourseSubscriptionPaymentInput,
  condition?: ModelCourseSubscriptionPaymentConditionInput | null,
};

export type DeleteCourseSubscriptionPaymentMutation = {
  deleteCourseSubscriptionPayment?:  {
    __typename: "CourseSubscriptionPayment",
    id: string,
    subscriptionId: string,
    subscription:  {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    },
    amount: number,
    paymentMethod: PaymentMethod,
    status: CourseSubscriptionPaymentStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPaymentsId?: string | null,
  } | null,
};

export type CreateCourseVerificationMutationVariables = {
  input: CreateCourseVerificationInput,
  condition?: ModelCourseVerificationConditionInput | null,
};

export type CreateCourseVerificationMutation = {
  createCourseVerification?:  {
    __typename: "CourseVerification",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    message?: string | null,
    status: CourseVerificationStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseVerificationMutationVariables = {
  input: UpdateCourseVerificationInput,
  condition?: ModelCourseVerificationConditionInput | null,
};

export type UpdateCourseVerificationMutation = {
  updateCourseVerification?:  {
    __typename: "CourseVerification",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    message?: string | null,
    status: CourseVerificationStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseVerificationMutationVariables = {
  input: DeleteCourseVerificationInput,
  condition?: ModelCourseVerificationConditionInput | null,
};

export type DeleteCourseVerificationMutation = {
  deleteCourseVerification?:  {
    __typename: "CourseVerification",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    message?: string | null,
    status: CourseVerificationStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseLandingPageMutationVariables = {
  input: CreateCourseLandingPageInput,
  condition?: ModelCourseLandingPageConditionInput | null,
};

export type CreateCourseLandingPageMutation = {
  createCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    id: string,
    backgroundColor: string,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      logoKey?: string | null,
      backgroundColor: string,
      watchCourseTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      title: string,
      titleColor: string,
      subtitle: string,
      subtitleColor: string,
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
    },
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      imageKey?: string | null,
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      priceTextColor: string,
      discountPriceTextColor: string,
      titleTextColor: string,
      descriptionTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
    } | null > | null,
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseLandingPageMutationVariables = {
  input: UpdateCourseLandingPageInput,
  condition?: ModelCourseLandingPageConditionInput | null,
};

export type UpdateCourseLandingPageMutation = {
  updateCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    id: string,
    backgroundColor: string,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      logoKey?: string | null,
      backgroundColor: string,
      watchCourseTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      title: string,
      titleColor: string,
      subtitle: string,
      subtitleColor: string,
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
    },
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      imageKey?: string | null,
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      priceTextColor: string,
      discountPriceTextColor: string,
      titleTextColor: string,
      descriptionTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
    } | null > | null,
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseLandingPageMutationVariables = {
  input: DeleteCourseLandingPageInput,
  condition?: ModelCourseLandingPageConditionInput | null,
};

export type DeleteCourseLandingPageMutation = {
  deleteCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    id: string,
    backgroundColor: string,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      logoKey?: string | null,
      backgroundColor: string,
      watchCourseTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      title: string,
      titleColor: string,
      subtitle: string,
      subtitleColor: string,
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
    },
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      imageKey?: string | null,
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      priceTextColor: string,
      discountPriceTextColor: string,
      titleTextColor: string,
      descriptionTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
    } | null > | null,
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    slug: string,
    domain: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
    status: CourseStatus,
    courseSections?:  {
      __typename: "ModelCourseSectionConnection",
      nextToken?: string | null,
    } | null,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      id: string,
      backgroundColor: string,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    facebookPixelId?: string | null,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    verificationId?: string | null,
    verification?:  {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseLandingPageId?: string | null,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    slug: string,
    domain: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
    status: CourseStatus,
    courseSections?:  {
      __typename: "ModelCourseSectionConnection",
      nextToken?: string | null,
    } | null,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      id: string,
      backgroundColor: string,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    facebookPixelId?: string | null,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    verificationId?: string | null,
    verification?:  {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseLandingPageId?: string | null,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    slug: string,
    domain: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
    status: CourseStatus,
    courseSections?:  {
      __typename: "ModelCourseSectionConnection",
      nextToken?: string | null,
    } | null,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      id: string,
      backgroundColor: string,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    facebookPixelId?: string | null,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    verificationId?: string | null,
    verification?:  {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseLandingPageId?: string | null,
  } | null,
};

export type CreateCourseSectionMutationVariables = {
  input: CreateCourseSectionInput,
  condition?: ModelCourseSectionConditionInput | null,
};

export type CreateCourseSectionMutation = {
  createCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSectionSteps?:  {
      __typename: "ModelCourseSectionStepConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseSectionsSlug?: string | null,
  } | null,
};

export type UpdateCourseSectionMutationVariables = {
  input: UpdateCourseSectionInput,
  condition?: ModelCourseSectionConditionInput | null,
};

export type UpdateCourseSectionMutation = {
  updateCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSectionSteps?:  {
      __typename: "ModelCourseSectionStepConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseSectionsSlug?: string | null,
  } | null,
};

export type DeleteCourseSectionMutationVariables = {
  input: DeleteCourseSectionInput,
  condition?: ModelCourseSectionConditionInput | null,
};

export type DeleteCourseSectionMutation = {
  deleteCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSectionSteps?:  {
      __typename: "ModelCourseSectionStepConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseSectionsSlug?: string | null,
  } | null,
};

export type CreateCourseSectionStepMutationVariables = {
  input: CreateCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type CreateCourseSectionStepMutation = {
  createCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
    type: CourseSectionStepType,
    status: CourseSectionStepStatus,
    uploadedVideo?:  {
      __typename: "UploadedVideo",
      identityId: string,
      key: string,
      size: number,
      fileName: string,
    } | null,
    courseSectionStepVideo?:  {
      __typename: "CourseSectionStepVideo",
      id: string,
      status: CourseSectionStepVideoStatus,
      duration: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionStepVideoCourseSectionStepId: string,
    } | null,
    courseSectionStepTest?:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    courseSection:  {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseSectionsSlug?: string | null,
    },
    userCourseStepProgress?:  {
      __typename: "ModelUserCourseStepProgressConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionCourseSectionStepsId?: string | null,
    courseSectionStepCourseSectionStepVideoId?: string | null,
    courseSectionStepCourseSectionStepTestId?: string | null,
  } | null,
};

export type UpdateCourseSectionStepMutationVariables = {
  input: UpdateCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type UpdateCourseSectionStepMutation = {
  updateCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
    type: CourseSectionStepType,
    status: CourseSectionStepStatus,
    uploadedVideo?:  {
      __typename: "UploadedVideo",
      identityId: string,
      key: string,
      size: number,
      fileName: string,
    } | null,
    courseSectionStepVideo?:  {
      __typename: "CourseSectionStepVideo",
      id: string,
      status: CourseSectionStepVideoStatus,
      duration: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionStepVideoCourseSectionStepId: string,
    } | null,
    courseSectionStepTest?:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    courseSection:  {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseSectionsSlug?: string | null,
    },
    userCourseStepProgress?:  {
      __typename: "ModelUserCourseStepProgressConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionCourseSectionStepsId?: string | null,
    courseSectionStepCourseSectionStepVideoId?: string | null,
    courseSectionStepCourseSectionStepTestId?: string | null,
  } | null,
};

export type DeleteCourseSectionStepMutationVariables = {
  input: DeleteCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type DeleteCourseSectionStepMutation = {
  deleteCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
    type: CourseSectionStepType,
    status: CourseSectionStepStatus,
    uploadedVideo?:  {
      __typename: "UploadedVideo",
      identityId: string,
      key: string,
      size: number,
      fileName: string,
    } | null,
    courseSectionStepVideo?:  {
      __typename: "CourseSectionStepVideo",
      id: string,
      status: CourseSectionStepVideoStatus,
      duration: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionStepVideoCourseSectionStepId: string,
    } | null,
    courseSectionStepTest?:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    courseSection:  {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseSectionsSlug?: string | null,
    },
    userCourseStepProgress?:  {
      __typename: "ModelUserCourseStepProgressConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionCourseSectionStepsId?: string | null,
    courseSectionStepCourseSectionStepVideoId?: string | null,
    courseSectionStepCourseSectionStepTestId?: string | null,
  } | null,
};

export type CreateCourseSectionStepVideoMutationVariables = {
  input: CreateCourseSectionStepVideoInput,
  condition?: ModelCourseSectionStepVideoConditionInput | null,
};

export type CreateCourseSectionStepVideoMutation = {
  createCourseSectionStepVideo?:  {
    __typename: "CourseSectionStepVideo",
    id: string,
    status: CourseSectionStepVideoStatus,
    url?:  {
      __typename: "CourseSectionStepVideoURL",
      resolution: Array< CourseSectionStepVideoURLResolution >,
      url: string,
    } | null,
    duration: number,
    courseSectionStep:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionStepVideoCourseSectionStepId: string,
  } | null,
};

export type UpdateCourseSectionStepVideoMutationVariables = {
  input: UpdateCourseSectionStepVideoInput,
  condition?: ModelCourseSectionStepVideoConditionInput | null,
};

export type UpdateCourseSectionStepVideoMutation = {
  updateCourseSectionStepVideo?:  {
    __typename: "CourseSectionStepVideo",
    id: string,
    status: CourseSectionStepVideoStatus,
    url?:  {
      __typename: "CourseSectionStepVideoURL",
      resolution: Array< CourseSectionStepVideoURLResolution >,
      url: string,
    } | null,
    duration: number,
    courseSectionStep:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionStepVideoCourseSectionStepId: string,
  } | null,
};

export type DeleteCourseSectionStepVideoMutationVariables = {
  input: DeleteCourseSectionStepVideoInput,
  condition?: ModelCourseSectionStepVideoConditionInput | null,
};

export type DeleteCourseSectionStepVideoMutation = {
  deleteCourseSectionStepVideo?:  {
    __typename: "CourseSectionStepVideo",
    id: string,
    status: CourseSectionStepVideoStatus,
    url?:  {
      __typename: "CourseSectionStepVideoURL",
      resolution: Array< CourseSectionStepVideoURLResolution >,
      url: string,
    } | null,
    duration: number,
    courseSectionStep:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionStepVideoCourseSectionStepId: string,
  } | null,
};

export type CreateReferralCodeMutationVariables = {
  input: CreateReferralCodeInput,
  condition?: ModelReferralCodeConditionInput | null,
};

export type CreateReferralCodeMutation = {
  createReferralCode?:  {
    __typename: "ReferralCode",
    code: string,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReferralCodeMutationVariables = {
  input: UpdateReferralCodeInput,
  condition?: ModelReferralCodeConditionInput | null,
};

export type UpdateReferralCodeMutation = {
  updateReferralCode?:  {
    __typename: "ReferralCode",
    code: string,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReferralCodeMutationVariables = {
  input: DeleteReferralCodeInput,
  condition?: ModelReferralCodeConditionInput | null,
};

export type DeleteReferralCodeMutation = {
  deleteReferralCode?:  {
    __typename: "ReferralCode",
    code: string,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserOrderMutationVariables = {
  input: CreateUserOrderInput,
  condition?: ModelUserOrderConditionInput | null,
};

export type CreateUserOrderMutation = {
  createUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    status?: UserOrderStatus | null,
    paymentMethod: PaymentMethod,
    price?: number | null,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    referralCode?:  {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    referralCodeOrdersCode?: string | null,
  } | null,
};

export type UpdateUserOrderMutationVariables = {
  input: UpdateUserOrderInput,
  condition?: ModelUserOrderConditionInput | null,
};

export type UpdateUserOrderMutation = {
  updateUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    status?: UserOrderStatus | null,
    paymentMethod: PaymentMethod,
    price?: number | null,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    referralCode?:  {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    referralCodeOrdersCode?: string | null,
  } | null,
};

export type DeleteUserOrderMutationVariables = {
  input: DeleteUserOrderInput,
  condition?: ModelUserOrderConditionInput | null,
};

export type DeleteUserOrderMutation = {
  deleteUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    status?: UserOrderStatus | null,
    paymentMethod: PaymentMethod,
    price?: number | null,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    referralCode?:  {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    referralCodeOrdersCode?: string | null,
  } | null,
};

export type CreateUserCourseStepProgressMutationVariables = {
  input: CreateUserCourseStepProgressInput,
  condition?: ModelUserCourseStepProgressConditionInput | null,
};

export type CreateUserCourseStepProgressMutation = {
  createUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    stepID: string,
    step:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    durationInMs: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserCourseStepProgressMutationVariables = {
  input: UpdateUserCourseStepProgressInput,
  condition?: ModelUserCourseStepProgressConditionInput | null,
};

export type UpdateUserCourseStepProgressMutation = {
  updateUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    stepID: string,
    step:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    durationInMs: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserCourseStepProgressMutationVariables = {
  input: DeleteUserCourseStepProgressInput,
  condition?: ModelUserCourseStepProgressConditionInput | null,
};

export type DeleteUserCourseStepProgressMutation = {
  deleteUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    stepID: string,
    step:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    durationInMs: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCourseSectionStepTestQueryVariables = {
  id: string,
};

export type GetCourseSectionStepTestQuery = {
  getCourseSectionStepTest?:  {
    __typename: "CourseSectionStepTest",
    id: string,
    questions?:  {
      __typename: "ModelCourseSectionStepTestQuestionConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCourseSectionStepTestsQueryVariables = {
  id?: string | null,
  filter?: ModelCourseSectionStepTestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCourseSectionStepTestsQuery = {
  listCourseSectionStepTests?:  {
    __typename: "ModelCourseSectionStepTestConnection",
    items:  Array< {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSectionStepTestQuestionQueryVariables = {
  id: string,
};

export type GetCourseSectionStepTestQuestionQuery = {
  getCourseSectionStepTestQuestion?:  {
    __typename: "CourseSectionStepTestQuestion",
    id: string,
    type: CourseSectionStepTestQuestionType,
    position: number,
    text?: string | null,
    imageKey?: string | null,
    answers?:  Array< {
      __typename: "CourseSectionStepTestQuestionAnswer",
      id: string,
      text?: string | null,
      imageKey?: string | null,
    } | null > | null,
    correctAnswers?: Array< string | null > | null,
    testId: string,
    test:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCourseSectionStepTestQuestionsQueryVariables = {
  id?: string | null,
  filter?: ModelCourseSectionStepTestQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCourseSectionStepTestQuestionsQuery = {
  listCourseSectionStepTestQuestions?:  {
    __typename: "ModelCourseSectionStepTestQuestionConnection",
    items:  Array< {
      __typename: "CourseSectionStepTestQuestion",
      id: string,
      type: CourseSectionStepTestQuestionType,
      position: number,
      text?: string | null,
      imageKey?: string | null,
      correctAnswers?: Array< string | null > | null,
      testId: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CourseSectionStepTestQuestionByTestQueryVariables = {
  testId: string,
  position?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseSectionStepTestQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CourseSectionStepTestQuestionByTestQuery = {
  courseSectionStepTestQuestionByTest?:  {
    __typename: "ModelCourseSectionStepTestQuestionConnection",
    items:  Array< {
      __typename: "CourseSectionStepTestQuestion",
      id: string,
      type: CourseSectionStepTestQuestionType,
      position: number,
      text?: string | null,
      imageKey?: string | null,
      correctAnswers?: Array< string | null > | null,
      testId: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSubscriptionPlanQueryVariables = {
  id: string,
};

export type GetCourseSubscriptionPlanQuery = {
  getCourseSubscriptionPlan?:  {
    __typename: "CourseSubscriptionPlan",
    id: string,
    name: string,
    description: string,
    price: number,
    features: Array< string >,
    maxHours: number,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCourseSubscriptionPlansQueryVariables = {
  filter?: ModelCourseSubscriptionPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSubscriptionPlansQuery = {
  listCourseSubscriptionPlans?:  {
    __typename: "ModelCourseSubscriptionPlanConnection",
    items:  Array< {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSubscriptionQueryVariables = {
  id: string,
};

export type GetCourseSubscriptionQuery = {
  getCourseSubscription?:  {
    __typename: "CourseSubscription",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSubscriptionPlanId: string,
    courseSubscriptionPlan:  {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    },
    startDate: string,
    expirationDate: string,
    status?: CourseSubscriptionStatus | null,
    payments?:  {
      __typename: "ModelCourseSubscriptionPaymentConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPlanSubscriptionsId?: string | null,
  } | null,
};

export type ListCourseSubscriptionsQueryVariables = {
  filter?: ModelCourseSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSubscriptionsQuery = {
  listCourseSubscriptions?:  {
    __typename: "ModelCourseSubscriptionConnection",
    items:  Array< {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SubscriptionByCourseSlugQueryVariables = {
  courseSlug: string,
  startDate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubscriptionByCourseSlugQuery = {
  subscriptionByCourseSlug?:  {
    __typename: "ModelCourseSubscriptionConnection",
    items:  Array< {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSubscriptionPaymentQueryVariables = {
  id: string,
};

export type GetCourseSubscriptionPaymentQuery = {
  getCourseSubscriptionPayment?:  {
    __typename: "CourseSubscriptionPayment",
    id: string,
    subscriptionId: string,
    subscription:  {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlanId: string,
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPlanSubscriptionsId?: string | null,
    },
    amount: number,
    paymentMethod: PaymentMethod,
    status: CourseSubscriptionPaymentStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSubscriptionPaymentsId?: string | null,
  } | null,
};

export type ListCourseSubscriptionPaymentsQueryVariables = {
  filter?: ModelCourseSubscriptionPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSubscriptionPaymentsQuery = {
  listCourseSubscriptionPayments?:  {
    __typename: "ModelCourseSubscriptionPaymentConnection",
    items:  Array< {
      __typename: "CourseSubscriptionPayment",
      id: string,
      subscriptionId: string,
      amount: number,
      paymentMethod: PaymentMethod,
      status: CourseSubscriptionPaymentStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSubscriptionPaymentsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseVerificationQueryVariables = {
  id: string,
};

export type GetCourseVerificationQuery = {
  getCourseVerification?:  {
    __typename: "CourseVerification",
    id: string,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    message?: string | null,
    status: CourseVerificationStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCourseVerificationsQueryVariables = {
  filter?: ModelCourseVerificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseVerificationsQuery = {
  listCourseVerifications?:  {
    __typename: "ModelCourseVerificationConnection",
    items:  Array< {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type VerificationByCourseSlugQueryVariables = {
  courseSlug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseVerificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type VerificationByCourseSlugQuery = {
  verificationByCourseSlug?:  {
    __typename: "ModelCourseVerificationConnection",
    items:  Array< {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseLandingPageQueryVariables = {
  id: string,
};

export type GetCourseLandingPageQuery = {
  getCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    id: string,
    backgroundColor: string,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      logoKey?: string | null,
      backgroundColor: string,
      watchCourseTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      title: string,
      titleColor: string,
      subtitle: string,
      subtitleColor: string,
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
    },
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      imageKey?: string | null,
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      priceTextColor: string,
      discountPriceTextColor: string,
      titleTextColor: string,
      descriptionTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
    } | null > | null,
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCourseLandingPagesQueryVariables = {
  filter?: ModelCourseLandingPageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseLandingPagesQuery = {
  listCourseLandingPages?:  {
    __typename: "ModelCourseLandingPageConnection",
    items:  Array< {
      __typename: "CourseLandingPage",
      id: string,
      backgroundColor: string,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseQueryVariables = {
  slug: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    slug: string,
    domain: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
    status: CourseStatus,
    courseSections?:  {
      __typename: "ModelCourseSectionConnection",
      nextToken?: string | null,
    } | null,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      id: string,
      backgroundColor: string,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    facebookPixelId?: string | null,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    verificationId?: string | null,
    verification?:  {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseLandingPageId?: string | null,
  } | null,
};

export type ListCoursesQueryVariables = {
  slug?: string | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CourseByDomainQueryVariables = {
  domain: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CourseByDomainQuery = {
  courseByDomain?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CourseByStatusQueryVariables = {
  status: CourseStatus,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CourseByStatusQuery = {
  courseByStatus?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CourseByOwnerQueryVariables = {
  owner: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CourseByOwnerQuery = {
  courseByOwner?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSectionQueryVariables = {
  id: string,
};

export type GetCourseSectionQuery = {
  getCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    courseSectionSteps?:  {
      __typename: "ModelCourseSectionStepConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseSectionsSlug?: string | null,
  } | null,
};

export type ListCourseSectionsQueryVariables = {
  filter?: ModelCourseSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSectionsQuery = {
  listCourseSections?:  {
    __typename: "ModelCourseSectionConnection",
    items:  Array< {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseSectionsSlug?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSectionStepQueryVariables = {
  id: string,
};

export type GetCourseSectionStepQuery = {
  getCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
    type: CourseSectionStepType,
    status: CourseSectionStepStatus,
    uploadedVideo?:  {
      __typename: "UploadedVideo",
      identityId: string,
      key: string,
      size: number,
      fileName: string,
    } | null,
    courseSectionStepVideo?:  {
      __typename: "CourseSectionStepVideo",
      id: string,
      status: CourseSectionStepVideoStatus,
      duration: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionStepVideoCourseSectionStepId: string,
    } | null,
    courseSectionStepTest?:  {
      __typename: "CourseSectionStepTest",
      id: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    courseSection:  {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseSectionsSlug?: string | null,
    },
    userCourseStepProgress?:  {
      __typename: "ModelUserCourseStepProgressConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionCourseSectionStepsId?: string | null,
    courseSectionStepCourseSectionStepVideoId?: string | null,
    courseSectionStepCourseSectionStepTestId?: string | null,
  } | null,
};

export type ListCourseSectionStepsQueryVariables = {
  filter?: ModelCourseSectionStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSectionStepsQuery = {
  listCourseSectionSteps?:  {
    __typename: "ModelCourseSectionStepConnection",
    items:  Array< {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSectionStepVideoQueryVariables = {
  id: string,
};

export type GetCourseSectionStepVideoQuery = {
  getCourseSectionStepVideo?:  {
    __typename: "CourseSectionStepVideo",
    id: string,
    status: CourseSectionStepVideoStatus,
    url?:  {
      __typename: "CourseSectionStepVideoURL",
      resolution: Array< CourseSectionStepVideoURLResolution >,
      url: string,
    } | null,
    duration: number,
    courseSectionStep:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseSectionStepVideoCourseSectionStepId: string,
  } | null,
};

export type ListCourseSectionStepVideosQueryVariables = {
  filter?: ModelCourseSectionStepVideoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSectionStepVideosQuery = {
  listCourseSectionStepVideos?:  {
    __typename: "ModelCourseSectionStepVideoConnection",
    items:  Array< {
      __typename: "CourseSectionStepVideo",
      id: string,
      status: CourseSectionStepVideoStatus,
      duration: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionStepVideoCourseSectionStepId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReferralCodeQueryVariables = {
  code: string,
};

export type GetReferralCodeQuery = {
  getReferralCode?:  {
    __typename: "ReferralCode",
    code: string,
    orders?:  {
      __typename: "ModelUserOrderConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReferralCodesQueryVariables = {
  code?: string | null,
  filter?: ModelReferralCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListReferralCodesQuery = {
  listReferralCodes?:  {
    __typename: "ModelReferralCodeConnection",
    items:  Array< {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReferralCodesByOwnerQueryVariables = {
  owner: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReferralCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReferralCodesByOwnerQuery = {
  referralCodesByOwner?:  {
    __typename: "ModelReferralCodeConnection",
    items:  Array< {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserOrderQueryVariables = {
  id: string,
};

export type GetUserOrderQuery = {
  getUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    status?: UserOrderStatus | null,
    paymentMethod: PaymentMethod,
    price?: number | null,
    courseSlug: string,
    course:  {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      price?: number | null,
      discountPrice?: number | null,
      logoKey?: string | null,
      status: CourseStatus,
      facebookPixelId?: string | null,
      verificationId?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseCourseLandingPageId?: string | null,
    },
    referralCode?:  {
      __typename: "ReferralCode",
      code: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    referralCodeOrdersCode?: string | null,
  } | null,
};

export type ListUserOrdersQueryVariables = {
  filter?: ModelUserOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserOrdersQuery = {
  listUserOrders?:  {
    __typename: "ModelUserOrderConnection",
    items:  Array< {
      __typename: "UserOrder",
      id: string,
      status?: UserOrderStatus | null,
      paymentMethod: PaymentMethod,
      price?: number | null,
      courseSlug: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      referralCodeOrdersCode?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserOrderByCourseSlugQueryVariables = {
  courseSlug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserOrderByCourseSlugQuery = {
  userOrderByCourseSlug?:  {
    __typename: "ModelUserOrderConnection",
    items:  Array< {
      __typename: "UserOrder",
      id: string,
      status?: UserOrderStatus | null,
      paymentMethod: PaymentMethod,
      price?: number | null,
      courseSlug: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      referralCodeOrdersCode?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserOrderByOwnerAndCourseQueryVariables = {
  owner: string,
  courseSlug?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserOrderByOwnerAndCourseQuery = {
  userOrderByOwnerAndCourse?:  {
    __typename: "ModelUserOrderConnection",
    items:  Array< {
      __typename: "UserOrder",
      id: string,
      status?: UserOrderStatus | null,
      paymentMethod: PaymentMethod,
      price?: number | null,
      courseSlug: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      referralCodeOrdersCode?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserCourseStepProgressQueryVariables = {
  id: string,
};

export type GetUserCourseStepProgressQuery = {
  getUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    stepID: string,
    step:  {
      __typename: "CourseSectionStep",
      id: string,
      position: number,
      title: string,
      type: CourseSectionStepType,
      status: CourseSectionStepStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      courseSectionCourseSectionStepsId?: string | null,
      courseSectionStepCourseSectionStepVideoId?: string | null,
      courseSectionStepCourseSectionStepTestId?: string | null,
    },
    durationInMs: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserCourseStepProgressesQueryVariables = {
  filter?: ModelUserCourseStepProgressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserCourseStepProgressesQuery = {
  listUserCourseStepProgresses?:  {
    __typename: "ModelUserCourseStepProgressConnection",
    items:  Array< {
      __typename: "UserCourseStepProgress",
      id: string,
      stepID: string,
      durationInMs: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserCourseStepProgressByOwnerAndStepQueryVariables = {
  owner: string,
  stepID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserCourseStepProgressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserCourseStepProgressByOwnerAndStepQuery = {
  userCourseStepProgressByOwnerAndStep?:  {
    __typename: "ModelUserCourseStepProgressConnection",
    items:  Array< {
      __typename: "UserCourseStepProgress",
      id: string,
      stepID: string,
      durationInMs: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UpdateDashboardCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateDashboardCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
  } | null,
};

export type UpdateCourseDomainMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseDomainMutation = {
  updateCourse?:  {
    __typename: "Course",
    domain: string,
  } | null,
};

export type GetAdminListCourseQueryVariables = {
  slug?: string | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type GetAdminListCourseQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      status: CourseStatus,
      title: string,
      price?: number | null,
      logoKey?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetInstructorContextCourseQueryVariables = {
  slug: string,
};

export type GetInstructorContextCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    slug: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    facebookPixelId?: string | null,
    logoKey?: string | null,
    status: CourseStatus,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    courseCourseLandingPageId?: string | null,
  } | null,
};

export type GetCourseVerificationAndSubscribtionQueryVariables = {
  slug: string,
};

export type GetCourseVerificationAndSubscribtionQuery = {
  getCourse?:  {
    __typename: "Course",
    slug: string,
    verification?:  {
      __typename: "CourseVerification",
      id: string,
      courseSlug: string,
      message?: string | null,
      status: CourseVerificationStatus,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    subscriptions?:  {
      __typename: "ModelCourseSubscriptionConnection",
      items:  Array< {
        __typename: "CourseSubscription",
        id: string,
        courseSlug: string,
        courseSubscriptionPlanId: string,
        courseSubscriptionPlan:  {
          __typename: "CourseSubscriptionPlan",
          id: string,
          name: string,
          description: string,
          price: number,
        },
        startDate: string,
        expirationDate: string,
        status?: CourseSubscriptionStatus | null,
        owner?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetInstructorListCourseQueryVariables = {
  owner: string,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type GetInstructorListCourseQuery = {
  courseByOwner?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      status: CourseStatus,
      title: string,
      price?: number | null,
      logoKey?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCoursesByStatusAndGetSubscriptionPlansQueryVariables = {
  status: CourseStatus,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetCoursesByStatusAndGetSubscriptionPlansQuery = {
  courseByStatus?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      courseLandingPage?:  {
        __typename: "CourseLandingPage",
        fixedCard:  {
          __typename: "CourseLandingPageFixedCard",
          imageKey?: string | null,
        },
      } | null,
      status: CourseStatus,
      slug: string,
      title: string,
    } | null >,
    nextToken?: string | null,
  } | null,
  listCourseSubscriptionPlans?:  {
    __typename: "ModelCourseSubscriptionPlanConnection",
    items:  Array< {
      __typename: "CourseSubscriptionPlan",
      id: string,
      name: string,
      description: string,
      price: number,
      features: Array< string >,
      maxHours: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
  } | null,
};

export type GetPublicCourseDataQueryVariables = {
  slug: string,
};

export type GetPublicCourseDataQuery = {
  getCourse?:  {
    __typename: "Course",
    slug: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    logoKey?: string | null,
    facebookPixelId?: string | null,
    status: CourseStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLandingPagePublicCourseWithStepsQueryVariables = {
  slug: string,
};

export type GetLandingPagePublicCourseWithStepsQuery = {
  getCourse?:  {
    __typename: "Course",
    slug: string,
    title: string,
    price?: number | null,
    discountPrice?: number | null,
    facebookPixelId?: string | null,
    logoKey?: string | null,
    status: CourseStatus,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      appBar:  {
        __typename: "CourseLandingPageAppBar",
        backgroundColor: string,
        logoKey?: string | null,
        watchCourseTextColor: string,
      },
      backgroundColor: string,
      fixedCard:  {
        __typename: "CourseLandingPageFixedCard",
        backgroundColor: string,
        buttonBackgroundColor: string,
        buttonTextColor: string,
        descriptionTextColor: string,
        discountPriceTextColor: string,
        featureCheckboxBackgroundColor: string,
        featureCheckboxTextColor: string,
        featureTextColor: string,
        imageKey?: string | null,
        priceTextColor: string,
        titleTextColor: string,
      },
      footer:  {
        __typename: "CourseLandingPageFooter",
        backgroundColor: string,
        courseDomainTextColor: string,
        poweredByTextColor: string,
      },
      header:  {
        __typename: "CourseLandingPageHeader",
        backgroundColor: string,
        callToActionBackgroundColor: string,
        callToActionTextColor: string,
        statsTitleTextColor: string,
        statsValueTextColor: string,
        subtitle: string,
        subtitleColor: string,
        title: string,
        titleColor: string,
      },
      id: string,
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      sections?:  Array< {
        __typename: "CourseLandingPageSection",
        backgroundColor: string,
        subjects?:  {
          __typename: "CourseLandingPageSectionSubjects",
          subjects?:  Array< {
            __typename: "CourseLandingPageSectionSubjectsSubject",
            content: string,
            contentTextColor: string,
            imageBoxColor: string,
            imageKey?: string | null,
            indexColor: string,
            title: string,
            titleTextColor: string,
          } | null > | null,
          subtitle: string,
          subtitleTextColor: string,
          title: string,
          titleTextColor: string,
        } | null,
        aboutCourse?:  {
          __typename: "CourseLandingPageSectionAboutCourse",
          content: string,
          contentTextColor: string,
          title: string,
          titleTextColor: string,
        } | null,
        courseContent?:  {
          __typename: "CourseLandingPageSectionCourseContent",
          sectionArrowTextColor: string,
          sectionBorderColor: string,
          sectionTitleBackgroundColor: string,
          sectionTitleTextColor: string,
          stepBackgroundColor: string,
          stepDurationColor: string,
          stepIconColor: string,
          stepTextColor: string,
          stepsDividerColor: string,
          subtitle: string,
          subtitleTextColor: string,
          title: string,
          titleTextColor: string,
        } | null,
        features?:  {
          __typename: "CourseLandingPageSectionFeatures",
          items?:  Array< {
            __typename: "CourseLandingPageSectionFeaturesItem",
            backgroundColor: string,
            iconColor: string,
            textColor: string,
          } | null > | null,
        } | null,
        recommendedCourses?:  {
          __typename: "CourseLandingPageSectionRecommendedCourses",
          titleTextColor: string,
          subtitleTextColor: string,
          courseTitleTextColor: string,
          courseSlugs: Array< string | null >,
        } | null,
      } | null > | null,
    } | null,
    courseSections?:  {
      __typename: "ModelCourseSectionConnection",
      items:  Array< {
        __typename: "CourseSection",
        id: string,
        position: number,
        title: string,
        courseSectionSteps?:  {
          __typename: "ModelCourseSectionStepConnection",
          items:  Array< {
            __typename: "CourseSectionStep",
            id: string,
            position: number,
            title: string,
            type: CourseSectionStepType,
            courseSectionStepVideo?:  {
              __typename: "CourseSectionStepVideo",
              id: string,
              duration: number,
            } | null,
            courseSectionStepTest?:  {
              __typename: "CourseSectionStepTest",
              questions?:  {
                __typename: "ModelCourseSectionStepTestQuestionConnection",
                items:  Array< {
                  __typename: "CourseSectionStepTestQuestion",
                  id: string,
                } | null >,
              } | null,
            } | null,
          } | null >,
        } | null,
      } | null >,
    } | null,
  } | null,
};

export type GetPublicCourseMetaDataQueryVariables = {
  slug: string,
};

export type GetPublicCourseMetaDataQuery = {
  getCourse?:  {
    __typename: "Course",
    domain: string,
    slug: string,
    title: string,
    courseLandingPage?:  {
      __typename: "CourseLandingPage",
      fixedCard:  {
        __typename: "CourseLandingPageFixedCard",
        imageKey?: string | null,
      },
      tawkPropertyId?: string | null,
      tawkWidgetId?: string | null,
      metaTitle?: string | null,
      metaDescription?: string | null,
      faviconKey?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCourseSlugByDomainQueryVariables = {
  domain: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetCourseSlugByDomainQuery = {
  courseByDomain?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRecommendedCoursesQueryVariables = {
  slug?: string | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRecommendedCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
      domain: string,
      title: string,
      status: CourseStatus,
      courseLandingPage?:  {
        __typename: "CourseLandingPage",
        fixedCard:  {
          __typename: "CourseLandingPageFixedCard",
          imageKey?: string | null,
        },
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCoursesSlugsQueryVariables = {
  slug?: string | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCoursesSlugsQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      slug: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type StartUserOrderMutationVariables = {
  input: CreateUserOrderInput,
  condition?: ModelUserOrderConditionInput | null,
};

export type StartUserOrderMutation = {
  createUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    paymentMethod: PaymentMethod,
    courseSlug: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserCoursesQueryVariables = {
  filter?: ModelUserOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserCoursesQuery = {
  listUserOrders?:  {
    __typename: "ModelUserOrderConnection",
    items:  Array< {
      __typename: "UserOrder",
      id: string,
      status?: UserOrderStatus | null,
      updatedAt: string,
      createdAt: string,
      course:  {
        __typename: "Course",
        slug: string,
        title: string,
      },
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCoursePriceByUserOrderQueryVariables = {
  id: string,
};

export type GetCoursePriceByUserOrderQuery = {
  getUserOrder?:  {
    __typename: "UserOrder",
    id: string,
    course:  {
      __typename: "Course",
      price?: number | null,
    },
  } | null,
};

export type CreateSectionMutationVariables = {
  input: CreateCourseSectionInput,
  condition?: ModelCourseSectionConditionInput | null,
};

export type CreateSectionMutation = {
  createCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
  } | null,
};

export type UpdateSectionMutationVariables = {
  input: UpdateCourseSectionInput,
  condition?: ModelCourseSectionConditionInput | null,
};

export type UpdateSectionMutation = {
  updateCourseSection?:  {
    __typename: "CourseSection",
    id: string,
    position: number,
    title: string,
  } | null,
};

export type GetPublicCourseSectionStepsQueryVariables = {
  filter?: ModelCourseSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetPublicCourseSectionStepsQuery = {
  listCourseSections?:  {
    __typename: "ModelCourseSectionConnection",
    items:  Array< {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      createdAt: string,
      updatedAt: string,
      courseSectionSteps?:  {
        __typename: "ModelCourseSectionStepConnection",
        items:  Array< {
          __typename: "CourseSectionStep",
          id: string,
          position: number,
          title: string,
          type: CourseSectionStepType,
          courseSectionStepVideo?:  {
            __typename: "CourseSectionStepVideo",
            id: string,
            duration: number,
          } | null,
          updatedAt: string,
          createdAt: string,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseSectionsWithStepsAndStepVideosQueryVariables = {
  filter?: ModelCourseSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetCourseSectionsWithStepsAndStepVideosQuery = {
  listCourseSections?:  {
    __typename: "ModelCourseSectionConnection",
    items:  Array< {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      createdAt: string,
      updatedAt: string,
      courseSectionSteps?:  {
        __typename: "ModelCourseSectionStepConnection",
        items:  Array< {
          __typename: "CourseSectionStep",
          id: string,
          position: number,
          title: string,
          type: CourseSectionStepType,
          courseSectionStepVideo?:  {
            __typename: "CourseSectionStepVideo",
            id: string,
            status: CourseSectionStepVideoStatus,
            duration: number,
          } | null,
          userCourseStepProgress?:  {
            __typename: "ModelUserCourseStepProgressConnection",
            items:  Array< {
              __typename: "UserCourseStepProgress",
              id: string,
              durationInMs: number,
            } | null >,
          } | null,
          courseSectionStepCourseSectionStepTestId?: string | null,
          updatedAt: string,
          createdAt: string,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDashboardCourseSectionsWithStepsQueryVariables = {
  filter?: ModelCourseSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDashboardCourseSectionsWithStepsQuery = {
  listCourseSections?:  {
    __typename: "ModelCourseSectionConnection",
    items:  Array< {
      __typename: "CourseSection",
      id: string,
      position: number,
      title: string,
      courseSectionSteps?:  {
        __typename: "ModelCourseSectionStepConnection",
        items:  Array< {
          __typename: "CourseSectionStep",
          id: string,
          position: number,
          title: string,
          type: CourseSectionStepType,
          uploadedVideo?:  {
            __typename: "UploadedVideo",
            key: string,
            size: number,
            fileName: string,
          } | null,
          courseSectionStepVideo?:  {
            __typename: "CourseSectionStepVideo",
            id: string,
            status: CourseSectionStepVideoStatus,
            duration: number,
          } | null,
          courseSectionStepCourseSectionStepTestId?: string | null,
        } | null >,
      } | null,
    } | null >,
  } | null,
};

export type UpdateLandingPageWithSectionsMutationVariables = {
  input: UpdateCourseLandingPageInput,
  condition?: ModelCourseLandingPageConditionInput | null,
};

export type UpdateLandingPageWithSectionsMutation = {
  updateCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    id: string,
    backgroundColor: string,
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      logoKey?: string | null,
      backgroundColor: string,
      watchCourseTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      title: string,
      titleColor: string,
      subtitle: string,
      subtitleColor: string,
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
    },
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      imageKey?: string | null,
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      priceTextColor: string,
      discountPriceTextColor: string,
      titleTextColor: string,
      descriptionTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
      aboutCourse?:  {
        __typename: "CourseLandingPageSectionAboutCourse",
        content: string,
        contentTextColor: string,
        title: string,
        titleTextColor: string,
      } | null,
      courseContent?:  {
        __typename: "CourseLandingPageSectionCourseContent",
        sectionArrowTextColor: string,
        sectionBorderColor: string,
        sectionTitleBackgroundColor: string,
        sectionTitleTextColor: string,
        stepBackgroundColor: string,
        stepDurationColor: string,
        stepIconColor: string,
        stepTextColor: string,
        stepsDividerColor: string,
        subtitle: string,
        subtitleTextColor: string,
        titleTextColor: string,
        title: string,
      } | null,
      features?:  {
        __typename: "CourseLandingPageSectionFeatures",
        items?:  Array< {
          __typename: "CourseLandingPageSectionFeaturesItem",
          backgroundColor: string,
          iconColor: string,
          textColor: string,
        } | null > | null,
      } | null,
      subjects?:  {
        __typename: "CourseLandingPageSectionSubjects",
        subtitle: string,
        subtitleTextColor: string,
        title: string,
        titleTextColor: string,
        subjects?:  Array< {
          __typename: "CourseLandingPageSectionSubjectsSubject",
          content: string,
          contentTextColor: string,
          imageBoxColor: string,
          imageKey?: string | null,
          indexColor: string,
          title: string,
          titleTextColor: string,
        } | null > | null,
      } | null,
      recommendedCourses?:  {
        __typename: "CourseLandingPageSectionRecommendedCourses",
        titleTextColor: string,
        subtitleTextColor: string,
        courseTitleTextColor: string,
        courseSlugs: Array< string | null >,
      } | null,
    } | null > | null,
  } | null,
};

export type GetCourseLandingPageWithSectionsQueryVariables = {
  id: string,
};

export type GetCourseLandingPageWithSectionsQuery = {
  getCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    appBar:  {
      __typename: "CourseLandingPageAppBar",
      backgroundColor: string,
      logoKey?: string | null,
      watchCourseTextColor: string,
    },
    backgroundColor: string,
    createdAt: string,
    fixedCard:  {
      __typename: "CourseLandingPageFixedCard",
      backgroundColor: string,
      buttonBackgroundColor: string,
      buttonTextColor: string,
      descriptionTextColor: string,
      discountPriceTextColor: string,
      featureCheckboxBackgroundColor: string,
      featureCheckboxTextColor: string,
      featureTextColor: string,
      imageKey?: string | null,
      priceTextColor: string,
      titleTextColor: string,
    },
    footer:  {
      __typename: "CourseLandingPageFooter",
      backgroundColor: string,
      courseDomainTextColor: string,
      poweredByTextColor: string,
    },
    header:  {
      __typename: "CourseLandingPageHeader",
      backgroundColor: string,
      callToActionBackgroundColor: string,
      callToActionTextColor: string,
      statsTitleTextColor: string,
      statsValueTextColor: string,
      subtitle: string,
      subtitleColor: string,
      title: string,
      titleColor: string,
    },
    id: string,
    updatedAt: string,
    sections?:  Array< {
      __typename: "CourseLandingPageSection",
      backgroundColor: string,
      subjects?:  {
        __typename: "CourseLandingPageSectionSubjects",
        subjects?:  Array< {
          __typename: "CourseLandingPageSectionSubjectsSubject",
          content: string,
          contentTextColor: string,
          imageBoxColor: string,
          imageKey?: string | null,
          indexColor: string,
          title: string,
          titleTextColor: string,
        } | null > | null,
        subtitle: string,
        subtitleTextColor: string,
        title: string,
        titleTextColor: string,
      } | null,
      aboutCourse?:  {
        __typename: "CourseLandingPageSectionAboutCourse",
        content: string,
        contentTextColor: string,
        title: string,
        titleTextColor: string,
      } | null,
      courseContent?:  {
        __typename: "CourseLandingPageSectionCourseContent",
        sectionArrowTextColor: string,
        sectionBorderColor: string,
        sectionTitleBackgroundColor: string,
        sectionTitleTextColor: string,
        stepBackgroundColor: string,
        stepDurationColor: string,
        stepIconColor: string,
        stepTextColor: string,
        stepsDividerColor: string,
        subtitle: string,
        subtitleTextColor: string,
        title: string,
        titleTextColor: string,
      } | null,
      features?:  {
        __typename: "CourseLandingPageSectionFeatures",
        items?:  Array< {
          __typename: "CourseLandingPageSectionFeaturesItem",
          backgroundColor: string,
          iconColor: string,
          textColor: string,
        } | null > | null,
      } | null,
      recommendedCourses?:  {
        __typename: "CourseLandingPageSectionRecommendedCourses",
        titleTextColor: string,
        subtitleTextColor: string,
        courseTitleTextColor: string,
        courseSlugs: Array< string | null >,
      } | null,
    } | null > | null,
  } | null,
};

export type GetCourseLandingPageSEOSettingsQueryVariables = {
  id: string,
};

export type GetCourseLandingPageSEOSettingsQuery = {
  getCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    metaTitle?: string | null,
    metaDescription?: string | null,
    faviconKey?: string | null,
    id: string,
  } | null,
};

export type GetCourseLandingPageIntegrationsSettingsQueryVariables = {
  id: string,
};

export type GetCourseLandingPageIntegrationsSettingsQuery = {
  getCourseLandingPage?:  {
    __typename: "CourseLandingPage",
    tawkPropertyId?: string | null,
    tawkWidgetId?: string | null,
    id: string,
  } | null,
};

export type GetCourseSectionStepWithVideoAndProgressQueryVariables = {
  id: string,
  stepID?: ModelIDKeyConditionInput | null,
  owner: string,
};

export type GetCourseSectionStepWithVideoAndProgressQuery = {
  getCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    title: string,
    type: CourseSectionStepType,
    courseSectionStepVideo?:  {
      __typename: "CourseSectionStepVideo",
      id: string,
      duration: number,
      url?:  {
        __typename: "CourseSectionStepVideoURL",
        url: string,
      } | null,
    } | null,
    courseSectionStepTest?:  {
      __typename: "CourseSectionStepTest",
      id: string,
      questions?:  {
        __typename: "ModelCourseSectionStepTestQuestionConnection",
        items:  Array< {
          __typename: "CourseSectionStepTestQuestion",
          id: string,
          type: CourseSectionStepTestQuestionType,
          text?: string | null,
          position: number,
          imageKey?: string | null,
          correctAnswers?: Array< string | null > | null,
          answers?:  Array< {
            __typename: "CourseSectionStepTestQuestionAnswer",
            id: string,
            imageKey?: string | null,
            text?: string | null,
          } | null > | null,
        } | null >,
      } | null,
    } | null,
  } | null,
  userCourseStepProgressByOwnerAndStep?:  {
    __typename: "ModelUserCourseStepProgressConnection",
    items:  Array< {
      __typename: "UserCourseStepProgress",
      id: string,
      owner?: string | null,
      durationInMs: number,
    } | null >,
  } | null,
};

export type GetSubscriptionByCourseSlugQueryVariables = {
  courseSlug: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetSubscriptionByCourseSlugQuery = {
  subscriptionByCourseSlug?:  {
    __typename: "ModelCourseSubscriptionConnection",
    items:  Array< {
      __typename: "CourseSubscription",
      id: string,
      courseSlug: string,
      courseSubscriptionPlan:  {
        __typename: "CourseSubscriptionPlan",
        id: string,
        name: string,
        price: number,
        description: string,
      },
      startDate: string,
      expirationDate: string,
      status?: CourseSubscriptionStatus | null,
      createdAt: string,
      owner?: string | null,
    } | null >,
  } | null,
};

export type CreateSectionStepMutationVariables = {
  input: CreateCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type CreateSectionStepMutation = {
  createCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
    type: CourseSectionStepType,
    status: CourseSectionStepStatus,
    createdAt: string,
    updatedAt: string,
    courseSectionCourseSectionStepsId?: string | null,
    courseSectionStepCourseSectionStepVideoId?: string | null,
  } | null,
};

export type CreateSectionStepTestMutationVariables = {
  input: CreateCourseSectionStepTestInput,
  condition?: ModelCourseSectionStepTestConditionInput | null,
};

export type CreateSectionStepTestMutation = {
  createCourseSectionStepTest?:  {
    __typename: "CourseSectionStepTest",
    id: string,
  } | null,
};

export type UpdateSectionStepMutationVariables = {
  input: UpdateCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type UpdateSectionStepMutation = {
  updateCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    position: number,
    title: string,
  } | null,
};

export type UpdateSectionStepVideoMutationVariables = {
  input: UpdateCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type UpdateSectionStepVideoMutation = {
  updateCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
    uploadedVideo?:  {
      __typename: "UploadedVideo",
      key: string,
      size: number,
      fileName: string,
    } | null,
  } | null,
};

export type DeleteSectionStepMutationVariables = {
  input: DeleteCourseSectionStepInput,
  condition?: ModelCourseSectionStepConditionInput | null,
};

export type DeleteSectionStepMutation = {
  deleteCourseSectionStep?:  {
    __typename: "CourseSectionStep",
    id: string,
  } | null,
};

export type ListCourseSectionStepTestQuestionsWithAnswersQueryVariables = {
  testId: string,
  position?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseSectionStepTestQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseSectionStepTestQuestionsWithAnswersQuery = {
  courseSectionStepTestQuestionByTest?:  {
    __typename: "ModelCourseSectionStepTestQuestionConnection",
    items:  Array< {
      __typename: "CourseSectionStepTestQuestion",
      id: string,
      type: CourseSectionStepTestQuestionType,
      position: number,
      text?: string | null,
      imageKey?: string | null,
      correctAnswers?: Array< string | null > | null,
      answers?:  Array< {
        __typename: "CourseSectionStepTestQuestionAnswer",
        id: string,
        imageKey?: string | null,
        text?: string | null,
      } | null > | null,
      testId: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateShortUserCourseStepProgressMutationVariables = {
  input: CreateUserCourseStepProgressInput,
  condition?: ModelUserCourseStepProgressConditionInput | null,
};

export type CreateShortUserCourseStepProgressMutation = {
  createUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    stepID: string,
    durationInMs: number,
  } | null,
};

export type UpdateShortUserCourseStepProgressMutationVariables = {
  input: UpdateUserCourseStepProgressInput,
  condition?: ModelUserCourseStepProgressConditionInput | null,
};

export type UpdateShortUserCourseStepProgressMutation = {
  updateUserCourseStepProgress?:  {
    __typename: "UserCourseStepProgress",
    id: string,
    durationInMs: number,
  } | null,
};

export type UpdateCourseStepTestQuestionMutationVariables = {
  input: UpdateCourseSectionStepTestQuestionInput,
  condition?: ModelCourseSectionStepTestQuestionConditionInput | null,
};

export type UpdateCourseStepTestQuestionMutation = {
  updateCourseSectionStepTestQuestion?:  {
    __typename: "CourseSectionStepTestQuestion",
    id: string,
    type: CourseSectionStepTestQuestionType,
    position: number,
    text?: string | null,
    imageKey?: string | null,
    answers?:  Array< {
      __typename: "CourseSectionStepTestQuestionAnswer",
      id: string,
      text?: string | null,
      imageKey?: string | null,
    } | null > | null,
    correctAnswers?: Array< string | null > | null,
  } | null,
};
