import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../AuthContext";
import ProfileAvatar from "./ProfileAvatar";
import AuthModal from "./AuthModal";

export default function UserMenu() {
  const { user, isAuthenticated, isGuest, signOut, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-on-surface/5 animate-pulse" />
    );
  }

  // Handle unauthenticated state (not even guest)
  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <span className="material-symbols-rounded text-sm">login</span>
          <span className="hidden sm:inline">Sign In</span>
        </button>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-on-surface/5 transition-colors"
      >
        <ProfileAvatar name={user.name} avatarUrl={user.avatarUrl} size="md" />
        <span className="hidden sm:inline text-xs font-bold text-on-surface max-w-[100px] truncate">
          {user.name}
        </span>
        <span className="material-symbols-rounded text-base text-on-surface-variant">
          expand_more
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-surface/95 backdrop-blur-xl border border-outline shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-outline bg-background">
              <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
              <p className="text-[10px] text-on-surface-variant truncate">
                {isGuest ? "Guest Session" : user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2 flex flex-col gap-1">
              <MenuItem icon="person" label="Profile" disabled />
              <MenuItem icon="list_alt" label="Order History" disabled />
              <MenuItem icon="home_pin" label="Saved Addresses" disabled />
              <MenuItem icon="favorite" label="Wishlist" disabled />
              <MenuItem icon="stars" label="Loyalty Rewards" disabled />
            </div>

            <div className="p-3 border-t border-outline">
              {isGuest ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded text-sm">person_add</span>
                  Create Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded text-sm">logout</span>
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

function MenuItem({ icon, label, disabled = false }: { icon: string; label: string; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed text-on-surface-variant"
          : "hover:bg-on-surface/5 text-on-surface"
      }`}
      title={disabled ? "Available when accounts are introduced" : label}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-rounded text-[18px]">{icon}</span>
        <span className="font-semibold">{label}</span>
      </div>
      {disabled && <span className="text-[9px] font-mono font-bold bg-on-surface/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Soon</span>}
    </button>
  );
}
