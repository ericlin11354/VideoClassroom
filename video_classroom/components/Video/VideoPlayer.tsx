import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import VideoBar from './VideoBar';
import ChatBox from "./ChatBox";
import { getTestComments } from "../CommentData";

interface VideoPlayerProps {
    vid: string;
	knobDiam?: number;
	defaultFracFull?: number;
	barFillProps?: {};
	knobProps?: {};
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    vid,
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

    const [volume, setVolume] = useState<number>(0);

	const setVideoProgress = (vidProg: number, dontUpdateVid?: boolean) => {
        if (vidRef && vidRef.current){
            const video = vidRef.current

            if (isFinite(vidProg) && isFinite(videoMaxTime) && !dontUpdateVid){
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

            video.volume = volume

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

        volume: volume,
        setVolume: setVolume,
    }

    return(
        <VideoChatFrame>
            <VideoPlayerFrame>
                <VideoViewport ref={vidRef} loop width="100%" height="100%">
                    <source src={vid} type="video/mp4"></source>
                </VideoViewport>
                <VideoBarContainer>
                    <VideoBar videoInfo={videoInfo}></VideoBar>
                </VideoBarContainer>
            </VideoPlayerFrame>
            <ChatFrame>
                <ChatBox videoid={vid} videoTime={videoTime} MsgList={getTestComments()}>
                </ChatBox>
            </ChatFrame>
        </VideoChatFrame>
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
    height: 100%;
    background-color: #111111;
    
    overflow: hidden;
`;
const ChatFrame = styled.div<{}>`
    right: 0px;
    position: absolute; 
    width: 40%;
    height: 100%;
    background-color: #111111;
    
    overflow: hidden;
`;
const VideoChatFrame = styled.div<{}>`
	position: absolute;
    width: 100%;
    height: 60%;
    background-color: #111111;
    
    overflow: hidden;
`;

export default VideoPlayer;