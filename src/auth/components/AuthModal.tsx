import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../../components/Logo";
import { GoogleButton, AppleButton, GuestButton } from "./AuthButton";
import { useAuth } from "../AuthContext";
import { toast } from "sonner"; // Using sonner for now, will replace with NotificationContext later if needed

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInAsGuest, signInWithGoogle, signInWithApple, error, isLoading } = useAuth();

  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest();
      toast.success("Signed in as Guest successfully!");
      onClose();
    } catch (err) {
      toast.error(error || "Failed to sign in as guest");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-surface/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-on-surface/5 hover:bg-on-surface/10 flex items-center justify-center text-on-surface-variant transition-colors z-10 disabled:opacity-50"
            >
              <span className="material-symbols-rounded text-xl">close</span>
            </button>

            {/* Header */}
            <div className="px-8 pt-10 pb-6 text-center flex flex-col items-center border-b border-outline">
              <Logo className="h-10 mb-4" />
              <h2 className="font-display font-extrabold text-2xl text-on-surface tracking-tight">
                Welcome to QuickDrop
              </h2>
              <p className="text-sm text-on-surface-variant mt-2 font-medium">
                Log in to unlock saved addresses, order history, and exclusive rewards.
              </p>
            </div>

            {/* Auth Options */}
            <div className="px-8 py-8 flex flex-col gap-4">
              <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />
              <AppleButton onClick={handleAppleSignIn} isLoading={isLoading} disabled={true} />
              
              <div className="flex items-center gap-4 my-2">
                <hr className="flex-1 border-outline" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface/40">OR</span>
                <hr className="flex-1 border-outline" />
              </div>

              <GuestButton onClick={handleGuestSignIn} isLoading={isLoading} />
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-on-surface/5 text-center">
              <p className="text-xs text-on-surface-variant">
                By continuing, you agree to our{" "}
                <a href="/terms-and-conditions" className="font-bold hover:text-primary underline underline-offset-2">Terms</a>
                {" "}and{" "}
                <a href="/privacy-policy" className="font-bold hover:text-primary underline underline-offset-2">Privacy Policy</a>.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
