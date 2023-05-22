// GET /api/products
// GET /api/products/:id
// POST /api/products A L V
// PUT /api/products/:id A L V
// DELETE /api/products/:id A L

import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, productQuantity } from './product-controller';
import { authAdmin } from '../middlewares';


const productRouter = express
  .Router()
  .get('/api/products', getAllProducts)
  .get('/api/products/:id', getProductById, productQuantity)
  .post('/api/products', authAdmin, createProduct)
  .put('/api/products/:id', authAdmin, updateProduct)
  .delete('/api/products/:id', authAdmin, deleteProduct);

export default productRouter;
