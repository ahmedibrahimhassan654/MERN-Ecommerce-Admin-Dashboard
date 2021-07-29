const ErrorResponse = require('../utils/errorresponse')
const asyncHandler = require('../middelware/async')
const { transliterate, slugify } = require('transliteration')
// const slugify =require('slugify')

const ProductCategory = require('../models/ProductCategory')
const ProductSub = require('../models/ProductSub');
const Product = require('../models/Product')
//@desc     create  Product Category
//@route    Post/api/v1/productcategory
//@access   private
exports.create = async (req, res) => {
	try {
		const { name, description } = req.body

		res.json(
			await new ProductCategory({
				name,
				description,
				slug: slugify(name),
			}).save(),
		)
	} catch (err) {
		console.log(err)
		res.status(400).send('Create category failed')
	}
}
//@desc     get  all Product Category
//@route    get/api/v1/productcategory
//@access   puplic
exports.list = asyncHandler(async (req, res, next) => {
	res.json(await ProductCategory.find({}).sort({ createdAt: -1 }).exec())
})

//@desc     get  ProductCategory with slug
//@route    get/api/v1/productcategory/:slug
//@access   private,puplic
exports.read = asyncHandler(async (req, res, next) => {

	const category = await ProductCategory.findOne({ slug: req.params.slug }).exec()

	const products = await Product.find({ category })
		.populate('category')
		.populate('subs')
		.populate('cratedBy')
		.exec()

	res.json({
		category,
		products
	})
})

//@desc     update  Product Category
//@route    put/api/v1/productcategory/:slug
//@access   private
exports.update = asyncHandler(async (req, res, next) => {
	const { name, description } = req.body
	let updated = await ProductCategory.findOneAndUpdate(
		{ slug: req.params.slug },
		{ name, description, slug: slugify(name), tr: transliterate(name) },
		{ new: true },
	)
	res.status(200).json({
		message: 'updated sucessfuly',
		updated,
	})
})
//@desc     remove  Product Category
//@route    delete/api/v1/productcategory/:slug
//@access   private
exports.remove = asyncHandler(async (req, res, next) => {
	const deltedcat = await ProductCategory.findOneAndDelete({
		slug: req.params.slug,
	})

	res.json(deltedcat)
})

//@desc     get product subs acording to category id 
//@route   GET /productcategory/subs/:_id
//@access   private
exports.getsubs = asyncHandler(async (req, res, next) => {
	const subs = await ProductSub.find(
		{ parent: req.params._id }
	)
	//.exec((err, subs) => {
	//if (err) console.log(err);
	res.status(200).json({
		message: `ProductSubs for category parent ${req.params._id} is equal ${subs.length}`,
		subs,
	});
	// res.json(subs);
});
//})