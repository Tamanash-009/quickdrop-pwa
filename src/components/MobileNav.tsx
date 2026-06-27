import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Home, Grid, Search, User, PhoneCall } from "lucide-react";
import { handleCallNowClick } from "../utils";

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "services", label: "Services", icon: Grid, href: "#services" },
    { id: "search", label: "Catalog", icon: Search, href: "#featured" },
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
        <div className="glass-card bg-white/80 border border-white/60 p-2 rounded-2xl shadow-xl flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.href) {
                    onNavigate(item.href);
                  }
                }}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] transition-all ${
                  isActive 
                    ? "text-brand-primary" 
                    : "text-brand-dark/50 hover:text-brand-dark hover:bg-brand-dark/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobileNavActive"
                    className="absolute inset-0 bg-brand-primary/10 rounded-xl"
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
