const express = require('express');
const { default: slugify } = require('slugify');
const Category = require('../models/category');
const router = express.Router();
const { addItemToCart  } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common-middleware');
 
router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);
// router.get('/category/getcategory',getCategories);


module.exports = router