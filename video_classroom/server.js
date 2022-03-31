/* server.js - Express + Next server*/
'use strict';
const log = console.log

const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const bodyParser = require('body-parser')


    
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

	server.use(bodyParser.json())

	const loginRouter = require('./routes/login');
	server.use('/api/id', loginRouter);

	// server.use(session({
	// 	secret: 'our hardcoded secret', // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
	// 	cookie: { // the session cookie sent, containing the session id.
	// 		expires: 600000, // 10 minute expiry
	// 		httpOnly: true // important: saves it in only browser's memory - not accessible by javascript (so it can't be stolen/changed by scripts!).
	// 	},
	
	// 	// Session saving options
	// 	saveUninitialized: false, // don't save the initial session if the session object is unmodified (for example, we didn't log in).
	// 	resave: false, // don't resave an session that hasn't been modified.
	// }));

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})