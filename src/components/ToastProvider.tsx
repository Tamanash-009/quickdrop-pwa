import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "glass-card border border-white/60 bg-white/70 backdrop-blur-xl text-brand-dark rounded-2xl shadow-xl font-medium text-sm tracking-wide py-4",
        style: {
          padding: "16px",
          gap: "12px",
        },
      }}
    />
  );
}
