const express = require('express')

const router = express.Router({ mergeParams: true })

const { authCheck, adminCheck ,ownerCheck} = require('../middelware/auth')
const {
	create,
   getAllProducts,
   remove

} = require('../controllers/products')

router.post('/product', authCheck, ownerCheck, create)

router.get('/products/:count', getAllProducts) //product/100
router.delete('/product/:_id', authCheck, ownerCheck, remove)
//for owner 


module.exports = router
