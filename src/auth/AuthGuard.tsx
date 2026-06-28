import React, { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireFullUser?: boolean;
}

/**
 * A wrapper to protect routes.
 * In V1, this will mostly show a "Coming Soon" or fallback UI if the feature
 * requires full user authentication (since guest mode is the default).
 */
export default function AuthGuard({ children, fallback, requireFullUser = true }: AuthGuardProps) {
  const { isAuthenticated, isGuest, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  const isAuthorized = requireFullUser ? isAuthenticated && !isGuest : isAuthenticated || isGuest;

  if (!isAuthorized) {
    if (fallback) return <>{fallback}</>;
    
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
          <span className="material-symbols-rounded text-3xl">lock</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl text-on-surface mb-2">
          Feature Coming Soon
        </h2>
        <p className="text-on-surface-variant max-w-sm mx-auto mb-8">
          This section will be available once customer accounts are introduced in the near future.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
