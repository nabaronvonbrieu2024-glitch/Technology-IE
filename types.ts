export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  rating: number;
  reviews: number;
  image: string;
  isOrganic: boolean;
  benefits: string[];
  ingredients?: string;
}

export type CategoryId = 'tea' | 'supplements' | 'cosmetics' | 'food' | 'essential_oils';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  total: number;
  items: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}