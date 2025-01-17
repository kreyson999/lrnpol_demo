import {
  CourseSectionStepTestQuestionType,
  CourseSectionStepType,
} from '@/services/API';
import * as yup from 'yup';

export const validateCreateCourseSchema = yup.object({
  title: yup
    .string()
    .min(4, 'Tytuł kursu musi mieć przynajmniej 4 znaki!')
    .max(128, 'Tytuł kursu może mieć maksymalnie 128 znaków!')
    .required('Tytuł kursu jest wymagany!'),
  slug: yup
    .string()
    .min(4, 'Adres kursu musi mieć przynajmniej 4 znaki!')
    .max(128, 'Adres kursu może mieć maksymalnie 128 znaków!')
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Adres kursu kursu jest nieprawidłowa!'
    )
    .required('Adres kursu kursu jest wymagana!'),
});

export type CreateCourseSchema = yup.InferType<
  typeof validateCreateCourseSchema
>;

export const validateCreateContentSectionSchema = yup.object({
  title: yup.string().required('Tytuł sekcji jest wymagany!'),
  position: yup.number().required('Pozycja sekcji jest wymagana!'),
  courseSlug: yup.string().required('Slug kursu jest wymagany!'),
});

export type CreateContentSectionSchema = yup.InferType<
  typeof validateCreateContentSectionSchema
>;

export const validateCreateStepSchema = yup.object({
  position: yup.number().required('Pozycja sekcji jest wymagana!'),
  type: yup
    .string()
    .oneOf(
      Object.values(CourseSectionStepType),
      'Proszę wybrać prawidłowy typ etapu.'
    )
    .required('Typ etapu jest wymagany!'),
  title: yup
    .string()
    .min(2, 'Tytuł etapu musi mieć przynajmniej 2 znaki!')
    .max(128, 'Tytuł etapu może mieć maksymalnie 128 znaków!')
    .required('Tytuł etapu jest wymagany!'),
});

export type CreateStepSchema = yup.InferType<typeof validateCreateStepSchema>;

export const validateUpdateStepSchema = yup.object({
  title: yup
    .string()
    .min(2, 'Tytuł etapu musi mieć przynajmniej 2 znaki!')
    .max(128, 'Tytuł etapu może mieć maksymalnie 128 znaków!')
    .required('Tytuł etapu jest wymagany!'),
});

export type UpdateStepSchema = yup.InferType<typeof validateUpdateStepSchema>;

export const validateCreateTestQuestionSchema = yup.object({
  type: yup
    .string()
    .oneOf(
      Object.values(CourseSectionStepTestQuestionType),
      'Proszę wybrać prawidłowy typ pytania!'
    )
    .required('Typ etapu jest wymagany!'),
  text: yup
    .string()
    .min(2, 'Pytanie musi mieć przynajmniej 2 znaki!')
    .max(512, 'Pytanie może mieć maksymalnie 128 znaków!')
    .required('Pytanie jest wymagane!'),
  answers: yup.array().of(
    yup.object().shape({
      id: yup.string().required('Id odpowiedzi jest wymagane!'),
      text: yup
        .string()
        .min(2, 'Odpowiedź musi mieć przynajmniej 2 znaki!')
        .max(512, 'Odpowiedź może mieć maksymalnie 128 znaków!')
        .required('Odpowiedź jest wymagana!'),
    })
  ),
  correctAnswers: yup
    .array()
    .min(1, 'Proszę wybrać co najmniej jedną prawidłową odpowiedź!')
    .of(yup.string().required('Id odpowiedzi jest wymagane!')),
  position: yup.number().required('Pozycja pytania jest wymagana!'),
});

export type CreateTestQuestionSchema = yup.InferType<
  typeof validateCreateTestQuestionSchema
>;

export const validateStartCourseSubscriptionSchema = yup.object({
  planId: yup.string().required('Id planu jest wymagane!'),
});

export const validateUpdatingDomain = yup.object({
  domain: yup
    .string()
    .min(2, 'Domena kursu musi mieć przynajmniej 4 znaki!')
    .max(128, 'Domena kursu może mieć maksymalnie 128 znaków!')
    .matches(
      /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      'To nie jest prawidłowa domena!'
    )
    .required('Domena kursu jest wymagana!'),
  includeWWW: yup
    .boolean()
    .required('Podanie czy dodać prefiks www jest wymagane.'),
});

export type UpdateDomainSchema = yup.InferType<typeof validateUpdatingDomain>;
