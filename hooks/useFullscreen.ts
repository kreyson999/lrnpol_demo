import { useRef, useState } from 'react';

const useFullscreen = () => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const fullscreenElementRef = useRef<HTMLDivElement | null>(null);

  const onFullscreenEnter = () => {
    if (!fullscreenElementRef.current) return;
    const element = fullscreenElementRef.current;
    if (element.requestFullscreen) {
      void element.requestFullscreen();
      // @ts-expect-error check if user is on mozzila
    } else if (element.mozRequestFullScreen) {
      // @ts-expect-error its readable
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void element.mozRequestFullScreen();
      // @ts-expect-error check if user is on Chrome, Safari, and Opera
    } else if (element.webkitRequestFullscreen) {
      // @ts-expect-error its readable
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void element.webkitRequestFullscreen();
    }
    setIsFullscreenOpen(true);
  };

  const onFullscreenExit = () => {
    if (!document.fullscreenElement) return;
    if (document.exitFullscreen) {
      void document.exitFullscreen();
      // @ts-expect-error firefox only
    } else if (document.mozCancelFullScreen) {
      // @ts-expect-error firefox only
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void document.mozCancelFullScreen();
      // @ts-expect-error firefox only
    } else if (document.webkitExitFullscreen) {
      // @ts-expect-error firefox only
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void document.webkitExitFullscreen();
    }
    setIsFullscreenOpen(false);
  };

  // const toggleFullscreen = () => {
  //   setIsFullscreenOpen((state) => {
  //     if (state) {
  //       onFullscreenExit();
  //       return false;
  //     }
  //     onFullscreenEnter();
  //     return true;
  //   });
  // };

  return {
    fullscreenElementRef,
    isFullscreenOpen,
    onFullscreenEnter,
    onFullscreenExit,
  };
};

export default useFullscreen;
