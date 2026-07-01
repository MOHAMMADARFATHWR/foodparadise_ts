/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface Customizations {
  spicyLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  extraToppings?: string[];
  selectionOption?: string; // e.g. "Thin Crust", "Cheese Burst", "Normal"
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  tag: string; // e.g. "Best Seller", "Chef Special"
  category: string;
  description: string;
  calories: number;
  prepTimeMin: number;
  ingredients: string[];
  options?: {
    selectionName: string; // e.g. "Crust Option" or "Size"
    selections: ProductOption[];
  };
  toppings?: string[]; // available toppings to add
  reviews: Review[];
}

export interface CartItem {
  cartId: string; // unique cart entry ID (id + selections hash)
  product: Product;
  quantity: number;
  selectedOption?: ProductOption; // chosen selection option
  selectedToppings: string[]; // chosen extra toppings
  spicyLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  notes?: string;
}

export type OrderStep = 'processing' | 'preparing' | 'delivery' | 'arrived';

export interface OrderStatus {
  isActive: boolean;
  step: OrderStep;
  items: CartItem[];
  total: number;
  estimatedDeliveryMin: number;
  address: string;
}
