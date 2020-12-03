const express = require('express')

const router = express.Router()
const { authCheck, adminCheck ,ownerCheck} = require('../middelware/auth')
const {
	create
} = require('../controllers/products')

router.post('/product', authCheck, ownerCheck, create)

module.exports = router
