/* user mongoose model */
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const log = console.log

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 4,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 4,
		trim: true,
	},
	name: { type: String },
	title: { type: String },
	description: { type: String },
    birthdate: { type: String },
    // reviews: '420 (4.5 stars)',
    reviews: [Number],
    comments: {type: [String]},
    permission: { 
		type: String,
		required: function() {
			return this.permission === 'user' || this.permission === 'admin';
		}
	},
	picture: { type: String }
})

UserSchema.statics.findUser = function(username) {
	const User = this

	return User.findOne({ username: username }).then((user) => {
		return new Promise((resolve, reject) => {
			if (!user) {
				resolve(false)
			}
	
			resolve(user)
		})
    })
}

UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance
	console.log('asdsad')

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				log(hash)
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this

	return User.findOne({ username: username }).then((user) => {
		return new Promise((resolve, reject) => {
			if (!user) {
				resolve(false)
			}

			bcrypt.compare(password, user.password, (err, result) => {
				if (err) {
					reject()
				}
				if (result) {
					resolve(user)
				} else {
					resolve(false)
				}
			})
		})

	})
}


const User = mongoose.model('User', UserSchema) 
module.exports = { User }