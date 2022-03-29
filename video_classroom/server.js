/* server.js - Express + Next server*/
'use strict';
const log = console.log

const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
	const server = express()

	// will use an 'environmental variable', process.env.PORT, for deployment.
	const port = process.env.PORT || 5000
		
	server.get('*', (req, res) => {
		return handle(req, res)
	})
    
	server.listen(port, (err) => {
		if (err) throw err
		log(`Listening on port ${port}...`)
	})

	server.post('/api/catalogue', async (req, res) => {
		log('Big Chungus Amongus console')
		res.status(500).send("Big Chungus Amongus") // REMOVE BEFORE SUBMISSION: for testing purposes only
	})

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})