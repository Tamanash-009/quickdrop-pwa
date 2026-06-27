import { motion } from "motion/react";
import { WifiOff, RefreshCcw } from "lucide-react";
import Logo from "./Logo";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-cyan/5 pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center">
        <Logo className="h-12 mb-8 opacity-50" showText={false} />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 rounded-full bg-slate-200/50 flex items-center justify-center mb-6 text-slate-400"
        >
          <WifiOff size={40} strokeWidth={1.5} />
        </motion.div>
        
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-brand-dark mb-2">You're Offline</h1>
        <p className="text-brand-dark/60 max-w-sm mb-8 text-sm leading-relaxed">
          It looks like you've lost your connection to the internet. Please check your network and try again.
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-brand-primary/90 transition-all flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
