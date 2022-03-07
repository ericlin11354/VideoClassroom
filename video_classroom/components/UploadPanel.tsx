import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
import { Video } from './Objects/Video';
import moment from 'moment';

export interface UploadPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    onSubmitClick?: Function;
};

export const UploadPanel: React.FC<UploadPanelProps> = ({
    onSubmitClick = () => null,
}): React.ReactElement => {
    const refTitle = useRef() as RefObject<HTMLInputElement>;
    const refDesc = useRef() as RefObject<HTMLInputElement>;
    const refLength = useRef() as RefObject<HTMLInputElement>;
    const refThumbnail = useRef() as RefObject<HTMLInputElement>;
    const refSRC = useRef() as RefObject<HTMLInputElement>;
    const refVisibility = useRef() as RefObject<HTMLInputElement>;

    const videoRef: Video = {
        title: refTitle.current?.value || '',
        description: refDesc.current?.value || '',
        video_len: refLength.current?.value || '',
        thumbnail: refLength.current?.value || '',
        src: refSRC.current?.value || '',
        // checking for correct type 
        visibility: (refSRC.current?.value && (refSRC.current?.value == 'Everyone' || refSRC.current?.value == 'TAProfs')) ? refSRC.current.value : 'Everyone',
        num_comments: 0,
        num_likes: 0,
        date: moment().toDate(),
        status: { professor_answered: false, student_answered: false, unresolved_answers: false }
    }

    return (
        <UploadFrame>
            <Input inputRef={refTitle} label="Video Title"></Input>
            <Input inputRef={refDesc} label="Video Description"></Input>
            <Input inputRef={refLength} label="Video Length"></Input>
            <Input inputRef={refThumbnail} label="Video Thumbnial"></Input>
            <Input inputRef={refSRC} label="Video src"></Input>
            <CheckBox inputRef={refVisibility} label="Visible for TAs and Professors only" />
            <Button onClick={() => onSubmitClick(videoRef)}>Submit</Button>
            
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