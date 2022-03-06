import styled from "styled-components";
import { 
	useState, 
    useRef,
    MouseEvent, 
} from "react";
import { Title } from "@mui/icons-material";
import moment from "moment";
import {secToTime} from '../../helpers/timeHelper';
import {HandThumbsUp, HandThumbsUpFill} from '@styled-icons/bootstrap';
import {ChatBubbleOutline} from '@styled-icons/material-outlined';
import Commenter, { CommenterProps } from "./Commenter";
import { CommentData } from "../CommentData";

export interface ChatBubbleProps {
    commentData: CommentData;

    addCommentFunc: (newElement: CommentData) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
    commentData,

    addCommentFunc,

	children,
	...props
}): React.ReactElement => {
    // const [fracFull, setFracFull] = useState<number>(defaultFracFull);
    const [isEngaged, setIsEngaged] = useState<boolean>(false);
    const [isCommenterOpen, setIsCommenterOpen] = useState<boolean>(false);

	const barRef = useRef<HTMLDivElement>(null);

    var formattedTS = typeof commentData.timestamp == 'number' && secToTime(commentData.timestamp)

    const toggleCommenter = (e: MouseEvent<HTMLButtonElement>) => {
        setIsCommenterOpen(!isCommenterOpen)
	}

    const commenterProps: CommenterProps = {
        timestamp: commentData.timestamp,
        parentComment: commentData,
    
        isOpen: isCommenterOpen,
        addCommentFunc: addCommentFunc,
        toggleCommenterFunc: setIsCommenterOpen,
    }

	return (
		<ChatContainer {...props}>
			<ProfilePic src={"kitty-pensive.jpeg"}> 
            </ProfilePic>
			<MsgTitle> 
                <CommentText>
                    {commentData.username} | {commentData.date.format("YY/MM/DD hh:mm a")}
                    <br/>
                    {formattedTS && "Timestamped " + formattedTS.format("mm:ss")}
                </CommentText>
            </MsgTitle>
			<Content>
                <CommentText>
                    {commentData.comment}
                </CommentText>
            </Content>
			<ReplyDivider> 
                <LikeButton><HandThumbsUp className={'buttonIcon'} /></LikeButton>
                <LikeButton onClick={toggleCommenter} ><ChatBubbleOutline className={'buttonIcon'} /></LikeButton>
            </ReplyDivider>
            <Commenter {...commenterProps}></Commenter>
			<Replies> 
                {commentData.replies.map((childCD: CommentData, i: number) => (
                    <ChatBubble key={i}
                        commentData={childCD}
                        addCommentFunc={addCommentFunc}
                    >
                    </ChatBubble>
                ))}
            </Replies>
		</ChatContainer>
	);
};

const LikeButton = styled.button<{}>`
    margin: 4px;
    height: 25px;
    aspect-ratio: 1;
    border-radius: 100%;
`

const CommentText = styled.div<{}>`
    margin: 5px;
    margin-top: 5px;
    margin-left: 6px;
`

const ReplyDivider = styled.div<{}>`
	position: relative;
    // background-color: pink;
    margin-right: 5px;
    margin-left: 25px;
    width:  calc(100% - 30px);
    height: 32px;
    overflow: hidden;
    border-radius: 15px;
`;

const ChatContainer = styled.div<{}>`
	position: relative;
    background-color: grey;
    width: calc(100% - 10px);
    margin: 5px;
    overflow: auto;
    border-radius: 15px;
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
    background-color: lightgreen;
    width: calc(100% - 75px);
    border-radius: 15px;
`;

const Content = styled.div<{}>`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 25px;
    min-height: 60px;
    background-color: white;
    width: calc(100% - 30px);
    overflow: auto;
    border-radius: 15px;
    border-top-left-radius: 0px;
`;

const Replies = styled.div<{}>`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 25px;
    min-height: 0px;
    background-color: lightgray;
    width: calc(100% - 30px);
    overflow: auto;
    border-radius: 18px;
    padding: 0px;
`;

export default ChatBubble;
