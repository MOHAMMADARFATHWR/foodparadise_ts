/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Clock, Flame, ChevronRight, Plus, Minus, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, ProductOption, CartItem } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cartItem: Omit<CartItem, 'cartId'>) => void;
}

export default function ProductModal({ product, isOpen, onClose, onConfirm }: ProductModalProps) {
  if (!product) return null;

  // Configuration options state
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    product.options?.selections[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<'Mild' | 'Medium' | 'Hot' | 'Extra Hot'>('Medium');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Reset modal state whenever the product changes
  useEffect(() => {
    setSelectedOption(product.options?.selections[0]);
    setSelectedToppings([]);
    setSpicyLevel('Medium');
    setQuantity(1);
    setNotes('');
    setActiveTab('details');
  }, [product]);

  // Handle topping check/uncheck
  const handleToppingToggle = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Live calculation of item unit price based on customization
  const getUnitItemPrice = () => {
    let basePrice = product.price;
    if (selectedOption) {
      basePrice += selectedOption.price;
    }
    // Assume each extra topping adds a fixed premium of ₹50
    basePrice += selectedToppings.length * 50;
    return basePrice;
  };

  const currentTotalPrice = getUnitItemPrice() * quantity;

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToBasket = () => {
    onConfirm({
      product,
      quantity,
      selectedOption,
      selectedToppings,
      spicyLevel,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Animated Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          >
            
            {/* Close Button Trigger */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white transition-colors shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Hand: Gorgeous Product Media Column */}
            <div className="w-full md:w-[45%] relative bg-slate-900 text-slate-100 flex flex-col">
              
              {/* Product Image Panel */}
              <div className="relative aspect-[4/3] md:aspect-auto md:flex-grow w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Float Rating summary inside Image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-mono text-[10px] font-black tracking-widest uppercase mb-2 inline-block shadow-md">
                    {product.tag}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-stone-300">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-500 stroke-orange-500" />
                      <span className="font-bold">{product.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>{product.reviewCount} Reviews</span>
                  </div>
                </div>
              </div>

              {/* Kitchen spec summary */}
              <div className="p-5 grid grid-cols-2 gap-4 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-orange-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-stone-500">Prep Duration</p>
                    <p className="text-stone-300 font-semibold">{product.prepTimeMin} mins</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-orange-500">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-stone-500">Energy Profile</p>
                    <p className="text-stone-300 font-semibold">{product.calories} kcal</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hand: Deep Customization & Detail Columns */}
            <div className="w-full md:w-[55%] flex flex-col bg-white overflow-hidden">
              
              {/* Custom tabs toggles */}
              <div className="flex border-b border-stone-100 px-6 pt-5">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer mr-6 ${activeTab === 'details' ? 'border-orange-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  Configure Dish
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'reviews' ? 'border-orange-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reviews ({product.reviews.length})</span>
                </button>
              </div>

              {/* Tab Content body scroll area */}
              <div className="p-6 overflow-y-auto flex-grow max-h-[45vh] md:max-h-[50vh] space-y-6">
                {activeTab === 'details' ? (
                  <>
                    {/* Description */}
                    <div>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Ingredients section */}
                      <div className="mt-4">
                        <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold mb-2">Ingredients Included</p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.ingredients.map((ing) => (
                            <span key={ing} className="px-2.5 py-1 bg-stone-50 text-stone-600 border border-stone-100 rounded-lg text-xs font-medium">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 1: Base Selection Option (e.g. Crust) */}
                    {product.options && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold">
                            {product.options.selectionName}
                          </label>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">Required</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {product.options.selections.map((opt) => {
                            const isSelected = selectedOption?.id === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => setSelectedOption(opt)}
                                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500' : 'border-orange-100 hover:border-orange-200 bg-white'}`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-orange-200'}`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                  <span className="text-xs font-semibold text-stone-950">{opt.name}</span>
                                </div>
                                {opt.price > 0 && (
                                  <span className="font-mono text-xs font-bold text-stone-500">+₹{opt.price}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Spiciness Levels (Default for cooking) */}
                    <div className="space-y-3">
                      <label className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold block">
                        Adjust Cooking Spiciness
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['Mild', 'Medium', 'Hot', 'Extra Hot'] as const).map((lvl) => {
                          const isSelected = spicyLevel === lvl;
                          // Spiciness color logic
                          const getColor = () => {
                            if (!isSelected) return 'border-orange-100 hover:border-orange-200 bg-white text-slate-600';
                            switch (lvl) {
                              case 'Mild':
                                return 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500 font-semibold';
                              case 'Medium':
                                return 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500 font-semibold';
                              case 'Hot':
                                return 'border-orange-600 bg-orange-100 text-orange-700 ring-1 ring-orange-600 font-semibold';
                              case 'Extra Hot':
                                return 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500 font-semibold animate-pulse';
                            }
                          };

                          return (
                            <button
                              key={lvl}
                              onClick={() => setSpicyLevel(lvl)}
                              className={`py-3 rounded-xl border text-center text-xs transition-all cursor-pointer ${getColor()}`}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Optional Add-on Toppings */}
                    {product.toppings && product.toppings.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold">
                            Gourmet Extras & Addons
                          </label>
                          <span className="text-[10px] text-stone-400 font-semibold">Optional</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {product.toppings.map((top) => {
                            const isSelected = selectedToppings.includes(top);
                            return (
                              <button
                                key={top}
                                onClick={() => handleToppingToggle(top)}
                                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500' : 'border-orange-100 hover:border-orange-200 bg-white'}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'border-orange-200'}`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span className="text-xs font-semibold text-stone-950">{top}</span>
                                </div>
                                <span className="font-mono text-xs font-bold text-stone-500">+₹50</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Cooking instructions notes */}
                    <div className="space-y-3">
                      <label className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold block">
                        Special Cooking Directives
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., No onions please, make extra crispy, send extra napkins..."
                        rows={2}
                        className="w-full bg-orange-50/30 hover:bg-orange-50/50 focus:bg-white border border-orange-100 focus:border-orange-500 rounded-xl p-3 text-xs text-slate-800 outline-none transition-all placeholder-slate-400 focus:ring-1 focus:ring-orange-500/20 font-bold"
                      />
                    </div>
                  </>
                ) : (
                  /* REVIEWS PANEL */
                  <div className="space-y-4">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 border border-orange-100 rounded-2xl bg-orange-50/30">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="font-semibold text-sm text-stone-950">{rev.userName}</span>
                          <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-orange-500 stroke-orange-500' : 'text-orange-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sticky bottom summary & Add button panel */}
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Quantity Counter */}
                <div className="flex items-center bg-white border border-orange-200 rounded-2xl p-1.5 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-950 hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-stone-900 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-950 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Confirm Add CTA */}
                <button
                  id="confirm-add-btn"
                  onClick={handleAddToBasket}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-orange-500 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Add to Basket</span>
                  <span className="opacity-40 font-normal mx-1">|</span>
                  <span className="font-mono font-extrabold">₹{currentTotalPrice}</span>
                </button>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
