import styled from "styled-components";
import { 
	useState, 
    useRef,
    MouseEvent, 
} from "react";
import { Title } from "@mui/icons-material";
import moment from "moment";
import {secToTime} from '../../helpers/timeHelper';
import {HandThumbsUp, HandThumbsUpFill, StarFill} from '@styled-icons/bootstrap';
import {ChatBubbleOutline} from '@styled-icons/material-outlined';
import Commenter, { CommenterProps } from "./Commenter";
import { CommentData } from "../CommentData";
import { getUsername } from "../../helpers/permHelper";
import { endianness } from "os";
import { MainTheme } from '../../styles/MainTheme';

export interface ChatBubbleProps {
    commentData: CommentData;

    addCommentFunc: (newElement: CommentData) => void;
    removeCommentFunc: (targetElement: CommentData) => void;
    updateCommentsFunc: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
    commentData,

    addCommentFunc,
    removeCommentFunc,
    updateCommentsFunc,

	children,
	...props
}): React.ReactElement => {
    // const [fracFull, setFracFull] = useState<number>(defaultFracFull);
    const [isEngaged, setIsEngaged] = useState<boolean>(false);
    const [isCommenterOpen, setIsCommenterOpen] = useState<boolean>(false);
    const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);

	const barRef = useRef<HTMLDivElement>(null);

    var formattedTS = typeof commentData.timestamp == 'number' && secToTime(commentData.timestamp)

    const deleteCommentFunc = () => {
        removeCommentFunc(commentData)
	}

    const markCommentFunc = () => {
        //TODO: replace w/ request

        let rootComment = commentData.parent
        if (!rootComment) return ;
        while (rootComment.parent){
            rootComment = rootComment.parent
        }

        if (rootComment.answer === commentData){
            rootComment.answer = undefined
            commentData.isAnswer = false
        } else {
            if (rootComment.answer){
                rootComment.answer.isAnswer = false
            }
            rootComment.answer = commentData
            commentData.isAnswer = true
        }
        updateCommentsFunc()
	}

    const toggleLikeFunc = () => {
        const foundIndex = commentData.likedUsers.findIndex((element) => (getUsername() == element))
        if (foundIndex == -1){
            commentData.likes = commentData.likes + 1
            commentData.likedUsers.push(getUsername())
        } else {
            commentData.likes = commentData.likes - 1
            commentData.likedUsers.splice(foundIndex, 1)
        }
        updateCommentsFunc()
	}

    const commenterProps: CommenterProps = {
        timestamp: commentData.timestamp,
        parentComment: commentData,

        vid: commentData.videoid,
    
        addCommentFunc: addCommentFunc,
        isCommenterOpen: isCommenterOpen,
        toggleCommenterFunc: setIsCommenterOpen,

        toggleLikeFunc: toggleLikeFunc,

        isRepliesOpen: isRepliesOpen,
        toggleRepliesFunc: setIsRepliesOpen,
    
        deleteCommentFunc: deleteCommentFunc,
        markCommentFunc: markCommentFunc,
    }


	return (
		<ChatContainer {...props}>
			<ProfilePic src={commentData.profilePic || "https://res.cloudinary.com/dqdagc8tg/image/upload/v1649200915/Blank-Profile-Image_m3msu6.png"}> 
            </ProfilePic>
			<MsgTitle> 
                <CommentText>
                    {commentData.username} | {commentData.date.format("YY/MM/DD hh:mm a")}
                    <br/>
                    {!commentData.parent && formattedTS && "Timestamped " + formattedTS.format("mm:ss")}
                    {commentData.parent && "Replying to " + commentData.parent.username}
                </CommentText>
                {commentData.isAnswer && 
                    <AnswerStatus>
                        <StarFill/>
                    </AnswerStatus>
                }
            </MsgTitle>
			<Content>
                <CommentText>
                    {commentData.comment}
                </CommentText>
            </Content>
			{/* <ReplyDivider> 
                <LikeButton><HandThumbsUp className={'buttonIcon'} /></LikeButton>
                <LikeButton onClick={toggleCommenter} ><ChatBubbleOutline className={'buttonIcon'} /></LikeButton>
            </ReplyDivider> */}
            <Commenter {...commenterProps}></Commenter>
			<Replies isOpen={isRepliesOpen}> 
                {commentData.replies.map((childCD: CommentData, i: number) => (
                    <ChatBubble key={i}
                        commentData={childCD}
                        addCommentFunc={addCommentFunc}
                        removeCommentFunc={removeCommentFunc}
                        updateCommentsFunc={updateCommentsFunc}
                    >
                    </ChatBubble>
                ))}
            </Replies>
		</ChatContainer>
	);
};

const AnswerStatus = styled.div<{}>`
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(-50%, -50%);
    height: 75%;
    aspect-ratio: 1;
    color: gold;
`

const CommentText = styled.div<{}>`
    margin: 5px;
    margin-top: 5px;
    margin-left: 6px;
`

const ChatContainer = styled.div<{}>`
	position: relative;
    background-color: grey;
    width: calc(100% - 10px);
    margin: 5px;
    overflow: auto;
    border-radius: 15px;

    @keyframes appear {
        0% {
            opacity: 0;
            margin-left: 50px;
        }
        100% {
            opacity: 1;
            margin-left: 5px;
        }
    }

    animation-name: appear;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
`;

const ProfilePic = styled.img<{}>`
    position: relative;
    background-color: grey;
    top: 5px;
    left: 5px;
    width: 60px;
    height: 60px;
    border-radius: 15px;
`;

const MsgTitle = styled.div<{}>`
    position: absolute;
    margin-left: 70px;
    top: 8px;
    height: 54px;
    background-color: ${MainTheme.colors.primary};
    width: calc(100% - 75px);
    border-radius: 15px;
`;

const Content = styled.div<{}>`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 25px;
    min-height: 30px;
    background-color: white;
    width: calc(100% - 30px);
    overflow: auto;
    border-radius: 15px;
    border-top-left-radius: 0px;
`;

const Replies = styled.div<{isOpen:boolean}>`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 25px;
    min-height: 0px;
    background-color: lightgray;
    width: calc(100% - 30px);
    border-radius: 18px;
    padding: 0px;

    display: flex;
    flex-direction: column;

    ${({ isOpen }) => 
	isOpen
	? `
        overflow: auto;
	`
	: `
        overflow: hidden;
        max-height: calc(0px);
	`}
`;

export default ChatBubble;
