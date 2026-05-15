"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = "info") => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
};

const bgColors: Record<ToastType, string> = {
  success: "border-emerald-500/30 bg-emerald-950/80",
  error: "border-red-500/30 bg-red-950/80",
  info: "border-blue-500/30 bg-blue-950/80",
  warning: "border-amber-500/30 bg-amber-950/80",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl text-white shadow-2xl ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
