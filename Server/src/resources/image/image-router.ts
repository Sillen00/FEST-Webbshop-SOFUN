// GET /api/image:id
// POST /api/image A L
// DELETE /api/image:id A L

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import { deleteImageById, getImageById, uploadImage } from './image-controller';

const imageRouter = express
  .Router()
  .get('/api/image/:id', getImageById)
  .post('/api/image', authAdmin, authLogin, uploadImage)
  .delete('/api/image/:id', authAdmin, authLogin, deleteImageById);

export default imageRouter;
