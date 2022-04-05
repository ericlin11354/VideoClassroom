import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import VideoBar from './VideoBar';
import ChatBox from "./ChatBox";
import { CommentData, getTestComments } from "../CommentData";
import moment from "moment";

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

    const vidSrc = 'cat.mp4'

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

    //TODO: hardcoded stuff
    const videoTitle = 'Hello World'
    const submitterUN = 'Prof. Professor'
    const submitTime = moment()
    const courseName = 'csc404'
    const videoDesc = 'This is my first video.'

    return(
        <VideoChatDescFrame>
            <VideoChatFrame>
                <VideoPlayerFrame>
                    <VideoViewport ref={vidRef} width="100%" height="100%">
                        <source src={vidSrc} type="video/mp4"></source>
                    </VideoViewport>
                    <VideoBarContainer>
                        <VideoBar videoInfo={videoInfo}></VideoBar>
                    </VideoBarContainer>
                </VideoPlayerFrame>
                <ChatFrame>
                    <ChatBox videoid={vid} videoTime={videoTime}>
                    </ChatBox>
                </ChatFrame>
            </VideoChatFrame>
            <DescFrame>
                <TextRow>
                    <TitleItem>{videoTitle}</TitleItem>
                </TextRow>
                <TextRow>
                    <DescItem>Part of {courseName}</DescItem>
                </TextRow>
                <TextRow>
                    <DescItem>Submitted by {submitterUN} on {submitTime.toDate().toDateString()}</DescItem>
                </TextRow>
                    <br/>
                <TextRow>
                    <DescItem>{videoDesc}</DescItem>
                </TextRow>
            </DescFrame>
        </VideoChatDescFrame>
    )
}
const TextRow = styled.div<{}>`
`
const TitleItem = styled.span<{}>`
    font-size: 40px;
    color: white;
`
const DescItem = styled.span<{}>`
    color: white;
`
const DescFrame = styled.div<{}>`
	position: absolute;
    width: 100%;
    height: calc(25% - 0px);
    top: calc(75% - 0px);
    bottom: 0px;
    background-color: #111111;
    padding: 10px;
    
    overflow-y: scroll;
`;

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
    height: calc(75% - 0px);
    background-color: #111111;
    
    overflow: hidden;
`;
const VideoChatDescFrame = styled.div<{}>`
	position: absolute;
    width: 100%;
    height: calc(100% - 100px);
    
    overflow: hidden;
`;

export default VideoPlayer;