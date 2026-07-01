import { motion, AnimatePresence } from 'motion/react';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="flex items-center gap-2 px-4.5 py-3.5 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 text-xs sm:text-sm font-bold"
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
