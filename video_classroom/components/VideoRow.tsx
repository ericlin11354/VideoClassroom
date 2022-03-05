import { Button } from './Button';
import { Heading } from './Text';
import { ChatLeft } from '@styled-icons/bootstrap/ChatLeft';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Counter } from './Counter';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { MainTheme } from '../styles/MainTheme';
import React from 'react';
import styled from 'styled-components';

export interface VideoRowProps {
    video?: any;
    
}

export const VideoRow: React.FC<VideoRowProps> = ({

}): React.ReactElement => (
    <StyledDiv>
        <img src='https://external-preview.redd.it/W-uPL4Yr42_zNV_FFtpOZ0pRwxjZup6_aM90LdCis6k.jpg?auto=webp&s=26f5d20887104f3b8202ed5e1747d7da51135f05' />
        <TextContainer>
            <TitleHeading size="h6" >Title</TitleHeading>
            <DescriptionHeading size="small" color={MainTheme.colors.text} >This is an unnecessarily long description...</DescriptionHeading>
        </TextContainer>
        <StatusContainer>
            <StatusHeading italic={true} size="small" color={MainTheme.status.professor} >Professor Answered</StatusHeading>
            <StatusHeading italic={true} size="small" color={MainTheme.status.student} >Student Answered</StatusHeading>
            <StatusHeading italic={true} size="small" color={MainTheme.status.unresolved} >Unresolved Answer(s)</StatusHeading>
        </StatusContainer>
        <PermissionsHeading size="small" bold={true} italic={true} >Visible to everyone in class</PermissionsHeading>
        <Counter bold={true} icon={HeartFill} >42</Counter>
        <Counter bold={true} icon={ChatLeft} >69</Counter>
        <DateHeading size="small" >04/20/2021</DateHeading>
        <Button icon={Edit} />
        <Button icon={Close} />
    </StyledDiv>
);

const DateHeading = styled(Heading)`
    display: flex;
    align-items: center;
`;

const PermissionsHeading = styled(Heading)`
    display: flex;
    align-items: center;
    width: 10%;
    text-align: center;
`;

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StatusHeading = styled(Heading)`
    margin: -2px 0 -1px 0;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 70px;
    border: 1px solid black;
    padding: 5px;
    width: 100%;
    column-gap: 20px;
`;

const DescriptionHeading = styled(Heading)`
    margin: 0 0 0 5px;
`;

const TitleHeading = styled(Heading)`
    margin: -5px 0 0 5px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35%;
`;

export default VideoRow;