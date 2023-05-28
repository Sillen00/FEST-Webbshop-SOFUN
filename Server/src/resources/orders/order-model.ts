import mongoose from 'mongoose';

const adressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: adressSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  orderItems: {
    type: [orderItemSchema],
    required: true,
  },
});

export type Order = mongoose.InferSchemaType<typeof orderSchema>;
export const OrderModel = mongoose.model<Order>('Order', orderSchema);
