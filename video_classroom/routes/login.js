var express = require('express')
var router = express.Router()

const { User } = require('../models/user')
const log = console.log

const { mongoChecker } = require('./helpers/mongo_helpers')


// const bodyParser = require('body-parser')
// router.use(bodyParser.json())

router.post('/signup', mongoChecker, async (req, res) => {
    // log(req.body.username)

	try {
        const userExists = await User.findUser(req.body.username);
        if (userExists) {
            res.status(400).send('Username already exists')
            return
        }

        console.log(req.body.permission);
        
        // Create a new user
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            permission: req.body.permission,
        })

		const newUser = await user.save()

		// Save the new user
		res.status(200).json({
            username: newUser.username,
            permission: newUser.permission
        })
	} catch (error) {
        log(error)
        res.status(400).send('Bad Request')
	}
})

router.post('/login', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
		const user = await User.findByUsernamePassword(username, password);
		if (!user) {
			res.status(404).send('Username and password combination not found')
        } else {
            req.session.user = user._id;
            req.session.username = user.username
            req.session.permission = user.permission
			res.status(200).json(user)
        }
    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

module.exports = router