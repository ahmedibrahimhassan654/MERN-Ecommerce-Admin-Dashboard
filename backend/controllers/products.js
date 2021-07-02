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
      .populate('branches')
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

