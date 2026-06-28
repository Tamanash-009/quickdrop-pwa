import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, MapPin, Mail, Plus } from "lucide-react";
import { handleWhatsAppClick, handleCallNowClick } from "../utils";
import { businessConfig } from "../config/business";
import { trackWhatsAppClick, trackCallClick, trackEvent } from "../utils/analytics";

export default function ExpandableFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Close FAB menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const actions = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366]",
      textColor: "text-on-primary",
      onClick: () => {
        trackWhatsAppClick("General Enquiry");
        handleWhatsAppClick("General Enquiry");
        setIsOpen(false);
      },
    },
    {
      id: "call",
      label: "Call Now",
      icon: Phone,
      color: "bg-primary",
      textColor: "text-on-primary",
      onClick: () => {
        trackCallClick();
        handleCallNowClick();
        setIsOpen(false);
      },
    },
    {
      id: "email",
      label: "Email Support",
      icon: Mail,
      color: "bg-amber-500",
      textColor: "text-on-primary",
      onClick: () => {
        trackEvent("email_click", "engagement", "Email Support");
        window.location.href = `mailto:${businessConfig.contact.email}`;
        setIsOpen(false);
      },
    },
    {
      id: "maps",
      label: "Find Us",
      icon: MapPin,
      color: "bg-rose-500",
      textColor: "text-on-primary",
      onClick: () => {
        trackEvent("map_find_us", "engagement", "Find Us Click");
        const element = document.querySelector("#contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
      },
    }
  ];

  return (
    <div 
      ref={fabRef}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } }}
            className="flex flex-col gap-3 items-end"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: (actions.length - index - 1) * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md shadow-md text-xs font-bold text-on-surface border border-white/40">
                    {action.label}
                  </span>
                  <button
                    onClick={action.onClick}
                    aria-label={action.label}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${action.color} ${action.textColor}`}
                  >
                    <Icon size={20} />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen ? "bg-surface text-on-surface rotate-45 border border-outline" : "bg-gradient-to-tr from-brand-primary to-brand-cyan text-on-primary hover:scale-105"
        }`}
      >
        <span className="sr-only">Toggle Contact Menu</span>
        <Plus size={28} strokeWidth={2.5} className="transition-transform duration-300" />
      </button>
    </div>
  );
}
