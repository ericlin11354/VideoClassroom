import { timeStamp } from "console";
import moment from "moment"

export class CommentData {
    id: string;
    videoid: string;
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
    profilePic?: string;
    isAnswer: boolean;

    constructor(
        contents: string, 
        username: string, 
        timestamp: number, 
        parent?: CommentData,
        videoid?: string,
        id?: string,
    ){
        this.id = id || '0'
        this.videoid = videoid || '0'
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

export const commentsMongoToClass = (mongoComments: Array<any>, pushAll?: boolean): Array<CommentData> => {
    // console.log(mongoComments)
    const questions = []
    const answers = []
    const convertedComments = []
    for (const element of mongoComments) {
        const parentComment: any = convertedComments.find(ele => ele.id === element.parent)

        const newComment = new CommentData(
            element.body,
            element.user,
            element.timeStamp,
            parentComment,
            element.video,
            element._id,
        )

        newComment.date = moment(element.timePosted, 'YYYY-MM-DD HH:mm:ss')
        newComment.likedUsers = element.likedBy
        newComment.likes = element.likedBy.length
        if (element.answer && element.answer !== ''){
            questions.push(newComment)
            answers.push(element.answer)
        }
        if (answers.includes(element._id)){
            let question = questions[answers.indexOf(element._id)]
            if (question){
                question.answer = newComment
                newComment.isAnswer = true
            }
        }
        newComment.profilePic = element.profilePic
        console.log(element.profilePic)

        if (parentComment) {
            if (pushAll){
                convertedComments.push(newComment)
            }
        } else {
            convertedComments.push(newComment)
        }

    }
    
    convertedComments.sort((a:CommentData, b:CommentData): number => {
        if (a.timestamp === b.timestamp) {
            return a.date.valueOf() - b.date.valueOf()
        } else if (a.timestamp !== undefined && b.timestamp !== undefined) {
            return a.timestamp - b.timestamp
        } else {
            return 0
        }
    })

    return convertedComments
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