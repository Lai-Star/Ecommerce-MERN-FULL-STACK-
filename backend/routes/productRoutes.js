import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();
//@ desc fetch all products
//@route GET /api/products
//@access Public route
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({}); //We pass an empty object which gives use every thing in the db.   
  res.json(products)
}));




//@ desc fetch single products
//@route GET /api/products/:id
//@access Public route
router.get(
  '/:id',
  asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product Not Found');
    }

  })
  );



export default router;