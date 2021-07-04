const express = require('express')

const router = express.Router({ mergeParams: true })

const { authCheck, adminCheck ,ownerCheck} = require('../middelware/auth')
const {
	create,
   getAllProducts,
   remove,read

} = require('../controllers/products')

router.post('/product', authCheck, ownerCheck, create)

router.get('/products/:count', getAllProducts) //product/100
router.delete('/product/:_id', authCheck, ownerCheck, remove)
router.get('/product/:_id', read)
//for owner 


module.exports = router
