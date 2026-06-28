import { MapPin, CheckCircle2 } from "lucide-react";

export default function DeliveryCoverage() {
  const coverageAreas = [
    "Nischintapur"
  ];

  return (
    <div className="py-6 px-4 bg-primary/5 rounded-3xl border border-brand-primary/10 w-full mb-8">
      <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <MapPin size={16} />
        </div>
        <h3 className="font-display font-bold text-on-surface">Our Delivery Coverage</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {coverageAreas.map(area => (
          <div key={area} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-brand-primary/15 shadow-sm text-xs font-semibold text-on-surface-variant">
            <CheckCircle2 size={14} className="text-primary" />
            <span>{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
