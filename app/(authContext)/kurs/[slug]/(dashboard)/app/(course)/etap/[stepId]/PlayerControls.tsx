'use client';

import React, { useState } from 'react';

import MBox from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@/components/materialUI/Slider';
import Menu from '@/components/materialUI/Menu';
import MenuItem from '@/components/materialUI/MenuItem';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

type Props = {
  children: React.ReactNode;
  isPlaying: boolean;
  // timePlayed: number;
  qualities: number[];
  isFullscreenOpen: boolean;
  // volumeValue: number;
  // selectedQuality: number;
  volume: number;
  onVolumeChange: (value: number) => void;
  onPlay: () => void;
  onFullscreenEnter: () => void;
  onFullscreenExit: () => void;
  onQualityChange: (quality: number) => void;
  // handleSeekingValue: (time: number | number[]) => void;
  // onVideoPlayerClick: () => void;
  // handleToggleFullscreen: () => void;
  // handleVolumeValue: (value: number) => void;
  // handleChangeQuality: (value: number) => void;
};

const PlayerControls = ({
  children,
  volume,
  isPlaying,
  isFullscreenOpen,
  // volumeValue,
  qualities,
  // selectedQuality,
  // section,
  // playingStepId,
  // handleChangeQuality,
  onPlay,
  onFullscreenEnter,
  onFullscreenExit,
  onVolumeChange,
  onQualityChange,
}: // handleSeekingValue,
// onVideoPlayerClick,
// handleToggleFullscreen,
// handleVolumeValue,
Props) => {
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [qualitiesMenuAnchorEl, setQualitiesMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const onClose = () => {
    setQualitiesMenuAnchorEl(null);
  };

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQualitiesMenuAnchorEl(e.currentTarget);
  };

  const onVolumeSliderHover = () => {
    setIsVolumeSliderVisible((state) => !state);
  };

  return (
    <MBox
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`tw-text-white tw-py-2 tw-w-full md:tw-w-1/2 md:tw-py-10 md:tw-bg-transparent tw-flex md:tw-items-center md:tw-justify-center`}
    >
      <MBox className="tw-flex tw-w-full tw-items-center tw-gap-2 tw-px-2 md:tw-bg-background-paper md:tw-py-2 md:tw-rounded-md">
        <IconButton onClick={onPlay}>
          {isPlaying ? (
            <PauseCircleIcon className="tw-text-2xl" />
          ) : (
            <PlayCircleIcon className="tw-text-2xl" />
          )}
        </IconButton>
        <MBox className="tw-flex tw-grow tw-items-center tw-gap-2 ">
          {children}
          <MBox className={`tw-hidden md:tw-flex tw-relative tw-gap-2`}>
            <IconButton onMouseEnter={onVolumeSliderHover}>
              {volume >= 0.8 ? (
                <VolumeUpIcon className="tw-text-2xl" />
              ) : volume >= 0.4 ? (
                <VolumeDownIcon className="tw-text-2xl" />
              ) : volume > 0 ? (
                <VolumeMuteIcon className="tw-text-2xl" />
              ) : (
                <VolumeOffIcon className="tw-text-2xl" />
              )}
            </IconButton>
            {isVolumeSliderVisible && (
              <MBox
                className={`tw-absolute -tw-translate-x-1/2 -tw-top-8 -tw-scale-x-1 tw-left-1/2  tw-w-16 tw-flex tw-items-center`}
              >
                <Slider
                  min={0}
                  max={1}
                  value={volume}
                  onChange={(e) => onVolumeChange(e as number)}
                  hideThumb={false}
                />
              </MBox>
            )}
          </MBox>
        </MBox>
        <MBox>
          <IconButton
            id="qualities-button"
            aria-controls={qualitiesMenuAnchorEl ? 'qualities-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={qualitiesMenuAnchorEl ? 'true' : undefined}
            onClick={onMenuOpen}
          >
            <SettingsIcon className="tw-text-2xl" />
          </IconButton>
          <Menu
            container={
              isFullscreenOpen
                ? document.fullscreenElement
                  ? (document.fullscreenElement as HTMLElement)
                  : undefined
                : undefined
            }
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            anchorEl={qualitiesMenuAnchorEl}
            onClose={onClose}
            id="qualities-menu"
            buttonId="qualities-button"
          >
            {[...qualities].map((quality, i) => (
              <MenuItem
                onClick={() => onQualityChange(qualities.length - 1 - i)}
                className={`tw-min-w-[100px] tw-text-center`}
                key={quality}
              >
                {quality}p
              </MenuItem>
            ))}
          </Menu>
        </MBox>
        <IconButton
          onClick={isFullscreenOpen ? onFullscreenExit : onFullscreenEnter}
        >
          {isFullscreenOpen ? (
            <FullscreenExitIcon className="tw-text-2xl" />
          ) : (
            <FullscreenIcon className="tw-text-2xl" />
          )}
        </IconButton>
      </MBox>
    </MBox>
  );
};

export default PlayerControls;
