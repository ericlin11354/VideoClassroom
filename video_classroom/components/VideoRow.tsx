import { Button } from './Button';
import { Heading, SmallText } from './Text';
import { ChatLeft } from '@styled-icons/bootstrap/ChatLeft';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Counter } from './Counter';
// import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { Eye } from '@styled-icons/bootstrap/Eye';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { MainTheme } from '../styles/MainTheme';
import moment from "moment";
import React, { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { Video } from '../components/Objects/Video';
import router from 'next/router';
import { isUserAdmin } from '../helpers/permHelper';
import Input from './Input';
import CheckBox from './CheckBox';
import { updateVideoFromDB } from '../scripts/video_script';

export interface VideoRowProps extends React.HTMLAttributes<HTMLDivElement> {
    video: Video;
    removeClick: React.MouseEventHandler;
}

export const VideoRow: React.FC<VideoRowProps> = ({
    video,
    removeClick = () => null,
    ...props
}): React.ReactElement => {

    const [isEditing, setIsEditing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const refTitle = useRef() as RefObject<HTMLInputElement>;
    const refDesc = useRef() as RefObject<HTMLInputElement>;
    const refVisibility = useRef() as RefObject<HTMLInputElement>;

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
                vid: video._id
            },
        })
    };

    const handleSubmit = (): void => {
        if (refTitle.current?.value === '' || refDesc.current?.value === '' ) {
            setStatusText('Missing Required Fields');
        }
        else {
            video.title = refTitle.current?.value ? refTitle.current.value : ''
            video.description = refDesc.current?.value ? refDesc.current.value : ''
            video.visibility = refVisibility.current?.checked ? 'TAProfs' : 'Everyone'
            // updateVideoFromDB(video.video_id, refTitle.current?.value, refDesc.current?.value, refVisibility.current?.checked);
            console.log('video', video);
            updateVideoFromDB(video);
            setIsEditing(false);
        }
    }

    const getThumbnail = () => 
        video.video_url.slice(0, video.video_url.lastIndexOf('.')) + '.png';

    return (
        <StyledDiv {...props}>
            <ThumbnailContainer onClick={moveToVideo} >
                <Thumbnail src={getThumbnail()} />
                <TimeStamp>{video.video_len}</TimeStamp>
            </ThumbnailContainer>
            {!isEditing ?    
            (<>
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
                <Counter bold={true} icon={Eye} >{video.num_likes}</Counter>
                <Counter bold={true} icon={ChatLeft} >{video.num_comments}</Counter>
                <DateHeading size="small" >{moment(video.date).format('MM/DD/YYYY')}</DateHeading>
                {isUserAdmin() && <Button tip='Edit Video' icon={Edit} onClick={() => setIsEditing(true)} />}
                {isUserAdmin() && <Button tip='Delete Video' onClick={removeClick} icon={Close} />}
            </>) : <>
                <Input inputRef={refTitle} label='Title' placeholder='Title...' />
                <Input inputRef={refDesc} label='Description' placeholder='Description...' />
                <CheckBox inputRef={refVisibility} label='Visible for TAs and Professors only' />
                <Button tip='Submit Edit' onClick={handleSubmit} >Submit Edit </Button>
                <SmallText color='red' >{statusText}</SmallText>
            </> }
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
    cursor: pointer;
`;

export default VideoRow;