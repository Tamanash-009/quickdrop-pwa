import { motion } from "motion/react";
import { handleCallNowClick } from "../utils";
import BusinessStatus from "./BusinessStatus";

interface HeroProps {
  onStartOrdering: () => void;
}

export default function Hero({ onStartOrdering }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Dynamic Ambient Blur Waves (Sleek Apple/Stripe-inspired Background Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-tr from-brand-primary/20 to-brand-cyan/20 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] aspect-square rounded-full bg-gradient-to-br from-brand-gradient-mid/20 to-brand-cyan/20 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: "15s" }} />
      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-blue-300/10 blur-[90px] animate-[spin_40s_linear_infinite]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Grid: Key Value Proposition & Headline */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Micro Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/80 self-start mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
            <span className="text-xs font-mono tracking-widest uppercase font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-rounded text-sm font-fill text-brand-cyan">location_on</span>
              <span>Serving Nischintapur (Within 10 KM)</span>
            </span>
          </motion.div>

          {/* Premium Information Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 self-start flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center"
          >
            <BusinessStatus />
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 border border-white/80 shadow-sm backdrop-blur-md">
              <span className="material-symbols-rounded text-sm font-fill text-primary">local_shipping</span>
              <span className="text-xs font-bold text-on-surface-variant">Delivery in ~30 mins</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 border border-white/80 shadow-sm backdrop-blur-md">
              <span className="material-symbols-rounded text-sm font-fill text-emerald-500">payments</span>
              <span className="text-xs font-bold text-on-surface-variant">₹25 Delivery Fee</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 border border-white/80 shadow-sm backdrop-blur-md">
              <span className="material-symbols-rounded text-sm font-fill text-amber-500">schedule</span>
              <span className="text-xs font-bold text-on-surface-variant">Open Daily • 8 AM - 8 PM</span>
            </div>
          </motion.div>

          {/* Premium H1 Typography pairing */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-on-surface tracking-tight"
          >
            Everything <br className="hidden md:inline" />
            Delivered.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-gradient-mid to-brand-cyan">
              Fast.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-on-surface-variant leading-relaxed font-normal max-w-xl"
          >
            Sizzling rolls, piping hot momos, crisp grocery greens, stationery and daily needs. Carefully handpicked from neighborhood partner shops and delivered at your doorstep in Salt Lake in under 30 minutes.
          </motion.p>

          {/* Dual Action Buttons: Using Call Now and Explore Catalog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartOrdering}
              className="px-8 py-4 rounded-[20px] bg-gradient-to-r from-brand-primary via-brand-gradient-mid to-brand-cyan text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer select-none"
            >
              <span>Explore Catalog</span>
              <span className="material-symbols-rounded text-base font-bold group-hover:translate-x-1 transition-transform">keyboard_arrow_right</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCallNowClick}
              className="px-8 py-4 rounded-[20px] bg-surface border border-outline text-on-surface font-bold text-sm uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="material-symbols-rounded text-base font-fill text-primary animate-pulse">phone</span>
              <span>Call Now</span>
            </motion.button>
          </motion.div>

          {/* Statistics Section in Hero Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-4 border-t border-outline pt-8"
          >
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tight">30m</span>
              <span className="text-[11px] font-mono tracking-widest text-on-surface-variant uppercase mt-1 font-semibold">Avg. Speed</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tight">100%</span>
              <span className="text-[11px] font-mono tracking-widest text-on-surface-variant uppercase mt-1 font-semibold">Fresh Checked</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tight">140k+</span>
              <span className="text-[11px] font-mono tracking-widest text-on-surface-variant uppercase mt-1 font-semibold">Delivered</span>
            </div>
          </motion.div>
        </div>

        {/* Right Grid: Interactive Canvas Terminal & Floating Illustrations */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] lg:min-h-[500px]">
          {/* Main Visual: Glass Carrier Terminal Showcase (Apple design theme) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] glass p-6 border-white/60 shadow-2xl flex flex-col justify-between"
          >
            {/* Screen Header */}
            <div className="flex items-center justify-between border-b border-outline pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-[10px] font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                <span className="material-symbols-rounded text-xs text-brand-cyan animate-pulse">location_on</span>
                <span>Hyperlocal Core active</span>
              </div>
            </div>

            {/* Simulated Live Courier Tracking Frame */}
            <div className="my-auto py-6 flex flex-col items-center justify-center text-center relative">
              {/* Radial gradient pulse backing */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-cyan/20 to-transparent blur-xl pointer-events-none rounded-full" />
              
              <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                {/* Concentric expanding ripples */}
                <span className="absolute inset-0 rounded-full border border-brand-cyan/30 animate-ping" style={{ animationDuration: "3s" }} />
                <span className="absolute inset-3 rounded-full border border-brand-primary/20 animate-ping" style={{ animationDuration: "4s" }} />
                
                {/* Center Delivery Shield Vector Icon */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-primary to-brand-gradient-end flex items-center justify-center shadow-lg text-on-primary">
                  <span className="material-symbols-rounded text-5xl font-fill">local_shipping</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-on-surface">QuickDrop Delivery</h3>
              <p className="text-xs font-mono text-on-surface-variant tracking-wider uppercase mt-1">Ready for checkout</p>

              {/* Status capsule */}
              <div className="mt-4 px-4 py-2 rounded-full bg-surface/75 border border-white shadow-sm flex items-center gap-2">
                <span className="material-symbols-rounded text-yellow-400 text-base font-fill animate-spin" style={{ animationDuration: "12s" }}>star</span>
                <span className="text-xs font-semibold text-on-surface-variant">30 Min Guaranteed Delivery</span>
              </div>
            </div>

            {/* Glass footer of the card */}
            <div className="bg-surface/40 border border-white/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-rounded text-xl">schedule</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-on-surface">30 Mins Average</p>
                  <p className="text-[10px] text-on-surface-variant">Near-zero delay dispatched</p>
                </div>
              </div>
              <span className="text-xs font-mono font-extrabold text-primary uppercase bg-surface/90 px-2.5 py-1 rounded-lg">LIVE</span>
            </div>
          </motion.div>

          {/* Floating Illustration Card 1: 30 Mins Avg Delivery */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -left-4 md:-left-12 glass border-white p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[190px] select-none pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-primary">
              <span className="material-symbols-rounded text-lg text-primary">bolt</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-on-surface">30 Mins Avg</p>
              <p className="text-[10px] text-on-surface-variant">Rapid Logistics</p>
            </div>
          </motion.div>

          {/* Floating Illustration Card 2: Fresh Daily */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[40%] -right-4 md:-right-8 glass border-white p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[180px] select-none pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-rounded text-lg text-emerald-600 font-fill">eco</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-on-surface">Fresh Daily</p>
              <p className="text-[10px] text-on-surface-variant">Carefully Handpicked</p>
            </div>
          </motion.div>

          {/* Floating Illustration Card 3: Trusted Local Delivery */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass border-white p-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[190px] select-none pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <span className="material-symbols-rounded text-base text-rose-500 font-fill">favorite</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-on-surface">Trusted Service</p>
              <p className="text-[10px] text-on-surface-variant">Rated 4.9/5 stars</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
