import { Product } from '../types';

export const formatPrice = (price: number): string => `₹${price}`;

export const calculateItemPrice = (item: {
  product: Product;
  selectedOption?: { price: number };
  selectedToppings: string[];
}): number => {
  let price = item.product.price;
  if (item.selectedOption) {
    price += item.selectedOption.price;
  }
  price += item.selectedToppings.length * 50;
  return price;
};

export const getTagStyle = (tag: string): string => {
  const styles: Record<string, string> = {
    'best seller': 'bg-emerald-500 text-white border-emerald-400',
    'chef special': 'bg-yellow-200 text-yellow-800 border-yellow-300',
    'trending': 'bg-blue-500 text-white border-blue-400',
    'premium': 'bg-purple-500 text-white border-purple-400',
    'hot': 'bg-red-500 text-white border-red-400',
    'popular': 'bg-orange-500 text-white border-orange-400',
  };
  return styles[tag.toLowerCase()] || 'bg-slate-700 text-white border-slate-600';
};

export const getCategoryEmoji = (category: string): string => {
  const emojis: Record<string, string> = {
    'All': '🍽️',
    'Pizzas': '🍕',
    'Chinese': '🥢',
    'Appetizers': '🥟',
    'Street Food': '🍿',
    'Premium Paneer': '🧀',
  };
  return emojis[category] || '🍔';
};

export const getSpicyLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    'Mild': 'bg-green-100 text-green-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'Hot': 'bg-orange-100 text-orange-700',
    'Extra Hot': 'bg-red-100 text-red-700',
  };
  return colors[level] || colors['Medium'];
};

export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_THRESHOLD = 500;
export const GST_RATE = 0.05;
export const PROMO_DISCOUNT = 0.15;
export const PROMO_CODE = 'FOODEAL';

export const calculateDeliveryFee = (subtotal: number): number =>
  subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

export const calculateGST = (subtotal: number): number =>
  Math.round(subtotal * GST_RATE);

export const calculateDiscount = (subtotal: number, promoApplied: boolean): number =>
  promoApplied ? Math.round(subtotal * PROMO_DISCOUNT) : 0;

export const calculateGrandTotal = (
  subtotal: number,
  discount: number,
  deliveryFee: number,
  gst: number
): number => subtotal - discount + deliveryFee + gst;
