import { Button } from './Button';
import { Heading } from './Text';
import { ChatLeft } from '@styled-icons/bootstrap/ChatLeft';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Counter } from './Counter';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { MainTheme } from '../styles/MainTheme';
import moment from "moment";
import React from 'react';
import styled from 'styled-components';
import { Video } from '../components/Objects/Video';
import router from 'next/router';

export interface VideoRowProps extends React.HTMLAttributes<HTMLDivElement> {
    video: Video;
    removeClick: React.MouseEventHandler;
}

export const VideoRow: React.FC<VideoRowProps> = ({
    video,
    removeClick = () => null,
    ...props
}): React.ReactElement => {
    const displayVisibility = (perms: string): string => {
        if (perms == 'Everyone')
            return 'Visible to everyone in class';
        return 'Visible to TAs and instructors';
    };

    const moveToVideo = (e: React.MouseEvent<HTMLElement>): void => {
        //TODO: replace hardcoding

        router.replace({
            pathname: '/video',
            query: 
            {
                vid: 'cat.mp4'
            },
        })
    };

    return (
        <StyledDiv {...props}>
            <ThumbnailContainer onClick={moveToVideo} >
                <Thumbnail src={video.thumbnail} />
                <TimeStamp>{video.video_len}</TimeStamp>
            </ThumbnailContainer>
            <TextContainer>
                <TitleHeading size="h6" >{video.title}</TitleHeading>
                <DescriptionHeading size="small" color={MainTheme.colors.subtext} >{video.description}</DescriptionHeading>
            </TextContainer>
            <StatusContainer>
                {video.status.professor_answered && <StatusHeading italic={true} size="small" color={MainTheme.status.professor} >Professor Answered</StatusHeading>}
                {video.status.student_answered && <StatusHeading italic={true} size="small" color={MainTheme.status.student} >Student Answered</StatusHeading>}
                {video.status.unresolved_answers && <StatusHeading italic={true} size="small" color={MainTheme.status.unresolved} >Unresolved Answer(s)</StatusHeading>}
            </StatusContainer>
            <PermissionsHeading size="small" bold={true} italic={true} >{displayVisibility(video.visibility)}</PermissionsHeading>
            <Counter bold={true} icon={HeartFill} >{video.num_likes}</Counter>
            <Counter bold={true} icon={ChatLeft} >{video.num_comments}</Counter>
            <DateHeading size="small" >{moment(video.date).format('MM/DD/YYYY')}</DateHeading>
            <Button icon={Edit} />
            <Button onClick={removeClick} icon={Close} />
        </StyledDiv>
    )
};

const DateHeading = styled(Heading)`
    display: flex;
    align-items: center;
`;

const DescriptionHeading = styled(Heading)`
    margin: 0 0 0 5px;
    overflow: hidden;
`;

const PermissionsHeading = styled(Heading)`
    display: flex;
    align-items: center;
    width: 10%;
    text-align: center;
    overflow: hidden;
`;

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`;

const StatusHeading = styled(Heading)`
    margin: -2px 0 -1px 0;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 70px;
    border: 1px solid ${MainTheme.colors.stroke};
    padding: 5px;
    width: 100%;
    column-gap: 20px;
    border-radius: 5px 5px 5px 5px;
`;

const TimeStamp = styled.div`
    position: absolute;
    width: 40px;
    height: 15px;
    color: ${MainTheme.colors.input};
    background-color: ${MainTheme.colors.video_bg};
    right: 0px;
    bottom: 0px;
    text-align: center;
    font-size: 10px;
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

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
`;

const ThumbnailContainer = styled.div`
    position: relative;
    width: 10%;
`;

export default VideoRow;