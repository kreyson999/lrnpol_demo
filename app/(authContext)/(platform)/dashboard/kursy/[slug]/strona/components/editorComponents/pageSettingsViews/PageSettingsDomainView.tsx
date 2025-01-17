import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFormik } from 'formik';

import Button from '@/components/materialUI/Button';
import Checkbox from '@/components/materialUI/Checkbox';
import TextInput from '@/components/materialUI/TextInput';
import PageLoader from '@/components/shared/PageLoader';
import { useErrorState } from '@/contexts/ErrorContext';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from '@/contexts/SnackbarContext';
import {
  UpdateDomainSchema,
  validateUpdatingDomain,
} from '@/app/api/Validations';
import axios from 'axios';
import { DomainAssociation } from '@aws-sdk/client-amplify';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';

const PageSettingsDomainView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();
  const [domain, setDomain] = useState<DomainAssociation | null>(null);

  const handleUpdateDomain = async (input: UpdateDomainSchema) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/courses/${slug}/domains`, input);
      showSnackbar('Pomyślnie dodano domenę!');
    } catch (error) {
      setErrorMessage('Nie udało się zaktualizować domeny kursu!');
    } finally {
      setIsLoading(false);
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      domain: '',
      includeWWW: true,
    },
    validationSchema: validateUpdatingDomain,
    onSubmit: handleUpdateDomain,
  });

  const fetchCourseDomain = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data: response } = await axios.get<{
        data: DomainAssociation | null;
      }>(`/api/courses/${slug}/domains`);

      if (response.data) {
        void setFieldValue('domain', response.data.domainName);
        void setFieldValue(
          'includeWWW',
          Boolean(response.data.subDomains?.length)
        );
        setDomain(response.data);
      }
    } catch (error) {
      setErrorMessage('Nie udało się pobrać domeny kursu!');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, slug, setFieldValue]);

  useEffect(() => {
    void fetchCourseDomain();
  }, [fetchCourseDomain]);

  return (
    <PageLoader isLoading={isLoading}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
        className="tw-w-full tw-flex tw-flex-col "
      >
        <TextInput
          className="tw-w-full"
          id="domain"
          label="Domena"
          name="domain"
          value={formik.values.domain}
          helperText={formik.touched.domain && formik.errors.domain}
          error={formik.touched.domain && Boolean(formik.errors.domain)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          appendAfterInput={
            <Button className="tw-w-min tw-h-min" type="submit" primary>
              {domain ? 'Zapisz' : 'Dodaj'}
            </Button>
          }
        />
        <Checkbox
          value={formik.values.includeWWW}
          helperText={formik.touched.includeWWW && formik.errors.includeWWW}
          error={formik.touched.includeWWW && Boolean(formik.errors.includeWWW)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          ariaLabel={`Automatycznie dodaj domenę www.${formik.values.domain} do domeny. (Zalecane)`}
          name="includeWWW"
        >
          <Typography className="tw-text-sm">
            Automatycznie dodaj domenę www.{formik.values.domain} do domeny.
            (Zalecane)
          </Typography>
        </Checkbox>
      </Box>
      {domain && (
        <>
          {domain.domainStatus === 'PENDING_VERIFICATION' && (
            <>
              <Typography className="tw-font-bold tw-mb-2">
                Zweryfikuj własność domeny
              </Typography>

              <Box className="tw-mb-4 tw-rounded-lg tw-bg-background-paper tw-p-2 tw-border tw-border-primary-light">
                <Typography>
                  {domain.certificate?.certificateVerificationDNSRecord}
                </Typography>
              </Box>
            </>
          )}
          <Typography className="tw-font-bold">
            Skonfiguruj rekordy DNS
          </Typography>
          <Typography className="tw-mb-2">
            Dodaj następujące rekordy DNS do swojej domeny:
          </Typography>
          <Box className="tw-flex tw-flex-col tw-gap-2">
            {domain.subDomains?.map((subdomain) => {
              const [hostname, type, url] = subdomain.dnsRecord!.split(' ');
              return (
                <Box
                  className="tw-rounded-lg tw-bg-background-paper tw-p-2 tw-border tw-border-primary-light tw-flex"
                  key={subdomain.dnsRecord}
                >
                  <Typography className="tw-w-full">
                    {hostname.length ? hostname : '@'} {type} {url}
                  </Typography>
                  {subdomain.verified && (
                    <span className="tw-text-green-500">
                      <CheckCircleOutlineRounded />
                    </span>
                  )}
                </Box>
              );
            })}
          </Box>
          <Box className="tw-self-center tw-mt-4 tw-flex tw-justify-center">
            <Button
              onClick={fetchCourseDomain}
              className="tw-w-fit"
              primary
              size="medium"
            >
              Odśwież
            </Button>
          </Box>
        </>
      )}
    </PageLoader>
  );
};

export default PageSettingsDomainView;
