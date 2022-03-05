import moment from "moment"

export interface CommentData {
    id: number;
    videoid: number;
	username: string;
	date: moment.Moment;
	timestamp?: number;
	comment: string;
    parent?: CommentData;
	replies: Array<CommentData>;
	replyIDs?: Array<number>;
    likes: number;
}

var globalId = 0

export const newComment = (contents: string, 
    username: string, 
    timestamp: number, 
    parent?: CommentData,
    videoid?: number,
): CommentData =>  {
    globalId = globalId + 1
    
    const comment = {
        id: globalId,
        videoid: videoid || -1,
        username,
        date: moment(),
        timestamp,
        comment: contents,
        replies: [],
        parent,
        likes: 0,
    }
    if (parent){
        parent.replies.unshift(comment)
    }
    return comment
}







export const getTestComments = (): Array<CommentData> => {
    const msg1: CommentData = newComment(
        'i love this guy',
        'Jack',
        1, 
    )
    const msg2: CommentData = newComment(
        'i disagree',
        'Mike',
        2, 
        msg1,
    )
    const msg3: CommentData = newComment(
        'hello!!!',
        'Jane',
        2, 
        msg1,
    )
    const msg4: CommentData = newComment(
        'reported',
        'Jack',
        2, 
        msg2,
    )

    const msg5: CommentData = newComment(
        'can\'t we use pythag here?',
        'Jane',
        3, 
    )

    const msgList: Array<CommentData> = [msg1, msg5]

    return msgList
} 