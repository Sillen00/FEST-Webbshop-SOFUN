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
  console.log('Placeholder för getAllOrders');
}

export async function getOrderById(req: Request, res: Response) {
  console.log('Placeholder för getOrderById');
}

export async function updateOrderStatus(req: Request, res: Response) {
  console.log('Placeholder för updateOrderStatus');
}

export async function createOrder(req: Request, res: Response) {
  console.log('Placeholder för createOrder');
}
