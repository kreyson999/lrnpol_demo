'use client';

import React, { MouseEventHandler, useState } from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';

import MBox from '@mui/material/Box';
import Modal from '@/components/materialUI/Modal';
import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { AuthService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { Validation } from '@/config/ValidationConfig';

type Props = {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  email: string;
};

const forgotPasswordSchema = yup.object({
  code: Validation.code(),
  password: Validation.password(),
  confirmPassword: Validation.confirmPassword(),
});

const EnterConfirmationCodeModal = ({ open, email, onClose }: Props) => {
  const router = useRouter();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: ({ code, password }) => {
      setIsLoading(true);
      AuthService.confirmResetPassword(email, code, password)
        .then(() => {
          showSnackbar('Pomyślnie zmieniono hasło!');
          router.push('/zaloguj');
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
    <Modal open={open} onClose={onClose} title="Wpisz kod weryfikacyjny">
      <MBox
        className="tw-flex tw-flex-col tw-gap-2"
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextInput
          id="code"
          label="Kod weryfikacyjny"
          name="code"
          value={formik.values.code}
          helperText={formik.touched.code && formik.errors.code}
          error={formik.touched.code && Boolean(formik.errors.code)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <TextInput
          id="password"
          label="Nowe hasło"
          name="password"
          type="password"
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <TextInput
          id="confirmPassword"
          label="Potwtórz nowe hasło"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button primary isLoading={isLoading} className="tw-mt-4">
          Zmień hasło
        </Button>
      </MBox>
    </Modal>
  );
};

export default EnterConfirmationCodeModal;
