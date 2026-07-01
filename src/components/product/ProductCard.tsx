import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Flame, ArrowRight, Eye } from 'lucide-react';
import { Product } from '../../types';
import { getTagStyle, formatPrice } from '../../utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white border border-orange-100/70 rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-orange-50/50">
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold shadow-md border ${getTagStyle(product.tag)}`}>
            {product.tag}
          </span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="p-3 bg-white hover:bg-orange-500 hover:text-white text-slate-800 rounded-full shadow-lg transition-all duration-200 cursor-pointer transform -translate-y-2 group-hover:translate-y-0 duration-300"
            title="View Details & Customize"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wide text-orange-600 border border-orange-100 shadow-sm">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-0.5 bg-orange-100 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-orange-500 stroke-orange-500" />
            <span className="text-xs font-bold font-mono text-orange-700">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-slate-400 font-bold">({product.reviewCount} verified reviews)</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-1 mb-2">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow font-medium">
          {product.description}
        </p>

        <div className="flex items-center gap-4 py-2 border-t border-b border-orange-100/50 text-[11px] sm:text-xs text-slate-500 mb-5 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{product.prepTimeMin} mins</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{product.calories} kcal</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold leading-none mb-1">Price</span>
            <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => onViewDetails(product)}
              className="px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-orange-50 rounded-xl transition-all duration-200 cursor-pointer hidden sm:block font-bold text-xs"
            >
              Info
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-slate-900 group-hover:bg-orange-500 hover:scale-[1.03] active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md shadow-slate-900/10 hover:shadow-orange-500/20"
            >
              <span>Add to Basket</span>
              <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
