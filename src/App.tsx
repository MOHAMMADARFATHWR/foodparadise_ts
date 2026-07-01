import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Clock, Compass } from 'lucide-react';
import { Header } from './components/ui/Header';
import { ProductCard } from './components/product/ProductCard';
import { ProductModal } from './components/product/ProductModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutTracker } from './components/order/CheckoutTracker';
import { Toast } from './components/ui/Toast';
import { useCart } from './hooks/useCart';
import { useOrderTracker } from './hooks/useOrderTracker';
import { PRODUCTS, Category } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 4B, Skyview Towers, Seaface Road, Mumbai 400018');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { cart, subtotal, totalItems, quickAdd, customAdd, updateQuantity, removeItem, clearCart } = useCart();
  const { orderStatus, startOrder, closeOrder } = useOrderTracker();

  const triggerToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3500);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = useCallback((product: Product) => {
    quickAdd(product);
    triggerToast(`Added ${product.name} to your basket!`);
  }, [quickAdd, triggerToast]);

  const handleCustomAdd = useCallback((customConfig: Omit<CartItem, 'cartId'>) => {
    customAdd(customConfig);
    triggerToast(`Added customized ${customConfig.product.name} to basket!`);
  }, [customAdd, triggerToast]);

  const handleRemoveCartItem = useCallback((cartId: string) => {
    const item = cart.find((i) => i.cartId === cartId);
    if (item) {
      triggerToast(`Removed ${item.product.name} from basket.`);
    }
    removeItem(cartId);
  }, [cart, removeItem, triggerToast]);

  const handleClearCart = useCallback(() => {
    clearCart();
    triggerToast('Cleared all items from your basket.');
  }, [clearCart, triggerToast]);

  const handleCheckoutPlaceOrder = useCallback((appliedDiscount: number, promoCode: string) => {
    startOrder([...cart], subtotal - appliedDiscount, deliveryAddress);
    clearCart();
    setIsCartOpen(false);
  }, [cart, subtotal, deliveryAddress, startOrder, clearCart]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col antialiased">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalItems}
        cartTotal={subtotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-950">
              {selectedCategory === 'All' ? 'Our Master Culinary Menu' : `${selectedCategory} Selections`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-bold">
              Showing {filteredProducts.length} premium dishes prepared fresh upon your order.
            </p>
          </div>

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
              We couldn't find matches for "{searchQuery}" in our {selectedCategory !== 'All' ? `${selectedCategory} category` : 'full menu'}. Try refining your spelling!
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

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs text-center font-mono font-bold">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p>&copy; 2026 ZestyBites Paradise Ltd. All culinary rights reserved.</p>
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
            <span>&bull;</span>
            <a href="#" className="hover:text-orange-500 transition-colors">Global Kitchen Coordinates</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Charter</a>
          </div>
        </div>
      </footer>

      <Toast message={toastMessage} />

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleCustomAdd}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        onCheckout={handleCheckoutPlaceOrder}
      />

      {orderStatus.isActive && (
        <CheckoutTracker
          orderStatus={orderStatus}
          onClose={closeOrder}
        />
      )}
    </div>
  );
}
