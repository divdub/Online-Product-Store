import express from 'express';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';
const router = express.Router();

//get all products
//get all products from the database
router.get("/",getProducts);

//create a product
router.post('/',createProduct);
//update a product
//put for updating all fields
//patch for updating some fields
router.put('/:id' , updateProduct );

//Delete a product
//delete a product by id
router.delete('/:id',deleteProduct);

export default router;