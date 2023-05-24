// GET /api/orders A L
// GET /api/orders/:id L
// PUT /api/orders/status/:id L
// POST /api/orders L

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from './order-controller';

const orderRouter = express
  .Router()
  .get('/api/orders', authAdmin, getAllOrders)
  .get('/api/orders/:id', authAdmin, getOrderById)
  .put('/api/orders/status/:id', authAdmin, updateOrderStatus)
  .post('/api/orders', authLogin, createOrder);

export default orderRouter;
