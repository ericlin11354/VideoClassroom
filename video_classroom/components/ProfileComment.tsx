import { ChatLeft } from '@styled-icons/bootstrap/ChatLeft';
import { Counter } from './Counter';
import { 
    HistoryText,
    SmallText
} from './Text';
import { Like } from '@styled-icons/boxicons-regular/Like';
import { MainTheme } from '../styles/MainTheme';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Video } from './Objects/Video';
import { CommentData } from './CommentData';

export interface ProfileComment extends React.HTMLAttributes<HTMLDivElement>{
    //video object
    comment: CommentData;
    video?: Video;
}

export const ProfileComment: React.FC<ProfileComment> = ({
    video,
    comment,
}): React.ReactElement => {

    const [videoTitle, setVideoTitle] = useState<string>('');
    
    useEffect(() => {
        const url = process.env.SERVER_URL + '/api/catalogue/' + comment.videoid;
        const request = new Request(url, {
            method: 'get', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        
        const response = fetch(request)
        .then(async function(res) {
            if (!res.ok) {
                return false
            }

            const resBody = await res.json()
            // console.log(resBody)
            // console.log(comment.videoid)
            setVideoTitle(resBody.video.title)

        }).catch((error) => {
            // console.log(error)
        })
        
    }, [video])

    return (
        <StyledDiv>
            <CommentTitle title={videoTitle}>{comment.username + ' commented on'} </CommentTitle>
            <CommentStats>
                <SmallText size="70%" color={MainTheme.colors.subtext} >{comment.username}</SmallText>
                <SmallText size="70%" color={MainTheme.colors.subtext}>{comment.date.toString()}</SmallText>
                <Counter size="70%" color={MainTheme.colors.subtext} icon={ChatLeft} >{comment.replies.length}</Counter>
                <Counter size="70%" color={MainTheme.colors.subtext} icon={Like} >{comment.likes}</Counter>
            </CommentStats>
            <SmallText>{comment.comment}</SmallText>
        </StyledDiv>
    )
};

const CommentStats = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
`;

const CommentTitle = styled(HistoryText)`
    margin: -10px 0 0 0;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    background: ${MainTheme.colors.input};
    padding: ${MainTheme.dimensions.padding.container};
    width: 80%;
    border-radius: 5px 5px 5px 5px;
`;

export default ProfileComment;