import express from 'express';
import { authAdmin } from '../middlewares';
import { deleteImageById, getImageById, uploadImage } from './image-controller';

const imageRouter = express
  .Router()
  .get('/api/image/:id', getImageById)
  .post('/api/image', authAdmin, uploadImage)
  .delete('/api/image/:id', authAdmin, deleteImageById);

export default imageRouter;
