const express = require('express')

const {
	getMyBranches,
	getAllBranches,
	createBranche,
	getBranch,
	updateBranch,
	deleteBranch,
	getBranchsInRadius,
	uploadBranchImage,
	activateBranch,
	addManger,
	deleteManger,
	addEmployer,
	deleteEmployer,
} = require('../controllers/branches')

const productRouter = require('./products')

// const Branch = require('../models/Branch.js')

const advancedResults = require('../middelware/advancedResult.js')
const {
	authCheck,
	adminCheck,
	mangerCheck,
	employeeCheck,
	ownerCheck,
} = require('../middelware/auth')

const router = express.Router()

// //Owner Checks
// router.get('/branches/owner', authCheck, ownerCheck, getMyBranches)

// router.post('/branches/owner', authCheck, ownerCheck, createBranche)
// //Admin Checks
// router.post('/branches/admin', authCheck, adminCheck, createBranche)
// //mangers check

// router.get('/branches/manger', authCheck, mangerCheck, getMyBranches)

// //employess check

// router.get('/branches/employee', authCheck, employeeCheck, getMyBranches)

// //Re-route into other resource routers

// router.use('/:branchId/products', productRouter)

// //branches routes
// router.route('/radius/:zipcode/:distance').get(getBranchsInRadius)

// router
// 	.route('/')
// 	.get(advancedResults(Branch, 'products'), getAllBranches)
// 	.post(protect,roleCheck('owner','admin') ,createBranche)

// router
// 	.route('/:id')
// 	.get(getBranch)
// 	.put(protect, updateBranch)
// 	.delete(protect, deleteBranch)

// router.route('/:id/photo').put(protect, uploadBranchImage)
// router.route('/:id/activate').put(protect, activateBranch)
// router.route('/:id/manger').put(protect, addManger)
// router.route('/:id/emp').put(protect, addEmployer)
// router.route('/:id/manger/:manger_id').delete(protect, deleteManger)
// router.route('/:id/employer/:employer_id').delete(protect, deleteEmployer)

module.exports = router
