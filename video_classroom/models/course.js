/* Student mongoose model */
const mongoose = require('mongoose')

const StatusSchema = mongoose.Schema({
    professor_answered: { type: Boolean },
    student_answered: { type: Boolean },
    unresolved_answers: { type: Boolean }
});

const VideoSchema = mongoose.Schema({
	title: { 
        type: String,
        required: true,
        minlength: 1,
    },
	description: { type: String },
    num_comments: { 
        type: Number,
        min: 0
    },
    num_likes: { 
        type: Number,
        min: 0
    },
    date: { type: Date },
    video_len: { 
        type: String,
        minlength: 5 // format is '00:00'
    },
    status: StatusSchema,
    // thumbnail: { type: Object },
    video_id: { type: String },
    video_url: { type: String },
    visibility: { 
        type: String,
        required: () => this.visibility === 'TAProfs' || this.visibility === 'Everyone'
    },
    comments: { type: [String] },
});

const CourseSchema = mongoose.Schema({
    name: { type: String },
    videos: { type: [VideoSchema] }
});


// VideoSchema.pre('get', function(next) {
// 	const video = this;

//     console.log(this._id)

// 	video.num_comments = Comment.findByVideo(this._id).length
//     console.log(video.num_comments)
//     next()
// })


const Course = mongoose.model('Course', CourseSchema)
const Video = mongoose.model('Video', VideoSchema)

module.exports = { Course, Video }