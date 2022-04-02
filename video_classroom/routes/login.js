var express = require('express')
var router = express.Router()

const { User } = require('../models/user')
const log = console.log

const { mongoChecker } = require('./helpers/mongo_helpers')


// const bodyParser = require('body-parser')
// router.use(bodyParser.json())

/* 
Create a new user; logging in should be done seperately
Body should be of the following format:
{
    username: string
    password: string
    permission: string (either 'user' or 'admin')
}
*/
router.post('/', mongoChecker, async (req, res) => {
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
            username: newUser.get('username'),
            permission: newUser.get('permission')
        })
	} catch (error) {
        log(error)
        res.status(400).send('Bad Request')
	}
})

/* 
Login as a user
Body should be of the following format:
{
    username: string
    password: string
}
*/
router.get('/', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
        if (username === ''){
            //logout
            req.session.destroy()
			res.status(200).send()
            res.redirect('/catalogue')
        } else {
            const user = await User.findByUsernamePassword(username, password);
            if (!user) {
                res.status(404).send('Username and password combination not found')
            } else {
                req.session.user = user.get('_id');
                req.session.username = user.get('username')
                req.session.permission = user.get('permission')
                res.status(200).json(user)
            }
        }
    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

/* 
Delete a user
Body should be of the following format:
{
    username: string
}
*/
router.delete('/', mongoChecker, async (req, res) => {
	const username = req.body.username

    try {
        const user = await User.findUser(username);
        
        //admins can delete any non-admin user, users may only delete themselves
        if (!user) {
            res.status(404).send('User not found')
        } else {
            if (!((req.session.permission === 'admin' && user.get('permission') !== 'admin') || req.session.username === username)){
                res.status(401).send('Unauthorized to delete this user.')
            }
            const isDeletingSelf = username === user.get('username')
            await Test.deleteOne({ _id: user.get('_id') });

            if (isDeletingSelf){
                req.session.destroy()
                res.redirect('/catalogue')
            }
            res.status(200).json(user)
        }

    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

/* 
Modify the signed in user's info
Body should be of the following format:
{
    property 1: type 1
    ...
    property n: type n
}
*/
router.patch('/', mongoChecker, async (req, res) => {
	const username = req.session.username

    try {
        const user = await User.findUser(username);

        if (!user) {
            res.status(404).send('User not found')
        } else {
            for (const property in req.body) {
                if (property !== '_id' && user.get(property) != undefined){
                    user.set(property, req.body[property])
                }
            }

			user.save()
            req.session.username = user.get('username')
            res.status(200).json(user)
        }
    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

/* 
Get a user's info
*/
router.get('/:username', mongoChecker, async (req, res) => {
	const username = req.params.username

    try {
        const user = await User.findUser(username);

        if (!user) {
            res.status(404).send('User not found')
        } else {
            const cleanedUser = {}

            for (const property in user) {
                if (property !== 'password'){
                    cleanedUser[property] = user.get(property)
                }
            }

            res.status(200).json(cleanedUser)
        }
    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

module.exports = router