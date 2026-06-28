import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { businessConfig } from "../config/business";

export default function BusinessStatus() {
  const [isOpen, setIsOpen] = useState(true);
  const [statusText, setStatusText] = useState("Open Now");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const [openHourStr, openMinStr] = businessConfig.hours.openTime.split(':');
      const [closeHourStr, closeMinStr] = businessConfig.hours.closeTime.split(':');
      
      const openHour = parseInt(openHourStr, 10);
      const openMin = parseInt(openMinStr, 10);
      const closeHour = parseInt(closeHourStr, 10);
      const closeMin = parseInt(closeMinStr, 10);
      
      const currentTotalMins = currentHour * 60 + currentMinute;
      const openTotalMins = openHour * 60 + openMin;
      const closeTotalMins = closeHour * 60 + closeMin;
      
      if (currentTotalMins >= openTotalMins && currentTotalMins < closeTotalMins) {
        setIsOpen(true);
        setStatusText("Open Now");
      } else {
        setIsOpen(false);
        const formatHour = (h: number) => {
          const ampm = h >= 12 ? 'PM' : 'AM';
          const h12 = h % 12 || 12;
          return `${h12} ${ampm}`;
        };
        setStatusText(`Closed - Opens at ${formatHour(openHour)}`);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 border border-white/80 shadow-sm backdrop-blur-md">
      <div className="relative flex items-center justify-center w-4 h-4">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? "bg-green-500" : "bg-red-500"}`}></span>
      </div>
      <span className="text-xs font-bold text-on-surface-variant">{statusText}</span>
      <Clock size={12} className="text-on-surface/40" />
    </div>
  );
}
