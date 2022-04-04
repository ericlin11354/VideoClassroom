var express = require('express')
var router = express.Router()

log = console.log

const { mongoose } = require('../db/mongoose')
const { Course, Video } = require('../models/course')
const { ObjectID } = require('mongodb')

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router.post('/', async (req, res) => {
    // check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	console.log(req.body.src);

    const video = new Video({
        title: req.body.title,
		description: req.body.description,
		video_len: req.body.video_len,
		thumbnail: req.body.thumbnail,
		src: req.body.src,
		visibility: req.body.visibility,
		num_comments: req.body.num_comments,
		num_likes: req.body.num_likes,
		date: req.body.date,
		status: req.body.status
    })

    // Save restaurant to the database (async await)
	try {
		const result = await video.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
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

router.post('/:id/', async (req, res) => {
	// req.params has the wildcard parameters in the url, in this case, id.
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    // check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

    // Create a new student using the Restaurant mongoose model
	const video = new Video({
        title: req.body.title,
        description: req.body.description,
        num_comments: req.body.num_comments,
        num_likes: req.body.num_likes,
        date: req.body.date,
        video_len: req.body.video_len,
        status: {
            professor_answered: req.body.status.professor_answered,
            student_answered: req.body.status.student_answered,
            unresolved_answers: req.body.status.unresolved_answers,
        },
        thumbnail: req.body.thumbnail,
        src: req.body.src,
        visibility: req.body.visibility,
	})
	// If id valid, findById and append to videos
	try {
		const course = await Course.findById(id)
		course.videos.push(video)
		await course.save()
		if (!course) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			res.send({"video": video, "course": course})
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

router.delete('/:id/', async (req, res) => {
	// Add code here

	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id or resv_id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}	

	// If id and resv_id are valid, findById twice
	try {
		const video = await Video.findById(id)
		if (!video) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			res.send({video})
			await Video.deleteOne(video)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

module.exports = router