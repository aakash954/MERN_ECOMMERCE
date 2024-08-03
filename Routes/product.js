import express from 'express'
import {addProduct, getProductById, getProducts, updateProductById,deleteProductById} from '../Controllers/product.js';

const router = express.Router();

//add product
router.post('/add',addProduct)

//get product
router.get('/all',getProducts)

//get product by ID
router.get('/:id',getProductById)

//update product by id
router.put('/:id',updateProductById)

//update product by id
router.delete('/:id',deleteProductById)

export default router
