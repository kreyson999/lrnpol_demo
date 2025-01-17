import React, { useState } from 'react';

import { CourseSectionStepType } from '@/services/API';

import IconButton from '@mui/material/IconButton';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import { DashboardCourseSectionStep } from '@/services/graphql/course/contentSection/types';
import ConfirmActionModal from '@/components/shared/ConfirmActionModal';
import { Reorder, useDragControls } from 'framer-motion';
import Menu from '@/components/materialUI/Menu';
import MenuItem from '@/components/materialUI/MenuItem';
import { StepTypeIcons } from '@/constants/StepTypeIcons';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import UploadVideo from './UploadVideo';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PreviewVideo from './PreviewVideo';
import UploadIcon from '@mui/icons-material/Upload';

type Props = {
  courseSlug: string;
  sectionId: string;
  step: DashboardCourseSectionStep;
  onStepUpdate: (id: string, title: string) => void;
  onRefresh: () => void;
  onStepDelete: (stepId: string) => Promise<void>;
};

const ContentStep = ({
  step,
  sectionId,
  onStepDelete,
  onStepUpdate,
  onRefresh,
}: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const controls = useDragControls();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const toggleActionsMenu = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.stopPropagation();
    setActionsMenuAnchorEl(e ? e.currentTarget : null);
  };

  const getStepVideoPreview = () => {
    if (step.uploadedVideo?.key) {
      return (
        <PreviewVideo
          fileName={step.uploadedVideo.fileName}
          stepName={step.title}
          sectionId={sectionId}
          stepId={step.id}
          onRefresh={onRefresh}
        />
      );
    }
    return (
      <UploadVideo
        courseSlug={slug}
        sectionId={sectionId}
        stepId={step.id}
        onRefresh={onRefresh}
        button={
          <MBox className="tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center hover:tw-border-primary-main tw-border  tw-border-primary-light tw-bg-background-paper tw-h-16 tw-aspect-video tw-rounded-lg">
            <UploadIcon />
            <MTypography className="tw-text-xs">Prześlij film</MTypography>
          </MBox>
        }
      />
    );
  };

  return (
    <Reorder.Item
      value={step}
      dragListener={false}
      dragControls={controls}
      className="tw-pl-1 tw-pr-2 tw-py-1 tw-border-t tw-border-primary-light tw-flex tw-justify-between tw-text-secondary-contrastText "
    >
      <MBox className="tw-flex tw-items-start">
        <IconButton onPointerDown={(e) => controls.start(e)}>
          <DragIndicatorIcon className="tw-text-secondary-contrastText" />
        </IconButton>
        <MBox className="tw-flex tw-flex-col tw-gap-2 tw-py-2">
          <MBox className="tw-flex tw-gap-2 tw-items-center">
            {StepTypeIcons[step.type]}
            <MTypography className="tw-text-sm tw-line-clamp-1	">
              {step.title}
            </MTypography>
          </MBox>
          <MBox>
            {step.type === CourseSectionStepType.VIDEO && getStepVideoPreview()}
            {step.type === CourseSectionStepType.TEST && (
              <Link
                href={`tresc/etap/${step.id}/test/${step.courseSectionStepCourseSectionStepTestId}`}
              >
                <MBox className="tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center hover:tw-border-primary-main tw-border  tw-border-primary-light tw-bg-background-paper tw-h-16 tw-aspect-video tw-rounded-lg">
                  <EditIcon />
                  <MTypography className="tw-text-xs">Edytuj test</MTypography>
                </MBox>
              </Link>
            )}
          </MBox>
        </MBox>
      </MBox>
      <MBox className="tw-whitespace-nowrap">
        <IconButton
          id="actions-menu-button"
          aria-controls={actionsMenuAnchorEl ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionsMenuAnchorEl ? 'true' : undefined}
          onClick={toggleActionsMenu}
        >
          <MoreVertIcon className="tw-text-2xl" />
        </IconButton>
        <Menu
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={actionsMenuAnchorEl}
          onClose={toggleActionsMenu}
          id="actions-menu"
          buttonId="actions-menu-button"
        >
          <MenuItem
            onClick={() => onStepUpdate(step.id, step.title)}
            icon={<EditIcon />}
          >
            <Typography>Edytuj</Typography>
          </MenuItem>
          <ConfirmActionModal
            e={step.id}
            callback={onStepDelete}
            title="Usuń etap"
            description="Czy na pewno chcesz usunąć ten etap?"
            confirmButton="Usuń etap"
          >
            <MenuItem icon={<DeleteIcon />}>
              <Typography>Usuń</Typography>
            </MenuItem>
          </ConfirmActionModal>
        </Menu>
      </MBox>
    </Reorder.Item>
  );
};

export default ContentStep;
