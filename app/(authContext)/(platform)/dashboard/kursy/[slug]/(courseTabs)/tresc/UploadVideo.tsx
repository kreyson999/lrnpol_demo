'use client';
import React from 'react';

import Modal from '@/components/materialUI/Modal';
import { useModal } from '@/hooks/useModal';
import { styled } from '@mui/material/styles';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { SnackbarVariant } from '@/constants/enums';
import { UploadDataOutput, uploadData } from 'aws-amplify/storage';
import Button from '@/components/materialUI/Button';
import ProgressCircular from '@/components/materialUI/ProgressCircular';
import { useErrorState } from '@/contexts/ErrorContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { generateClient } from 'aws-amplify/api';
import { UpdateSectionStepVideo } from '@/services/graphql/course/contentSection/step/mutations';
import { useAuth } from '@/contexts/AuthContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  courseSlug: string;
  sectionId: string;
  stepId: string;
  button: React.ReactElement;
  onRefresh: () => void;
};

const UploadVideo = ({
  courseSlug,
  sectionId,
  stepId,
  button,
  onRefresh,
}: Props) => {
  const { showSnackbar } = useSnackbar();
  const setErrorMessage = useErrorState();
  const [isActionOpen, toggleAction] = useModal();
  const { user } = useAuth();

  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadDataRef = useRef<UploadDataOutput | null>(null);

  const handleUpdateStepVideo = async ({
    key,
    size,
    fileName,
  }: {
    key: string;
    size: number;
    fileName: string;
  }) => {
    try {
      const client = generateClient({ authMode: 'userPool' });

      await client.graphql({
        query: UpdateSectionStepVideo,
        variables: {
          input: {
            id: stepId,
            uploadedVideo: {
              key,
              size,
              fileName,
              identityId: user!.identityId,
            },
          },
        },
      });

      showSnackbar('Pomyślnie przesłano film!');
      onRefresh();
    } catch (error) {
      setErrorMessage('Nie udało się edytować etapu!');
    }
  };

  const onVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const targetFile = e.target.files[0];
    if (targetFile.type !== 'video/mp4') {
      setErrorMessage('Ten format filmu jest niedozwolony!');
      return;
    }

    const maxSize = 1 * 1024 * 1024 * 1024;

    if (targetFile.size > maxSize) {
      setErrorMessage('Ten plik jest za duży!');
      return;
    }

    setIsUploading(true);
    setFileName(targetFile.name);
    showSnackbar('Rozpoczęto przesyłanie filmu.', SnackbarVariant.INFO);

    const ref = uploadData({
      key: `courses/${courseSlug}/${sectionId}/${stepId}/video.mp4`,
      data: targetFile,
      options: {
        contentType: 'video/mp4',
        accessLevel: 'private',
        onProgress: (e) => {
          setProgress(
            Math.floor((e.transferredBytes / (e.totalBytes ?? 0)) * 100)
          );
        },
      },
    });
    ref.result
      .then(({ key, size }) => {
        if (!size) {
          setErrorMessage(`Nie udało się przesłać filmu!`);
          return;
        }

        void handleUpdateStepVideo({
          key,
          size,
          fileName: `${targetFile.name}`,
        });
      })
      .catch(() => {
        setErrorMessage(`Nie udało się przesłać filmu!`);
      });
    uploadDataRef.current = ref;
  };

  const handleCancelUploading = () => {
    if (!uploadDataRef.current) return;
    uploadDataRef.current.cancel();
    uploadDataRef.current = null;
    setIsUploading(false);
    setFileName('');
    setProgress(0);
    showSnackbar('Pomyślnie anulowano przesyłanie filmu!');
  };

  return (
    <>
      {React.cloneElement(button, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          toggleAction(null);
        },
      })}

      <Modal open={isActionOpen} onClose={toggleAction} title="Prześlij film">
        {isUploading ? (
          <>
            <MBox className="tw-bg-background-paper tw-rounded-lg tw-border tw-border-primary-light tw-flex tw-flex-col tw-items-center tw-py-6 tw-px-4">
              <ProgressCircular variant="determinate" value={progress} />
              <MTypography className="tw-mt-4">
                Trwa przesyłanie: {fileName}
              </MTypography>
            </MBox>
            <Button onClick={handleCancelUploading} className="tw-mt-4">
              Anuluj przesyłanie
            </Button>
          </>
        ) : (
          <MBox
            className="tw-cursor-pointer hover:tw-border-primary-main tw-bg-background-paper tw-rounded-lg tw-border tw-border-primary-light tw-flex tw-flex-col tw-items-center tw-py-6 tw-px-4"
            component="label"
            htmlFor="videoInput"
          >
            <CloudUploadIcon />
            <MTypography>Kliknij, aby przesłać!</MTypography>
            <VisuallyHiddenInput
              accept="video/mp4"
              onChange={(e) => void onVideoChange(e)}
              id="videoInput"
              type="file"
            />
          </MBox>
        )}
      </Modal>
    </>
  );
};
export default UploadVideo;
