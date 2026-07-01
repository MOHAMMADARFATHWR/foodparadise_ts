import { useState, useEffect, useCallback } from 'react';
import { OrderStatus, OrderStep, CartItem } from '../types';

export function useOrderTracker() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    isActive: false,
    step: 'processing',
    items: [],
    total: 0,
    estimatedDeliveryMin: 20,
    address: '',
  });

  const startOrder = useCallback((items: CartItem[], total: number, address: string) => {
    setOrderStatus({
      isActive: true,
      step: 'processing',
      items,
      total,
      estimatedDeliveryMin: 18,
      address,
    });
  }, []);

  const closeOrder = useCallback(() => {
    setOrderStatus((curr) => ({ ...curr, isActive: false }));
  }, []);

  useEffect(() => {
    if (!orderStatus.isActive) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => {
      setOrderStatus((curr) => ({ ...curr, step: 'preparing' }));
    }, 3000));

    timers.push(setTimeout(() => {
      setOrderStatus((curr) => ({ ...curr, step: 'delivery' }));
    }, 9500));

    timers.push(setTimeout(() => {
      setOrderStatus((curr) => ({ ...curr, step: 'arrived' }));
    }, 19000));

    return () => timers.forEach(clearTimeout);
  }, [orderStatus.isActive]);

  return {
    orderStatus,
    startOrder,
    closeOrder,
  };
}
