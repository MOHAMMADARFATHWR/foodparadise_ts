/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const CATEGORIES = [
  'All',
  'Pizzas',
  'Chinese',
  'Appetizers',
  'Street Food',
  'Premium Paneer'
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Artisanal Double Cheese Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    price: 500,
    rating: 4.9,
    reviewCount: 148,
    tag: 'Best Seller',
    category: 'Pizzas',
    description: 'Freshly hand-stretched sourdough base, layered with our signature slow-roasted San Marzano tomato marinara, and loaded with premium fresh Mozzarella, aged Parmesan, and rich Cheddar cheese, topped with fresh hand-torn organic basil leaves.',
    calories: 840,
    prepTimeMin: 20,
    ingredients: ['Sourdough Crust', 'San Marzano Tomato Sauce', 'Fresh Mozzarella', 'Parmesan', 'Cheddar', 'Organic Basil'],
    options: {
      selectionName: 'Select Crust Type',
      selections: [
        { id: 'c1', name: 'Hand-Stretched Sourdough', price: 0 },
        { id: 'c2', name: 'Neapolitan Thin Crust', price: 30 },
        { id: 'c3', name: 'Gourmet Stuffed Cheese Crust', price: 120 },
        { id: 'c4', name: 'Gluten-Free Almond Crust', price: 80 }
      ]
    },
    toppings: ['Extra Mozzarella', 'Truffle Mushroom', 'Pickled Jalapeños', 'Caramelized Onion'],
    reviews: [
      { id: 'r1_1', userName: 'Aarav Sharma', rating: 5, comment: 'Hands down the best cheese pizza in town! The sourdough crust is perfectly airy and crispy.', date: 'June 28, 2026' },
      { id: 'r1_2', userName: 'Ananya Goel', rating: 5, comment: 'The cheese blend is heavenly. Stuffed crust upgrade is highly recommended!', date: 'June 24, 2026' }
    ]
  },
  {
    id: 2,
    name: 'Crispy Veg Manchurian Dry',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    price: 200,
    rating: 4.5,
    reviewCount: 92,
    tag: 'Popular',
    category: 'Chinese',
    description: 'Golden-fried vegetable medallions tossed in a high-flame wok with chopped ginger, garlic, crispy scallions, green chilies, and our rich dark soy-chili reduction. A classic Indo-Chinese balance of spicy, savory, and sweet.',
    calories: 420,
    prepTimeMin: 15,
    ingredients: ['Minced Cabbage', 'Carrots', 'Spring Onion', 'Dark Soy Sauce', 'Ginger-Garlic', 'Green Chilies'],
    toppings: ['Crispy Garlic Dust', 'Extra Scallions', 'Toasted Sesame Seeds'],
    reviews: [
      { id: 'r2_1', userName: 'Rohan Verma', rating: 4, comment: 'Super crispy and full of umami. Spiced just right!', date: 'June 29, 2026' },
      { id: 'r2_2', userName: 'Meera Nair', rating: 5, comment: 'Absolutely delicious. Loved the crunchiness of the medallions.', date: 'June 20, 2026' }
    ]
  },
  {
    id: 3,
    name: 'Wok-Tossed Chilli Paneer',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    price: 400,
    rating: 4.8,
    reviewCount: 112,
    tag: 'Chef Special',
    category: 'Appetizers',
    description: 'Soft cubes of organic cottage cheese (paneer) glazed in a secret cornstarch batter, shallow-fried, and wok-tossed with crisp sweet bell peppers, red onion petals, and fresh green chilies in a savory, spicy garlic-soy-chili emulsion.',
    calories: 510,
    prepTimeMin: 18,
    ingredients: ['Organic Paneer (Cottage Cheese)', 'Tri-Color Bell Peppers', 'Red Onion', 'Chili Paste', 'Sesame Oil'],
    toppings: ['Double Paneer Extra Portion', 'Drizzle of Chili Oil', 'Toasted Garlic Plakes'],
    reviews: [
      { id: 'r3_1', userName: 'Aditya Sen', rating: 5, comment: 'The paneer is incredibly soft, feels like clouds! One of my favorites.', date: 'June 27, 2026' },
      { id: 'r3_2', userName: 'Pooja Hegde', rating: 4, comment: 'Perfect glaze and very appetizing. Great appetizer before pizza.', date: 'June 18, 2026' }
    ]
  },
  {
    id: 4,
    name: 'Signature Veg Hakka Noodles',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
    price: 300,
    rating: 4.6,
    reviewCount: 121,
    tag: 'Hot',
    category: 'Chinese',
    description: 'Thin premium wheat noodles boiled aldente and stir-fried on high flame in an authentic Chinese cast-iron wok with shredded crisp cabbage, matchstick carrots, sweet bell peppers, and scallions, seasoned with white pepper and premium aromatic oils.',
    calories: 460,
    prepTimeMin: 12,
    ingredients: ['Wheat Noodles', 'Shredded Cabbage', 'Julienned Carrots', 'Green Peppers', 'Aromatic Wok Oil'],
    toppings: ['Sautéed Mushrooms', 'Shredded Baby Corn', 'Extra Szechuan Sauce Bowl'],
    reviews: [
      { id: 'r4_1', userName: 'Kabir Patel', rating: 5, comment: 'Love the smokey wok flavor (wok hei). Super authentic noodles!', date: 'June 30, 2026' },
      { id: 'r4_2', userName: 'Siddhi Joshi', rating: 4, comment: 'Very light and savory. Portion size is extremely generous.', date: 'June 25, 2026' }
    ]
  },
  {
    id: 5,
    name: 'Deccan Spiced Classic Vada Pav',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80',
    price: 100,
    rating: 4.7,
    reviewCount: 210,
    tag: 'Trending',
    category: 'Street Food',
    description: 'An authentic Mumbai staple. Golden fried seasoned potato dumpling infused with mustard seeds, fresh curry leaves, and green chilies, sandwiched inside a pillow-soft buttered pav bun smeared with a special spicy dry garlic chutney and tangy mint-coriander paste.',
    calories: 320,
    prepTimeMin: 8,
    ingredients: ['Buttered Pav Bun', 'Spiced Potato Patty', 'Dry Garlic Chutney', 'Tangy Mint Sauce', 'Fried Salted Chilies'],
    options: {
      selectionName: 'Select Butter Option',
      selections: [
        { id: 'vp1', name: 'Standard Amul Butter', price: 0 },
        { id: 'vp2', name: 'Extra Cheddar Cheese Slice Overlay', price: 25 },
        { id: 'vp3', name: 'Double Golden Buttered Pav', price: 15 }
      ]
    },
    reviews: [
      { id: 'r5_1', userName: 'Sachin Tendulkar', rating: 5, comment: 'Absolutely legendary! Tastes exactly like the authentic street food corner of Dadar.', date: 'June 29, 2026' },
      { id: 'r5_2', userName: 'Vikram Seth', rating: 4, comment: 'Spicy, buttered, and delicious. Hits all the right nostalgic notes.', date: 'June 22, 2026' }
    ]
  },
  {
    id: 6,
    name: 'Charcoal Grill Paneer Tikka',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80',
    price: 600,
    rating: 4.9,
    reviewCount: 165,
    tag: 'Premium',
    category: 'Premium Paneer',
    description: 'Plump premium cubes of organic paneer marinated in slow-dripped hung curd, mustard oil, Kashmiri red chilies, freshly crushed ginger, garlic, and our home-roasted spice mix, skewered with crispy bell peppers and sweet onions, charred to a golden perfection in our tandoor grill.',
    calories: 580,
    prepTimeMin: 22,
    ingredients: ['Spiced Hung Curd Marinade', 'Handmade Cottage Cheese', 'Sweet Onion Wedges', 'Capsicum', 'Kashmiri Spice', 'Chaat Masala'],
    toppings: ['Fresh Mint Mayo Drizzle', 'Extra Lemon Squeeze & Onion Salad', 'Lachha Onion Rings Portion'],
    reviews: [
      { id: 'r6_1', userName: 'Kunal Kapoor', rating: 5, comment: 'Mouth-melting soft paneer with a fantastic smokey tandoor aroma. Masterpiece!', date: 'June 30, 2026' },
      { id: 'r6_2', userName: 'Neha Gupta', rating: 5, comment: 'Rich and heavy. Best paired with the mint chutney they send. Flawless.', date: 'June 26, 2026' }
    ]
  }
];
