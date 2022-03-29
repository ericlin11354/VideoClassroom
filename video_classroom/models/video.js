/* Student mongoose model */
const mongoose = require('mongoose')

const VideoSchema = mongoose.model('Video', {
	title: { type: String },
	description: { type: String },
    num_comments: { type: Number },
    num_likes: { type: Number },
    date: { type: Date },
    video_len: { type: String },
    status: ReservationSchema,
    thumbnail: { type: String },
    src: { type: String },
    visibility: { type: String },
})

const ReservationSchema = new mongoose.Schema({
    professor_answered: { type: Boolean },
    student_answered: { type: Boolean },
    unresolved_answers: { type: Boolean }
});

module.exports = { VideoSchema }