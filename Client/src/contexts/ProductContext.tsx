/* import { createContext, ReactNode, useContext, useEffect } from 'react';
import { Product, products } from '../data';
import { useLocalStorageState } from '../hooks/useLocalstorage';

interface ContextValue {
  products: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearProduct: () => void;
  updateProduct: (id: string, newData: Product) => void;
}

export const ProductContext = createContext<ContextValue>(null as any);
export const useProduct = () => useContext(ProductContext);

interface Props {
  children: ReactNode;
}

export default function ProductInventory({ children }: Props) {
  const [product, setProduct] = useLocalStorageState<Product[]>(products, 'products');

  const clearProduct = () => {
    setProduct([]);
  };

  function addProduct(product: Product) {
    setProduct(prevProduct => [...prevProduct, product]);
  }

  function removeProduct(product: Product) {
    setProduct(prevProduct => {
      const updatedProduct = prevProduct.filter(item => item.id !== product.id);
      return updatedProduct;
    });
  }

  const updateProduct = (id: string, newData: Product) => {
    setProduct(prevState => {
      const index = prevState.findIndex(x => x.id === id);
      if (index === -1) return prevState;
      const updatedItem = {
        ...prevState[index],
        ...newData,
      };
      const newArray = [...prevState];
      newArray[index] = updatedItem;
      return newArray;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [setProduct]);

  return (
    <ProductContext.Provider
    value={{
      products,
      setProduct,
      addProduct,
      removeProduct,
      clearProduct,
      updateProduct,
    }}
  >
    {children}
  </ProductContext.Provider>
  );
} */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';


interface Product {
  _id: string;
  title: string;
  imageURL: string;
  price: number;
  description: string;
}

interface ContextValue {
  products: Product[];
}

export const ProductContext = createContext<ContextValue>(null as any);
export const useProduct = () => useContext(ProductContext);

interface Props {
  children: ReactNode;
}

export default function ProductProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



  return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
}
