import React, { useState } from 'react';

import * as mutations from '@/services/graphql/mutations';

import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Reorder, useDragControls } from 'framer-motion';
import {
  DashboardCourseSections,
  DashboardCourseSectionStep,
} from '@/services/graphql/course/contentSection/types';
import ConfirmActionModal from '@/components/shared/ConfirmActionModal';
import {
  DeleteCourseSectionInput,
  DeleteCourseSectionStepInput,
  UpdateCourseSectionStepInput,
} from '@/services/API';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useErrorState } from '@/contexts/ErrorContext';
import ContentStep from './ContentStep';
import IconButton from '@mui/material/IconButton';
import {
  DeleteSectionStep,
  UpdateSectionStep,
} from '@/services/graphql/course/contentSection/step/mutations';
import Menu from '@/components/materialUI/Menu';
import MenuItem from '@/components/materialUI/MenuItem';
import { generateClient } from 'aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useModal } from '@/hooks/useModal';
import StepModal from './StepModal';

type Props = {
  courseSlug: string;
  index: number;
  value: DashboardCourseSections;
  updateStepsPositions: (
    sectionId: string,
    steps: DashboardCourseSectionStep[]
  ) => void;
  toggleSectionModal: (
    e: React.MouseEvent<HTMLButtonElement> | null,
    state?: { id?: string; title?: string; position?: number }
  ) => void;
  refreshAllSections: () => void;
};

const ContentSection = ({
  index,
  value,
  courseSlug,
  refreshAllSections,
  updateStepsPositions,
  toggleSectionModal,
}: Props) => {
  const [isStepModalOpen, toggleStepModal, stepModalState] = useModal<{
    sectionId: string;
    nextStepPosition: number;
    id?: string;
    title?: string;
  }>({
    sectionId: value.id,
    nextStepPosition: value.courseSectionSteps?.items?.length ?? 0,
  });

  const controls = useDragControls();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const toggleActionsMenu = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.stopPropagation();
    setActionsMenuAnchorEl(e ? e.currentTarget : null);
  };

  const steps =
    (value.courseSectionSteps?.items as DashboardCourseSectionStep[]) ?? [];

  const handleDeleteSection = async (id: string) => {
    try {
      const client = generateClient({ authMode: 'userPool' });
      const input: DeleteCourseSectionInput = {
        id,
      };

      await client.graphql({
        query: mutations.deleteCourseSection,
        variables: { input },
      });
      showSnackbar('Pomyślnie usunięto sekcje!');
      refreshAllSections();
    } catch (errors) {
      console.error('CONTENT SECTION DELETE: ', errors);
      setErrorMessage('Nie udało się usunąć sekcji!');
    }
  };

  const handleDeleteStep = async (id: string) => {
    try {
      const client = generateClient({ authMode: 'oidc' });
      const input: DeleteCourseSectionStepInput = {
        id,
      };

      await client.graphql({
        query: DeleteSectionStep,
        variables: { input },
      });
      showSnackbar('Pomyślnie usunięto etap!');
      refreshAllSections();
    } catch (errors) {
      console.error('CONTENT SECTION STEP DELETE: ', errors);
      setErrorMessage('Nie udało się usunąc etapu!');
    }
  };

  const handleUpdateStep = async (section: UpdateCourseSectionStepInput) => {
    const client = generateClient({ authMode: 'userPool' });

    const input: UpdateCourseSectionStepInput = {
      id: section.id,
      position: section.position,
    };
    await client.graphql({
      query: UpdateSectionStep,
      variables: { input },
    });
  };

  const handleUpdateStepsPosition = (
    updatedSteps: DashboardCourseSectionStep[]
  ) => {
    const changedSteps: { id: string; position: number }[] = [];
    updatedSteps
      .filter((step) => step !== null)
      .forEach((step, index) => {
        if (step.id !== steps[index].id) {
          changedSteps.push({ id: step.id, position: index });
        }
      });

    Promise.all(changedSteps.map(handleUpdateStep))
      .then(() => {
        showSnackbar('Pomyślnie zaktualizowano pozycje sekcji.');
      })
      .catch((error) => {
        console.error(error);
      });

    updateStepsPositions(value.id, updatedSteps);
  };

  return (
    <>
      <StepModal
        isOpen={isStepModalOpen}
        {...stepModalState}
        refreshAllSections={refreshAllSections}
        onClose={() => toggleStepModal(null)}
      />
      <Reorder.Item
        className="tw-w-full tw-flex tw-flex-col tw-mb-2"
        value={value}
        dragListener={false}
        dragControls={controls}
      >
        <Accordion
          defaultExpanded={true}
          elevation={0}
          disableGutters
          classes={{
            root: `tw-relative tw-inline-block before:tw-h-0 tw-rounded-lg tw-border tw-border-primary-light  tw-bg-transparent`,
          }}
        >
          <AccordionSummary
            classes={{
              root: 'tw-bg-background-paper tw-text-white tw-rounded-lg tw-pl-1 tw-pr-2 ',
              content:
                'tw-flex tw-items-center tw-justify-between tw-my-0  tw-py-2',
            }}
          >
            <MBox className="tw-flex tw-items-center">
              <IconButton onPointerDown={(e) => controls.start(e)}>
                <DragIndicatorIcon className="tw-text-secondary-contrastText" />
              </IconButton>
              <ExpandMoreIcon className="tw-grid tw-place-content-center" />
              <MTypography className="tw-ml-2 tw-text-base tw-font-semibold tw-line-clamp-1">
                {index}. {value.title}
              </MTypography>
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
                  icon={<EditIcon />}
                  onClick={() =>
                    toggleSectionModal(null, {
                      id: value.id,
                      title: value.title,
                      position: index,
                    })
                  }
                >
                  Edytuj
                </MenuItem>
                <ConfirmActionModal
                  e={value.id}
                  callback={handleDeleteSection}
                  title="Usuń sekcje"
                  description="Czy na pewno chcesz usunąć tą sekcję?"
                  confirmButton="Usuń sekcję"
                >
                  <MenuItem icon={<DeleteIcon />}>Usuń</MenuItem>
                </ConfirmActionModal>
              </Menu>
            </MBox>
          </AccordionSummary>
          <AccordionDetails
            classes={{
              root: 'tw-px-0 tw-pt-0 tw-pb-0',
            }}
          >
            {steps ? (
              <Reorder.Group
                values={steps}
                onReorder={handleUpdateStepsPosition}
              >
                {steps.map((item) => (
                  <ContentStep
                    key={item.id}
                    step={item}
                    courseSlug={courseSlug}
                    sectionId={value.id}
                    onStepUpdate={(id, title) =>
                      toggleStepModal(null, {
                        sectionId: value.id,
                        nextStepPosition: steps.length,
                        id,
                        title,
                      })
                    }
                    onRefresh={refreshAllSections}
                    onStepDelete={handleDeleteStep}
                  />
                ))}
              </Reorder.Group>
            ) : (
              <MTypography className="tw-border-t tw-border-primary-light  tw-text-secondary-contrastText  tw-px-4 tw-py-4">
                Ta sekcja jest pusta!
              </MTypography>
            )}
          </AccordionDetails>
          <MBox className="tw-border-t tw-border-primary-light tw-flex tw-justify-start tw-px-2 tw-py-2">
            <Button
              onClick={() => toggleStepModal(null)}
              className="tw-rounded-lg tw-text-primary-main"
            >
              <AddIcon />
              <Typography className="tw-ml-2 tw-normal-case">
                Dodaj etap
              </Typography>
            </Button>
          </MBox>
        </Accordion>
      </Reorder.Item>
    </>
  );
};

export default ContentSection;
