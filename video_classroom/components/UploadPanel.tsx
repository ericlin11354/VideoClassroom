import { addVideoToDB } from '../scripts/video_script';
import Dropzone, {
    useDropzone,
    DropEvent,
    FileRejection,
    DropzoneProps,
    DropzoneOptions,
} from 'react-dropzone';
import React, { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
import { Video } from './Objects/Video';
import moment from 'moment';
import { CustomFile } from './Objects/CustomFile';
import { couldStartTrivia } from 'typescript';


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

    const [videoSRC, setVideoSRC] = useState<CustomFile>({
        name: 'emptyFile',
        size: 0,
        lastModified: 0,
        type: 'undefined',
        webkitRelativePath: 'undefined'
    });

    const [thumbnailSRC, setThumbnailSRC] = useState<CustomFile>({
        name: 'emptyFile',
        size: 0,
        lastModified: 0,
        type: 'undefined',
        webkitRelativePath: 'undefined'
    })

    const onVideoDropHandler = (acceptedFiles: File[]) => {
        console.log('Video file successfully dropped.');
        setVideoFileName(acceptedFiles[0].name);
        setVideoSRC({
            name: acceptedFiles[0].name,
            size: acceptedFiles[0].size,
            lastModified: acceptedFiles[0].lastModified,
            type: acceptedFiles[0].type,
            webkitRelativePath: acceptedFiles[0].webkitRelativePath
        })
    }

    const onThumbnailDropHandler = (acceptedFiles: File[]) => {
        console.log('Thumbnail file successfully dropped.');
        setThumbnailFileName(acceptedFiles[0].name);
        setThumbnailSRC({
            name: acceptedFiles[0].name,
            size: acceptedFiles[0].size,
            lastModified: acceptedFiles[0].lastModified,
            type: acceptedFiles[0].type,
            webkitRelativePath: acceptedFiles[0].webkitRelativePath
        })
    }

    const { open: videoOpen } = useDropzone({
        onDrop: onVideoDropHandler,
        disabled: false,
        noClick: true,
        noKeyboard: true,
    });

    const { open: thumbnailOpen } = useDropzone({
        onDrop: onThumbnailDropHandler,
        disabled: false,
        noClick: true,
        noKeyboard: true,
    });

    const videoRef: Video = {
        title: refTitle.current?.value || '',
        description: refDesc.current?.value || '',
        video_len: refLength.current?.value || '',
        thumbnail: thumbnailSRC,
        src: videoSRC,
        // checking for correct type 
        visibility: (refVisibility.current?.value && 
            (refVisibility.current?.value == 'Everyone' || refVisibility.current?.value == 'TAProfs')) ? refVisibility.current.value : 'Everyone',
        num_comments: 0,
        num_likes: 0,
        date: moment().toDate(),
        status: { professor_answered: false, student_answered: false, unresolved_answers: false }
    }

    const handleSubmit = () => {
        if (!videoSRC) 
            console.log('Missing src');
        else {
            console.log('Adding Video to DB');
            addVideoToDB(videoRef)
        }
    }

    return (
        <UploadFrame {...props} >
            <Input inputRef={refTitle} label="Video Title"></Input>
            <Input inputRef={refDesc} label="Video Description"></Input>
            <Input inputRef={refLength} label="Video Length"></Input>
            <Input inputRef={refThumbnail} label="Video Thumbnail" onClick={thumbnailOpen} placeholder={thumbnailFileName}></Input>
            <Input inputRef={refSRC} label="Video src" onClick={videoOpen} placeholder={videoFileName}></Input>
            <CheckBox inputRef={refVisibility} label="Visible for TAs and Professors only" />
            <Button onClick={handleSubmit}>Submit</Button>
            
        </UploadFrame>
)};


const UploadFrame = styled.div`
    padding: 5px;
	position: relative;
    min-width: 300px;
    min-height: 250px;
    width: 50vw;
    height: 40vh;
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