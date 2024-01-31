'use client';

import { FC, useEffect, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

type VideoPlayerProps = {
	url: string;
	props?: ReactPlayerProps;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ url, ...props }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient ? (
		<div className="relative aspect-video">
			<ReactPlayer
				className="absolute w-full h-full aspect-video top-0 left-0"
				width="100%"
				height="100%"
				controls
				url={url}
				{...props}
			/>
		</div>
	) : (
		''
	);
};

export default VideoPlayer;
