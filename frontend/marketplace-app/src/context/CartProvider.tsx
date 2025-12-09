import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "@/context/CartContext";
import type { CartItem } from "@/types/CartItem";
import { api } from "@/services/api";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from backend
  const refresh = () => {
    api.get("/cart").then((res) => {
      const data = res.data;
      const items = Array.isArray(data) ? data : data.items ?? [];
      setItems(items);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const addItem = async (productId: string) => {
    await api.post("/cart", { productId });
    refresh();
  };

  const updateQty = async (productId: string, quantity: number) => {
    await api.put(`/cart/${productId}`, { quantity });
    refresh();
  };

  const removeItem = async (productId: string) => {
    await api.delete(`/cart/${productId}`);
    refresh();
  };

  const clearCart = async () => {
    await api.delete("/cart");
    refresh();
  };

  return (
    <CartContext.Provider
      value={{ items, refresh, addItem, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
