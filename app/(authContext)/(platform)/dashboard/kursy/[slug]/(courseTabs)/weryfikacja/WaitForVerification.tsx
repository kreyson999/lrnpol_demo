import React, { useState } from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import Button from '@/components/materialUI/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useErrorState } from '@/contexts/ErrorContext';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { CourseVerification } from '@/services/graphql/course/verifications/types';
import { CourseVerificationStatus } from '@/services/API';

type Props = {
  verification: CourseVerification | null;
  refreshVerification: () => void;
};

const WaitForVerification = ({ verification, refreshVerification }: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const setErrorMessage = useErrorState();

  const handleRequestVerification = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await axios.post(`/api/courses/${slug}/verifications`);

      showSnackbar('Pomyślnie poproszono o weryfikację');
      refreshVerification();
    } catch (error) {
      setErrorMessage('Nie udało się poprosić o weryfikację');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MBox className="tw-flex tw-flex-col tw-w-full">
      <MBox className="tw-w-full tw-flex tw-flex-col tw-bg-background-paper tw-p-4 tw-rounded-lg tw-border-primary-light tw-border">
        <MTypography className="tw-text-xl tw-font-bold tw-mb-4 tw-text-left ">
          Stan weryfikacji
        </MTypography>
        {verification === null ? (
          <MTypography>
            Prośba o weryfikację nie została jeszcze wysłana. Kliknij poniżej,
            aby to zrobić.
          </MTypography>
        ) : (
          <MBox className="tw-w-full">
            <MTypography className="tw-mb-2">
              Status:{' '}
              <span className="tw-font-semibold tw-text-primary-main">
                {verification?.status}
              </span>
            </MTypography>
            <MTypography>
              {verification.status === CourseVerificationStatus.NOT_SUITABLE
                ? verification?.message
                : 'Twój kurs czeka na weryfikację. Nasz zespół sprawdzi go w ciągu 48 godzin, a jeśli spełni wszystkie wymagania, zostanie opublikowany.'}
            </MTypography>
          </MBox>
        )}

        {(!verification ||
          verification.status === CourseVerificationStatus.NOT_SUITABLE) && (
          <MBox>
            <Button
              isLoading={isLoading}
              onClick={handleRequestVerification}
              className="tw-w-fit tw-mt-8"
              primary
            >
              Poproś o weryfikację
            </Button>
          </MBox>
        )}
      </MBox>
    </MBox>
  );
};

export default WaitForVerification;
