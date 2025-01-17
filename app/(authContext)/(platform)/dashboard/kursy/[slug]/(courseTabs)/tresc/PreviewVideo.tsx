'use client';

import Modal from '@/components/materialUI/Modal';
import MBox from '@mui/material/Box';
import MTypography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useErrorState } from '@/contexts/ErrorContext';
import ReactPlayer from 'react-player';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PageLoader from '@/components/shared/PageLoader';
import { useModal } from '@/hooks/useModal';
import UploadVideo from './UploadVideo';
import { useParams } from 'next/navigation';
import { ChangeCircleRounded } from '@mui/icons-material';
import axios from 'axios';

type Props = {
  stepName: string;
  fileName: string;
  sectionId: string;
  stepId: string;
  onRefresh: () => void;
};

const PreviewVideo = ({
  stepName,
  fileName,
  sectionId,
  stepId,
  onRefresh,
}: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const setErrorMessage = useErrorState();
  const [isModalOpen, toggleModal] = useModal();

  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetVideoUrl = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ videoUrl: string }>(
        `/api/courses/${slug}/sections/${sectionId}/steps/${stepId}/video`
      );

      setUrl(response.data.videoUrl);
      setIsLoading(false);
    } catch (e) {
      setErrorMessage('Nie udało się pobrać filmu!');
    }
  }, [sectionId, slug, stepId, setErrorMessage]);

  useEffect(() => {
    if (isModalOpen) {
      void handleGetVideoUrl();
    }
  }, [handleGetVideoUrl, isModalOpen]);

  return (
    <>
      <MBox
        onClick={() => toggleModal(null)}
        className="tw-max-w-28  tw-relative tw-px-2 tw-bg-background-paper tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center hover:tw-border-primary-main tw-border  tw-border-primary-light  tw-h-16 tw-aspect-video tw-rounded-lg"
      >
        <UploadVideo
          courseSlug={slug}
          sectionId={sectionId}
          stepId={stepId}
          onRefresh={onRefresh}
          button={
            <MBox className="tw-absolute -tw-top-2 -tw-right-2 tw-rounded-full tw-bg-background-paper tw-p-1 tw-cursor-pointer tw-border tw-border-primary-light hover:tw-border-primary-main">
              <ChangeCircleRounded />
            </MBox>
          }
        />
        <PlayCircleRoundedIcon />
        <MTypography className="tw-w-full tw-text-xs tw-truncate tw-mt-1">
          {fileName}
        </MTypography>
      </MBox>
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        title={`Etap: ${stepName}`}
      >
        <PageLoader isLoading={isLoading}>
          <MBox className="tw-flex tw-justify-center">
            {url && <ReactPlayer controls width={540} height={270} url={url} />}
          </MBox>
        </PageLoader>
      </Modal>
    </>
  );
};
export default PreviewVideo;
