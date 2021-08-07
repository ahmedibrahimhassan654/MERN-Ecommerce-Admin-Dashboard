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
      // number: products.length,
      // sucess: true,
      // msg: 'get All Products',
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
  const updated = await Product.findByIdAndUpdate({ _id: req.params._id },
    req.body, { new: true }).exec()

  res.json(updated)

})


// exports.list = asyncHandler(async (req, res) => {
//   const { sort, order, limit } = req.body
//   const products = await Product.find({})
//     .populate('category')
//     .populate('subs')
//     .sort([[sort, order]])
//     .limit(limit)
//     .exec()
//   res.json(products)

// })



//with pagination

exports.list = asyncHandler(async (req, res) => {
  const { sort, order, page } = req.body
  const currentPage = page || 1;
  const perPage = 3;

  const products = await Product.find({})
    .skip((currentPage - 1) * perPage)
    .populate('category')
    .populate('subs')
    .sort([[sort, order]])
    .limit(perPage)
    .exec()
  res.json(products)

})

exports.getProductsCount = asyncHandler(async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec()

  res.json(total)


})


//product rating /product/star/:productId

exports.productStar = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star, advantage, disAdvantage } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  )

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id, advantage, disAdvantage } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.advantage": advantage,
          "ratings.$.disAdvantage": disAdvantage
        }
      },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
})
exports.listeRelated = asyncHandler(async (req, res) => {



  const product = await Product.findById(req.params.productId)

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec()

  res.json(related)

})

//search/filter
const handlquery = async (req, res, query) => {

  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("cratedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }

}
//price filter

const handlPrice = async (req, res, price) => {
  try {

    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1]
      }
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("cratedBy", "_id name")
      .exec();
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}
const handlCategory = async (req, res, category) => {
  try {

    let products = await Product.find({
      category
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("cratedBy", "_id name")
      .exec();
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}
const handleStars = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        floorAverage: {
          $floor: { $avg: '$ratings.star' }
        }
      }
    },
    {
      $match: { floorAverage: stars }
    }
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) {
        console.log('aggrgate error', err);
      }
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("cratedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log('products aggregate error', err);
          res.json(products)
        });
    })
}

const handleSub = async (req, res, sub) => {
  try {

    let products = await Product.find({
      subs: sub
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("cratedBy", "_id name")
      .exec();
    res.json(products)
  } catch (err) {
    console.log(err);
  }
}

exports.searchFilters = asyncHandler(async (req, res) => {
  const { query, price, category, stars, sub } = req.body
  if (query) {
    console.log("handle query fucntion is called", query);
    await handlquery(req, res, query)
  }
  if (price && price !== undefined) {
    console.log("price value", price);
    await handlPrice(req, res, price)


  }
  if (category) {
    console.log("category value", category);
    await handlCategory(req, res, category)
  }
  if (stars) {
    console.log("stars value", stars);
    await handleStars(req, res, stars)
  }
  if (sub) {
    console.log("stars value", sub);
    await handleSub(req, res, sub)
  }

})