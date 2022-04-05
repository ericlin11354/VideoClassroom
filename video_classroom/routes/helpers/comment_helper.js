
const { Comment } = require('../../models/comment')

const getRootComment = async (comment) => {
    const getParent = (target) => {
        return Comment.findById(target.parent);
    }

    let root = comment
    while (root.parent && root.parent !== '') {
        root = await getParent(root)
    }

    return root
}

//for deleting a comment and all its children
const deleteComment = async (comment) => {
    const deleteOneComment = async (target) => {
        for (const childID of target.children) {
            const child = await Comment.findById(childID);
            deleteOneComment(child)
        }
        if (answerId == target._id){
            answerId = ''
            root.set('answer', undefined)
            root.save()
        }
        await Comment.findByIdAndRemove(target._id);
    }

    if (comment.get('parent') !== ''){
        const parentComment = await Comment.findById(comment.get('parent'))
        parentComment.children.splice(parentComment.get('children').indexOf(cid), 1)
        await parentComment.save()
    }
    await deleteOneComment(comment)
}

module.exports = {getRootComment, deleteComment}