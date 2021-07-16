const express = require('express')

const router = express.Router({ mergeParams: true })

const { authCheck, adminCheck, ownerCheck } = require('../middelware/auth')
const {
   create,
   getAllProducts,
   remove,
   read,
   update,
   list,
   productsCount

} = require('../controllers/products')

router.post('/product', authCheck, ownerCheck, create)
router.get('/products/total', productsCount)
router.get('/products/:count', getAllProducts) //product/100
router.delete('/product/:_id', authCheck, ownerCheck, remove)
router.get('/product/:_id', read)
router.put('/product/:_id', authCheck, ownerCheck, update)
router.post('/products', list)

//for owner 


module.exports = router
