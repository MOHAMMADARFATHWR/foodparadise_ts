/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, ChefHat, Bike, Home, CreditCard, Sparkles, MapPin, Clock } from 'lucide-react';
import { OrderStatus, OrderStep } from '../types';

interface CheckoutTrackerProps {
  orderStatus: OrderStatus;
  onClose: () => void;
}

export default function CheckoutTracker({ orderStatus, onClose }: CheckoutTrackerProps) {
  const [currentStep, setCurrentStep] = useState<OrderStep>('processing');
  const [prepProgress, setPrepProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initiating cryptographic checkout...');

  // Simulate progress of stages in real time
  useEffect(() => {
    if (!orderStatus.isActive) return;

    setCurrentStep('processing');
    setPrepProgress(15);
    setStatusText('Contacting merchant gateway for secure card processing...');

    // Stage 1: Processing -> Preparing (takes 3 seconds)
    const t1 = setTimeout(() => {
      setCurrentStep('preparing');
      setPrepProgress(40);
      setStatusText('Payment Confirmed! Chef has received your ticket and is hand-stretching the dough...');
    }, 3000);

    // Stage 1.5: Micro preparation updates
    const t1_5 = setTimeout(() => {
      setPrepProgress(65);
      setStatusText('Adding premium organic toppings and glazing with tandoori spices...');
    }, 6000);

    // Stage 2: Preparing -> Delivery (takes 9 seconds)
    const t2 = setTimeout(() => {
      setCurrentStep('delivery');
      setPrepProgress(85);
      setStatusText('Baked to perfection! Courier has packed your food in heat-insulated thermal containers & kicked the bike...');
    }, 9500);

    // Stage 2.5: Micro delivery updates
    const t2_5 = setTimeout(() => {
      setStatusText('Courier is zooming past the central highway. Speeding up to your block!');
    }, 14000);

    // Stage 3: Delivery -> Arrived (takes 18 seconds total)
    const t3 = setTimeout(() => {
      setCurrentStep('arrived');
      setPrepProgress(100);
      setStatusText('Delivered! Ring-ring! Fresh, steaming-hot gourmet food is outside your door. Savor the paradise!');
    }, 19000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t1_5);
      clearTimeout(t2);
      clearTimeout(t2_5);
      clearTimeout(t3);
    };
  }, [orderStatus.isActive]);

  const stepsList = [
    { key: 'processing', label: 'Payment', icon: CreditCard, color: 'bg-blue-500' },
    { key: 'preparing', label: 'Kitchen Cook', icon: ChefHat, color: 'bg-amber-500' },
    { key: 'delivery', label: 'In Transit', icon: Bike, color: 'bg-orange-500' },
    { key: 'arrived', label: 'Delivered', icon: Home, color: 'bg-emerald-500' },
  ];

  // Map step keys to indices for progress bar calculations
  const stepIndices: Record<OrderStep, number> = {
    processing: 0,
    preparing: 1,
    delivery: 2,
    arrived: 3,
  };

  const currentStepIdx = stepIndices[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      
      {/* Background visual sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_60%)] pointer-events-none" />

      {/* Main card panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-stone-100 overflow-hidden relative z-10 p-6 sm:p-8 flex flex-col items-center"
      >
        {/* Sparkly culinary badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-mono mb-6 font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>REAL-TIME DISPATCH ENGINE</span>
        </div>

        {/* Playfair Display heading */}
        <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950 text-center leading-tight mb-2">
          Tracking Your Delicacies
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 text-center max-w-md mb-8 font-semibold">
          Sit back, relax, and watch our culinary and logistics team craft and rush your fresh gourmet meal.
        </p>

        {/* Dynamic Horizontal Progress Bar */}
        <div className="w-full relative px-4 mb-10">
          <div className="absolute top-[22px] left-8 right-8 h-1 bg-orange-50 -z-10 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStepIdx / 3) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="flex justify-between items-center relative">
            {stepsList.map((step, idx) => {
              const StepIcon = step.icon;
              const isPassed = currentStepIdx > idx;
              const isCurrent = currentStep === step.key;

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ repeat: isCurrent ? Infinity : 0, duration: 1.5 }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isPassed ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : isCurrent ? `${step.color === 'bg-amber-500' ? 'bg-orange-500' : step.color} border-white text-white ring-4 ring-orange-100 shadow-md` : 'bg-white border-orange-100 text-slate-400'}`}
                  >
                    {isPassed ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <StepIcon className="w-5 h-5 stroke-[2]" />
                    )}
                  </motion.div>
                  <span className={`text-[10px] sm:text-xs font-semibold tracking-wide mt-2 transition-colors ${isCurrent ? 'text-slate-900 font-black' : isPassed ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Dotted Interactive Delivery Vector Map */}
        <div className="w-full bg-orange-50/20 border border-orange-100 rounded-2xl p-4 sm:p-6 mb-8 relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f973160a_1px,transparent_1px),linear-gradient(to_bottom,#f973160a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-60" />
          
          <div className="relative h-28 w-full">
            {/* Start Node: Kitchen */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="text-[9px] uppercase font-mono font-black tracking-widest text-slate-400">Kitchen</span>
            </div>

            {/* Travel Path Dotted S-Curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path
                id="travel-path"
                d="M 60,56 C 140,-10 240,110 320,56 C 400,10 460,90 530,56"
                fill="none"
                stroke="#e7e5e4"
                strokeWidth="4"
                strokeLinecap="round"
                className="hidden sm:block"
              />
              <path
                id="travel-path-active"
                d="M 60,56 C 140,-10 240,110 320,56 C 400,10 460,90 530,56"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className="hidden sm:block animate-[dash_3s_linear_infinite]"
                style={{ strokeDashoffset: -50 }}
              />

              {/* Smaller fallback path for mobile screens */}
              <path
                d="M 40,56 H 260"
                fill="none"
                stroke="#e7e5e4"
                strokeWidth="4"
                strokeLinecap="round"
                className="sm:hidden"
              />
            </svg>

            {/* Moving Courier icon (only displayed when preparing or in transit) */}
            {(currentStep === 'preparing' || currentStep === 'delivery') && (
              <motion.div
                animate={{
                  // Simple translation to mimic moving along the curve
                  x: currentStep === 'preparing' ? ['45px', '120px'] : ['120px', '250px', '380px'],
                  y: currentStep === 'preparing' ? ['-10px', '10px'] : ['10px', '-15px', '12px'],
                }}
                transition={{
                  duration: currentStep === 'preparing' ? 6 : 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white shadow-lg"
              >
                <Bike className="w-4.5 h-4.5" />
              </motion.div>
            )}

            {/* End Node: Home */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow transition-all duration-500 ${currentStep === 'arrived' ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-100' : 'bg-orange-100 text-orange-600 font-bold'}`}>
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[9px] uppercase font-mono font-black tracking-widest text-slate-400">Your Door</span>
            </div>
          </div>
        </div>

        {/* Live micro-status update ticker */}
        <div className="w-full text-center space-y-4 mb-4">
          <div className="flex items-center justify-center gap-2">
            {currentStep !== 'arrived' && (
              <Loader2 className="w-4.5 h-4.5 text-orange-500 animate-spin" />
            )}
            <span className="text-xs font-mono font-black tracking-widest uppercase text-orange-500">
              {currentStep === 'processing' ? 'PROCESSING ORDER' : currentStep === 'preparing' ? 'CHEF COOKING DisH' : currentStep === 'delivery' ? 'COURIER SPEEDING' : 'ORDER DELIVERED'}
            </span>
          </div>

          <p className="text-slate-800 text-sm sm:text-base font-extrabold leading-relaxed max-w-lg mx-auto">
            "{statusText}"
          </p>

          {/* Cooking progress percentage or delivery eta */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Simulated ETA: <span className="font-mono text-slate-900 font-black">{currentStep === 'arrived' ? '0' : currentStep === 'delivery' ? '4' : '15'} mins</span></span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="truncate max-w-[180px]" title={orderStatus.address}>Destination: <span className="text-slate-900 font-black">{orderStatus.address}</span></span>
            </div>
          </div>
        </div>

        {/* Dynamic action buttons */}
        <div className="w-full mt-6 border-t border-orange-100 pt-6 flex justify-center">
          {currentStep === 'arrived' ? (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onClose}
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              Order Another Dish ➔
            </motion.button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-black tracking-wider uppercase text-slate-400 hover:text-slate-600 px-4 py-2 hover:bg-orange-50 rounded-xl transition-all cursor-pointer"
            >
              Track in Background
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}
