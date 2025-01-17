'use client';

import { useModal } from '@/hooks/useModal';

import Modal from '@/components/materialUI/Modal';
import Button from '@/components/materialUI/Button';
import MBox from '@mui/material/Box';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TextInput from '@/components/materialUI/TextInput';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  courseSlugs: string[];
  onSaveCourseSlugs: (courseSlugs: string[]) => void;
};

const CourseRecommendationsModal = ({
  courseSlugs,
  onSaveCourseSlugs,
}: Props) => {
  const [isActionOpen, toggleAction] = useModal();

  const [newCourseSlug, setNewCourseSlug] = useState('');

  const handleAddCourseSlug = () => {
    if (courseSlugs.includes(newCourseSlug)) return;

    if (newCourseSlug) {
      onSaveCourseSlugs([...courseSlugs, newCourseSlug]);
      setNewCourseSlug('');
    }
  };

  const handleDeleteCourseSlug = (slug: string) => {
    onSaveCourseSlugs(courseSlugs.filter((s) => s !== slug));
  };

  return (
    <>
      <Button onClick={toggleAction} primary>
        Edytuj rekomendację
      </Button>
      <Modal
        open={isActionOpen}
        onClose={toggleAction}
        title="Edytuj rekomendację"
      >
        <MBox onClick={(e) => e.stopPropagation()}>
          <MBox className="tw-mb-4 tw-flex tw-flex-col ">
            <TextInput
              id="add-slug"
              label="Slug kursu"
              value={newCourseSlug}
              onChange={(e) => setNewCourseSlug(e.target.value)}
              appendAfterInput={
                <IconButton onClick={handleAddCourseSlug}>
                  <AddIcon />
                </IconButton>
              }
            />
          </MBox>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="tw-text-primary-contrastText"
                    align="left"
                  >
                    Nr.
                  </TableCell>
                  <TableCell
                    className="tw-text-primary-contrastText"
                    align="left"
                  >
                    Slug kursu
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseSlugs.map((slug, index) => (
                  <TableRow
                    key={slug}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      align="left"
                      className="tw-text-primary-contrastText"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="tw-text-primary-contrastText"
                    >
                      {slug}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="tw-text-primary-contrastText"
                    >
                      <IconButton onClick={() => handleDeleteCourseSlug(slug)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MBox>
      </Modal>
    </>
  );
};

export default CourseRecommendationsModal;
