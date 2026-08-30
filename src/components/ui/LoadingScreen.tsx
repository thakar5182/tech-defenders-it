"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]"
        >
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-2 border-[rgba(212,175,55,0.2)] border-t-[#D4AF37] loading-spinner" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-[rgba(212,175,55,0.2)] border-t-[#FFD700] loading-spinner" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-gray-500 font-mono"
          >
            Initializing security protocols...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
