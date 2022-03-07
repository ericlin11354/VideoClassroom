import styled from "styled-components";
import { 
	useState, 
    useRef, 
    MouseEvent, 
} from "react";
import {secToTime} from '../../helpers/timeHelper';
import {HandThumbsUp, HandThumbsUpFill, Star, StarFill, Eye, EyeFill} from '@styled-icons/bootstrap';
import {ChatBubbleOutline} from '@styled-icons/material-outlined';
import {Delete} from '@styled-icons/fluentui-system-filled';
import { CommentData } from "../CommentData";
import { getUsername, isUserAdmin } from "../../helpers/permHelper";

export interface CommenterProps {
	timestamp?: number;
    parentComment?: CommentData;

    addCommentFunc: (newElement: CommentData) => void;
    isCommenterOpen?: boolean;
    toggleCommenterFunc: (target: boolean) => void;

    toggleLikeFunc?: () => void;

    isRepliesOpen?: boolean;
    toggleRepliesFunc?: (target: boolean) => void,

    deleteCommentFunc?: () => void,
    markCommentFunc?: () => void,
}

export const Commenter: React.FC<CommenterProps> = ({
	timestamp=1,
    parentComment,

    addCommentFunc,
    isCommenterOpen=false,
    toggleCommenterFunc,
    
    toggleLikeFunc,

    isRepliesOpen,
    toggleRepliesFunc,

    deleteCommentFunc,
    markCommentFunc,

	children,
	...props
}): React.ReactElement => {
    // const [isOpen, setIsOpen] = useState<boolean>(false);

	const formRef = useRef<HTMLInputElement>(null);

    var formattedTS = secToTime(timestamp)

    const addComment = (e: MouseEvent<HTMLButtonElement>) => {
        if (formRef.current){
            const form = formRef.current
            const newCommentContent = form.value

            if (newCommentContent.length == 0){
                return
            }

            const newCommentData: CommentData = new CommentData(
                newCommentContent,
                getUsername(),
                timestamp,
                parentComment,
            )
            addCommentFunc(newCommentData)

            form.value = ''
        }
	}
    
    const toggleCommenter = (e: MouseEvent<HTMLButtonElement>) => {
        toggleCommenterFunc(!isCommenterOpen)
	}

    const deleteComment = (e: MouseEvent<HTMLButtonElement>) => {
        if (parentComment && parentComment.parent) {
            const index = parentComment.parent.replies.findIndex((element) => (parentComment == element))
            parentComment.parent.replies.splice(index, 1)
        }
        deleteCommentFunc && deleteCommentFunc()
	}

    const markComment = (e: MouseEvent<HTMLButtonElement>) => {
        markCommentFunc && markCommentFunc()
	}

    const toggleReplies = (e:  MouseEvent<HTMLButtonElement>) => {
        toggleRepliesFunc && toggleRepliesFunc(!isRepliesOpen)
	}

    const isLikedByUser = parentComment && parentComment.likedUsers.findIndex((element) => (getUsername() == element)) != -1

    const numComments = parentComment && parentComment.replies.length || 0

    const questionAnswered = parentComment && parentComment.getRootComment() && parentComment.getRootComment()?.answer

	return (
        <ReplyDivider> 
            {parentComment && <NumItems>{parentComment.likes > 0 && parentComment.likes}</NumItems>}
            {parentComment && <CommentButton onClick={toggleLikeFunc}>{isLikedByUser && <HandThumbsUpFill className={'buttonIcon'} /> || <HandThumbsUp className={'buttonIcon'} />}</CommentButton>}
            <NumItems>{numComments > 0 && numComments}</NumItems>
            <CommentButton onClick={toggleCommenter} ><ChatBubbleOutline className={'buttonIcon'} /></CommentButton>
            {isUserAdmin() && parentComment && <CommentButton onClick={deleteComment} ><Delete className={'buttonIcon'} /></CommentButton>}
            {isUserAdmin() && parentComment && parentComment.parent && <CommentButton onClick={markComment} >{questionAnswered && <StarFill className={'buttonIcon'} /> || <Star className={'buttonIcon'} />}</CommentButton>}
            {(!parentComment || parentComment.replies.length > 0) && parentComment && <CommentButton onClick={toggleReplies} >{isRepliesOpen && <EyeFill className={'buttonIcon'} /> || <Eye className={'buttonIcon'} />}</CommentButton>}
            <CommenterContainer isOpen={isCommenterOpen} {...props}>
                <FormBox ref={formRef}/>
                <SubmitButton onClick={addComment}>Submit</SubmitButton>
            </CommenterContainer>
        </ReplyDivider>
	);
};

const NumItems = styled.span<{}>`
    margin-left: 5px;
    color: #ffffff;
    overflow: auto;
`;

const ReplyDivider = styled.div<{}>`
	position: relative;
    // background-color: pink;
    margin-right: 5px;
    margin-left: 25px;
    width:  calc(100% - 30px);
    overflow: hidden;
    border-radius: 15px;
`;
const CommentButton = styled.button<{}>`
    margin: 4px;
    height: 25px;
    aspect-ratio: 1;
    border-radius: 100%;
`

const CommenterContainer = styled.div<{isOpen: boolean}>`
	position: relative;
    background-color: grey;
    left: 20px;
    width: calc(100% - 50px);
    margin: 5px;
    ${({ isOpen }) => 
	isOpen
	? `
        overflow: auto;
		max-height: calc(60px);
	`
	: `
        overflow: hidden;
        max-height: calc(0px);
	`}
`;

const FormBox = styled.input<{}>`
    
`;

const SubmitButton = styled.button<{}>`
`;

export default Commenter;
