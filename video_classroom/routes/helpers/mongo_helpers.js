// some helpers for mongo
const log = console.log

const mongoose = require('mongoose')
// const { mongoose } = require('../../db/mongoose')

module.exports = {
    // middleware for mongo connection error for routes that need it
    mongoChecker: (req, res, next) => {
        // check mongoose connection established.
        if (mongoose.connection.readyState != 1) {
            log('Issue with mongoose connection')
            log(mongoose.connection.readyState)
            res.status(500).send('Internal server error')
            return;
        } else {
            next()
        }
    },
    // checks for first error returned by promise rejection if Mongo database suddently disconnects
    isMongoError: function(error) { 
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }
}