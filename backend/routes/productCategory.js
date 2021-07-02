const express = require('express');

const router = express.Router();
const { authCheck, adminCheck, ownerCheck } = require('../middelware/auth');
const { create, read, update, remove, list, getsubs } = require('../controllers/productCategory');

router.post('/productcategory', authCheck, ownerCheck, create);
router.get('/productcategory/:slug', read);
router.get('/productcategories', list);
router.put('/productcategory/:slug', authCheck, ownerCheck, update);
router.delete('/productcategory/:slug', authCheck, ownerCheck, remove);
router.get('/productcategory/subs/:_id', getsubs);


module.exports = router;
