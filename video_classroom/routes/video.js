var express = require('express')
var router = express.Router()

const { Video } = require('../models/video')

router.post('/video', (req, res) => {
    console.log(req.body.username)

    const video = new Video({
		name: req.body.name,
		desc: req.body.desc,
		creator: req.user._id
	})
})

module.exports = router