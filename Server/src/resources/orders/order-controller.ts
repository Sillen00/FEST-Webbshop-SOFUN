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
    const orders = await OrderModel.find({ userID: userId }).populate('orderItems.productID');
    // const products = await ProductModel.find({ _id: { $in: orders.map((order) => order.orderItems.productID) }});
    // orders.forEach((order) => {
    //   order.orderItems.forEach((orderItem) => {
    //     const product = products.find((product) => product._id === orderItem.productID);
    //     orderItem.product = product;
    //   });
    // });
    if (!orders) {
      return res.status(404).json({ error: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  const orderId = req.params.id;
  try {
    const order = await OrderModel.findByIdAndUpdate(orderId, { isShipped: true }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    await orderSchema.validate(req.body);
    const newOrder = (await OrderModel.create(req.body)).populate("orderItems.productID");
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    if (error instanceof Yup.ValidationError) {
      res.status(400).json(error.errors);
    } else {
      res.status(500).json({ message: 'Error creating order' });
    }
  }
}
