import { useState, useMemo, useCallback } from 'react';
import { Product, CartItem, SpicyLevel } from '../types';

const TOPPING_PRICE = 50;

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      let price = item.product.price;
      if (item.selectedOption) {
        price += item.selectedOption.price;
      }
      price += item.selectedToppings.length * TOPPING_PRICE;
      return acc + price * item.quantity;
    }, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const generateCartId = useCallback((product: Product, config: {
    selectedOption?: { id: string };
    spicyLevel?: SpicyLevel;
    selectedToppings: string[];
    notes?: string;
  }) => {
    const optionsHash = [
      config.selectedOption?.id || 'none',
      config.spicyLevel || 'Medium',
      [...config.selectedToppings].sort().join('-') || 'notoppings',
      config.notes || 'nonotes',
    ].join('_');
    return `${product.id}_${optionsHash}`;
  }, []);

  const quickAdd = useCallback((product: Product) => {
    const cartId = `${product.id}_default`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          quantity: 1,
          selectedToppings: [],
          spicyLevel: 'Medium' as SpicyLevel,
        },
      ];
    });
    return true;
  }, []);

  const customAdd = useCallback((config: Omit<CartItem, 'cartId'>) => {
    const cartId = generateCartId(config.product, {
      selectedOption: config.selectedOption,
      spicyLevel: config.spicyLevel,
      selectedToppings: config.selectedToppings,
      notes: config.notes,
    });

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += config.quantity;
        return updated;
      }
      return [...prev, { ...config, cartId }];
    });
    return true;
  }, [generateCartId]);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    subtotal,
    totalItems,
    quickAdd,
    customAdd,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
