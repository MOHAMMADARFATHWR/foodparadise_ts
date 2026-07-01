/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Tag, Plus, Minus, MapPin, Sparkles, AlertCircle, ShoppingCart, Percent } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  onCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  deliveryAddress,
  setDeliveryAddress,
  onCheckout,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(deliveryAddress);

  // Subtotal calculation (item price * item quantity)
  const subtotal = cartItems.reduce((acc, item) => {
    let price = item.product.price;
    if (item.selectedOption) {
      price += item.selectedOption.price;
    }
    price += item.selectedToppings.length * 50;
    return acc + price * item.quantity;
  }, 0);

  // Promo code validation: "FOODEAL" gives 15% discount
  const handleApplyPromo = () => {
    setPromoError(null);
    if (promoInput.trim().toUpperCase() === 'FOODEAL') {
      setAppliedPromo('FOODEAL');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try "FOODEAL" for 15% off!');
    }
  };

  const discountAmount = appliedPromo === 'FOODEAL' ? Math.round(subtotal * 0.15) : 0;
  
  // Free delivery threshold: Free for order > ₹500
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const gstTax = Math.round(subtotal * 0.05); // 5% standard GST
  const grandTotal = subtotal - discountAmount + deliveryFee + gstTax;

  const handleSaveAddress = () => {
    if (addressInput.trim()) {
      setDeliveryAddress(addressInput.trim());
      setIsEditingAddress(false);
    }
  };

  const handleCheckoutTrigger = () => {
    if (cartItems.length === 0) return;
    onCheckout(discountAmount, appliedPromo || '');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Drawer Body container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="w-screen max-w-md bg-white flex flex-col h-full shadow-2xl border-l border-orange-100"
            >
              
              {/* Header section */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <ShoppingCart className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-black text-slate-900">Gourmet Basket</h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                      {cartItems.length} unique selections
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 hover:bg-orange-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-slate-950"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Middle Section: Items list */}
              <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  /* Empty state view */
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-300 mb-4 animate-pulse">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-lg font-black text-slate-800 mb-1">Your Basket is Empty</h3>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                      It looks like you haven’t added any delicacies to your basket yet. Go back and select your favorites!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-5 px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  /* Scrolling list of items */
                  cartItems.map((item) => {
                    // Recalculate price of single item
                    let itemUnitPrice = item.product.price;
                    if (item.selectedOption) {
                      itemUnitPrice += item.selectedOption.price;
                    }
                    itemUnitPrice += item.selectedToppings.length * 50;

                    return (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-4 border border-orange-100 rounded-2xl bg-orange-50/20 hover:bg-orange-50/50 transition-all"
                      >
                        {/* Mini image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover border border-orange-100 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        {/* Item metadata columns */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-display text-sm font-extrabold text-slate-900 truncate leading-tight">
                            {item.product.name}
                          </h4>
                          
                          {/* Selected Custom Options badges */}
                          <div className="flex flex-wrap gap-1 mt-1.5 mb-2.5">
                            {item.selectedOption && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[9px] font-mono font-bold rounded">
                                {item.selectedOption.name}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 text-[9px] font-mono font-medium rounded ${item.spicyLevel === 'Mild' ? 'bg-green-100 text-green-700' : item.spicyLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                              🔥 {item.spicyLevel || 'Medium'}
                            </span>
                            {item.selectedToppings.map((top) => (
                              <span key={top} className="px-2 py-0.5 bg-stone-200 text-stone-600 text-[9px] font-mono rounded">
                                + {top}
                              </span>
                            ))}
                            {item.notes && (
                              <span className="w-full text-[9px] text-stone-400 italic mt-1 truncate block" title={item.notes}>
                                "Note: {item.notes}"
                              </span>
                            )}
                          </div>

                          {/* Price & Incrementor panel */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-sm font-black text-slate-900">
                              ₹{itemUnitPrice * item.quantity}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center bg-white border border-orange-200 rounded-lg p-0.5 shadow-xs">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                                  disabled={item.quantity <= 1}
                                  className="w-6.5 h-6.5 rounded flex items-center justify-center text-slate-500 hover:text-slate-950 hover:bg-orange-50 disabled:opacity-35 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center font-mono text-xs font-bold text-slate-800 select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                                  className="w-6.5 h-6.5 rounded flex items-center justify-center text-slate-500 hover:text-slate-950 hover:bg-orange-50 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.cartId)}
                                className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Bottom billing details panel */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-orange-100 bg-orange-50/20 space-y-4">
                  
                  {/* Progressive Free Shipping Banner */}
                  <div className="bg-white border border-orange-100 p-3 rounded-2xl shadow-xs">
                    {subtotal > 500 ? (
                      <div className="flex items-center gap-2 text-xs text-green-600 font-semibold leading-tight">
                        <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-bounce" />
                        <span>Congratulations! You qualified for Free Shipping!</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                          <span>Free Delivery Progress</span>
                          <span className="font-mono text-stone-900 font-bold">Add ₹{500 - subtotal} more</span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                            style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Promo Input verification */}
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          disabled={appliedPromo !== null}
                          placeholder={appliedPromo ? `Promo "${appliedPromo}" Applied` : 'Voucher: e.g. FOODEAL'}
                          className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all disabled:bg-orange-50/50 disabled:text-slate-500 font-bold"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={appliedPromo !== null || !promoInput.trim()}
                        className="px-4 bg-slate-900 hover:bg-orange-500 hover:text-white disabled:bg-orange-50 disabled:text-slate-400 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[10px] text-red-500 flex items-center gap-1 font-semibold leading-none">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{promoError}</span>
                      </p>
                    )}
                    {appliedPromo && (
                      <div className="flex items-center justify-between text-[11px] text-green-600 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg font-semibold">
                        <div className="flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5" />
                          <span>Voucher applied: {appliedPromo} (-15%)</span>
                        </div>
                        <button
                          onClick={() => setAppliedPromo(null)}
                          className="text-stone-500 hover:text-stone-900 hover:underline text-[10px]"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dynamic delivery address editor */}
                  <div className="border-t border-stone-100 pt-3">
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs">
                          <span className="font-semibold text-stone-900">Delivery Address</span>
                          {!isEditingAddress && (
                            <p className="text-stone-500 leading-normal mt-0.5 truncate max-w-[200px]">
                              {deliveryAddress}
                            </p>
                          )}
                        </div>
                      </div>
                      {!isEditingAddress ? (
                        <button
                          onClick={() => {
                            setAddressInput(deliveryAddress);
                            setIsEditingAddress(true);
                          }}
                          className="text-xs font-bold text-orange-500 hover:text-orange-600 cursor-pointer"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditingAddress(false)}
                            className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveAddress}
                            className="text-xs font-black text-orange-500 hover:text-orange-600 cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditingAddress && (
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Enter custom delivery address..."
                        className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none transition-all mt-1 font-bold"
                      />
                    )}
                  </div>

                  {/* Pricing check summary list */}
                  <div className="border-t border-stone-100 pt-3 text-xs space-y-2 text-stone-500 font-medium">
                    <div className="flex justify-between">
                      <span>Dish Subtotal</span>
                      <span className="font-mono text-stone-900">₹{subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Voucher Discount</span>
                        <span className="font-mono">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-mono text-stone-900">₹{gstTax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Service Fee</span>
                      <span className="font-mono text-stone-900">
                        {deliveryFee === 0 ? <span className="text-green-600 font-semibold uppercase">Free</span> : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-stone-200/80 pt-3.5 text-sm font-extrabold text-stone-900">
                      <span>Grand Total</span>
                      <span className="font-mono text-lg font-black text-slate-950">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Place Order CTA */}
                  <button
                    id="checkout-btn"
                    onClick={handleCheckoutTrigger}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-slate-900 hover:bg-orange-500 hover:text-white text-white font-black text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-xl cursor-pointer mt-2"
                  >
                    <span>Place Order & Pay</span>
                    <span className="opacity-40">|</span>
                    <span className="font-mono text-base font-extrabold">₹{grandTotal}</span>
                  </button>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
