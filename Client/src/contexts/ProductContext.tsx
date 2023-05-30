import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Product {
  _id?: string;
  categoryIDs: string[];
  title: string;
  imageID: string;
  description: string;
  price: number;
  stockLevel: number;
  isArchived: boolean;
}

interface ContextValue {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearProduct: () => void;
  updateProduct: (id: string, newData: Product) => void;
  fetchProductsByCategory: (categoryId: string) => void;
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

  // FETCH PRODUCTS BY CATEGORY
  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      let response;
      if (categoryId === '') {
        response = await fetch('/api/products');
      } else {
        response = await fetch(`/api/categories/${categoryId}`);
      }
      const products = await response.json();
      setProduct(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  async function addProduct(newProduct: Product) {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProduct(prevProducts => [...prevProducts, createdProduct]);
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  async function removeProduct(product: Product) {
    try {
      await fetch(`/api/products/${product._id}`, {
        method: 'DELETE',
      });
      setProduct(prevProducts => prevProducts.filter(item => item._id !== product._id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  async function updateProduct(id: string, newData: Product) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProduct(prevProducts =>
          prevProducts.map(item => (item._id === id ? updatedProduct : item))
        );
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        addProduct,
        removeProduct,
        clearProduct,
        updateProduct,
        fetchProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
