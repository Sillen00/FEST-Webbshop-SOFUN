import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../data";

interface Customer {
  name: string;
  email: string;
  city: string;
  phone: string;
  street: string;
  zipcode: number;
}
interface Order {
  products: CartItem[];
  customer: Customer;
}

interface OrderContextValue {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

export const OrderContext = createContext<OrderContextValue>(null as any);
export const useOrder = () => useContext(OrderContext);

interface Props {
  children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
  const [order, setOrder] = useState<Order>({
    products: [],
    customer: {
      name: "",
      email: "",
      city: "",
      phone: "",
      street: "",
      zipcode: 0,
    },
  });

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
