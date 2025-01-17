'use client';

import React from 'react';
import MStepper from '@mui/material/Stepper';
import MStep from '@mui/material/Step';
import MStepLabel from '@mui/material/StepLabel';
import MStepConnector from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import { StepIconProps } from '@mui/material/StepIcon';

type Props = {
  activeStep: number;
  steps: Array<{
    title: string;
    icon: React.JSX.Element;
  }>;
};

const StepConnecter = () => {
  return (
    <MStepConnector
      classes={{
        root: '-tw-left-1/2 tw-right-1/2 tw-top-3.5',
        line: 'tw-border-2 tw-border-primary-light',
      }}
      sx={(theme) => ({
        ['&.Mui-active .MuiStepConnector-line']: {
          borderColor: `${theme.palette.primary.main} !important`,
        },
        ['&.Mui-completed .MuiStepConnector-line']: {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      })}
    />
  );
};

const StepIcon = ({ icon, completed, active }: StepIconProps) => {
  return (
    <Box
      className={`${
        completed ? 'tw-bg-primary-main' : ' tw-bg-primary-light'
      } tw-grid tw-p-1 tw-rounded-full `}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: completed
          ? 'tw-text-primary-contrastText'
          : active
          ? 'tw-text-primary-contrastText'
          : 'tw-text-secondary-contrastText',
      })}
    </Box>
  );
};

const Stepper = ({ activeStep, steps }: Props) => {
  return (
    <MStepper
      classes={{
        root: 'tw-w-full',
      }}
      activeStep={activeStep}
      alternativeLabel
      connector={<StepConnecter />}
    >
      {steps.map((step, index) => (
        <MStep key={`step_${index}}`}>
          <MStepLabel
            StepIconComponent={(props: StepIconProps) =>
              StepIcon({ ...props, icon: step.icon })
            }
            classes={{
              iconContainer: 'tw-z-50',
              active: 'tw-text-primary-contrastText',
              completed: 'tw-text-primary-contrastText',
            }}
            sx={(theme) => ({
              ['& .MuiStepIcon-root']: {
                color: theme.palette.primary.light,
                ['&.Mui-completed']: {
                  color: `${theme.palette.primary.main} !important`,
                },
              },
            })}
          >
            {step.title}
          </MStepLabel>
        </MStep>
      ))}
    </MStepper>
  );
};

export default Stepper;
