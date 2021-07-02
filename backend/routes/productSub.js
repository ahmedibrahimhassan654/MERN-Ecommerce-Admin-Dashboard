const express = require('express')

const router = express.Router()
const { authCheck, adminCheck, ownerCheck } = require('../middelware/auth')
const {
	create,
	read,
	update,
	remove,
	list,
} = require('../controllers/productSub')

router.post('/sub', authCheck, ownerCheck, create)
router.get('/sub/:slug', read)
router.get('/subs', list)

router.put('/sub/:slug', authCheck, ownerCheck, update)
router.delete('/sub/:slug', authCheck, ownerCheck, remove)

module.exports = router
