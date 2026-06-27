import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { initAnalytics } from "../utils/analytics";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("quickdrop_cookie_consent");
    if (!consent) {
      // Small delay so it animates in gracefully after initial page load
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      initAnalytics();
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("quickdrop_cookie_consent", "accepted");
    initAnalytics();
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("quickdrop_cookie_consent", "rejected");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-card bg-white/95 border border-brand-dark/10 p-5 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg text-brand-dark flex items-center gap-2 mb-2">
                <span>🍪</span> Privacy & Cookies
              </h3>
              <p className="text-sm text-brand-dark/70 leading-relaxed">
                We use cookies to improve your browsing experience, analyze site traffic, and optimize our hyperlocal delivery operations. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 rounded-xl border-2 border-brand-dark/10 text-brand-dark font-bold text-sm hover:bg-brand-dark/5 transition-colors whitespace-nowrap"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/25 whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
