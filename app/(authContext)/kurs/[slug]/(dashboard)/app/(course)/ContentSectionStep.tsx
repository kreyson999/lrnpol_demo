import Link from 'next/link';
import React from 'react';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import { getFormattedDuration } from '@/helpers/getFormattedDuration';
import { useParams } from 'next/navigation';
import { CourseSectionStepType } from '@/services/API';
import { StepTypeIcons } from '@/constants/StepTypeIcons';

import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';

type Props = {
  id: string;
  title: string;
  type: CourseSectionStepType;
  videoDuration: number;
  progressDuration: number;
  isSectionCompleted: boolean;
};

const ContentSectionStep = ({
  id,
  title,
  type,
  videoDuration,
}: // progressDuration,
Props) => {
  const params = useParams<{ slug: string; stepId: string }>();

  return (
    <Link href={`/app/etap/${id}`} key={id}>
      <MBox
        className={` tw-border-t tw-border-primary-light tw-flex tw-flex-col tw-justify-center tw-text-secondary-contrastText`}
      >
        <MBox className="tw-pl-4 tw-pr-2 tw-pt-2 tw-pb-1 tw-flex tw-gap-2 tw-items-center">
          {StepTypeIcons[type]}
          <MBox className="tw-flex tw-flex-col tw-justify-center tw-min-h-[44px] ">
            <MTypography
              className={`tw-text-sm tw-line-clamp-1 ${
                params.stepId === id ? 'tw-text-primary-main' : ''
              }`}
            >
              {title}
            </MTypography>
            {videoDuration ? (
              <MTypography
                sx={{
                  fontSize: '0.65rem',
                }}
                className="tw-whitespace-nowrap tw-flex tw-items-center"
              >
                {getFormattedDuration(videoDuration)}
                <ScheduleRoundedIcon className="tw-text-sm tw-ml-1" />
              </MTypography>
            ) : null}
          </MBox>
        </MBox>
        {/* <MBox
          sx={{
            width: `${getStepProgress(progressDuration, videoDuration)}%`,
          }}
          className="tw-h-0.5 tw-bg-green-600"
        /> */}
      </MBox>
    </Link>
  );
};

export default ContentSectionStep;
