const express = require('express');
const { default: slugify } = require('slugify');
const Category = require('../models/category');
const router = express.Router();
const {addCategory,getCategories} = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
 
router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/getcategory',getCategories);


module.exports = router