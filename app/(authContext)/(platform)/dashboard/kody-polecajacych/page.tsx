'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useErrorState } from '@/contexts/ErrorContext';

import MTypography from '@mui/material/Typography';
import PageLoader from '@/components/shared/PageLoader';
import MBox from '@mui/material/Box';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { getReferralCodes } from '@/services/api/referral-code';
// import type { ReferralCode } from '@/services/api/referral-code/types';

const InstructorDashboardCourses = () => {
  const setErrorMessage = useErrorState();

  const [isLoading, setIsLoading] = useState(false);
  // const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);

  const fetchReferralCodes = useCallback(() => {
    try {
      // const referralCodes = await getReferralCodes();
      // setReferralCodes(referralCodes);
    } catch (errors) {
      console.error(errors);
      setErrorMessage(errors as string);
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage]);

  useEffect(() => {
    setIsLoading(true);
    void fetchReferralCodes();
  }, [fetchReferralCodes]);

  return (
    <>
      <MBox className="tw-flex tw-justify-between tw-items-center md:tw-items-start tw-mx-4 tw-gap-4 tw-my-4 md:tw-mt-0 md:tw-ml-0">
        <MTypography className="tw-text-xl tw-font-semibold tw-uppercase">
          Kody polecającego
        </MTypography>
      </MBox>
      <PageLoader isLoading={isLoading}>
        <MBox className="tw-flex tw-flex-col tw-gap-4 tw-px-4  tw-mb-16 md:tw-pl-0">
          {/* {referralCodes.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tw-text-primary-contrastText">
                      Kod polecającego
                    </TableCell>
                    <TableCell
                      className="tw-text-primary-contrastText"
                      align="right"
                    >
                      Zaproszonych
                    </TableCell>
                    <TableCell
                      className="tw-text-primary-contrastText"
                      align="right"
                    >
                      Aktualnie zarobione
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referralCodes.map((code) => (
                    <TableRow
                      key={code.code}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        className="tw-text-primary-contrastText"
                        component="th"
                        scope="row"
                      >
                        {code.code}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="tw-text-primary-contrastText"
                      >
                        {code.orders?.items.length}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="tw-text-primary-contrastText"
                      >
                        {code.orders?.items.length * 10} zł
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <MTypography>
              Nie ma jeszcze żadnych kodów polecających!
            </MTypography>
          )} */}
        </MBox>
      </PageLoader>
    </>
  );
};

export default InstructorDashboardCourses;
