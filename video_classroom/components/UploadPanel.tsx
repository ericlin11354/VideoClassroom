import { addVideoToDB } from '../scripts/video_script';
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

    const [videoSRC, setVideoSRC] = useState<FormData>();

    const [thumbnailSRC, setThumbnailSRC] = useState<CustomFile>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (refTitle.current?.value === '' || refDesc.current?.value === '' || !refSRC.current?.value) {
            // console.log('Missing fields');
            setStatusText('Missing fields');
        } else {
            console.log('Adding Video to DB');
            addVideoToDB(refTitle.current?.innerText, refDesc.current?.value, refVisibility.current?.checked, e.target);
            // window.location.replace("catalogue");
        }
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
            <form onSubmit={handleSubmit}>
                <input ref={refSRC} name='image' type="file" />
                <Button >Submit</Button>
            </form>
            <SmallText color='red' >{statusText}</SmallText>
            
        </UploadFrame>
)};

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