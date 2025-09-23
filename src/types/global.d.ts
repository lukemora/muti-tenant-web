/// <reference types="vite/client" />

// 定义响应数据结构
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  timestamp: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  createdAt: string;
}

interface ProductDetail extends Product {
  images: string[];
  specifications: Record<string, string>;
  reviews: Review[];
}

interface Review {
  id: number;
  userId: number;
  username: string;
  rating: number;
  content: string;
  createdAt: string;
}

interface PaginatedResponse<T> {
  total: number;
  page: number;
  size: number;
  items: T[];
}
