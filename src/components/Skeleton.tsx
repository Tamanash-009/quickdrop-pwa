import React from "react";
import { motion } from "motion/react";

interface SkeletonProps {
  className?: string;
  variant?: "circular" | "rectangular" | "text";
}

export default function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseStyle = "bg-brand-dark/5 overflow-hidden relative";
  
  const variantStyles = {
    circular: "rounded-full",
    rectangular: "rounded-xl",
    text: "rounded-md h-4 w-full",
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
    </div>
  );
}
