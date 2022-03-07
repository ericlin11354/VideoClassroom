import moment from "moment"

var globalId = 0

export class CommentData {
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
    likedUsers: Array<string>;
    answer?: CommentData;
    isAnswer: boolean;

    constructor(
        contents: string, 
        username: string, 
        timestamp: number, 
        parent?: CommentData,
        videoid?: number,
    ){
        this.id = globalId
        this.videoid = videoid || -1
        this.username = username
        this.date = moment()
        this.timestamp = timestamp
        this.comment = contents
        this.replies = []
        this.parent = parent
        this.likes = 0
        this.likedUsers = []
        this.answer = undefined
        this.isAnswer = false

        if (parent){
            parent.replies.unshift(this)
        }
    }

    getRootComment = (): CommentData | undefined => {
        let rootComment = this.parent
        if (!rootComment) return ;
        while (rootComment.parent){
            rootComment = rootComment.parent
        }
    
        return rootComment
    }
}

export const getRootComment = (commentData: CommentData): CommentData | undefined => {
    let rootComment = commentData.parent
    if (!rootComment) return ;
    while (rootComment.parent){
        rootComment = rootComment.parent
    }

    return rootComment
}






export const getTestComments = (): Array<CommentData> => {
    const msg1: CommentData = new CommentData(
        'i love this guy',
        'Jack',
        1, 
    )
    const msg2: CommentData = new CommentData(
        'i disagree',
        'Mike',
        2, 
        msg1,
    )
    const msg3: CommentData = new CommentData(
        'hello!!!',
        'Jane',
        2, 
        msg1,
    )
    const msg4: CommentData = new CommentData(
        'reported',
        'Jack',
        2, 
        msg2,
    )

    const msg5: CommentData = new CommentData(
        'can\'t we use pythag here?',
        'Jane',
        3, 
    )

    const msgList: Array<CommentData> = [msg1, msg5]

    return msgList
} 