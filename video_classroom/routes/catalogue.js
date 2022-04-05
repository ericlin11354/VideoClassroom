var express = require('express')
var router = express.Router()

log = console.log

const { mongoose } = require('../db/mongoose')
const { Course, Video } = require('../models/course')
const { ObjectID } = require('mongodb')

const { Comment } = require('../models/comment')

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const path = require("path");

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dqdagc8tg',
    api_key: '214252355416824',
    api_secret: '4V6GAZL1un-RSElUrI_dsURv2GI'
});

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router.post('/', multipartMiddleware, (req, res) => {
	console.log(req)
	console.log('abs path', req.body, req.files)
    // check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	cloudinary.v2.uploader.upload(
		req.files.image.path,
		{ resource_type: "video"},
		function(error, result) {

			console.log('cloudinary upload:', error, result)

			const getTimeMinutes = () => {
				const minutes = Math.floor(result.duration / 60);
				const seconds = Math.floor(result.duration - minutes * 60);
				return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
			}

			const video = new Video({
				title: req.body.title,
				description: req.body.description,
				video_len: getTimeMinutes(),
				thumbnail: '',
				video_id: result.public_id,
				video_url: result.url,
				visibility: req.body.visibility,
				num_comments: 0,
				num_likes: 0,
				date: new Date(),
				status: {
					professor_answered: false,
					student_answered: false,
					unresolved_answers: 0,
				}
			})
		
            // Save image to the database
            video.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );

		}
	)
})

router.get('/', async (req, res) => {
	
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 
	// Get the students
	try {
		const videos = await Video.find()
		// res.send(students) // just the array

		for (video of videos){
			console.log(video._id)
			const temp = await Comment.findByVideo(video._id)
			video.num_comments = temp.length
		}
		res.send({ videos }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

//get one video
router.get('/:id', async (req, res) => {
	const id = req.params.id
	
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	try {
		const video = await Video.findById(id)
		res.send({
			video: video
		})
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// router.post('/:id/', async (req, res) => {
// 	// req.params has the wildcard parameters in the url, in this case, id.
// 	const id = req.params.id

// 	if (!ObjectID.isValid(id)) {
// 		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
// 		return;  // so that we don't run the rest of the handler.
// 	}

//     // check mongoose connection established.
// 	if (mongoose.connection.readyState != 1) {
// 		log('Issue with mongoose connection')
// 		res.status(500).send('Internal server error')
// 		return;
// 	}  

//     // Create a new student using the Restaurant mongoose model
// 	const video = new Video({
//         title: req.body.title,
//         description: req.body.description,
//         num_comments: req.body.num_comments,
//         num_likes: req.body.num_likes,
//         date: req.body.date,
//         video_len: req.body.video_len,
//         status: {
//             professor_answered: req.body.status.professor_answered,
//             student_answered: req.body.status.student_answered,
//             unresolved_answers: req.body.status.unresolved_answers,
//         },
//         thumbnail: req.body.thumbnail,
//         src: req.body.src,
//         visibility: req.body.visibility,
// 	})
// 	// If id valid, findById and append to videos
// 	try {
// 		const course = await Course.findById(id)
// 		course.videos.push(video)
// 		await course.save()
// 		if (!course) {
// 			res.status(404).send('Resource not found')  // could not find this student
// 		} else {
// 			res.send({"video": video, "course": course})
// 		}
// 	} catch(error) {
// 		log(error)
// 		res.status(500).send('Internal Server Error')  // server error
// 	}
// })

router.delete('/:id/', (req, res) => {
	// Add code here

	const videoId = req.params.id

	// we comment since we delete from cloudinary first
	// if (!ObjectID.isValid(videoId)) {
	// 	res.status(404).send()  // if invalid id or resv_id, definitely can't find resource, 404.
	// 	return;  // so that we don't run the rest of the handler.
	// }

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}	

	cloudinary.uploader.destroy(videoId, function (error, result) {
		console.log(error, result);
        // Delete the image from the database
        Video.findOneAndRemove({ video_id: videoId })
            .then(video => {
                if (!video) {
                    res.status(404).send();
                } else {
                    res.send(video);
                }
            })
            .catch(error => {
                res.status(500).send(error); // server error, could not delete.
            });
    });
})

router.put('/:id/', async (req, res) => {
	const videoId = req.params.id

	console.log('put req', req.body);

	// we omit as we search by videoId
	// if (!ObjectID.isValid(videoId)) {
	// 	res.status(404).send()
	// 	return;  // so that we don't run the rest of the handler.
	// }

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// // Find the fields to update and their values.
	// const fieldsToUpdate = {}
	// req.body.map((change) => {
	// 	const propertyToChange = change.path.substr(1) // getting rid of the '/' character
	// 	fieldsToUpdate[propertyToChange] = change.value
	// })

	// Update the student by their id.
	try {
		const video = await Video.findOneAndReplace({video_id: videoId}, req.body, {new: true, useFindAndModify: false})
		if (!video) {
			res.status(404).send()
		} else {   
			res.send(video)
		}
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})


module.exports = router