import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { theme } from "./theme"
import ShoppingCart from "./contexts/CartContext";
import OrderProvider from "./contexts/OrderContext";
import ProductInventory from "./contexts/ProductContext";
import "./index.css";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import EditProduct from "./pages/EditProduct";
import NewProduct from "./pages/NewProduct";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductInfo from "./pages/ProductInfo";
import Products from "./pages/Products";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Products />} />
      <Route
        path="product/:id"
        element={<ProductInfo />}
      />
      <Route
        path="checkout"
        element={<Checkout />}
      />
      <Route
        path="confirmation"
        element={<OrderConfirmation />}
      />
      <Route path="admin" element={<Admin />} />
      <Route
        path="admin/product/:id"
        element={<EditProduct />}
      />
      <Route
        path="admin/product/new"
        element={<NewProduct />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <OrderProvider>
        <ShoppingCart>
          <ProductInventory>
            <RouterProvider router={router} />
          </ProductInventory>
        </ShoppingCart>
      </OrderProvider>
    </ThemeProvider>
  </React.StrictMode>
);
