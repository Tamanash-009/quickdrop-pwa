

export default function Logo({ className = "h-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Premium SVG Vector Icon */}
      <div className={`relative ${className} aspect-square flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(14,165,233,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Highly customized multi-stop linear gradient matching the uploaded image */}
            <linearGradient id="crescent-grad" x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#38BDF8" /> {/* Neon Cyan Accent */}
              <stop offset="35%" stopColor="#0EA5E9" /> {/* Sky Blue */}
              <stop offset="70%" stopColor="#2563EB" /> {/* Deep Royal Blue */}
              <stop offset="100%" stopColor="#1D4ED8" /> {/* Midnight Navy Blue */}
            </linearGradient>
            
            <linearGradient id="drop-grad" x1="40%" y1="30%" x2="70%" y2="85%">
              <stop offset="0%" stopColor="#38BDF8" /> {/* Bright Cyan Tip */}
              <stop offset="50%" stopColor="#0EA5E9" /> {/* Rich Sky Blue */}
              <stop offset="100%" stopColor="#1E40AF" /> {/* Ocean Blue Base */}
            </linearGradient>

            <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glowing background aura (subtle, visible on hover) */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#crescent-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="opacity-10 group-hover:opacity-40 transition-opacity duration-500 ease-out origin-center animate-[spin_40s_linear_infinite]"
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
            fill="url(#crescent-grad)"
            className="transition-all duration-300 group-hover:scale-[1.03] origin-center"
          />

          {/* Droplet nestled in the curve representing the "Drop" + Speed */}
          <path
            d="M 48,48
               C 48,48 55,56 64,58
               C 68,59 66,74 58,74
               C 50,74 46,66 48,48 Z"
            fill="url(#drop-grad)"
            className="transition-all duration-300 group-hover:translate-x-[1px] group-hover:translate-y-[-1px]"
          />

          {/* Droplet Glossy Reflection Dot */}
          <circle
            cx="58"
            cy="64"
            r="2.5"
            fill="#FFFFFF"
            opacity="0.9"
            className="transition-opacity duration-300 group-hover:opacity-100"
          />
        </svg>
      </div>

      {/* Brand Text Elements */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-2xl tracking-tight text-on-surface flex items-center gap-0.5">
            Quick<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-mid to-brand-gradient-end">Drop</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.22em] text-primary/80 font-semibold uppercase mt-0.5">
            Hyperlocal Delivery
          </span>
        </div>
      )}
    </div>
  );
}
