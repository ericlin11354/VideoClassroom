import styled from "styled-components";
import { useRef, useState } from "react";
import videoStyles from '../styles/Video.module.css'
import DraggableBar from '../components/DraggableBar'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

interface VideoInfo {
    videoProgress: number;
	setVideoProgress: (newFracFull: number) => void;
    videoPlaying: boolean,
    setVideoPlaying: (newIsPlaying: boolean) => void,
}

interface VideoPlayerProps {
    videoInfo: VideoInfo;
    isHidden?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
	children,
    videoInfo,
	...props
}): React.ReactElement => {
    
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isInUse, setIsInUse] = useState<boolean>(false);

    const setFocusTrue = function() {
      setIsFocused(true);
    }
    const setFocusFalse = function() {
      setIsFocused(false);
    }

    const handlePlayButtonClick = (e: React.MouseEvent<HTMLElement>) => {
		videoInfo.setVideoPlaying(!videoInfo.videoPlaying)
	}

    const draggerInfo = {
        onSliderChanged: videoInfo.setVideoProgress,
        onSliderEngaged: (isRelease: boolean) => {
            setIsInUse(!isRelease)
            if (videoInfo.videoPlaying){
                videoInfo.setVideoPlaying(isRelease)
            }
        },
        fracFull: videoInfo.videoProgress,
    }
    
    return(
        <VideoBarHitbox onMouseEnter={setFocusTrue} onMouseLeave={setFocusFalse}>
            <VideoBarFrame isInUse={isFocused || isInUse}>
                <div className={videoStyles.progBar}>
                    <DraggableBar draggerInfo={draggerInfo}></DraggableBar>
                </div>
                <PlayButton onClick={handlePlayButtonClick}>
                    { videoInfo.videoPlaying && <PauseRoundedIcon className={'buttonIcon'} /> || <PlayArrowRoundedIcon className={'buttonIcon'} /> }
                </PlayButton>
            </VideoBarFrame>
        </VideoBarHitbox>
    )
}

const VideoBarHitbox = styled.div<{}>`
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
`;

const PlayButton = styled.button<{}>`
    margin: 10px;
    height: calc(100% - 20px);
    border-radius: 20%;
    aspect-ratio: 1;
    background-color: #ffffff;
`;

const VideoBarFrame = styled.div<{isInUse: boolean}>`
    position: absolute;
    margin: 0px;
    width: calc(100% - 0px);
    height: calc(100% - 0px);
    opacity: 0.75;
    border-radius: 0px;
    background-color: #ffffff;

    bottom: calc(-100% - 30px);
    transition: 0.5s;

    ${({ isInUse }): string =>
    isInUse
        ? `
        transition: 0.5s ease-out 1;
        bottom: calc(0%);
    `
    : `
    `}
`;

export default VideoPlayer;