import React from 'react';
import { PackageX } from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon = <PackageX size={48} className="text-primary" />
}: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center bg-surface-variant/30 rounded-3xl border border-outline">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="w-24 h-24 bg-surface rounded-full flex items-center justify-center shadow-sm mb-6 border border-outline"
      >
        {icon}
      </motion.div>
      <h3 className="font-display font-bold text-2xl text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm max-w-sm mb-8">{description}</p>
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
