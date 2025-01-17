import * as yup from 'yup';

export const Validation = {
  password: () => {
    return yup
      .string()
      .min(8, 'Hasło musi mieć przynajmniej 8 znaków.')
      .max(24, 'Hasło może mieć maksymalnie 24 znaki.')
      .matches(
        /^(?=.*[A-Z]).+$/,
        'Hasło musi mieć przynajmniej jedną dużą literę.'
      )
      .matches(
        /^(?=.*[a-z]).+$/,
        'Hasło musi mieć przynajmniej jedną małą literę.'
      )
      .matches(/^(?=.*\d).+$/, 'Hasło musi mieć przynajmniej jedną cyfrę.')
      .matches(
        /^(?=.*[^\w\d]).+$/,
        'Hasło musi mieć przynajmniej jeden znak specjalny.'
      )
      .required('Hasło jest wymagane.');
  },
  confirmPassword: () => {
    return yup
      .string()
      .oneOf([yup.ref('password')], 'Hasła muszą być takie same!')
      .required('Powtórzenie hasła jest wymagane.');
  },
  code: () => {
    return yup
      .string()
      .min(6, 'Kod musi mieć przynajmniej 6 znaków.')
      .max(6, 'Kod może mieć maksymalnie 6 znaków')
      .required('Kod jest wymagany');
  },
  email: () => {
    return yup
      .string()
      .email('Wprowadź poprawny adres e-mail.')
      .required('Adres e-mail jest wymagany.');
  },
  tos: () => {
    return yup
      .boolean()
      .isTrue('Musisz potwierdzić regulamin.')
      .required('Potwierdzenie regulaminu jest wymagane!');
  },
  noSharing: () => {
    return yup
      .boolean()
      .isTrue('Musisz potwierdzić zakaz współdzielenia konta.')
      .required('Potwierdzenie zakazu współdzielenia konta jest wymagane!');
  },
  string: (name: string, min: number, max: number) => {
    return yup
      .string()
      .min(min, `Pole ${name} musi mieć przynajmniej ${min} znaki.`)
      .max(max, `Pole ${name} może mieć maksymalnie ${max} znaki.`)
      .required(`Pole ${name} jest wymagane!`);
  },
};
