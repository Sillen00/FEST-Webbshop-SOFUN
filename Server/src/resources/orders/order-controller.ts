// getAllOrders()
// getOrderById()
// updateOrderStatus()
// createOrder()

import { Request, Response } from 'express';
import * as Yup from 'yup';
import { OrderModel } from './order-model';

const addressSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  zipCode: Yup.number().required(),
  city: Yup.string().required(),
  phoneNumber: Yup.number().required(),
});

const orderItemSchema = Yup.object().shape({
  productID: Yup.string().required(),
  quantity: Yup.number().required(),
});

const orderSchema = Yup.object().shape({
  userID: Yup.string().required(),
  totalPrice: Yup.number().required(),
  deliveryAddress: addressSchema.required(),
  isShipped: Yup.boolean(),
  orderItems: Yup.array().of(orderItemSchema).required(),
});

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}

export async function getOrdersByUser(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const orders = await OrderModel.find({ userID: userId });
    if (!orders) {
      return res.status(404).json({ error: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}


export async function updateOrderStatus(req: Request, res: Response) {
  console.log('Placeholder för updateOrderStatus');
}

export async function createOrder(req: Request, res: Response) {
  try {
    const validatedOrder = await orderSchema.validate(req.body);
    const newOrder = new OrderModel(validatedOrder);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
}
