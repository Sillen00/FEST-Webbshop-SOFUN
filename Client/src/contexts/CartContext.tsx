import { createContext, ReactNode, useContext } from "react";
import { CartItem } from "../data";
import { useLocalStorageState } from "../hooks/useLocalstorage";

interface ContextValue {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addProduct: (product: CartItem) => void;
  removeProduct: (product: CartItem) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ContextValue>(null as any);
export const useCart = () => useContext(CartContext);

interface Props {
  children: ReactNode;
}

export default function ShoppingCart({ children }: Props) {
  const [cart, setCart] = useLocalStorageState<CartItem[]>([], "cart");

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product: CartItem) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
    }
  };

  function removeProduct(product: CartItem) {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex === -1) {
        return prevCart;
      }

      const updatedCart = [...prevCart];

      if (updatedCart[existingProductIndex].quantity === 1) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].quantity--;
      }
      return updatedCart;
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
