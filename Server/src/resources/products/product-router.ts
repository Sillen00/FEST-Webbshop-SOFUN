import express from 'express';
import { authAdmin } from '../middlewares';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from './product-controller';

const productRouter = express
  .Router()
  .get('/api/products', getAllProducts)
  .get('/api/products/:id', getProductById)
  .post('/api/products', authAdmin, createProduct)
  .put('/api/products/:id', authAdmin, updateProduct)
  .delete('/api/products/:id', authAdmin, deleteProduct);

export default productRouter;
