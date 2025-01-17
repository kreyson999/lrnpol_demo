import React, { useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';

import MBox from '@mui/material/Box';
import MIconButton from '@mui/material/IconButton';
import MTypography from '@mui/material/Typography';

import Menu from '@/components/materialUI/Menu';
import ConfirmActionModal from '@/components/shared/ConfirmActionModal';
import MenuItem from '@/components/materialUI/MenuItem';
import { Question as QuestionType } from '@/constants/types/Question';
import { useErrorState } from '@/contexts/ErrorContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { generateClient } from 'aws-amplify/api';
import { deleteCourseSectionStepTestQuestion } from '@/services/graphql/mutations';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  question: QuestionType;
  onEdit: () => void;
  onRefresh: () => void;
};

const Question = ({ question, onEdit, onRefresh }: Props) => {
  const controls = useDragControls();
  const setErrorMessage = useErrorState();
  const { showSnackbar } = useSnackbar();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const toggleActionsMenu = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.stopPropagation();
    setActionsMenuAnchorEl(e ? e.currentTarget : null);
  };

  const onQuestionDelete = async (id: string) => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      await client.graphql({
        query: deleteCourseSectionStepTestQuestion,
        variables: {
          input: {
            id,
          },
        },
      });

      showSnackbar('Pomyślnie usunięto pytanie!');
      onRefresh();
    } catch (error) {
      setErrorMessage('Nie udało się usunąć tego pytania!');
    }
  };

  return (
    <Reorder.Item
      value={question}
      dragListener={false}
      dragControls={controls}
      className="tw-pl-1 tw-pr-2 tw-mt-4 tw-rounded-lg tw-border tw-border-primary-light tw-py-2 tw-bg-background-paper  tw-flex tw-justify-between tw-text-secondary-contrastText tw-items-center"
    >
      <MBox className="tw-flex tw-items-center">
        <MIconButton onPointerDown={(e) => controls.start(e)}>
          <DragIndicatorIcon className="tw-text-secondary-contrastText" />
        </MIconButton>
        <MBox className="tw-flex tw-gap-2 tw-items-center">
          <MTypography>{question.text}</MTypography>
        </MBox>
      </MBox>
      <MBox className="tw-whitespace-nowrap">
        <MIconButton
          id="actions-menu-button"
          aria-controls={actionsMenuAnchorEl ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionsMenuAnchorEl ? 'true' : undefined}
          onClick={toggleActionsMenu}
        >
          <MoreVertIcon className="tw-text-2xl" />
        </MIconButton>
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
          <MenuItem icon={<EditIcon />} onClick={onEdit}>
            <MTypography>Edytuj</MTypography>
          </MenuItem>
          <ConfirmActionModal
            e={question.id}
            callback={onQuestionDelete}
            title="Usuń pytanie"
            description="Czy na pewno chcesz usunąć to pytanie?"
            confirmButton="Usuń etap"
          >
            <MenuItem icon={<DeleteIcon />}>
              <MTypography>Usuń</MTypography>
            </MenuItem>
          </ConfirmActionModal>
        </Menu>
      </MBox>
    </Reorder.Item>
  );
};

export default Question;
