import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


//@ desc fetch all products
//@route GET /api/products
//@access Public route
const getProducts = asyncHandler(async(req,res) => {
    
    const products = await Product.find({}); //We pass an empty object which gives use every thing in the db.   
    res.json(products)

});

//@ desc fetch single products
//@route GET /api/products/:id
//@access Public route
const getProductById = asyncHandler(async(req,res) => {
    
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product Not Found');
    }

});

export {getProducts,getProductById}