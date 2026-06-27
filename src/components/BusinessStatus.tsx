import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function BusinessStatus() {
  const [isOpen, setIsOpen] = useState(true);
  const [statusText, setStatusText] = useState("Open Now");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      // Use IST timezone directly or assume local is fine for this demo
      const hours = now.getHours();
      
      // Assuming open from 9 AM to 11 PM
      if (hours >= 9 && hours < 23) {
        setIsOpen(true);
        setStatusText("Open Now");
      } else {
        setIsOpen(false);
        setStatusText("Closed - Opens at 9 AM");
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md">
      <div className="relative flex items-center justify-center w-4 h-4">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? "bg-green-500" : "bg-red-500"}`}></span>
      </div>
      <span className="text-xs font-bold text-brand-dark/80">{statusText}</span>
      <Clock size={12} className="text-brand-dark/40" />
    </div>
  );
}
