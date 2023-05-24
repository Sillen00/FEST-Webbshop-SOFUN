import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Product {
  _id: string;
  categoryIDs: string[];
  title: string;
  imageID: string;
  description: string;
  price: number;
  stockLevel: number;
  imageURL: string;
  isArchived: boolean;
}

interface ContextValue {
  product: Product[];
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

export default function ProductProvider({ children }: Props) {
  const [product, setProduct] = useState<Product[]>([]);

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
  }, []);

  const clearProduct = () => {
    setProduct([]);
  };

  const addProduct = (newProduct: Product) => {
    setProduct(prevProducts => [...prevProducts, newProduct]);
  };

  async function removeProduct(product: Product) {
    try {
      await fetch(`/api/products/${product._id}`, {
        method: 'DELETE',
      });
      setProduct(prevProducts =>
        prevProducts.filter(item => item._id !== product._id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const updateProduct = (id: string, newData: Product) => {
    setProduct(prevProducts =>
      prevProducts.map(item => (item._id === id ? { ...item, ...newData } : item))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        product,
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
}

