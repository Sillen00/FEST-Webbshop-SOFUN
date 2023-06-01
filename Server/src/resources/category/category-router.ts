import express from 'express';
import { createCategory, getAllCategories, getProductsByCategory } from './category-controller';

const categoryRouter = express
.Router()
.post('/api/categories', createCategory)
.get('/api/categories', getAllCategories)
.get('/api/categories/:id', getProductsByCategory); 

export default categoryRouter;