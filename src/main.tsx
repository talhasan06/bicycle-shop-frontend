import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import OpenLayout from "./components/layouts/OpenLayout.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import AuthLayout from "./components/layouts/AuthLayout.tsx";
import Order from "./pages/Order.tsx";
import VerifyOrder from "./pages/VerifyOrder.tsx";
import Shop from "./pages/Shop.tsx";
import About from "./pages/About.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import ManageProfile from "./pages/ManageProfile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "./pages/CreateProduct.tsx";
import NotFound from "./pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<OpenLayout />}>
              <Route index element={<App />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="shop" element={<Shop />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/manage-profile" element={<ManageProfile />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/orders/verify" element={<VerifyOrder />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-product" element={<CreateProduct />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
