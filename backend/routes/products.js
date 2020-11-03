const express = require('express')

// const {
// 	getProducts,
// 	getProduct,
// 	addProduct,
// 	updateProduct,
// 	deleteProduct,
// } = require('../controllers/products')

//const { authorize, protect } = require('../middelware/auth');

// const Product = require('../models/Product.js')
// const advancedResults = require('../middelware/advancedResult.js')

const router = express.Router({ mergeParams: true })



// router
// 	.route('/')
// 	.get(
// 		advancedResults(Product, {
// 			path: 'branch',
// 			select:
// 				'name description owner present acceptedByAdmin averageRating transportationAvailable logo',
// 		}),
// 		getProducts,
// 	)
// 	.post( addProduct)
// router
// 	.route('/:id')
// 	.get(getProduct)
// 	.put( updateProduct)
// 	.delete( deleteProduct)

module.exports = router
