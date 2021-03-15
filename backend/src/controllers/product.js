const Product = require('../models/product');
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const { default: slugify } = require('slugify');


exports.createProduct = (req,res)=>{
    // res.status(200).json({file: req.files, body:req.body})
    const {
        name,price,description,category,quantity,createdBy
    } = req.body;
    let productPictures = [];
    if(req.files.length>0){
        productPictures =  req.files.map(file=> {
            return { img: file.filename}
        });
    }

    const product = new Product({
        name:name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy:req.user._id
    });

    product.save(((error,product)=>{
        if(error){
            return res.status(400).json({
               error
            })
        }
        if(product){
            res.status(200).json({ product });
        }
    }))
    
}

