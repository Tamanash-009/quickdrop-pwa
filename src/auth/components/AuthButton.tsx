import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}

export function AuthButton({ children, icon, variant = "primary", isLoading, className = "", ...props }: AuthButtonProps) {
  const baseStyles = "relative w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed select-none";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary/90 shadow-sm hover:shadow-md",
    secondary: "bg-surface text-on-surface border border-outline hover:bg-on-surface/5",
    outline: "bg-transparent text-on-surface border-2 border-outline hover:border-brand-primary hover:text-primary",
    ghost: "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-on-surface/5",
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: props.disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}

// Google Auth Button
export function GoogleButton({ onClick, isLoading }: { onClick: () => void; isLoading?: boolean }) {
  return (
    <AuthButton
      variant="secondary"
      onClick={onClick}
      isLoading={isLoading}
      icon={
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      }
    >
      Continue with Google
    </AuthButton>
  );
}

// Apple Auth Button
export function AppleButton({ onClick, isLoading, disabled = false }: { onClick?: () => void; isLoading?: boolean, disabled?: boolean }) {
  return (
    <AuthButton
      variant="secondary"
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
      title={disabled ? "Apple ID is not configured yet" : "Continue with Apple"}
      className="bg-black text-on-primary hover:bg-black/90 border-transparent hover:text-on-primary"
      icon={
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.365 7.026C17.208 6.002 17.766 4.582 17.614 3.16c-1.222.05-2.698.814-3.567 1.838-.78.892-1.455 2.338-1.278 3.732 1.36.105 2.756-.704 3.596-1.704zM17.459 9.38c-1.898-.108-3.55 1.054-4.512 1.054-.937 0-2.316-.995-3.874-.967-2.02.026-3.882 1.173-4.912 2.973-2.083 3.618-.532 8.98 1.498 11.905.992 1.428 2.164 3.023 3.693 2.966 1.474-.055 2.036-.95 3.821-.95 1.785 0 2.285.95 3.847.92 1.587-.026 2.613-1.45 3.596-2.88 1.137-1.663 1.605-3.275 1.628-3.356-.037-.015-3.14-1.206-3.176-4.815-.03-3.026 2.47-4.475 2.585-4.549-1.417-2.073-3.626-2.355-4.194-2.3z" />
        </svg>
      }
    >
      Continue with Apple
    </AuthButton>
  );
}

// Guest Auth Button
export function GuestButton({ onClick, isLoading }: { onClick: () => void; isLoading?: boolean }) {
  return (
    <AuthButton
      variant="outline"
      onClick={onClick}
      isLoading={isLoading}
      icon={<span className="material-symbols-rounded text-[20px]">person_check</span>}
    >
      Continue as Guest
    </AuthButton>
  );
}
