import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';

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
  _id: string;
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
  fetchAllOrders: () => Promise<void>;
  allOrders: Order[];
  getOrdersByUser: (userId: string) => Promise<Order[]>;
  updateOrderStatus: (orderId: string) => Promise<void>;
}

export const OrderContext = createContext<OrderContextValue>(null as any);
export const useOrder = () => useContext(OrderContext);

interface Props {
  children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const { isLoggedIn } = useUser();

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('/api/orders', { withCredentials: true });

      if (response.status === 200) {
        setAllOrders(response.data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllOrders();
    }
  }, [isLoggedIn]);

  //
  // Create a new order in the database and reduce the stock level for each ordered item in the order.
  //
  const createOrder = async (newOrder: Order) => {
    try {
      console.log('Creating order:', newOrder);

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

  const getOrdersByUser = async (userId: string) => {
    try {
      const response = await axios.get(`/api/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by user:', error);
      return [];
    }
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      const response = await axios.put(`/api/orders/status/${orderId}`);
      if (response.status === 200) {
        const updatedOrder = response.data;
        setAllOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
        );
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        allOrders,
        createOrder,
        fetchAllOrders,
        getOrdersByUser,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
