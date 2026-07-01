import React from 'react';
import { Search, ShoppingBag, Award, Flame, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES, Category } from '../../data';
import { getCategoryEmoji } from '../../utils/helpers';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

export function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  cartTotal,
  onCartClick,
}: HeaderProps) {
  return (
    <header className="relative w-full overflow-hidden bg-orange-50/50 text-slate-800">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <nav className="sticky top-0 z-40 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg rotate-3">
              F
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-800">
                FOOD<span className="text-orange-500">PARADISE</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                Gourmet Culinary Boutique
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-bold">
            <div className="flex items-center gap-1.5 bg-orange-100/50 px-3 py-1.5 rounded-full">
              <Award className="w-4 h-4 text-orange-500" />
              <span>5★ Chef Recipes</span>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-100 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Fresh & Steaming Hot</span>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-100/50 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>4.9 Overall Rating</span>
            </div>
          </div>

          <button
            id="cart-trigger-btn"
            onClick={onCartClick}
            className="group relative flex items-center gap-2.5 px-4.5 py-3 rounded-xl bg-slate-900 hover:bg-orange-600 text-white transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-orange-500/20 cursor-pointer border-none"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold flex items-center justify-center border-2 border-slate-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase font-mono tracking-wider opacity-60">My Basket</span>
              <span className="text-xs font-bold font-mono">₹{cartTotal}</span>
            </div>
          </button>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-200 text-yellow-800 text-xs font-black uppercase tracking-widest mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>50% OFF FIRST ORDER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[1.1] text-slate-900 mb-6 uppercase tracking-tight"
          >
            CRAVE IT.<br />
            ORDER IT.<br />
            <span className="text-orange-500">DEVOUR IT.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-500 text-base sm:text-lg max-w-md leading-relaxed mb-8 font-semibold"
          >
            The freshest ingredients prepared to perfection and delivered from our master kitchens directly to your doorstep. No fuss, just pure flavor.
          </motion.p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                const element = document.getElementById('food-search-input');
                if (element) {
                  element.focus();
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm sm:text-base shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform cursor-pointer"
            >
              ORDER NOW
            </button>
            <div className="flex -space-x-3 items-center">
              <div className="w-10 h-10 rounded-full border-2 border-orange-50 bg-blue-400 flex items-center justify-center text-xs text-white font-bold font-mono">😋</div>
              <div className="w-10 h-10 rounded-full border-2 border-orange-50 bg-pink-400 flex items-center justify-center text-xs text-white font-bold font-mono">🍕</div>
              <div className="w-10 h-10 rounded-full border-2 border-orange-50 bg-green-400 flex items-center justify-center text-xs text-white font-bold font-mono">🔥</div>
              <span className="pl-6 text-xs sm:text-sm font-black text-slate-600">+2k happy foodies</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-orange-100 relative overflow-hidden flex flex-col justify-between min-h-[250px]">
            <div className="relative z-10">
              <h2 className="text-slate-900 text-3xl font-black leading-tight mb-2">
                UP TO<br />
                <span className="text-orange-500">₹200 CASHBACK</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                On all orders placed this hour. Savor the food & relish the savings.
              </p>
            </div>

            <div className="relative z-10 mt-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="food-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors (Pizza, Paneer)..."
                className="w-full bg-orange-50/80 hover:bg-orange-50/100 border border-orange-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-2xl pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition-all font-sans text-sm font-bold shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full pointer-events-none"></div>
            <div className="absolute right-4 top-4 w-12 h-12 border-4 border-orange-500/10 rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-t border-orange-100 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-3 pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-5 py-3.5 rounded-[1.25rem] text-sm font-black tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-sm border ${isActive ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'border-orange-100 bg-white text-slate-700 hover:text-orange-500 hover:border-orange-200'}`}
                >
                  <span className="text-xl leading-none">{getCategoryEmoji(category)}</span>
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
