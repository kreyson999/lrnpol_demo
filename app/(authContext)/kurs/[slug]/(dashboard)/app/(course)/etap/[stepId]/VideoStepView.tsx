import React, { useCallback, useEffect, useRef, useState } from 'react';

import MBox from '@mui/material/Box';

import { OnProgressProps } from 'react-player/base';

import VideoPlayer from './VideoPlayer';
import PlayerControls from './PlayerControls';
import PlayerControlsSlider from './PlayerControlsSlider';
import useFullscreen from '@/hooks/useFullscreen';
import { StepProgressData } from '@/constants/types/StepProgressData';
import { UserCourseStepProgress } from '@/constants/types/UserCourseProgress';
import { GetCourseSectionStepWithVideoAndProgressQuery } from '@/services/API';
import CoursesService from '@/services/api/CourseService';
import { useParams, usePathname } from 'next/navigation';

type Props = {
  userProgress: UserCourseStepProgress | null;
  step: NonNullable<
    GetCourseSectionStepWithVideoAndProgressQuery['getCourseSectionStep']
  >;
};

const VideoStepView = ({ userProgress, step }: Props) => {
  const params = useParams();
  const pathname = usePathname();

  const {
    fullscreenElementRef,
    isFullscreenOpen,
    onFullscreenEnter,
    onFullscreenExit,
  } = useFullscreen();

  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [seekingPercent, setSeekingPercent] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [arePlayerControlsVisible, setArePlayerControlsVisible] =
    useState(false);

  const [selectedQuality, setSelectedQuality] = useState(1);

  const [qualities, setQualities] = useState<number[]>([]);

  const playerControlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playedSecondsRef = useRef(0);

  const onPlayerProgress = (e: OnProgressProps) => {
    setPlayedSeconds(e.playedSeconds);
    playedSecondsRef.current = e.playedSeconds;
  };

  const handleToggleIsPlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  const onQualityChange = (level: number) => {
    setSelectedQuality(level);
  };

  const onSeeking = (percent: number) => {
    setSeekingPercent(percent);
  };

  const handleKeepPlayerControlsVisible = () => {
    setArePlayerControlsVisible(true);
    if (playerControlTimeoutRef.current !== null) {
      clearTimeout(playerControlTimeoutRef.current);
    }
    const timeout = setTimeout(() => {
      setArePlayerControlsVisible(false);
    }, 5000);
    playerControlTimeoutRef.current = timeout;
  };

  const onVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handleSetQualities = (videoQualities: number[]) => {
    setQualities(videoQualities);
  };

  const handleChangeIsPlaying = (value: boolean): void => {
    setIsPlaying(value);
  };

  const getUserProgressData = useCallback(() => {
    if (!step || playedSecondsRef.current === 0) return null;

    const data: StepProgressData = {
      stepId: step.id,
      durationInMs: Math.floor(playedSecondsRef.current * 1000),
    };

    if (userProgress) {
      data.userCourseStepProgressId = userProgress.id;
    }

    return data;
  }, [step, userProgress]);

  const handleSaveUserProgress = useCallback(async () => {
    const data = getUserProgressData();

    if (!data) return;

    await CoursesService.course(String(params.slug))
      .steps()
      .step(String(params.stepId))
      .progress()
      .update(data);
  }, [getUserProgressData, params.slug, params.stepId]);

  useEffect(() => {
    if (!seekingPercent || !step) return;

    setPlayedSeconds(
      (step.courseSectionStepVideo!.duration * seekingPercent) / 1000
    );
  }, [seekingPercent, step]);

  useEffect(() => {
    const saveUserProgress = () => {
      if (document.visibilityState === 'hidden') {
        const data = getUserProgressData();

        if (!data) return;

        CoursesService.course(String(params.slug))
          .steps()
          .step(String(params.stepId))
          .progress()
          .updateAsBeacon(data);
      }
    };

    document.addEventListener('beforeunload', saveUserProgress);
    document.addEventListener('visibilitychange', saveUserProgress);

    return () => {
      document.removeEventListener('beforeunload', saveUserProgress);
      document.removeEventListener('visibilitychange', saveUserProgress);
    };
  }, [getUserProgressData, params.slug, params.stepId]);

  useEffect(() => {
    return () => {
      void handleSaveUserProgress();
    };
  }, [pathname, handleSaveUserProgress]);

  return (
    <MBox
      className="tw-grow tw-w-full tw-overflow-hidden tw-bg-black tw-flex tw-flex-col"
      onClick={handleKeepPlayerControlsVisible}
      onMouseMove={handleKeepPlayerControlsVisible}
      onPointerMove={handleKeepPlayerControlsVisible}
    >
      <div
        className="md:tw-grow tw-flex tw-flex-col"
        ref={fullscreenElementRef}
      >
        <MBox className="tw-relative md:tw-grow tw-flex tw-flex-col md:tw-justify-center md:tw-items-center">
          {step.courseSectionStepVideo!.url!.url && (
            <VideoPlayer
              initialSeconds={userProgress ? userProgress.durationInMs : null}
              isFullScreenOpen={isFullscreenOpen}
              seekingPercent={seekingPercent}
              volume={volume}
              selectedQuality={selectedQuality}
              url={step.courseSectionStepVideo!.url!.url}
              isPlaying={isPlaying}
              onPlayerProgress={onPlayerProgress}
              onPlayerEnded={() => void handleSaveUserProgress()}
              handleSetQualities={handleSetQualities}
              handleChangeIsPlaying={handleChangeIsPlaying}
            />
          )}
          <MBox
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying((state) => !state);
            }}
            sx={{
              background: arePlayerControlsVisible
                ? 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)'
                : 'transparent',
            }}
            className="tw-absolute tw-transition-all tw-grow tw-left-0 tw-top-0 tw-right-0 tw-bottom-0 tw-flex tw-flex-col tw-justify-end md:tw-items-center"
          >
            {arePlayerControlsVisible && (
              <PlayerControls
                volume={volume}
                qualities={qualities}
                isPlaying={isPlaying}
                isFullscreenOpen={isFullscreenOpen}
                onFullscreenEnter={onFullscreenEnter}
                onFullscreenExit={onFullscreenExit}
                onPlay={handleToggleIsPlaying}
                onVolumeChange={onVolumeChange}
                onQualityChange={onQualityChange}
              >
                <PlayerControlsSlider
                  title={step.title}
                  duration={step.courseSectionStepVideo!.duration}
                  playedSeconds={playedSeconds}
                  onSeeking={onSeeking}
                />
              </PlayerControls>
            )}
          </MBox>
        </MBox>
      </div>
    </MBox>
  );
};

export default VideoStepView;
