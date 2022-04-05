// import { addVideoToDB } from '../scripts/video_script';
import React, { FormEvent, FormEventHandler, RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
import { Video } from './Objects/Video';
import moment from 'moment';
import { CustomFile } from './Objects/CustomFile';
import { couldStartTrivia } from 'typescript';
import SmallText from './Text/SmallText';


export interface UploadPanelProps extends React.HTMLAttributes<HTMLDivElement> {
};

export const UploadPanel: React.FC<UploadPanelProps> = ({
    ...props
}): React.ReactElement => {
    const refTitle = useRef() as RefObject<HTMLInputElement>;
    const refDesc = useRef() as RefObject<HTMLInputElement>;
    const refLength = useRef() as RefObject<HTMLInputElement>;
    const refThumbnail = useRef() as RefObject<HTMLInputElement>;
    const refSRC = useRef() as RefObject<HTMLInputElement>;
    const refVisibility = useRef() as RefObject<HTMLInputElement>;
    const [videoFileName, setVideoFileName] = useState('');
    const [thumbnailFileName, setThumbnailFileName] = useState('');
    const [statusText, setStatusText] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);

    const [videoSRC, setVideoSRC] = useState<FormData>();

    const [thumbnailSRC, setThumbnailSRC] = useState<CustomFile>()

    /** A function to send a POST request with a new video. */
    const addVideoToDB = (title: string, desc: string, visibility: string, src: HTMLFormElement) => {
        // the URL for the request
        const url = `/api/catalogue/`;

        // log('src', src);
        const videoData = new FormData(src);
        // log('before', videoData);
        videoData.append('title', title);
        videoData.append('description', desc);
        videoData.append('visibility', visibility);
        // log('after', videoData);
        // data['src'] = video.src

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'post', 
            body: videoData,
        });

        // Send the request with fetch()
        fetch(request)
        .then(function(res) {
            console.log('res stats', res.status)
            // }
            if (res.status === 200) {
                console.log('Added a video')
                setStatusText('Success! Refresh to see changes.');
                setIsInputValid(true);
            } else {
                console.log('Could not add video')
                setStatusText('Missing required fields.');
                setIsInputValid(false);
            }
            console.log(res)  // log the result in the console for development purposes,
                            //  users are not expected to see this.
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addVideoToDB(refTitle.current?.value || '', refDesc.current?.value || '', refVisibility.current?.checked ? 'TAProfs' : 'Everyone', e.target as HTMLFormElement);
    }

    // const handleFileOnChange = (e: Event) => {
    //     console.log(e.currentTarget?.files);
    //     setVideoSRC(e.currentTarget);
    // }

    return (
        <UploadFrame {...props} >
            <Input inputRef={refTitle} label="Video Title"></Input>
            <Input inputRef={refDesc} label="Video Description"></Input>
            {/* <Input inputRef={refLength} label="Video Length"></Input> */}
            {/* <Input inputRef={refThumbnail} label="Video Thumbnail" onClick={thumbnailOpen} placeholder={thumbnailFileName}></Input>
            <Input inputRef={refSRC} label="Video src" onClick={videoOpen} placeholder={videoFileName}></Input> */}
            {/* <input type="file" onChange={(e) => {
            if (e.target.files[0] !== null)
                setVideoSRC(e.target.files[0])
            }}></input> */}
            <CheckBox inputRef={refVisibility} label="Visible for TAs and Professors only" />
            {/* <Button onClick={handleSubmit}>Submit</Button> */}
            <StyledSmallText>Video file</StyledSmallText>
            <StyledForm onSubmit={handleSubmit}>
                <input ref={refSRC} name='image' type="file" accept="video/*" />
                <StyledButton >Submit</StyledButton>
            </StyledForm>
            <SmallText color={isInputValid ? 'green' : 'red'} >{statusText}</SmallText>
            
        </UploadFrame>
)};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const StyledButton = styled(Button)`
    width: 15%;
`;

const StyledSmallText = styled(SmallText)`
    margin: 0 0 -5px 0;
`;

const UploadFrame = styled.div`
    padding: 5px;
	position: relative;
    min-width: 50vw;
    min-height: 40vh;
    background-color: #ffffff;
    
    display: flex;
    flex-direction: column;
    gap: 5px;

    overflow: auto;
`;

const VisibilityOptions = styled.div`
    display: flex;
    flex-direction: row;
`;

export default UploadPanel;