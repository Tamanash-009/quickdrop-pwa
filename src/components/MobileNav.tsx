import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, Grid, Search, PhoneCall } from "lucide-react";
import { handleCallNowClick } from "../utils";
import { trackEvent, trackCallClick } from "../utils/analytics";

import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide if scrolling down, show if scrolling up
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "services", label: "Services", icon: Grid, href: "#services" },
    { id: "cart", label: "Cart", icon: ShoppingBag, action: () => setIsCartOpen(true) },
    { id: "call", label: "Call", icon: PhoneCall, action: handleCallNowClick },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
    >
      <div className="mx-4 mb-4">
        <div className="glass-card bg-background/90 border border-white/20 p-2 rounded-2xl shadow-xl flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  trackEvent("mobile_nav_click", "navigation", item.label);
                  if (item.action) {
                    if (item.id === "call") trackCallClick();
                    item.action();
                  } else if (item.href) {
                    onNavigate(item.href);
                  }
                }}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] transition-all ${
                  isActive 
                    ? "text-primary" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-on-surface/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobileNavActive"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="mb-1 z-10" />
                <span className="text-[10px] font-bold z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
