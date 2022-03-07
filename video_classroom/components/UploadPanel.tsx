import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import CheckBox from './CheckBox';
import Input from './Input';

export interface UploadPanelProps extends React.HTMLAttributes<HTMLDivElement> {

};

export const UploadPanel: React.FC<UploadPanelProps> = ({
    

}): React.ReactElement => {
    const refTitle = useRef() as RefObject<HTMLInputElement>;
    const refDesc = useRef() as RefObject<HTMLInputElement>;
    const refLength = useRef() as RefObject<HTMLInputElement>;
    const refThumbnail = useRef() as RefObject<HTMLInputElement>;
    const refSRC = useRef() as RefObject<HTMLInputElement>;
    const refVisibility = useRef() as RefObject<HTMLInputElement>;

    const setPanelValue = (e: React.MouseEvent) => {
    }   

    return (
        <UploadFrame>
            <Input label="Video Title"></Input>
            <Input label="Video Description"></Input>
            <Input label="Video Length"></Input>
            <Input label="Video Thumbnial"></Input>
            <Input label="Video src"></Input>
            <CheckBox label="Visible for TAs and Professors only" />
            <Button onClick={setPanelValue}>Submit</Button>
            
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