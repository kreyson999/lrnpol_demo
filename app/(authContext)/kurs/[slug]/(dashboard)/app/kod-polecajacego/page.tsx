'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import MContainer from '@mui/material/Container';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';

import TextInput from '@/components/materialUI/TextInput';
import Button from '@/components/materialUI/Button';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import * as mutations from '@/services/graphql/mutations';
import { parseError } from '@/helpers/parseError';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from '@/components/shared/PageLoader';
import { generateClient } from 'aws-amplify/api';

const referralCodeSchema = yup.object({
  referralCode: yup
    .string()
    .min(4, 'Kod polecającego musi mieć przynajmniej 4 znaki.')
    .max(16, 'Kod polecającego może mieć maksymalnie 16 znaków.')
    .matches(
      /[a-z0-9]/i,
      'Kod polecającego może zawierać tylko znaki: a-z oraz 0-9.'
    ),
});

const LoginPage = () => {
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  const [currentReferralCode, setCurrentReferralCode] = useState<{
    code: string;
    ordersCount: number;
  } | null>(null);

  const handleCreateReferralCode = async (code: string) => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      const { errors, data } = await client.graphql({
        query: mutations.createReferralCode,
        variables: {
          input: {
            code: code,
          },
        },
      });

      if (errors) throw parseError(errors.map((error) => error.message));
      setCurrentReferralCode({
        code: data.createReferralCode.code,
        ordersCount: 0,
      });
      showSnackbar('Pomyślnie zapisano kod polecającego.');
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      referralCode: '',
    },
    validationSchema: referralCodeSchema,
    onSubmit: ({ referralCode }) => {
      setIsLoading(true);
      void handleCreateReferralCode(referralCode.trim());
    },
  });

  const handleFetchReferralCode = useCallback(() => {
    if (!auth.user) return;
    try {
      // const referralCode = await getUserReferralCode();
      // setCurrentReferralCode(
      //   referralCode
      //     ? {
      //         code: referralCode.code,
      //         ordersCount: referralCode.orders.items.length,
      //       }
      //     : null
      // );
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [auth.user, setErrorMessage]);

  const stats = [
    {
      title: 'Zaproszonych:',
      value: currentReferralCode ? currentReferralCode.ordersCount : 0,
    },
    {
      title: 'Zarobek za osobę:',
      value: '10 zł',
    },
    {
      title: 'Aktualnie zarobione:',
      value: currentReferralCode
        ? `${currentReferralCode.ordersCount * 10} zł`
        : `0 zł`,
    },
  ];

  useEffect(() => {
    void handleFetchReferralCode();
  }, [handleFetchReferralCode]);

  return (
    <PageLoader isLoading={isLoading}>
      <MContainer
        maxWidth="md"
        className="tw-flex tw-flex-col tw-justify-center tw-grow tw-text-white tw-pt-12 tw-pb-16"
      >
        <MTypography className="tw-text-primary-main tw-text-center tw-text-5xl tw-font-extrabold tw-uppercase">
          System poleceń
        </MTypography>
        <MTypography className="tw-text-xl tw-text-center tw-text-secondary-contrastText tw-mt-4">
          Za każdego zaproszonego użytkownika otrzymasz 10 zł. <br />
          Wypłaty zarobionych środków możesz dokonać od{' '}
          <span className="tw-text-primary-contrastText tw-font-bold">
            30 zł
          </span>{' '}
          (3 zaproszonych osób) po upływie 14 dni od ostatniego zamówienia!
        </MTypography>
        <MBox className="tw-grid sm:tw-grid-cols-3 tw-mt-8  tw-gap-4">
          {stats.map((item) => (
            <MBox
              key={item.title}
              className="tw-p-2 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-border tw-border-primary-light tw-bg-background-paper"
            >
              <MTypography className="tw-text-sm tw-text-secondary-contrastText">
                {item.title}
              </MTypography>
              <MTypography className="tw-mt-2 tw-text-4xl tw-font-bold tw-text-primary-contrastText">
                {item.value}
              </MTypography>
            </MBox>
          ))}
        </MBox>

        <MTypography className="tw-mt-12 tw-text-primary-main tw-text-center tw-text-3xl tw-font-extrabold tw-uppercase">
          Twój kod
        </MTypography>
        {currentReferralCode ? (
          <MBox className="sm:tw-mx-auto sm:tw-w-[400px] tw-mt-8 tw-flex tw-flex-col tw-gap-4">
            <TextInput
              id="referralCode"
              type="text"
              label="Kod polecającego"
              name="referralCode"
              value={currentReferralCode.code}
            />
          </MBox>
        ) : (
          <MBox
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
            className="sm:tw-mx-auto sm:tw-w-[400px] tw-mt-8 tw-flex tw-flex-col tw-gap-4"
          >
            <TextInput
              id="referralCode"
              type="text"
              label="Kod polecającego"
              name="referralCode"
              value={formik.values.referralCode}
              helperText={
                formik.touched.referralCode && formik.errors.referralCode
              }
              error={
                formik.touched.referralCode &&
                Boolean(formik.errors.referralCode)
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Button type="submit" primary>
              Zapisz
            </Button>
          </MBox>
        )}

        <MTypography className="tw-mt-12 tw-text-primary-main tw-text-center tw-text-3xl tw-font-extrabold tw-uppercase">
          Wypłać środki
        </MTypography>
        <MTypography className="tw-text-lg tw-text-center tw-text-secondary-contrastText tw-mt-4">
          Tymczasowo, aby wypłacić środki skontakuj się z nami na{' '}
          <a
            className="tw-text-primary-contrastText"
            href="mailto:kontakt@learnpool.pl"
          >
            kontakt@learnpool.pl
          </a>
        </MTypography>
      </MContainer>
    </PageLoader>
  );
};

export default LoginPage;
