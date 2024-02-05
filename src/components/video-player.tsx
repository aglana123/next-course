'use client';

import { FC, useEffect, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

const VideoPlayer: FC<ReactPlayerProps> = ({ url, ...props }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="relative aspect-video">
      <ReactPlayer
        onEnded={() => console.log('halo')}
        onProgress={(state) => console.log(state)}
        onDuration={(duration) => console.log(duration)}
        className="absolute w-full h-full aspect-video top-0 left-0"
        width="100%"
        height="100%"
        controls
        url={url}
        {...props}
      />
    </div>
  ) : null;
};

export default VideoPlayer;
