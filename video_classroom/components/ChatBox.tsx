import styled from "styled-components";
import { 
    useEffect, 
    useRef, 
    useState,
    MouseEvent  
} from "react";
import VideoBar from './VideoBar';
import ChatBubble, { ChatBubbleProps } from "./ChatBubble";
import { timeStamp } from "console";
import { CommentData } from "./CommentData";
import Commenter from "./Commenter";
import {ChatBubbleOutline} from '@styled-icons/material-outlined';

interface VideoPlayerProps {
	MsgList?: Array<CommentData>;
    videoid?: string;
    videoTime?: number;
}

export const ChatBox: React.FC<VideoPlayerProps> = ({
	MsgList=[],
    videoid,
    videoTime=0,
	children,
	...props
}): React.ReactElement => {


    const [comments, setComments] = useState<Array<CommentData>>(MsgList);
    const [isCommenterOpen, setIsCommenterOpen] = useState<boolean>(false);

    const toggleCommenter = (e: MouseEvent<HTMLButtonElement>) => {
        setIsCommenterOpen(!isCommenterOpen)
	}
    
    const addComment = (newElement: CommentData): void => {
        if (newElement.parent){
            // newElement.parent.replies.unshift(newElement);
        } else {
            comments.push(newElement);
        }

        const nextComments = comments.slice()
        setComments([...nextComments]);
    }

    const renderBubble = (chatBubbleInfo: CommentData, bubbleId: number): React.ReactElement => {

        if ((chatBubbleInfo.timestamp || 0) < videoTime){
            return (
                <ChatBubble key={bubbleId} 
                    commentData={chatBubbleInfo}
                    addCommentFunc={addComment}
                >
                </ChatBubble>
            )
        } else {
            return (<></>)
        }
    }

    return(
        <ChatBoxFrame>
            <ChatListFrame>
                {comments.map((chatBubbleInfo: CommentData, i: number) => (
                    renderBubble(chatBubbleInfo, i)
                ))}
            </ChatListFrame>
            <NewCommentFrame>
                <QuestionButton onClick={toggleCommenter} ><ChatBubbleOutline className={'buttonIcon'} /></QuestionButton>
                <Commenter
                    timestamp={Math.floor(videoTime) || 0}
                    parentComment={undefined}
                
                    isOpen={isCommenterOpen}
                    addCommentFunc={addComment}
                    toggleCommenterFunc={setIsCommenterOpen}
                >
                </Commenter>
            </NewCommentFrame>
        </ChatBoxFrame>
    )
}

const QuestionButton = styled.button<{}>`
    margin: 4px;
    height: 25px;
    aspect-ratio: 1;
    border-radius: 100%;
`

const ChatBoxFrame = styled.div<{}>`
	position: absolute;
    width: 100%;
    height: 100%;
    background-color: #111111;
    overflow: hidden;

    display: flex;
    flex-direction: column;
`;

const ChatListFrame = styled.div<{}>`
    min-width: 400px;
    width: 100%;
    
    max-height: 100%;
    background-color: #111111;
    
    overflow: scroll;
    overflow-x: hidden;
    flex: 1;
`;

const NewCommentFrame = styled.div<{}>`
    float: bottom; 
    width: 100%;
    min-height: 40px;
    background-color: #111111;

    overflow: visible;
`;

export default ChatBox;