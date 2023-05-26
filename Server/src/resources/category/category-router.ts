import express from 'express';
import { createCategory } from './category-controller';

const categoryRouter = express
 .Router()
 .post('/api/categories', createCategory);

export default categoryRouter;