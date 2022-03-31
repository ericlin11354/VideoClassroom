var express = require('express')
var router = express.Router()

router.post('/login', (req, res) => {
    console.log(req.query.username)

    res.json({
        "status": "Success"
    })
})

module.exports = router