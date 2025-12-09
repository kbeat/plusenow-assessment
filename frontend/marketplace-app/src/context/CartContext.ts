import { createContext } from "react";
import type { CartItem } from "@/types/CartItem";

export interface CartContextType {
  items: CartItem[];
  refresh: () => void;
  addItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
