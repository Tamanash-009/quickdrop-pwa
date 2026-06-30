import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageOff, Sparkles } from "lucide-react";
import { Skeleton } from "./Skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  category?: string;
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url";
  priority?: "auto" | "high" | "low";
  onClick?: () => void;
}

// Category-specific high-quality fallback image map
const categoryFallbacks: Record<string, string> = {
  food: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  fruit: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  vegetable: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  daily: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
  stationery: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
  personal: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
  pet: "https://images.unsplash.com/photo-1589924691124-400d16be38cb?auto=format&fit=crop&w=600&q=80",
  default: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
};

/**
 * Custom Hook: useLazyLoad
 * Detects when an element intersects the viewport and should begin loading its content.
 */
function useLazyLoad(priority: "auto" | "high" | "low" = "auto") {
  const [inView, setInView] = useState(() => {
    if (priority === "high") return true;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return true;
    }
    return false;
  });
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (priority === "high") return;
    const currentElement = elementRef.current;
    if (!currentElement) return;

    if (inView) return; // Already in view

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Unobserve immediately as we only need to trigger loading once
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: "150px 0px 150px 0px", // Trigger slightly before it enters viewport
    });

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [inView, priority]);

  return [elementRef, inView] as const;
}

/**
 * Component Wrapper: LazyImage
 * Renders an image using IntersectionObserver to only load when in view.
 * Includes smooth fade-in animation and automated error fallback handling.
 */
export default function LazyImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  category = "default",
  priority = "auto",
  onClick,
  referrerPolicy,
}: LazyImageProps) {
  const [containerRef, inView] = useLazyLoad(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Determine fallback URL based on category keyword search
  const getFallbackSrc = () => {
    const key = Object.keys(categoryFallbacks).find(
      (k) =>
        category.toLowerCase().includes(k) ||
        alt.toLowerCase().includes(k) ||
        src.toLowerCase().includes(k)
    );
    return key ? categoryFallbacks[key] : categoryFallbacks.default;
  };

  const imageSrc = isError ? getFallbackSrc() : src;

  const id = useId();

  return (
    <div
      id={`lazy-image-container-${id}`}
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative w-full h-full overflow-hidden select-none bg-surface-variant flex items-center justify-center ${containerClassName}`}
      onClick={onClick}
    >
      {/* Skeleton Shimmer or Placeholder when not loaded */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-surface-variant"
          >
            <Skeleton className="absolute inset-0 w-full h-full" />
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-1 text-on-surface-variant"
            >
              <Sparkles size={16} className="animate-pulse text-primary" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">QuickDrop</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image Element */}
      {inView && (
        <motion.img
          src={imageSrc}
          alt={alt}
          loading={priority === "high" ? "eager" : "lazy"}
          fetchPriority={priority === "high" ? "high" : "auto"}
          decoding="async"
          referrerPolicy={referrerPolicy}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsError(true);
            setIsLoaded(true); // Complete load state for fallback to transition cleanly
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${className} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
      )}

      {/* Fallback indicator overlay inside image card if image errored out */}
      {isError && (
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-on-primary px-2 py-0.5 rounded text-[8px] font-mono flex items-center gap-1 pointer-events-none z-10">
          <ImageOff size={8} />
          <span>Optimized</span>
        </div>
      )}
    </div>
  );
}
