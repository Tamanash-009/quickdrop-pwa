import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6 text-red-500">
            <AlertTriangle size={40} strokeWidth={1.5} />
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-brand-dark mb-2">Something went wrong</h1>
          <p className="text-brand-dark/60 max-w-sm mb-8 text-sm leading-relaxed">
            An unexpected error occurred. Our technical team has been notified.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-brand-primary/90 transition-all flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            <span>Reload Page</span>
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
