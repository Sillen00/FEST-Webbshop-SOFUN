// GET /api/image:id
// POST /api/image A L 
// DELETE /api/image:id A L

import express from 'express';
import { getImageById, uploadImage, deleteImageById } from './image-controller';
import { authAdmin } from '../middlewares';

const imageRouter = express
  .Router()
  .get('/api/image/:id', getImageById)
  .post('/api/image', authAdmin, uploadImage)
  .delete('/api/image/:id', authAdmin, deleteImageById);

export default imageRouter;