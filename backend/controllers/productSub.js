const ErrorResponse = require('../utils/errorresponse')
const asyncHandler = require('../middelware/async')
const { transliterate, slugify } = require('transliteration')
// const slugify =require('slugify')

const ProductSub = require('../models/ProductSub')

//@desc     create  Product Category
//@route    Post/api/v1/productcategory
//@access   private
exports.create = asyncHandler(async (req, res) => {
	
	const { name, description, parent } = req.body;

	res.json(
		await new ProductSub({
			name,
			description,
			slug: slugify(name),
			parent,
		}).save()
	);
	// try {
		
	// }
	// catch (err) {
	// 	console.log(err);
	// 	res.status(400).send('Create sub category  failed');
	// }
});
//@desc     get  all sub category
//@route    get/api/v1/productcategory
//@access   puplic
exports.list = asyncHandler(async (req, res, next) => {
	res.json(await ProductSub.find({}).sort({ createdAt: -1 }).exec())
})

//@desc     get  ProductSubCategory with slug
//@route    get/api/v1/sub/:slug
//@access   private,puplic
exports.read = asyncHandler(async (req, res, next) => {
	let sub = await ProductSub.findOne({
		slug: req.params.slug,
	}).exec()
	res.status(201).json(sub)
})

//@desc     update  Product subCategory
//@route    put/api/v1/sub/:slug
//@access   private
exports.update = async (req, res, next) => {
	const { name, description, parent } = req.body
	try {
		let updated = await ProductSub.findOneAndUpdate(
			{ slug: req.params.slug },
			{
				name,
				description,
				parent,
				slug: slugify(name),
				tr: transliterate(name),
			},
			{ new: true },
		)
		res.status(200).json({
			message: 'updated sucessfuly',
			updated,
		})
	} catch (err) {
		console.log(err)
		res.status(400).send('Sub update failed')
	}
}

//@desc     remove  Product SubCategory
//@route    delete/api/v1/productcategory/:slug
//@access   private
exports.remove = asyncHandler(async (req, res, next) => {
	const deltedSub = await ProductSub.findOneAndDelete({
		slug: req.params.slug,
	})

	res.json(deltedSub)
	res.status(400).send('Sub delete failed')
})
