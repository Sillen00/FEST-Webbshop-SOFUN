import { ThemeProvider } from '@emotion/react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import App from './App';
import ShoppingCart from './contexts/CartContext';
import OrderProvider from './contexts/OrderContext';
import ProductInventory from './contexts/ProductContext';
import UserProvider, { useUser } from './contexts/UserContext';
import './index.css';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import EditProduct from './pages/EditProduct';
import NewProduct from './pages/NewProduct';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderPage from './pages/OrderPage';
import ProductInfo from './pages/ProductInfo';
import Products from './pages/Products';
import { theme } from './theme';

function AdminWrapper({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!currentUser || !currentUser.isAdmin)) {
      navigate('/login');
    }
  }, [currentUser, navigate, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{currentUser && currentUser.isAdmin && children}</>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Products />} />
      <Route path='product/:id' element={<ProductInfo />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='confirmation' element={<OrderConfirmation />} />
      <Route
        path='admin'
        element={
          <AdminWrapper>
            <Admin />
          </AdminWrapper>
        }
      />
      <Route path='orders' element={<OrderPage />} />
      <Route
        path='admin/product/:id'
        element={
          <AdminWrapper>
            <EditProduct />
          </AdminWrapper>
        }
      />
      <Route
        path='admin/product/new'
        element={
          <AdminWrapper>
            <NewProduct />
          </AdminWrapper>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OrderProvider>
        <ShoppingCart>
          <ProductInventory>
            <UserProvider>
              <RouterProvider router={router} />
            </UserProvider>
          </ProductInventory>
        </ShoppingCart>
      </OrderProvider>
    </ThemeProvider>
  </React.StrictMode>
);
