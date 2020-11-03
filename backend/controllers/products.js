const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorresponse')

const asyncHandler = require('../middelware/async')
const Branch = require('../models/Branch')

//@desc     get single
//@route   GET/api/v1/products
//@route   GET/api/v1/branches/:branchId/products
//@access  puplic

exports.getProducts = asyncHandler(async (req, res, next) => {
  if (req.params.branchId) {
    const products = await Product.find({ branch: req.params.branchId })

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

//@desc     get single
//@route   GET/api/v1/products/:id
//@route
//@access  puplic
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'branch',
  })

  if (!product) {
    return next(new ErrorResponse(`no product with that id ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})
//@desc     creat product for specific branch
//@route   GET/api/v1/branch/:branchId/products
//@access  private
exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.branch = req.params.branchId

  const branch = await Branch.findById(req.params.branchId)
  if (!branch) {
    return next(
      new ErrorResponse(`no branch with that id ${req.params.branchId}`)
    )
  }
  if (branch.present === 'product') {
    const product = await Product.create(req.body)

    res.status(200).json({
      success: true,
      data: product,
    })
  }

  next(new ErrorResponse(`you cant add product to branch present service`))

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@desc    update Product
//@route   put/api/v1/products/:productId
//@access  private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    next(
      new ErrorResponse(`there is no product with that id ${req.params.id}`),
      404
    )
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@desc    delete Product
//@route   delete/api/v1/products/:productId
//@access  private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    next(
      new ErrorResponse(`there is no product with that id ${req.params.id}`),
      404
    )
  }
  await product.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})



