import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className={`fixed bottom-24 left-6 md:bottom-8 md:left-8 w-12 h-12 rounded-full bg-white text-brand-dark shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center border border-brand-dark/5 hover:bg-brand-primary/5 hover:text-brand-primary transition-all z-50 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </motion.button>
    </>
  );
}
