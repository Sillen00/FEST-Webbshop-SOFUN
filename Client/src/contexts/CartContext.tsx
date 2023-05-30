import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalstorage';

export interface CartItem {
  id?: string;
  title: string;
  price: number;
  quantity: number;
  imageID: string;
}

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
  const [cart, setCart] = useLocalStorageState<CartItem[]>([], 'cart');

  const clearCart = () => {
    setCart([]);
  };

  //
  // Add a product to the cart and reduce the stock level for the ordered product.
  //
  const addProduct = async (cartItem: CartItem) => {
    // Reduce stock level for each ordered item
    const productID = cartItem.id;
    const quantity = cartItem.quantity; // Alltid 1 så som det är nu...

    // Retrieve the product that you want to order from the database
    const productResponse = await axios.get(`/api/products/${productID}`);
    const product = productResponse.data;

    if (product.stockLevel > 0) {
      // Update the stock level
      const updatedStockLevel = product.stockLevel - quantity;

      // Save the updated stock level back to the database
      await axios.put(`/api/products/${productID}`, { stockLevel: updatedStockLevel });

      const existingProductIndex = cart.findIndex(item => item.id === cartItem.id);

      if (existingProductIndex === -1) {
        setCart([...cart, { ...cartItem, quantity: 1 }]);
      } else {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity++;
        setCart(updatedCart);
      }
    } else {
      alert('Det finns inga fler produkter i lager');
      return;
    }
  };

  //
  // Remove a product from the cart and increase the stock level for the ordered product.
  //
  async function removeProduct(cartItem: CartItem) {
    // Reduce stock level for each ordered item
    const productID = cartItem.id;
    const quantity = 1; // Alltid 1 så som det är nu...

    // Retrieve the product that you want to order from the database
    const productResponse = await axios.get(`/api/products/${productID}`);
    const product = productResponse.data;

    // Update the stock level
    const updatedStockLevel = product.stockLevel + quantity;

    // Save the updated stock level back to the database
    await axios.put(`/api/products/${productID}`, { stockLevel: updatedStockLevel });

    // Update the cart quantity
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === cartItem.id);

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
