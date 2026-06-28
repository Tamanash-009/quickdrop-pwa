import React, { memo } from "react";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import LazyImage from "./LazyImage";
import { handleCallNowClick } from "../utils";

// Type extraction
type ProductType = any; 

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
}

const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4 }}
      className="group rounded-[24px] glass-card hover:glass-card-hover border border-outline bg-background/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-[280px] sm:w-auto shrink-0 sm:shrink"
    >
      {/* Image & Badges Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-on-surface/5">
        <LazyImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isPopular && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-primary text-on-primary rounded-md shadow-sm">
              POPULAR
            </span>
          )}
          {product.isOrganic && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-teal-600 text-on-primary rounded-md shadow-sm">
              ORGANIC
            </span>
          )}
          {product.isFreshToday && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-amber-500 text-on-primary rounded-md shadow-sm">
              FRESH
            </span>
          )}
        </div>

        {/* Right Veg/Non-Veg Indicator Dot */}
        {product.isVeg !== undefined && (
          <div className="absolute top-3 right-3 bg-background/95 border border-outline p-1 rounded-md shadow-sm flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${product.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-[9px] font-bold text-on-surface-variant pr-1 select-none">
              {product.isVeg ? "VEG" : "NON-VEG"}
            </span>
          </div>
        )}

        {/* Available Today Badge / Unit Info */}
        {product.isAvailableToday ? (
          <div className="absolute bottom-3 left-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/35 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-extrabold text-emerald-700 tracking-wider uppercase select-none">
              Available Today • {product.unit}
            </span>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 bg-red-500/10 backdrop-blur-md border border-red-500/35 rounded-lg px-2.5 py-1 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[9px] font-mono font-extrabold text-red-700 tracking-wider uppercase select-none">
              Out of Stock • {product.unit}
            </span>
          </div>
        )}
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Rating Block & Availability Badge */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                <span className="material-symbols-rounded text-sm font-fill">star</span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">{product.rating}</span>
            </div>
            
            <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-primary/80 uppercase tracking-wide bg-primary/5 px-2 py-0.5 rounded-md">
              <span className="material-symbols-rounded text-xs">bolt</span>
              <span>{product.isFastDelivery ? "30m Delivery" : "Standard"}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-base md:text-lg text-on-surface tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Category / Subcategory Badge Row */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="text-[9px] font-mono uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded">
                {product.subcategory}
              </span>
            )}
          </div>

          {/* Prescription Required warning */}
          {product.prescriptionRequired && (
            <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 flex items-center gap-1.5 text-red-700 text-[10px] font-bold">
              <span className="material-symbols-rounded text-sm">prescription</span>
              <span>Prescription Required prior to dispatch</span>
            </div>
          )}

          <p className="text-xs text-on-surface-variant mt-2.5 line-clamp-2">
            {product.description || `Premium quality fresh ${product.name.toLowerCase()} sourced from verified local partner shops.`}
          </p>
        </div>

        {/* Interactive Contact/WhatsApp Row */}
        <div className="mt-5 border-t border-outline pt-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(product)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-gradient-end text-on-primary text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
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
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
