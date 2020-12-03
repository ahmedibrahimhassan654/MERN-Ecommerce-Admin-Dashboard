const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorresponse')
const { transliterate, slugify } = require('transliteration')
const asyncHandler = require('../middelware/async')
const Branch = require('../models/Branch')


//@desc     creat product
//@route   GET/api/v1/product
//@access  owner
exports.create = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  req.body.slug = slugify(req.body.title)
  const newProduct = await new Product(req.body).save()
  res.json(newProduct)
  
})

