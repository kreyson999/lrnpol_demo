import React from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

type Props = {
  index: number;
  title: string;
  length: number;
  isCompleted: boolean;
  children: React.ReactNode;
};

const ContentSection = ({
  index,
  title,
  children,
  // length,
  isCompleted,
}: Props) => {
  return (
    <Accordion
      elevation={0}
      disableGutters
      classes={{
        root: `tw-relative tw-inline-block before:tw-h-0 tw-rounded-none tw-border-b ${
          isCompleted
            ? 'tw-border-green-400 tw-bg-green-900'
            : 'tw-border-primary-light tw-bg-transparent'
        }`,
      }}
      defaultExpanded={true}
    >
      <AccordionSummary
        classes={{
          root: 'tw-bg-background-paper tw-text-white',
          content: 'tw-flex tw-items-center tw-justify-between tw-my-0 tw-py-4',
        }}
      >
        <MBox className={`tw-flex tw-items-center`}>
          <ExpandMoreRoundedIcon className="tw-grid tw-place-content-center" />
          <MTypography className="tw-ml-2 tw-text-base tw-font-semibold tw-line-clamp-1">
            {index}. {title}
          </MTypography>
        </MBox>
        {/* <MTypography className="tw-whitespace-nowrap">
          {length} etap
        </MTypography> */}
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: 'tw-px-0 tw-pt-0 tw-pb-0',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default ContentSection;
