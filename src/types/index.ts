export interface ProductOption {
  id: string;
  name: string;
  price: number;
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
  tag: string;
  category: string;
  description: string;
  calories: number;
  prepTimeMin: number;
  ingredients: string[];
  options?: {
    selectionName: string;
    selections: ProductOption[];
  };
  toppings?: string[];
  reviews: Review[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedOption?: ProductOption;
  selectedToppings: string[];
  spicyLevel?: SpicyLevel;
  notes?: string;
}

export type SpicyLevel = 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';

export type OrderStep = 'processing' | 'preparing' | 'delivery' | 'arrived';

export interface OrderStatus {
  isActive: boolean;
  step: OrderStep;
  items: CartItem[];
  total: number;
  estimatedDeliveryMin: number;
  address: string;
}
