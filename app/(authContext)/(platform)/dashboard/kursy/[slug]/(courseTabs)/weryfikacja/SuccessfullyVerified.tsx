import React from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';

const SuccessfullyVerified = () => {
  return (
    <MBox className="tw-flex tw-flex-col tw-w-full">
      <MBox className="tw-w-full tw-flex tw-flex-col tw-bg-background-paper tw-p-4 tw-rounded-lg tw-border-primary-light tw-border">
        <MTypography className="tw-text-xl tw-font-bold tw-mb-4 tw-text-left ">
          Pomyślnie zweryfikowano
        </MTypography>

        <MTypography className="tw-mb-4">
          Twój kurs został pomyślnie zweryfikowany.
        </MTypography>
        <MTypography className="tw-mb-4">
          Od teraz jest już dostępny dla innych użytkowników pod adresem:{' '}
          <a>adres</a>. Umieścimy go na stronie głównej naszej platformy oraz
          dodamy go do sekcji polecane kursy w podobnych kursach. Zachęcamy Cię
          również do samodzielnej promocji, chociażby w mediach
          społecznościowych.
        </MTypography>
        <MTypography>Życzymy wysokich wyników sprzedażowych.</MTypography>
      </MBox>
    </MBox>
  );
};

export default SuccessfullyVerified;
