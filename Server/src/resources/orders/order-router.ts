// GET /api/orders A L
// GET /api/orders/:id L
// PUT /api/orders/status/:id L
// POST /api/orders L

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import { createOrder, getAllOrders, getOrdersByUser, updateOrderStatus } from './order-controller';

const orderRouter = express
  .Router()
  .get('/api/orders', authAdmin, getAllOrders)
  .get('/api/orders/user/:id', authLogin, getOrdersByUser)
  .put('/api/orders/status/:id', authLogin, updateOrderStatus)
  .post('/api/orders', authLogin, createOrder);

export default orderRouter;
