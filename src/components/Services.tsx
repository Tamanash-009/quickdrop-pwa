import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data";
import LucideIcon from "./LucideIcon";

interface ServicesProps {
  onSelectCategory: (categoryName: string) => void;
}

// Map service ID to actual product category naming in the featuredProducts array
const categoryMap: { [key: string]: string } = {
  fastfood: "Fast Food",
  grocery: "Grocery",
  fruits: "Fruits",
  vegetables: "Vegetables",
  dairy: "Dairy & Bakery",
  beverages: "Beverages",
  snacks: "Snacks",
  stationery: "Stationery",
  household: "Household Essentials",
  personal: "Personal Care",
  daily: "Daily Needs"
};

const getServiceCategory = (id: string): string => {
  if (["fastfood", "beverages", "snacks"].includes(id)) return "Food";
  if (["grocery", "vegetables", "fruits", "dairy"].includes(id)) return "Groceries";
  if (["stationery", "household", "personal", "daily"].includes(id)) return "Essentials";
  return "All";
};

type TabType = "All" | "Food" | "Groceries" | "Essentials";

export default function Services({ onSelectCategory }: ServicesProps) {
  const [selectedServiceTab, setSelectedServiceTab] = useState<TabType>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const filteredServices = servicesData.filter((service) => {
    if (selectedServiceTab === "All") return true;
    return getServiceCategory(service.id) === selectedServiceTab;
  });

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && containerRef.current) {
        const sliderWidth = sliderRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        setConstraints({
          left: -Math.max(0, sliderWidth - containerWidth),
          right: 0
        });
      }
    };
    
    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredServices]);

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40"
    >
      {/* Decorative ambient background drops */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] aspect-square rounded-full bg-brand-cyan/10 blur-[90px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] aspect-square rounded-full bg-brand-primary/10 blur-[110px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-brand-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-brand-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>What We Deliver</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-brand-dark tracking-tight"
          >
            Our Hyperlocal Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-brand-dark/70"
          >
            Instant checkout and rapid 30-minute delivery for a wide array of local items. Click on any active category to browse our shelf.
          </motion.p>
        </div>

        {/* Dynamic Glassmorphic Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16 max-w-md mx-auto p-1 bg-white/50 backdrop-blur-md rounded-full border border-white/60 shadow-sm relative z-20">
          {(["All", "Food", "Groceries", "Essentials"] as const).map((tab) => {
            const isActive = selectedServiceTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedServiceTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-brand-dark/70 hover:text-brand-dark hover:bg-white/30"
                }`}
                id={`services-tab-${tab.toLowerCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeServiceTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-cyan rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Swipe indicator helper for mobile devices */}
        <div className="flex sm:hidden items-center justify-center gap-2 mb-6 text-brand-primary/60 text-xs font-mono font-bold uppercase tracking-widest animate-pulse select-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <span>Swipe left / right to explore</span>
        </div>

        {/* Services Grid with Layout Animations */}
        <div ref={containerRef} className="overflow-hidden sm:overflow-visible w-full cursor-grab active:cursor-grabbing pb-4">
          <motion.div 
            ref={sliderRef}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.15}
            dragListener={typeof window !== "undefined" && window.innerWidth < 640}
            layout
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
            style={{ x: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, _index) => {
                const isComingSoon = service.isComingSoon;
                const mappedCategory = categoryMap[service.id];

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={!isComingSoon ? { y: -8, scale: 1.02 } : {}}
                    onClick={() => {
                      if (!isComingSoon && mappedCategory) {
                        onSelectCategory(mappedCategory);
                      }
                    }}
                    key={service.id}
                    className={`group rounded-[24px] p-6 md:p-8 transition-all duration-300 relative w-[285px] sm:w-auto shrink-0 sm:shrink ${
                      isComingSoon
                        ? "bg-brand-dark/5 opacity-60 border border-brand-dark/5 cursor-not-allowed"
                        : "glass-card hover:glass-card-hover border-white/60 cursor-pointer shadow-sm hover:shadow-xl"
                    }`}
                    id={`service-card-${service.id}`}
                  >
                    {/* Glowing border effect for interactive cards */}
                    {!isComingSoon && (
                      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-brand-primary/5 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}

                    <div className="flex items-start justify-between">
                      {/* Dynamic Lucide Icon */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isComingSoon
                          ? "bg-brand-dark/10 text-brand-dark/40"
                          : "bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 text-brand-primary group-hover:from-brand-primary group-hover:to-brand-cyan group-hover:text-white group-hover:shadow-md"
                      }`}>
                        <LucideIcon name={service.iconName} className="transition-transform duration-300 group-hover:scale-110" size={24} />
                      </div>

                      {/* Hot Tags / Badges */}
                      {service.tag && (
                        <span className={`text-[10px] font-mono tracking-widest uppercase font-extrabold px-3 py-1 rounded-full ${
                          service.tag === "Coming Soon"
                            ? "bg-brand-dark/15 text-brand-dark/60"
                            : "bg-brand-cyan/10 text-brand-primary border border-brand-cyan/20"
                        }`}>
                          {service.tag}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 text-left">
                      <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-brand-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm text-brand-dark/70 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* Micro-interactive Arrow Indicator */}
                    {!isComingSoon && (
                      <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                        <span>Browse Shelf</span>
                        <svg className="w-3.5 h-3.5 text-brand-cyan transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
