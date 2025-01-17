import React from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import { getFormattedDuration } from '@/helpers/getFormattedDuration';
import { CourseSectionStepType } from '@/services/API';
import { StepTypeIcons } from '@/constants/StepTypeIcons';

import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

type Props = {
  title: string;
  type: CourseSectionStepType;
  videoDuration: number;
  questionsNumber: number;
  stepBackgroundColor: string;
  stepTextColor: string;
  stepIconColor: string;
  stepDurationColor: string;
  stepsDividerColor: string;
};

const ContentSectionStep = ({
  title,
  type,
  videoDuration,
  questionsNumber,
  ...styles
}: Props) => {
  return (
    <MBox
      sx={{
        borderColor: styles.stepsDividerColor,
        backgroundColor: styles.stepBackgroundColor,
      }}
      className={`tw-px-4 tw-border-t tw-min-h-[61px]  tw-py-2 tw-flex tw-justify-between tw-items-center`}
    >
      <MBox className="tw-flex tw-gap-2 tw-items-center">
        {React.cloneElement(StepTypeIcons[type] as React.ReactElement, {
          style: {
            color: styles.stepIconColor,
          },
        })}
        <MBox className="tw-flex tw-flex-col">
          <MTypography
            sx={{
              color: styles.stepTextColor,
            }}
            className="tw-text-sm tw-line-clamp-1	"
          >
            {title}
          </MTypography>
          {(videoDuration || questionsNumber > 0) && (
            <MTypography
              sx={{
                color: styles.stepDurationColor,
                fontSize: '0.65rem',
              }}
              className="tw-whitespace-nowrap tw-flex tw-items-center"
            >
              {type === CourseSectionStepType.VIDEO
                ? getFormattedDuration(videoDuration)
                : `Pytań: ${questionsNumber}`}
              {type === CourseSectionStepType.VIDEO ? (
                <ScheduleRoundedIcon className="tw-text-sm tw-ml-1" />
              ) : (
                <HelpRoundedIcon className="tw-text-sm tw-ml-1" />
              )}
            </MTypography>
          )}
        </MBox>
      </MBox>
    </MBox>
  );
};

export default ContentSectionStep;
