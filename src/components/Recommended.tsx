import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { featuredProducts } from "../data";
import { handleCallNowClick } from "../utils";
import LazyImage from "./LazyImage";

interface RecommendedProps {
  onEnquiry: (productName: string) => void;
}

const engines = [
  "Recommended For You",
  "Frequently Enquired Together",
  "Trending This Week",
  "Most Popular",
  "Recently Added",
  "Seasonal Picks",
  "Staff Picks",
  "Daily Essentials"
];

export default function Recommended({ onEnquiry }: RecommendedProps) {
  const [activeEngine, setActiveEngine] = useState<string>("Recommended For You");

  // Dynamic filter lists for each Recommendation Engine
  const engineProducts = useMemo(() => {
    switch (activeEngine) {
      case "Recommended For You":
        // Top rated items across diverse categories
        return featuredProducts
          .filter(p => p.rating >= 4.8 && !p.prescriptionRequired)
          .slice(12, 20);

      case "Frequently Enquired Together":
        // Pairs of products, e.g. food + drinks, tea + cookies
        return featuredProducts
          .filter(p => 
            p.category === "Fast Food" || 
            p.category === "Cold Drinks & Juices" || 
            p.category === "Biscuits & Cookies" || 
            p.category === "Tea & Coffee"
          )
          .slice(22, 30);

      case "Trending This Week":
        // High popularity items with rating >= 4.7
        return featuredProducts
          .filter(p => p.isPopular && p.rating >= 4.7)
          .slice(4, 12);

      case "Most Popular":
        // Purely flagged as popular
        return featuredProducts
          .filter(p => p.isPopular)
          .slice(40, 48);

      case "Recently Added":
        // Fresh and newly added items
        return featuredProducts
          .filter(p => p.isFreshToday || p.category === "Cakes & Celebration")
          .slice(0, 8);

      case "Seasonal Picks":
        // Monsoon / Summer items (Umbrellas, Mangoes, Cold drinks)
        return featuredProducts
          .filter(p => 
            p.category === "Seasonal Products" || 
            p.category === "Fruits" || 
            p.subcategory === "Flowers"
          )
          .slice(3, 11);

      case "Staff Picks":
        // Organic and specialized high quality items
        return featuredProducts
          .filter(p => p.isOrganic || p.category === "Organic Products")
          .slice(0, 8);

      case "Daily Essentials":
        // Bread, Milk, Grocery staples, Soaps
        return featuredProducts
          .filter(p => 
            p.category === "Dairy & Bakery" || 
            p.category === "Grocery & Staples" || 
            p.category === "Cleaning Supplies" || 
            p.category === "Daily Needs"
          )
          .slice(15, 23);

      default:
        return featuredProducts.slice(0, 8);
    }
  }, [activeEngine]);

  return (
    <section
      id="recommended"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-surface"
    >
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-15%] w-[400px] aspect-square rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[450px] aspect-square rounded-full bg-cyan-500/5 blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-3.5 py-1 rounded-full bg-blue-500/10 text-[11px] font-mono tracking-widest font-bold uppercase text-blue-600 inline-flex items-center gap-1.5 mb-4"
            >
              <span>Smart Recommendation Engine</span>
            </motion.div>
            <h2 className="font-display font-extrabold text-4xl text-on-surface tracking-tight">
              Curated Just For You
            </h2>
            <p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
              Explore dynamic recommendation tracks built from real local merchant inventories. Handpicked fresh, fast delivery, and fully available.
            </p>
          </div>
        </div>

        {/* Dynamic Horizontal Recommendation Track Selector */}
        <div className="relative w-full border-b border-outline pb-2 mb-12">
          <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 px-2 scrollbar-none scroll-smooth select-none snap-x snap-mandatory">
            {engines.map((eng) => {
              const isActive = activeEngine === eng;
              return (
                <button
                  key={eng}
                  onClick={() => setActiveEngine(eng)}
                  className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer snap-start ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-on-primary shadow-md scale-[1.01]"
                      : "bg-surface-variant border border-outline text-on-surface hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {eng}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Items Shelf */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {engineProducts.map((item) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="group rounded-[28px] glass-card hover:glass-card-hover border border-white/60 bg-surface/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image, Dot & Badge Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-on-surface/5">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-65 pointer-events-none" />

                    {/* Left Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {item.isPopular && (
                        <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-blue-600 text-on-primary rounded-md shadow-sm">
                          TRENDING
                        </span>
                      )}
                      {item.isOrganic && (
                        <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-teal-600 text-on-primary rounded-md shadow-sm">
                          ORGANIC
                        </span>
                      )}
                    </div>

                    {/* Veg indicator */}
                    {item.isVeg !== undefined && (
                      <div className="absolute top-3 right-3 bg-surface/95 border border-white p-1 rounded-md shadow-sm flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                        <span className="text-[9px] font-bold text-on-surface-variant pr-1 select-none">
                          {item.isVeg ? "VEG" : "NON-VEG"}
                        </span>
                      </div>
                    )}

                    {/* Availability line */}
                    <div className="absolute bottom-3 left-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/35 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-extrabold text-emerald-700 tracking-wider uppercase select-none">
                        Available Today • {item.unit}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      {/* Rating Line */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-rounded text-sm font-fill">star</span>
                          </div>
                          <span className="text-xs font-bold text-on-surface-variant">{item.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-rounded text-xs">bolt</span>
                          <span>{item.isFastDelivery ? "30m Delivery" : "Standard"}</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-display font-extrabold text-base md:text-lg text-on-surface tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>

                      {/* Category Labeling */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        {item.subcategory && (
                          <span className="text-[9px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {item.subcategory}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-on-surface-variant mt-3 line-clamp-2 leading-relaxed">
                        {item.description || `Premium select quality ${item.name.toLowerCase()} hand-sorted and packaged under absolute temperature control.`}
                      </p>
                    </div>

                    {/* Interactive Button row */}
                    <div className="mt-6 border-t border-outline pt-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onEnquiry(item.name)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-on-primary text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.83.001-2.628-1.02-5.1-2.871-6.954C16.586 1.968 14.12.94 11.488.94 6.054.94 1.631 5.348 1.628 10.771c0 1.705.452 3.237 1.411 4.789L2.03 21.07l5.617-1.472z" />
                        </svg>
                        <span>Connect Now</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCallNowClick}
                        className="px-3 py-2.5 rounded-xl bg-surface-variant hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-all flex items-center justify-center cursor-pointer"
                        title="Call Now"
                      >
                        <span className="material-symbols-rounded text-base">phone</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
