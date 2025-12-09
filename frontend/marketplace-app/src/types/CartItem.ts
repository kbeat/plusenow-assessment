import type { Product } from "@/types/Product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
