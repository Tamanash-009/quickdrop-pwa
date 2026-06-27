import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export default function LucideIcon({ name, className, size = 24, strokeWidth = 2 }: LucideIconProps) {
  // Safe lookup with fallback to HelpCircle icon if name is wrong or missing
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
}
