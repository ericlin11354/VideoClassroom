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
import { ChatBubbleProps } from "./ChatBubble";
import { CommentData, newComment } from "../CommentData";

export interface CommenterProps {
	timestamp?: number;
    parentComment?: CommentData;

    isOpen?: boolean;
    addCommentFunc: (newElement: CommentData) => void;
    toggleCommenterFunc: (target: boolean) => void;
}

export const Commenter: React.FC<CommenterProps> = ({
	timestamp=1,
    parentComment,
    isOpen=false,
    addCommentFunc,
    toggleCommenterFunc,

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

            const newCommentData: CommentData = newComment(
                newCommentContent,
                'bobina',
                timestamp,
                parentComment,
            )
            addCommentFunc(newCommentData)

            form.value = ''
        }
	}

	return (
		<CommenterContainer isOpen={isOpen} {...props}>
            <FormBox ref={formRef}/>
            <SubmitButton onClick={addComment}>Submit</SubmitButton>
		</CommenterContainer>
	);
};

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
