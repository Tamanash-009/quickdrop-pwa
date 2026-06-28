import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Laptop } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={cycleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-on-surface/5 transition-colors focus:outline-none"
      title={`Theme: ${theme}`}
    >
      {theme === 'light' && <Sun size={20} />}
      {theme === 'dark' && <Moon size={20} />}
      {theme === 'system' && <Laptop size={20} />}
    </motion.button>
  );
}
