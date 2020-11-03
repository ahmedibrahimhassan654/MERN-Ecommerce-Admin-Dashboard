const ErrorResponse = require('../utils/errorresponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  //log to console for dev
  error.message = err.message
  console.log(err)

  //mongoose bad object id
  if (err.name === 'CastError') {
    const message = `model not found with ${err.path} of ${err.value}`
    error = new ErrorResponse(message, 400)
  }
  //mongose duplicate key
  if (err.code === 11000) {
    const message = `duplicate field value entered `
    error = new ErrorResponse(message, 400)
  }

  //mongose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorResponse(message, 400)
  }
  if (err.value === 'ca') {
		const message = `the ${err.path} is ${err.kind} please change it  `
		error = new ErrorResponse(message, 400)
	}

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'server Error',
  })
}

module.exports = errorHandler
