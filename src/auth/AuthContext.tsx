import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthContextType, AuthState, User } from "./types";
import { authService } from "./AuthService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isGuest: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check initial auth state
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setState({
            user,
            isAuthenticated: !user.isGuest,
            isGuest: user.isGuest,
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false, error: (error as Error).message }));
      }
    };
    initAuth();
  }, []);

  const signInAsGuest = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.signInAsGuest();
      setState({
        user,
        isAuthenticated: false,
        isGuest: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: (error as Error).message }));
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.signInWithGoogle();
      setState({
        user,
        isAuthenticated: true,
        isGuest: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: (error as Error).message }));
      throw error;
    }
  };

  const signInWithApple = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.signInWithApple();
      setState({
        user,
        isAuthenticated: true,
        isGuest: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: (error as Error).message }));
      throw error;
    }
  };

  const signOut = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await authService.signOut();
      setState({
        user: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: (error as Error).message }));
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    signInAsGuest,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
