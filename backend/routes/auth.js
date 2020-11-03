const express = require('express')

const router = express.Router()

//middelware
const {
	authCheck,
	
	adminCheck,
	ownerCheck,
	mangerCheck,
   employeeCheck
   
   
} = require('../middelware/auth')

//import controler
const { createOrUpdateUser, curentUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/curent-user', authCheck, curentUser)


router.post('/curent-admin', authCheck, adminCheck, curentUser)
router.post('/curent-owner', authCheck, ownerCheck, curentUser)
router.post('/curent-manger', authCheck, mangerCheck, curentUser)
router.post('/curent-employee', authCheck, employeeCheck, curentUser)

// router.post(
// 	'/rolecheck',
// 	authCheck,
// 	roleCheck('owner', 'admin', 'manger', 'employee'),
// 	curentUser,
// )
module.exports = router
