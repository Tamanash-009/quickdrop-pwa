import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface PremiumLoadingProps {
  onComplete: () => void;
}

export default function PremiumLoading({ onComplete }: PremiumLoadingProps) {
  const [dotsActive, setDotsActive] = useState([false, false, false]);

  // Duration set to 1000ms (within premium 600ms-1200ms range)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Sequential dot animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setDotsActive((prev) => {
        const next = [...prev];
        const activeIdx = next.indexOf(true);
        if (activeIdx === -1) {
          next[0] = true;
        } else if (activeIdx === 2) {
          next[2] = false;
        } else {
          next[activeIdx] = false;
          next[activeIdx + 1] = true;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-[#071426] z-50 flex flex-col items-center justify-center overflow-hidden select-none antialiased"
      id="premium-splash-container"
    >
      {/* Soft animated gradient mesh behind the logo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            rotate: [0, 45, 0],
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-brand-primary/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 0.9, 1.1], 
            rotate: [0, -45, 0],
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-brand-cyan/10 blur-[120px]" 
        />
        {/* Soft radial glow directly behind the logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-primary/15 rounded-full blur-[80px]" />
      </div>

      {/* Main Container - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Highly custom, beautiful QuickDrop Logo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -4, 0]
          }}
          transition={{
            scale: { duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.4 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_40px_rgba(14,165,233,0.35)] relative mb-6"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="splash-crescent-grad" x1="15%" y1="15%" x2="85%" y2="85%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="35%" stopColor="#0EA5E9" />
                <stop offset="70%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              
              <linearGradient id="splash-drop-grad" x1="40%" y1="30%" x2="70%" y2="85%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              <filter id="splash-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing background aura */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#splash-crescent-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              className="opacity-20 animate-[spin_40s_linear_infinite] origin-center"
            />

            {/* Outer crescent / stylized "Q" shape */}
            <path
              d="M 45,76
                 C 26,76 22,58 22,46
                 C 22,24 40,16 54,16
                 C 68,16 76,26 76,40
                 C 76,50 68,54 58,54
                 C 56,54 55,48 55,45
                 C 55,36 62,32 50,32
                 C 38,32 35,44 35,52
                 C 35,62 40,70 45,76 Z"
              fill="url(#splash-crescent-grad)"
            />

            {/* Droplet nestled in the curve representing the "Drop" + Speed */}
            <path
              d="M 48,48
                 C 48,48 55,56 64,58
                 C 68,59 66,74 58,74
                 C 50,74 46,66 48,48 Z"
              fill="url(#splash-drop-grad)"
            />

            {/* Droplet Glossy Reflection Dot */}
            <circle
              cx="58"
              cy="64"
              r="2.5"
              fill="#FFFFFF"
              opacity="0.95"
            />
          </svg>
        </motion.div>

        {/* QuickDrop Title Text */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white flex items-center gap-0.5 select-none mb-2">
          {["Q", "u", "i", "c", "k", "D", "r", "o", "p"].map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, type: "spring", stiffness: 150 }}
              className={index >= 5 ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-mid to-brand-gradient-end" : "text-white"}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xs sm:text-sm font-sans text-brand-cyan/80 font-medium tracking-[0.16em] uppercase mb-8"
        >
          Everything Delivered. Fast.
        </motion.p>

        {/* Option B: Elegant Triple sequential dots loading indicator */}
        <div className="flex items-center gap-1.5 h-4 justify-center">
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: dotsActive[idx] ? 1.4 : 1,
                opacity: dotsActive[idx] ? 1 : 0.4,
                backgroundColor: dotsActive[idx] ? "#22d3ee" : "#38bdf8"
              }}
              transition={{ duration: 0.2 }}
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.2)]"
            />
          ))}
        </div>

      </div>

      {/* Tiny subtle footer marking PWA compatibility */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
          Hyperlocal PWA Instant Engine
        </span>
      </div>
    </div>
  );
}
