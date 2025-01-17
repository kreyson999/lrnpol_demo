'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';

import MContainer from '@mui/material/Container';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import Checkbox from '@/components/materialUI/Checkbox';
import { AuthService } from '@/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { Validation } from '@/config/ValidationConfig';

const signUpSchema = yup.object({
  firstName: Validation.string('Imię', 3, 32),
  lastName: Validation.string('Nazwisko', 3, 40),
  email: Validation.email(),
  password: Validation.password(),
  tos: Validation.tos(),
});

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const setErrorMessage = useErrorState();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const afterLoginAction = searchParams.get('action');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tos: false,
    },
    validationSchema: signUpSchema,
    onSubmit: ({ firstName, lastName, email, password }) => {
      setIsLoading(true);
      AuthService.signUp({ firstName, lastName, email, password })
        .then((status) => {
          showSnackbar('Pomyślnie utworzono konto!');
          if (status === 'AUTO_SIGN_IN_SUCCESS') {
            if (afterLoginAction === 'stworzkurs') {
              router.push('/dashboard/kursy/stworz');
            } else {
              router.push('/');
            }
          } else {
            router.push(
              `/zaloguj${afterLoginAction ? `?action=${afterLoginAction}` : ''}`
            );
          }
        })
        .catch((error: string) => {
          setErrorMessage(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <MContainer
      maxWidth="sm"
      className="tw-flex tw-flex-col tw-justify-center tw-grow tw-text-white tw-pt-12 tw-pb-16"
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <MTypography className="tw-text-primary-main tw-text-center tw-text-5xl tw-font-extrabold tw-uppercase">
        Stwórz konto
      </MTypography>
      <MTypography className="tw-text-xl tw-text-center tw-mt-4 tw-text-secondary-contrastText">
        Masz już konto na naszej platformie?{' '}
        <Link
          href={{
            pathname: '/zaloguj',
            query: afterLoginAction ? { action: afterLoginAction } : null,
          }}
          className="tw-text-white"
        >
          Zaloguj się!
        </Link>
      </MTypography>
      <MBox className="tw-mt-8 tw-flex tw-flex-col tw-gap-4">
        <MBox className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 tw-gap-4">
          <TextInput
            id="firstName"
            label="Imię"
            name="firstName"
            value={formik.values.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextInput
            id="lastName"
            label="Nazwisko"
            name="lastName"
            value={formik.values.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </MBox>
        <TextInput
          id="email"
          type="email"
          label="Adres e-mail"
          name="email"
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <TextInput
          type="password"
          id="password"
          label="Hasło"
          name="password"
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Checkbox
          value={formik.values.tos}
          helperText={formik.touched.tos && formik.errors.tos}
          error={formik.touched.tos && Boolean(formik.errors.tos)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          ariaLabel="Zaakceptuj regulamin"
          name="tos"
        >
          <MTypography className="tw-text-sm">
            Oświadczam, że przeczytałem/am, zrozumiałem/am oraz akceptuję
            warunki określone w{' '}
            <a className="tw-text-primary-main" href="/regulamin.pdf">
              regulaminie
            </a>{' '}
            oraz{' '}
            <a
              className="tw-text-primary-main"
              href="/polityka_prywatnosci.pdf"
            >
              polityce prywatności
            </a>
            .
          </MTypography>
        </Checkbox>
      </MBox>

      <Button isLoading={isLoading} primary className="tw-mt-4">
        Stwórz konto
      </Button>
    </MContainer>
  );
};

export default RegisterPage;
