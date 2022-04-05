/* comment mongoose model */
var moment = require('moment')

const mongoose = require('mongoose')

const { Video } = require('./course')
const { User } = require('./user')

const CommentSchema = mongoose.Schema({
    video: { type: String },
    user: { type: String },
    body: { type: String },
    timePosted: { type: String },
    timeStamp: { type: Number },
    likedBy: { type: [String] },
    answer: { type: String },
    parent: { type: String },
    children: { type: [String] },
});

CommentSchema.statics.findByUser = function(username) {

	return User.findUser(username).then((user) => {
		return new Promise((resolve, reject) => {

			Comment.find({user: username}, function(err, result) {
                if (err) {
					reject()
                } else {
                    resolve(result)
                }
            })
		})

	})
}

CommentSchema.statics.findByVideo = function(vidID) {

	return Video.findById(vidID).then((video) => {
		return new Promise((resolve, reject) => {

			Comment.find({video: vidID}, function(err, result) {
                if (err) {
					reject()
                } else {
                    resolve(result)
                }
            })
		})

	})
}

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment }