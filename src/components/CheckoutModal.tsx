import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, MapPin, Navigation, Map } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { businessConfig } from '../config/business';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, grandTotal, deliveryFee, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    address: '',
    landmark: '',
    instructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) return "Name must be at least 3 characters long.";
    if (!/^[6-9]\d{9}$/.test(formData.whatsappNumber)) return "Please enter a valid 10-digit Indian WhatsApp number.";
    if (formData.address.trim().length < 15) return "Please enter a complete delivery address (min 15 chars).";
    
    // Naive local check for Nischintapur
    const lowerAddress = formData.address.toLowerCase();
    const lowerLandmark = formData.landmark.toLowerCase();
    if (!lowerAddress.includes('nischintapur') && !lowerLandmark.includes('nischintapur') && !lowerAddress.includes('700138')) {
      // Show warning but still allow order, we verify manually
      console.warn("Address might be outside Nischintapur.");
    }
    return null;
  };

  const generateWhatsAppPayload = () => {
    const itemList = items.map(item => `▪ ${item.quantity}x ${item.product.name} (₹${item.product.price * item.quantity})`).join('\n');
    
    const message = `*NEW ORDER REQUEST* 🚀
    
*Customer Details:*
👤 Name: ${formData.name.trim()}
📱 WhatsApp: ${formData.whatsappNumber}
📍 Address: ${formData.address.trim()}
🗺️ Landmark: ${formData.landmark.trim() || 'N/A'}
📝 Instructions: ${formData.instructions.trim() || 'None'}

*Order Summary:*
${itemList}

*Billing:*
Subtotal: ₹${subtotal}
Delivery Fee: ₹${deliveryFee}
*Grand Total: ₹${grandTotal}*

*Payment Mode:* Cash on Delivery / UPI on Delivery

Please confirm my order and share the expected delivery time. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    // Simulate small latency for UX
    setTimeout(() => {
      const payload = generateWhatsAppPayload();
      const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${payload}`;
      
      // Clear cart
      clearCart();
      setIsSubmitting(false);
      onClose();
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-outline flex items-center justify-between bg-background shrink-0">
            <div>
              <h2 className="font-display font-extrabold text-xl text-on-surface">Checkout</h2>
              <p className="text-xs font-bold text-on-surface-variant tracking-wide">Enter details for fast delivery</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-on-surface/5 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Coverage Alert Banner */}
          <div className="bg-primary/10 px-6 py-2.5 border-b border-brand-primary/20 flex items-center gap-2 shrink-0">
            <MapPin size={14} className="text-primary shrink-0" />
            <p className="text-[11px] font-bold text-on-surface">
              Delivery limited to <span className="text-primary">Nischintapur (10KM radius)</span>.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-rounded text-base">error</span>
                {error}
              </div>
            )}

            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
              <Navigation className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                Currently, we only deliver within <strong className="font-extrabold">{businessConfig.delivery.radiusKm} KM of Nischintapur</strong>. Orders outside this area may be cancelled.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant ml-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-background border border-outline rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-on-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant ml-1">WhatsApp Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" />
                  <input
                    type="tel"
                    name="whatsappNumber"
                    required
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full bg-background border border-outline rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-on-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant ml-1">Complete Delivery Address</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-on-surface/40" />
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat No, Street, Village/Area, PIN Code"
                    className="w-full bg-background border border-outline rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-on-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm resize-none custom-scrollbar"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant ml-1">Landmark (Optional)</label>
                <div className="relative">
                  <Map size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" />
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="e.g., Near local school"
                    className="w-full bg-background border border-outline rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-on-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant ml-1">Any Instructions? (Optional)</label>
                <textarea
                  name="instructions"
                  rows={2}
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="e.g., Don't ring the bell, Call when near"
                  className="w-full bg-surface border border-outline rounded-xl py-3 px-4 text-sm font-semibold text-on-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm resize-none custom-scrollbar"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-outline bg-background shrink-0">
            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Order via WhatsApp</span>
                  <span className="material-symbols-rounded text-lg">send</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface/40 mt-4 flex items-center justify-center gap-1.5">
              <span className="material-symbols-rounded text-xs text-primary">lock</span>
              Pay via Cash or UPI on Delivery
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
