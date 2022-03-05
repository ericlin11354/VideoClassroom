import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import VideoBar from './VideoBar';

interface VideoPlayerProps {
	knobDiam?: number;
	defaultFracFull?: number;
	barFillProps?: {};
	knobProps?: {};
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
	knobDiam=10,
	defaultFracFull=0,
	barFillProps,
	knobProps,
	children,
	...props
}): React.ReactElement => {

    const [videoTime, setVideoTime] = useState<number>(0);
    const [videoMaxTime, setVideoMaxTime] = useState<number>(0);
    const [videoReady, setVideoReady] = useState<boolean>(false);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

	const setVideoProgress = (vidProg: number, dontUpdateVid?: boolean) => {
        if (vidRef && vidRef.current){
            const video = vidRef.current

            if (!dontUpdateVid){
                video.currentTime = vidProg * videoMaxTime
            }
            setVideoTime(vidProg * videoMaxTime)
        }
	}

	const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (vidRef && vidRef.current){
            const video = vidRef.current

            if (videoPlaying){
                video.play()
            } else {
                video.pause()
            }

            setVideoMaxTime(video.duration)

            setVideoPlaying(!video.paused)

            video.ontimeupdate = (event) => {
                setVideoProgress(video.currentTime / video.duration, true)
            };
        }
    })

    const videoInfo = {
        videoProgress: videoTime / videoMaxTime,
        setVideoProgress: setVideoProgress,
        videoPlaying: videoPlaying,
        setVideoPlaying: setVideoPlaying,
    }

    return(
        <VideoPlayerFrame>
            <VideoViewport ref={vidRef} loop muted autoPlay width="100%" height="100%">
                <source src="digging.mp4" type="video/mp4"></source>
            </VideoViewport>
            <VideoBarContainer>
                <VideoBar videoInfo={videoInfo}></VideoBar>
            </VideoBarContainer>
        </VideoPlayerFrame>
    )
}
const VideoViewport = styled.video<{}>`

`
const VideoBarContainer = styled.div<{}>`
    position: absolute;
    width: 100%;
    height: 20%;
    max-height: 60px;
    bottom: 0;
`;
const VideoPlayerFrame = styled.div<{}>`
	position: absolute;
    width: 60%;
    height: 60%;
    background-color: #111111;
    
    overflow: hidden;
`;

export default VideoPlayer;