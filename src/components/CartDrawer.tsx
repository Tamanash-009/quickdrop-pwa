import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { businessConfig } from '../config/business';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    grandTotal, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline bg-background/50">
              <div className="flex items-center gap-2.5 text-on-surface">
                <div className="relative">
                  <ShoppingBag size={22} className="text-primary" />
                  {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[9px] font-bold text-on-primary flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-extrabold text-xl tracking-tight">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-on-surface/5 transition-colors text-on-surface-variant hover:text-on-surface"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-grow overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <ShoppingBag size={48} className="mb-4 text-on-surface/30" />
                  <h3 className="font-display font-bold text-lg text-on-surface mb-1">Your cart is empty</h3>
                  <p className="text-sm text-on-surface-variant">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-primary/10 text-primary font-bold rounded-xl text-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg p-3 text-xs font-semibold text-brand-cyan/80 flex items-center gap-2">
                    <span className="text-base">🚀</span> Delivery within ~{businessConfig.delivery.averageTimeMins} mins in Nischintapur.
                  </div>
                  
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.product.id}
                        className="bg-background rounded-2xl p-4 flex gap-4 border border-outline shadow-sm relative group"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-background/50 shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>
                        
                        <div className="flex flex-col justify-between flex-grow">
                          <div className="pr-6">
                            <h4 className="font-bold text-on-surface text-sm leading-tight line-clamp-2">
                              {item.product.name}
                            </h4>
                            <span className="text-xs font-semibold text-on-surface-variant mt-1 block">
                              {item.product.unit}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-background rounded-lg border border-outline p-1">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background hover:shadow-sm text-on-surface-variant transition-all"
                              >
                                <Minus size={12} strokeWidth={3} />
                              </button>
                              <span className="text-sm font-bold text-on-surface min-w-[12px] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background hover:shadow-sm text-primary transition-all"
                              >
                                <Plus size={12} strokeWidth={3} />
                              </button>
                            </div>
                            
                            <span className="font-extrabold text-on-surface text-sm">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="absolute top-3 right-3 text-on-surface/30 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary Area */}
            {items.length > 0 && (
              <div className="p-5 border-t border-outline bg-background shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="border-t border-outline my-1" />
                  <div className="flex items-center justify-between font-extrabold text-on-surface text-lg">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{grandTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-brand-primary/20 active:scale-[0.98]"
                >
                  Proceed to Checkout <span className="text-on-primary/70 ml-1">→</span>
                </button>
                <p className="text-[10px] text-on-surface/40 font-mono font-bold uppercase tracking-widest text-center mt-3">
                  Cash on Delivery & UPI Supported
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
