import { User } from "./types";

/**
 * Interface representing the Auth Service.
 * This can be swapped out for Clerk, Supabase, or Firebase later.
 */
export interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  signInAsGuest(): Promise<User>;
  signInWithGoogle(): Promise<User>;
  signInWithApple(): Promise<User>;
  signOut(): Promise<void>;
}

/**
 * Placeholder implementation of AuthService that supports Guest mode.
 */
class MockAuthService implements IAuthService {
  private readonly GUEST_USER: User = {
    id: "guest_" + Math.random().toString(36).substring(2, 9),
    name: "Guest User",
    email: null,
    avatarUrl: null,
    role: "guest",
    isGuest: true,
  };

  async getCurrentUser(): Promise<User | null> {
    const isGuest = localStorage.getItem("quickdrop_auth_is_guest") === "true";
    if (isGuest) {
      return this.GUEST_USER;
    }
    return null;
  }

  async signInAsGuest(): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("quickdrop_auth_is_guest", "true");
        resolve(this.GUEST_USER);
      }, 600); // simulate network latency
    });
  }

  async signInWithGoogle(): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Google Auth is not configured in V1. Please continue as a guest."));
      }, 800);
    });
  }

  async signInWithApple(): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Apple Auth is not configured in V1. Please continue as a guest."));
      }, 800);
    });
  }

  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("quickdrop_auth_is_guest");
        resolve();
      }, 400);
    });
  }
}

export const authService = new MockAuthService();
