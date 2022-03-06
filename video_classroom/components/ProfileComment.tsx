import { ChatLeft } from '@styled-icons/bootstrap/ChatLeft';
import { Counter } from './Counter';
import { 
    HistoryText,
    SmallText
} from './Text';
import { Like } from '@styled-icons/boxicons-regular/Like';
import { MainTheme } from '../styles/MainTheme';
import React from 'react';
import styled from 'styled-components';
import { Video } from './Objects/Video';

export interface ProfileComment extends React.HTMLAttributes<HTMLDivElement>{
    //video object
    video?: Video;
}

export const ProfileComment: React.FC<ProfileComment> = ({
    video,
}): React.ReactElement => (
    <StyledDiv>
        <CommentTitle title="A Video">Jianjia Chen commented on</CommentTitle>
        <CommentStats>
            <SmallText size="70%" color={MainTheme.colors.subtext} >Jianjia Chen</SmallText>
            <SmallText size="70%" color={MainTheme.colors.subtext}>2022/02/25 21:35</SmallText>
            <Counter size="70%" color={MainTheme.colors.subtext} icon={ChatLeft} >4</Counter>
            <Counter size="70%" color={MainTheme.colors.subtext} icon={Like} >500</Counter>
        </CommentStats>
        <SmallText>What is love? Baby don't hurt me.</SmallText>
    </StyledDiv>
);

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