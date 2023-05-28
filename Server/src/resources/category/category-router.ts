import express from 'express';
import { createCategory, getAllCategories, getAllContentOfCategory } from './category-controller';

const categoryRouter = express
.Router()
.post('/api/categories', createCategory)
.get('/api/categories', getAllCategories)
// .get('/api/categories/:id', getCategoryById)
.get('/api/categories/:categoryId', getAllContentOfCategory); 
// .get('/api/products/category/:categoryId', getAllProductsByCategory);
export default categoryRouter;