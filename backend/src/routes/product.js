const express = require('express');
const { requireSignin , adminMiddleware} = require('../common-middleware');
const { createProduct ,getProductsBySlug} = require('../controllers/product');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer')
const shortid = require('shortid');
const path = require('path');

const Storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer( { storage:Storage });
router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.get('/products/:slug',getProductsBySlug)


// router.get('/category/getcategory',getCategories);

module.exports = router;