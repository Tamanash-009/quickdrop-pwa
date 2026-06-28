import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, X } from "lucide-react";
import { businessConfig } from "../config/business";

export default function ExpansionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full bg-on-surface text-on-primary pt-24 pb-3 px-4 z-40 relative shadow-md"
      >
        <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">We're Growing!</p>
              <p className="text-xs text-on-primary/80 mt-0.5">
                Currently serving customers within <strong className="text-on-primary">{businessConfig.delivery.radiusKm} KM</strong> of our headquarters in <strong>Nischintapur</strong>. We're actively expanding to nearby locations soon!
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-full hover:bg-surface/10 transition-colors shrink-0 text-on-primary/60 hover:text-on-primary mt-1 sm:mt-0"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
