import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import { toast, ToastT } from "sonner";

interface NotificationContextType {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  requestPushPermission: () => Promise<boolean>;
  pushPermissionStatus: NotificationPermission | "unsupported";
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [pushPermissionStatus, setPushPermissionStatus] = useState<NotificationPermission | "unsupported">("unsupported");

  useEffect(() => {
    if ("Notification" in window) {
      setPushPermissionStatus(Notification.permission);
      
      // Request permission on first visit if not determined yet
      if (Notification.permission === "default") {
        // Optional: you can wait for user interaction to request it
        // Or show a custom toast first
      }
    }
  }, []);

  const requestPushPermission = useCallback(async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      toast.error("Browser does not support push notifications");
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      setPushPermissionStatus(permission);
      if (permission === "granted") {
        toast.success("Notifications enabled!", { description: "You will now receive order updates." });
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, []);

  const createToastContent = useCallback((icon: string, iconColor: string, message: string, description?: string) => (
    <div className="flex items-start gap-3">
      <span className={`material-symbols-rounded ${iconColor} mt-0.5`}>{icon}</span>
      <div className="flex flex-col">
        <span className="font-bold text-on-surface dark:text-on-primary">{message}</span>
        {description && <span className="text-xs text-on-surface-variant dark:text-on-primary/70">{description}</span>}
      </div>
    </div>
  ), []);

  const success = useCallback((message: string, description?: string) => {
    toast(createToastContent("check_circle", "text-green-500", message, description));
  }, [createToastContent]);

  const error = useCallback((message: string, description?: string) => {
    toast(createToastContent("error", "text-red-500", message, description));
  }, [createToastContent]);

  const info = useCallback((message: string, description?: string) => {
    toast(createToastContent("info", "text-primary", message, description));
  }, [createToastContent]);

  const warning = useCallback((message: string, description?: string) => {
    toast(createToastContent("warning", "text-amber-500", message, description));
  }, [createToastContent]);

  const contextValue = useMemo(() => ({
    success,
    error,
    info,
    warning,
    requestPushPermission,
    pushPermissionStatus,
  }), [success, error, info, warning, requestPushPermission, pushPermissionStatus]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
