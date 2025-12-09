export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface Specifications {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;

  description: string;
  price: number;
  compareAtPrice: number | null;

  images: string[];

  categoryId: string;
  sellerId: string;

  tags: string[];
  featured: boolean;
  status: string;

  rating: number;
  reviewCount: number;
  reviews: Review[];

  specifications: Specifications;

  stock: number;

  createdAt: string;
  updatedAt: string;
}
