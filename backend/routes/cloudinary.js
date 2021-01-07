const express = require('express')

const router = express.Router()

const { authCheck, adminCheck ,ownerCheck} = require('../middelware/auth')
const {
	create,
	remove

} = require('../controllers/cloudinary')

router.post('/addimages', authCheck, ownerCheck, create)

router.delete('/deleteimag', authCheck, ownerCheck, remove)

//for owner 


module.exports = router