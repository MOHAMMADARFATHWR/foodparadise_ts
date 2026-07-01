/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, HelpCircle, Phone, Clock, Compass, ChevronRight, CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutTracker from './components/CheckoutTracker';
import { PRODUCTS } from './data/products';
import { Product, CartItem, OrderStatus, OrderStep } from './types';

export default function App() {
  // --- STATE SYSTEM ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 4B, Skyview Towers, Seaface Road, Mumbai 400018');
  
  // Simulated active order tracking state
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    isActive: false,
    step: 'processing',
    items: [],
    total: 0,
    estimatedDeliveryMin: 20,
    address: '',
  });

  // Floating notifications state (Toasts)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger floating micro-feedback notification
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3500);
  };

  // --- DERIVED COMPUTED STATE ---
  // Subtotal calculation (includes selected addon options and toppings)
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      let price = item.product.price;
      if (item.selectedOption) {
        price += item.selectedOption.price;
      }
      price += item.selectedToppings.length * 50;
      return acc + price * item.quantity;
    }, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Instant filtering of product database
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // --- ACTION HANDLERS ---
  // Easy quick add directly from the grid card without options
  const handleQuickAdd = (product: Product) => {
    // Generate a unique cart entry hash based on default options
    const cartId = `${product.id}_default`;
    
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartId === cartId);
      if (existing) {
        triggerToast(`Added another ${product.name} to your basket!`);
        return prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      triggerToast(`Added ${product.name} to your basket!`);
      return [
        ...prevCart,
        {
          cartId,
          product,
          quantity: 1,
          selectedToppings: [],
          spicyLevel: 'Medium',
        },
      ];
    });
  };

  // Detailed custom add from the interactive Modal
  const handleCustomAdd = (customConfig: Omit<CartItem, 'cartId'>) => {
    // Generate unique composite hash so customized items don't collide in the basket list
    const optionsHash = [
      customConfig.selectedOption?.id || 'none',
      customConfig.spicyLevel || 'Medium',
      [...customConfig.selectedToppings].sort().join('-') || 'notoppings',
      customConfig.notes || 'nonotes',
    ].join('_');

    const cartId = `${customConfig.product.id}_${optionsHash}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += customConfig.quantity;
        triggerToast(`Updated quantity of customized ${customConfig.product.name}!`);
        return updated;
      }
      triggerToast(`Added customized ${customConfig.product.name} to basket!`);
      return [...prevCart, { ...customConfig, cartId }];
    });
  };

  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.cartId === cartId);
      if (item) {
        triggerToast(`Removed ${item.product.name} from basket.`);
      }
      return prevCart.filter((i) => i.cartId !== cartId);
    });
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast('Cleared all items from your basket.');
  };

  // Handle final simulated Checkout trigger
  const handleCheckoutPlaceOrder = (appliedDiscount: number, promoCode: string) => {
    setOrderStatus({
      isActive: true,
      step: 'processing',
      items: [...cart],
      total: cartSubtotal - appliedDiscount,
      estimatedDeliveryMin: 18,
      address: deliveryAddress,
    });
    // Wipe cart
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col antialiased">
      
      {/* 1. Header with dynamic states */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* 2. Main Content Grid Panel */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        
        {/* Results title & specs description */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-950">
              {selectedCategory === 'All' ? 'Our Master Culinary Menu' : `${selectedCategory} Selections`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-bold">
              Showing {filteredProducts.length} premium dishes prepared fresh upon your order.
            </p>
          </div>

          {/* Quick Info badges */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>~18 min Delivery</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-200" />
            <span className="flex items-center gap-1">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>Eco-Friendly Sourcing</span>
            </span>
          </div>
        </div>

        {/* Dynamic Products Grid with animated fallback empty-states */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-orange-200 rounded-3xl bg-orange-50/20"
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-400 mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="text-slate-800 font-display font-black text-lg mb-1">No Delicacies Found</p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-semibold">
              We couldn’t find matches for "{searchQuery}" in our {selectedCategory !== 'All' ? `${selectedCategory} category` : 'full menu'}. Try refining your spelling!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleQuickAdd}
                onViewDetails={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Decorative Luxury Footer Pitch */}
        <section className="mt-20 border-t border-orange-100 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500 text-xs sm:text-sm font-bold leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-display text-slate-950 font-black text-base">Uncompromising Integrity</h4>
            <p className="font-semibold text-slate-500">Our doughs undergo slow 48-hour lactic fermentation; vegetables are hand-picked from pesticide-free high-altitude farms daily.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-display text-slate-950 font-black text-base">Thermal Isolation Fleet</h4>
            <p className="font-semibold text-slate-500">Our dedicated delivery fleet operates custom high-tech thermal vaults keeping food in pristine serving temperatures during transit.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-display text-slate-950 font-black text-base">24/7 Culinary Concierge</h4>
            <p className="font-semibold text-slate-500">Have special diet restrictions or custom bulk requests? Reach our chef consultants anytime at concierge@foodparadise.com.</p>
          </div>
        </section>

      </main>

      {/* 3. Footer Copyright Panel */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs text-center font-mono font-bold">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p>© 2026 ZestyBites Paradise Ltd. All culinary rights reserved.</p>
          <p className="text-slate-500 text-[11px] font-sans">
            Built by{' '}
            <a
              href="https://github.com/MOHAMMADARFATHWR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline inline-flex items-center gap-1 font-black"
            >
              MOHAMMADARFATHWR
            </a>
          </p>
          <div className="flex justify-center gap-4 text-[10px] uppercase tracking-wider pt-2">
            <a href="#" className="hover:text-orange-500 transition-colors">Dietary Specifications</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-500 transition-colors">Global Kitchen Coordinates</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Charter</a>
          </div>
        </div>
      </footer>

      {/* --- FLOATING TOAST NOTIFICATIONS DRAWER --- */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              className="flex items-center gap-2 px-4.5 py-3.5 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 text-xs sm:text-sm font-bold pointer-events-auto"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DIALOGS & OVERLAY DRAWERS MODALS --- */}
      
      {/* Product Customizer Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleCustomAdd}
      />

      {/* Basket side-drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        onCheckout={handleCheckoutPlaceOrder}
      />

      {/* Live active dispatch tracker */}
      {orderStatus.isActive && (
        <CheckoutTracker
          orderStatus={orderStatus}
          onClose={() => setOrderStatus((curr) => ({ ...curr, isActive: false }))}
        />
      )}

    </div>
  );
}
