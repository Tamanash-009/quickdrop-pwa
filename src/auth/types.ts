export type AuthRole = "guest" | "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  role: AuthRole;
  isGuest: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signInAsGuest: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}
