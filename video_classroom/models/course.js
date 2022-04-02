/* Student mongoose model */
const mongoose = require('mongoose')

const StatusSchema = new mongoose.Schema({
    professor_answered: { type: Boolean },
    student_answered: { type: Boolean },
    unresolved_answers: { type: Boolean }
});

const VideoSchema = mongoose.Schema({
	title: { type: String },
	description: { type: String },
    num_comments: { type: Number },
    num_likes: { type: Number },
    date: { type: Date },
    video_len: { type: String },
    status: StatusSchema,
    thumbnail: { type: Object },
    src: { type: Object },
    visibility: { type: String },
});

const CourseSchema = mongoose.Schema({
    name: { type: String },
    videos: { type: [VideoSchema] }
});


const Course = mongoose.model('Course', CourseSchema)
const Video = mongoose.model('Video', VideoSchema)

module.exports = { Course, Video, VideoSchema }