const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorresponse')
const { transliterate, slugify } = require('transliteration')
const asyncHandler = require('../middelware/async')
const Branch = require('../models/Branch')
const User = require('../models/User')


//@desc     creat product
//@route   GET/api/v1/product
//@access  owner
exports.create = asyncHandler(

  async (req, res, next) => {

    const { email } = req.user;


    // FIND USER FROM OUR DATABASE BY EMAIL
    const userFromDb = await User.findOne({ email }).exec();
    // req.body.slug = slugify(req.body.title)
    req.body.cratedBy = userFromDb

    const newProduct = await new Product(req.body).save()
    res.json(newProduct)



  }
)


// '/products/:count'

exports.getAllProducts = asyncHandler(

  async (req, res, next) => {

    const products = await Product.find()
      .limit(parseInt(req.params.count))

      .populate('category')
      .populate('subs')
      .populate('cratedBy')
      .sort([["createdAt", "desc"]])
      .exec()

    console.log(products);
    res.status(200).json({
      number: products.length,
      sucess: true,
      msg: 'get All Products',
      products

    })

  }
)

exports.remove = asyncHandler(async (req, res, next) => {
  const deletdProduct = await Product.findOneAndRemove({ _id: req.params._id }).exec();

  res.json(deletdProduct)


})
exports.read = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params._id })
    .populate('category')
    .populate('subs')
    .populate('cratedBy')
    .exec()
  res.json(product)

})

exports.update = asyncHandler(async (req, res) => {
  const updated = await Product.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true }).exec()

  res.json(updated)

})


exports.list = asyncHandler(async (req, res) => {
  const { sort, order, limit } = req.body
  const products = await Product.find({})
    .populate('category')
    .populate('subs')
    .sort([[sort, order]])
    .limit(limit)
    .exec()
  res.json(products)

})
exports.productsCount = asyncHandler(async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec()

  res.json(total)


})