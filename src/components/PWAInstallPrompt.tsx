import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X } from "lucide-react";
import Logo from "./Logo";

export default function PWAInstallPrompt() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(e);
      // Show the prompt, but maybe wait a bit so it doesn't interrupt the splash screen
      setTimeout(() => {
        const hasDismissed = localStorage.getItem("quickdrop_pwa_dismissed");
        if (!hasDismissed) {
          setShowPrompt(true);
        }
      }, 5000); // 5 seconds after load
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPromptEvent) return;
    
    // Show the install prompt
    installPromptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await installPromptEvent.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setInstallPromptEvent(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("quickdrop_pwa_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 z-[100] max-w-sm w-full mx-auto"
        >
          <div className="glass-card bg-white/80 border border-white/60 p-4 rounded-3xl shadow-[0_12px_40px_rgba(14,165,233,0.15)] flex flex-col gap-4 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full text-brand-dark/40 hover:text-brand-dark hover:bg-brand-dark/5 transition-colors z-10"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 flex items-center justify-center shrink-0 border border-brand-primary/10">
                <Logo className="h-7" showText={false} />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-brand-dark text-sm leading-tight">Install QuickDrop App</h3>
                <p className="text-[11px] font-sans text-brand-dark/60 mt-0.5">Faster loading, offline mode, and 1-tap access.</p>
              </div>
            </div>
            
            <button
              onClick={handleInstall}
              className="w-full py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download size={14} />
              <span>Install to Home Screen</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
