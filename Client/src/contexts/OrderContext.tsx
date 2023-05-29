import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: number;
  city: string;
  phoneNumber: number;
}

interface OrderItem {
  productID: string;
  quantity: number;
}

export interface Order {
  userID: string;
  totalPrice: number;
  deliveryAddress: DeliveryAddress;
  isShipped: boolean;
  orderItems: OrderItem[];
}

interface OrderContextValue {
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  createOrder: (order: Order) => Promise<void>;
  getAllOrders: () => Promise<Order[]>;
  getOrdersByUser: (userId: string) => Promise<Order[]>;
}

export const OrderContext = createContext<OrderContextValue>(null as any);
export const useOrder = () => useContext(OrderContext);

interface Props {
  children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
  const [order, setOrder] = useState<Order | null>(null);

  //
  // Create a new order in the database and reduce the stock level for each ordered item in the order.
  //
  const createOrder = async (newOrder: Order) => {
    try {
      console.log('Creating order:', newOrder);

      // Reduce stock level for each ordered item
      const orderedItems = newOrder.orderItems;
      for (const item of orderedItems) {
        const { productID, quantity } = item;

        // Retrieve the product that you want to order from the database
        const productResponse = await axios.get(`/api/products/${productID}`);
        const product = productResponse.data;
        // Update the stock level
        const updatedStockLevel = product.stockLevel - quantity;

        // Save the updated stock level back to the database
        await axios.put(`/api/products/${productID}`, { stockLevel: updatedStockLevel });
      }

      const response = await axios.post('/api/orders', newOrder);

      if (response.status === 201) {
        console.log('Order created:', response.data);
        setOrder(response.data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  //
  // Get all orders from the database.
  //

  const getAllOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  //
  // Get all orders for a specific user from the database.
  //

  const getOrdersByUser = async (userId: string) => {
    try {
      const response = await axios.get(`/api/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by user:', error);
      return [];
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        createOrder,
        getAllOrders,
        getOrdersByUser,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
