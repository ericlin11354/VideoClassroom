import styled from "styled-components";
import { useRef, useState } from "react";
import videoStyles from '../../styles/Video.module.css'
import DraggableBar from '../DraggableBar'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import {PlayFill, PauseFill} from '@styled-icons/bootstrap';
import {SpeakerMute, Speaker0, Speaker1, Speaker2} from '@styled-icons/fluentui-system-filled';

interface VideoInfo {
    videoProgress: number;
	setVideoProgress: (newFracFull: number) => void;
    videoPlaying: boolean,
    setVideoPlaying: (newIsPlaying: boolean) => void,
    volume: number,
    setVolume: (newFracFull: number) => void,
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
    const [volumeBarHovered, setVolumeBarHovered] = useState<boolean>(false);
    const [volumeBarOpen, setVolumeBarOpen] = useState<boolean>(false);

	const muteButtonRef = useRef<HTMLButtonElement>(null);

    const setFocusTrue = function() {
        setIsFocused(true);
    }
    const setFocusFalse = function() {
        setIsFocused(false);
    }

    const openVolumeBar = function() {
        setVolumeBarOpen(true);
    }
    const closeVolumeBar = function() {
        setVolumeBarOpen(false);
    }

    const handlePlayButtonClick = (e: React.MouseEvent<HTMLElement>) => {
		videoInfo.setVideoPlaying(!videoInfo.videoPlaying)
	}

    const videoDraggerInfo = {
        onSliderChanged: videoInfo.setVideoProgress,
        onSliderEngaged: (isRelease: boolean) => {
            setIsInUse(!isRelease)
            if (videoInfo.videoPlaying){
                videoInfo.setVideoPlaying(isRelease)
            }
        },
        fracFull: videoInfo.videoProgress,
    }

    const volumeDraggerInfo = {
        onSliderChanged: videoInfo.setVolume,
        onSliderEngaged: (isRelease: boolean) => {
            if (!isRelease){
                setVolumeBarOpen(!isRelease)
            }
        },
        fracFull: videoInfo.volume,
    }

    const sliderBoxLeft = {
        left: muteButtonRef && muteButtonRef.current && muteButtonRef.current.getBoundingClientRect().x.toString() + 'px' || `0px`
    }
    
    return(
        <VideoBarHitbox onMouseEnter={setFocusTrue} onMouseLeave={setFocusFalse}>
            <VideoBarFrame isInUse={isFocused || isInUse}>
                <div className={videoStyles.progBar}>
                    <DraggableBar draggerInfo={videoDraggerInfo}></DraggableBar>
                </div>
                <VBButton onClick={handlePlayButtonClick}>
                    { videoInfo.videoPlaying && <PauseFill className={'buttonIcon'} /> || <PlayFill className={'buttonIcon'} /> }
                </VBButton>
                <VBButton ref={muteButtonRef} onPointerEnter={openVolumeBar} onPointerLeave={closeVolumeBar}>
                    { <Speaker0 className={'buttonIcon'} /> }
                </VBButton>
                <PopupBox onPointerEnter={openVolumeBar} onPointerLeave={closeVolumeBar} style={sliderBoxLeft} isInUse={volumeBarOpen}>
                    <DraggableBar isVertical={true} draggerInfo={volumeDraggerInfo}></DraggableBar>
                </PopupBox>
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

const VBButton = styled.button<{}>`
    margin: 10px;
    margin-right: 0px;
    height: calc(100% - 20px);
    border-radius: 20%;
    aspect-ratio: 1;
    background-color: #ffffff;
`;

const PopupBox = styled.div<{isInUse: boolean}>`
    position: absolute;
    height: calc(200% - 40px);
    border-radius: 10px;
    aspect-ratio: 0.5;
    background-color: #ffffff;

    bottom: calc(-100% - 40px);
    transition: 0.5s;
    opacity: 0;

    ${({ isInUse }): string =>
    isInUse
        ? `
        opacity: 1;
        transition: 0.5s ease-out 1;
        bottom: calc(100% + 15px);
    `
    : `
    `}
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