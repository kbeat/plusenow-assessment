import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Protected from "@/components/Protected";
import Products from "@/pages/Products";
import Layout from "@/components/Layout";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
