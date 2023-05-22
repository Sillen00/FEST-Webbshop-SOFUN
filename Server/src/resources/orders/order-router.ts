// GET /api/orders A L
// GET /api/orders/:id L
// PUT /api/orders/status/:id L
// POST /api/orders L

import express from 'express';
import { getAllOrders, getOrderById, updateOrderStatus, createOrder } from './order-controller';
import { authAdmin, authUser } from '../middlewares'

const orderRouter = express
  .Router()
  .get('/api/orders', authAdmin, getAllOrders)
  .get('/api/orders/:id', authAdmin, getOrderById)
  .put('/api/orders/status/:id', authAdmin, updateOrderStatus)
  .post('/api/orders', authUser, createOrder); 

export default orderRouter;