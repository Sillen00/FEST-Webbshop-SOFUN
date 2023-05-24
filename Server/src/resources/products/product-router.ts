// GET /api/products
// GET /api/products/:id
// POST /api/products A L V
// PUT /api/products/:id A L V
// DELETE /api/products/:id A L

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  productQuantity,
  updateProduct,
} from './product-controller';

const productRouter = express
  .Router()
  .get('/api/products', getAllProducts)
  .get('/api/products/:id', getProductById, productQuantity)
  .post('/api/products', authAdmin, authLogin, createProduct)
  .put('/api/products/:id', authAdmin, authLogin, updateProduct)
  .delete('/api/products/:id', authAdmin, authLogin, deleteProduct);

export default productRouter;
