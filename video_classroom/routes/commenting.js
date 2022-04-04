var express = require('express')
var moment = require('moment')
var router = express.Router()

const { Comment } = require('../models/comment')
const { Video } = require('../models/course')
const { User } = require('../models/user')
const log = console.log

const { mongoChecker } = require('./helpers/mongo_helpers')

/* 
Create a new comment
Body should be of the following format:
{
    body: String
    timeStamp: number
    parent: String
}
*/
router.post('/:id', mongoChecker, async (req, res) => {
    const vid = req.params.id
    console.log(vid)

    let username = req.session.username
    username = 'frootloopers2'
    // log(req.body.username)
    if (!username || username === ''){
        res.status(401).send('Must be logged in to comment')
    }

	try {
        const video = await Video.findById(vid)
        if (!video) {
            res.status(400).send('Video does not exist')
            return
        }

        const user = await User.findUser(username);
        if (!user) {
            res.status(400).send('User does not exist')
            return
        }
        
        const comment = new Comment({
            video: vid,
            user: username,
            body: req.body.body,
            timeStamp: req.body.timeStamp,
            timePosted: moment().format('YYYY-MM-DD HH:mm:ss'),
            parent: req.body.parent || '',
        })

        // user.comments.push(comment.get('_id'))
        // video.comments.push(comment.get('_id'))

        if (comment.get('parent') !== ''){
            console.log('hi')
            const parentComment = await Comment.findById(comment.get('parent'))
            parentComment.children.push(comment.get('_id'))
            console.log('bye')
            await parentComment.save()
        }

		const newComment = await comment.save()
		// await user.save()
		// await video.save()

        res.status(200).send(newComment)

	} catch (error) {
        log('error')
        log(error)
        res.status(400).send('Bad Request')
	}
})

/* 
Get a comment
*/
router.get('/:id', mongoChecker, async (req, res) => {
    const cid = req.params.id

	try {
        const comment = await Comment.findById(cid)
        if (!comment) {
            res.status(400).send('Comment does not exist')
            return
        }
        res.send(comment)

	} catch (error) {
        log(error)
        res.status(400).send('Bad Request')
	}
})

/* 
Get all comments of a video
*/
router.get('/videoComments/:id', mongoChecker, async (req, res) => {
    const vid = req.params.id

    console.log(vid)

	try {
        const video = await Video.findById(vid)
        if (!video) {
            res.status(404).send('Video does not exist')
            return
        }
        
		const comments = await Comment.findByVideo(vid)

        res.send(comments)

	} catch (error) {
        log(error)
        res.status(400).send('Bad Request')
	}
})

/* 
Get all comments of a user
*/
router.get('/userComments/:id', mongoChecker, async (req, res) => {
    const uid = req.params.id

	try {
        const user = await User.findById(uid)
        if (!user) {
            res.status(400).send('User does not exist')
            return
        }
        
		const comments = await Comment.findByUser(user.get(''))

        res.send(comments)

	} catch (error) {
        log(error)
        res.status(400).send('Bad Request')
	}
})

/* 
Delete a comment
User must be an admin
*/
router.delete('/:id', mongoChecker, async (req, res) => {
    const cid = req.params.id

    let username = req.session.username
    username = 'frootloopers2'

    try {
        const user = await User.findUser(username);
        const comment = await Comment.findById(cid);
        
        if (!user) {
            res.status(404).send('User not found')

        } else if (!comment) {
            res.status(404).send('Comment not found')

        } else if (user.get('permission') !== 'admin') {
            res.status(401).send('User does not have permission to delete')
            
        } else {

            const deleteComment = async (target) => {
                for (const childID of target.children) {
                    const child = await Comment.findById(childID);
                    deleteComment(child)
                }
                await Comment.findByIdAndRemove(target._id);
            }

            log(comment.get('parent'))
            if (comment.get('parent') !== ''){
                const parentComment = await Comment.findById(comment.get('parent'))
                parentComment.children.splice(parentComment.get('children').indexOf(cid), 1)
                await parentComment.save()
            }
            await deleteComment(comment)

            res.status(200).send()
        }

    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

/* 
Like/unlike a comment
Body should be of the following format:
{
    setTo: Boolean (optional)
}
*/
router.post('/like/:id', mongoChecker, async (req, res) => {
    const cid = req.params.id

    const username = req.session.username

    try {
        const user = await User.findUser(username);
        const comment = await Comment.findById(cid);
        
        if (!user) {
            res.status(404).send('User not found')

        } else if (!comment) {
            res.status(404).send('Comment not found')
            
        } else {
            const target = req.body.setTo || !(comment.get('likedBy').includes(username))
            if (!target && comment.get('likedBy').includes(username)){
                comment.get('likedBy').splice(comment.get('likedBy').findIndex(username), 1)
            } else if (target && !comment.get('likedBy').includes(username)) {
                comment.get('likedBy').push(username)
            }

            comment.save()
            
            res.status(200).send()
        }

    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

/* 
Mark a comment
Body should be of the following format:
{
    setTo: Boolean (optional)
}
*/
router.post('/mark/:id', mongoChecker, async (req, res) => {
    const cid = req.params.id

    const username = req.session.username

    //TODO
    res.status(404).send('TODO')

})

module.exports = router