'use client';

import React, { useState } from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { useErrorState } from '@/contexts/ErrorContext';
import { AuthService } from '@/services/authService';
import { useSnackbar } from '@/contexts/SnackbarContext';

import MContainer from '@mui/material/Container';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import EnterConfirmationCodeModal from './EnterConfirmationCodeModal';
import { Validation } from '@/config/ValidationConfig';

const forgotPasswordSchema = yup.object({
  email: Validation.email(),
});

const ForgotPassword = () => {
  const [isEnterConfirmationCodeOpenModal, toggleEnterConfirmationCodeModal] =
    useModal();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: ({ email }) => {
      setIsLoading(true);
      AuthService.resetPassword(email)
        .then(() => {
          showSnackbar('Pomyślnie wysłano kod weryfikacyjny na e-mail!');
          toggleEnterConfirmationCodeModal(null);
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
    <>
      <EnterConfirmationCodeModal
        open={isEnterConfirmationCodeOpenModal}
        onClose={toggleEnterConfirmationCodeModal}
        email={formik.values.email}
      />
      <MContainer
        maxWidth="sm"
        className="tw-flex tw-flex-col tw-justify-center tw-grow tw-text-white tw-pt-12 tw-pb-16"
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <MTypography className="tw-text-primary-main tw-text-center tw-text-5xl tw-font-extrabold tw-uppercase">
          Przypomnij hasło
        </MTypography>
        <MTypography className="tw-text-xl tw-text-center tw-mt-4 tw-text-secondary-contrastText">
          Pamiętasz swoje hasło?{' '}
          <Link href="/zaloguj" className="tw-text-white">
            Zaloguj się!
          </Link>
        </MTypography>
        <MBox className="tw-mt-8 tw-flex tw-flex-col tw-gap-4">
          <TextInput
            id="email"
            label="Adres e-mail"
            name="email"
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </MBox>

        <Button primary isLoading={isLoading} className="tw-mt-8">
          Przypomnij hasło
        </Button>
      </MContainer>
    </>
  );
};

export default ForgotPassword;
