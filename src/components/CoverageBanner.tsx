import React from "react";
import { businessConfig } from "../config/business";

export default function CoverageBanner() {
  return (
    <div className="w-full bg-primary/10 border-b border-brand-primary/20 text-on-surface py-2 px-4 z-50 relative flex items-center justify-center gap-2">
      <span className="material-symbols-rounded text-sm text-primary">my_location</span>
      <p className="text-[11px] md:text-xs font-semibold text-center tracking-wide">
        Currently serving <strong className="text-primary">{businessConfig.deliveryAreas[0]}</strong> and surrounding areas (within a <strong>{businessConfig.delivery.radiusKm} KM</strong> radius).
      </p>
    </div>
  );
}
