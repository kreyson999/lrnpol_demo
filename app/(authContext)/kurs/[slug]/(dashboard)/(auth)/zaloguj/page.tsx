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
import { AuthService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { Validation } from '@/config/ValidationConfig';

const signInSchema = yup.object({
  email: Validation.email(),
  password: Validation.password(),
});

const LoginPage = () => {
  const setErrorMessage = useErrorState();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: ({ email, password }) => {
      setIsLoading(true);
      AuthService.signIn({ email, password })
        .then(() => {
          showSnackbar('Pomyślnie zalogowano!');

          router.push('/app');
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
      <MTypography className="tw-text-primary-main tw-text-center tw-text-4xl md:tw-text-5xl tw-font-extrabold tw-uppercase">
        Zaloguj się
      </MTypography>

      <MTypography className="tw-text-lg md:tw-text-xl tw-text-center tw-text-secondary-contrastText tw-mt-4">
        Nie masz jeszcze konta?{' '}
        <Link href={'/stworzkonto'} className="tw-text-white">
          Stwórz konto!
        </Link>
      </MTypography>
      <MBox className="tw-mt-8 tw-flex tw-flex-col tw-gap-4">
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
      </MBox>

      <Link
        href={'/przypomnijhaslo'}
        className="tw-text-white tw-mt-4 tw-text-right"
      >
        <MTypography>Zapomniałeś hasło?</MTypography>
      </Link>

      <Button isLoading={isLoading} primary className="tw-mt-4">
        Zaloguj się
      </Button>
    </MContainer>
  );
};

export default LoginPage;
