import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(false);
  const controls = useAnimation();
  const isDraggingRef = useRef(false);
  const [dragConstraints, setDragConstraints] = useState({ left: -600, right: 0, top: -800, bottom: 0 });

  useEffect(() => {
    // Show a welcoming tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 7000);
      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Update dynamic drag boundaries based on window size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateConstraints = () => {
        const buttonWidth = 56;
        const padding = 24;
        setDragConstraints({
          left: -(window.innerWidth - 2 * padding - buttonWidth),
          right: 0,
          top: -(window.innerHeight - 2 * padding - buttonWidth),
          bottom: 0,
        });
      };
      updateConstraints();
      window.addEventListener("resize", updateConstraints);
      return () => window.removeEventListener("resize", updateConstraints);
    }
  }, []);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number, y: number } }) => {
    if (typeof window === "undefined") return;

    const buttonWidth = 56;
    const padding = 24;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get current horizontal and vertical drag offset values
    const currentX = info.offset.x;
    const currentY = info.offset.y;

    // Calculate maximum distance the button can travel left
    const dragRangeX = windowWidth - 2 * padding - buttonWidth;
    const snapThreshold = -dragRangeX / 2;

    // Determine target snap X position based on proximity
    const targetX = currentX < snapThreshold ? -dragRangeX : 0;

    // Determine safe clamped Y boundary to keep button on-screen
    const maxDragUp = -(windowHeight - 2 * padding - buttonWidth);
    const targetY = Math.max(maxDragUp, Math.min(0, currentY));

    // Snappily animate the wrapper back to either edge with zero drift
    controls.start({
      x: targetX,
      y: targetY,
      transition: { type: "spring", stiffness: 450, damping: 30 }
    });

    // Hold dragging flag slightly to prevent instant onClick trigger on drag release
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleOpenWhatsApp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const phoneNumber = "917001055879";
    const messageTemplate = `Hello QuickDrop Team 👋

My Name: [Your Name]

Mobile Number: [Your Mobile]

I would like to enquire about your delivery service.

My Requirement: 

---

Preferred Delivery Location: 

---

Please contact me at your earliest convenience.

Thank you.`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none pointer-events-none">
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative w-14 h-14 pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.85, y: 10, x: "-50%" }}
              className="absolute bottom-16 left-1/2 px-3.5 py-2 rounded-2xl bg-brand-dark/95 text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-xl border border-white/10 whitespace-nowrap z-[60] pointer-events-none"
            >
              Chat with us on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/917001055879"
          onClick={handleOpenWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-xl border border-white/20 relative overflow-hidden block"
          onMouseEnter={() => !isDraggingRef.current && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Internal subtle glow reflection */}
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          
          {/* WhatsApp Official Logo SVG */}
          <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
