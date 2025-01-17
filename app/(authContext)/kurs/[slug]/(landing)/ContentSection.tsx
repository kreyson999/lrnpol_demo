import React from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import MAccordion from '@mui/material/Accordion';
import MAccordionDetails from '@mui/material/AccordionDetails';
import MAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
type Props = {
  sectionTitleBackgroundColor: string;
  sectionTitleTextColor: string;
  sectionArrowTextColor: string;
  sectionBorderColor: string;
  index: number;
  title: string;
  length: number;
  children: React.ReactNode;
};

const ContentSection = ({ index, title, children, length, ...rest }: Props) => {
  const getLengthTitle = () => {
    if (length === 0 || length >= 5) {
      return 'etapów';
    }
    if (length === 1) {
      return 'etap';
    }
    return 'etapy';
  };

  return (
    <MAccordion
      elevation={0}
      disableGutters
      defaultExpanded={index === 1}
      sx={{
        borderColor: rest.sectionBorderColor,
      }}
      classes={{
        root: `tw-relative tw-inline-block before:tw-h-0 tw-rounded-lg tw-border-2 tw-overflow-hidden tw-bg-transparent`,
      }}
    >
      <MAccordionSummary
        sx={{
          backgroundColor: rest.sectionTitleBackgroundColor,
        }}
        classes={{
          root: ``,
          content: 'tw-flex tw-items-center tw-justify-between tw-my-0 tw-py-4',
        }}
      >
        <MBox className={`tw-flex tw-items-center`}>
          <MBox sx={{ color: rest.sectionArrowTextColor }}>
            <ExpandMoreIcon className="tw-grid tw-place-content-center" />
          </MBox>
          <MTypography
            sx={{ color: rest.sectionTitleTextColor }}
            className="tw-ml-2 tw-text-base tw-font-semibold tw-line-clamp-1"
          >
            {index}. {title}
          </MTypography>
        </MBox>
        <MTypography
          sx={{ color: rest.sectionArrowTextColor }}
          className="tw-whitespace-nowrap"
        >
          {length} {getLengthTitle()}
        </MTypography>
      </MAccordionSummary>
      <MAccordionDetails
        classes={{
          root: 'tw-px-0 tw-pt-0 tw-pb-0',
        }}
      >
        {children}
      </MAccordionDetails>
    </MAccordion>
  );
};

export default ContentSection;
