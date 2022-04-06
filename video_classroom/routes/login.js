var express = require('express')
var router = express.Router()

const { User } = require('../models/user')
const log = console.log

const { mongoChecker } = require('./helpers/mongo_helpers')
const { getRootComment, deleteComment } = require('./helpers/comment_helper')

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dqdagc8tg',
    api_key: '214252355416824',
    api_secret: '4V6GAZL1un-RSElUrI_dsURv2GI'
});

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

        // console.log(req.body.permission);
        
        // Create a new user
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            permission: req.body.permission,
            image_id: 'Blank-Profile-Image_m3msu6',
            image_url: 'https://res.cloudinary.com/dqdagc8tg/image/upload/v1649200915/Blank-Profile-Image_m3msu6.png'
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
router.post('/login', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
        if (username === ''){
            //logout
            req.session.destroy()
            res.redirect('/catalogue')
			res.status(200).send()
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

    console.log(username)

    try {
        const user = await User.findUser(username);
        
        //admins can delete any non-admin user, users may only delete themselves
        if (!user) {
            res.status(404).send('User not found')
        } else {
            if (!((req.session.permission === 'admin' && user.get('permission') !== 'admin') || req.session.username === username)){
                res.status(401).send('Unauthorized to delete this user.')
                return
            }
            const isDeletingSelf = req.session.username === user.get('username')
            await User.deleteOne({ _id: user.get('_id') });

            
		    const comments = await Comment.findByUser(username)
            for (const element of comments) {
                await deleteComment(element)
            }

            if (isDeletingSelf){
                req.session.destroy()
            }
            res.status(200).send()
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
// not sure why, but a patch request always returned a 400 without entering this route,
// so I'm using post instead
router.post('/edit/', mongoChecker, multipartMiddleware, async (req, res) => {
    // log(req);
    log('body', req.body)
    log('session', req.session)
    log('files', req.files);
	const username = req.session.username

    try {
        const user = await User.findUser(username);

        if (!user) {
            res.status(404).send('User not found')
        } else {
            for (const property in req.body) {
                if (property !== '_id'){
                    user.set(property, req.body[property])
                }
            }

            cloudinary.v2.uploader.upload(
                req.files.image.path,
                { resource_type: 'image' },
                function(error, result) {
                    if (error){
                        res.status(400).send(error)
                    } else {

                        if ('public_id' in result) {
                            // console.log('lets set image')
                            // console.log(result.public_id, result.url)
                            user.set('image_id', result.public_id)
                            user.set('image_url', result.url)
                        }
    
                    }
                    
                    user.save()
                    req.session.username = user.get('username')
                    res.status(200).json(user)
                }
            )
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

/* 
Get all user's info
*/
router.get('/', mongoChecker, async (req, res) => {

    try {
        const users = await User.find();

        for (const property in users) {
            if (property === 'password'){
                users[property].set(property, '')
            }
        }

        res.status(200).send(users)
    } catch (error) {
        log(error)
        res.status(400).send('Bad Request')
    }

})

module.exports = router