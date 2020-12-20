const express = require('express')

const router = express.Router({ mergeParams: true })

const { authCheck, adminCheck ,ownerCheck} = require('../middelware/auth')
const {
	create,
	getAllProducts,

} = require('../controllers/products')

router.post('/product', authCheck, ownerCheck, create)
router.get('/products', getAllProducts)

//for owner 


module.exports = router
