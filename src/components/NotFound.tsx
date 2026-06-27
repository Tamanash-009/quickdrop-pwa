import { motion } from "motion/react";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center max-w-lg">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display font-black text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-cyan mb-2 select-none"
        >
          404
        </motion.h1>
        
        <h2 className="font-display font-extrabold text-2xl text-brand-dark mb-4">Page Not Found</h2>
        
        <p className="text-brand-dark/70 mb-8 text-sm md:text-base leading-relaxed">
          We can't seem to find the page you're looking for. It might have been moved, or it simply doesn't exist.
        </p>
        
        <button 
          onClick={() => window.location.href = "/"}
          className="px-6 py-3 rounded-full bg-brand-dark text-white font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
