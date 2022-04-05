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
import { CommentData, commentsMongoToClass } from "../CommentData";
import Commenter from "./Commenter";
import {ChatBubbleOutline} from '@styled-icons/material-outlined';

interface VideoPlayerProps {
    videoid: string;
    videoTime?: number;
}

export const ChatBox: React.FC<VideoPlayerProps> = ({
    videoid,
    videoTime=0,
	children,
	...props
}): React.ReactElement => {

    const MsgList: Array<CommentData> = []
    const [comments, setComments] = useState<Array<CommentData>>(MsgList);
    useEffect(() => {
        
        const url = process.env.SERVER_URL + '/api/comment/videoComments/' + videoid;
        const request = new Request(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });

        const response = fetch(request)
        .then(async function(res) {
            if (res.ok) {
                const resBody = await res.json()

                console.log(resBody)
    
                setComments(commentsMongoToClass(resBody))
            }
            
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const [isCommenterOpen, setIsCommenterOpen] = useState<boolean>(false);

    const updateComments = (): void => {
        const nextComments = comments.slice()
        setComments([...nextComments])
    }
    
    const addComment = (newElement: CommentData): void => {



        if (newElement.parent){

        } else {
            let targetIndex = comments.findIndex((element) => (element.timestamp || 0) > (newElement.timestamp || 0));
            if (targetIndex == -1){
                comments.push(newElement)
            } else {
                comments.splice(targetIndex, 0, newElement)
            }
            
        }

        updateComments()
    }

    const removeComment = (target: CommentData): void => {
        // change this to use id as target later

        let targetIndex = comments.findIndex((element) => (element === target))
        if (targetIndex != -1){
            comments.splice(targetIndex, 1)
        }
        
        updateComments()
    }

    const renderBubble = (chatBubbleInfo: CommentData, bubbleId: number): React.ReactElement => {

        if ((chatBubbleInfo.timestamp || 0) <= videoTime){
            return (
                <ChatBubble key={bubbleId} 
                    commentData={chatBubbleInfo}
                    addCommentFunc={addComment}
                    removeCommentFunc={removeComment}
                    updateCommentsFunc={updateComments}
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
                {/* <QuestionButton onClick={toggleCommenter} ><ChatBubbleOutline className={'buttonIcon'} /></QuestionButton> */}
                <Commenter
                    timestamp={Math.floor(videoTime) || 0}
                    parentComment={undefined}

                    vid={videoid}
                
                    isCommenterOpen={isCommenterOpen}
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