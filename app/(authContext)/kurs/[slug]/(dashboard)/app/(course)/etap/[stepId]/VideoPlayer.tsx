'use client';

import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { useWindowSize } from '@/hooks/useWindowSize';
import { OnProgressProps } from 'react-player/base';

type Props = {
  initialSeconds: number | null;
  url: string;
  seekingPercent: number | null;
  volume: number;
  selectedQuality: number;
  isPlaying: boolean;
  isFullScreenOpen: boolean;
  onPlayerEnded: () => void;
  onPlayerProgress: (e: OnProgressProps) => void;
  handleSetQualities: (qualities: number[]) => void;
  handleChangeIsPlaying: (value: boolean) => void;
};

const VideoPlayer = ({
  initialSeconds,
  url,
  seekingPercent,
  selectedQuality,
  volume,
  isPlaying,
  isFullScreenOpen,
  onPlayerProgress,
  onPlayerEnded,
  handleSetQualities,
  handleChangeIsPlaying,
}: Props) => {
  const playerRef = useRef<ReactPlayer>(null);
  const isPlayerLoaded = useRef(false);
  const [width, height] = useWindowSize();

  const onPlayerError = (e: string) => {
    console.log(e, 'video player error');
    handleChangeIsPlaying(false);
  };

  const onPlayerReady = (e: ReactPlayer) => {
    isPlayerLoaded.current = true;
    const player = e.getInternalPlayer('hls') as {
      levels: { height: number }[];
      currentLevel: number;
    };
    handleSetQualities(
      [
        ...player.levels.map((level) => {
          return level.height;
        }),
      ].reverse()
    );

    if (initialSeconds) {
      playerRef.current?.seekTo(initialSeconds / 1000, 'seconds');
    }
  };

  const handleSeekTo = (percent: number) => {
    playerRef.current?.seekTo(percent);
  };

  useEffect(() => {
    if (!seekingPercent) return;
    handleSeekTo(seekingPercent);
  }, [seekingPercent]);

  useEffect(() => {
    if (!isPlayerLoaded.current || !playerRef.current) return;
    const player = playerRef.current.getInternalPlayer('hls') as {
      levels: { height: number }[];
      currentLevel: number;
    };
    player.currentLevel = selectedQuality;
  }, [selectedQuality]);

  return (
    <ReactPlayer
      controls={false}
      ref={playerRef}
      url={url}
      playing={isPlaying}
      onEnded={onPlayerEnded}
      onError={onPlayerError}
      onReady={onPlayerReady}
      onProgress={onPlayerProgress}
      volume={volume}
      height={
        isFullScreenOpen ? '100%' : width >= 1024 ? height - 64 - 57 : '100%'
      }
      width={'100%'}
      config={{
        file: {
          hlsOptions: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            xhrSetup: function (xhr) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              xhr.withCredentials = true; // send cookies
            },
          },
        },
      }}
    />
  );
};

export default VideoPlayer;
