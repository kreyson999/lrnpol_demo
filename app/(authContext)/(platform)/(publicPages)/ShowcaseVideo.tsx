'use client';

import React from 'react';
import MBox from '@mui/material/Box';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const ShowcaseVideo = () => {
  return (
    <MBox className="tw-flex tw-justify-center">
      <ReactPlayer
        width="100%"
        height="100%"
        style={{ aspectRatio: '16/9' }}
        controls
        url="https://vimeo.com/1041184970?share=copy"
      />
    </MBox>
  );
};

export default ShowcaseVideo;
