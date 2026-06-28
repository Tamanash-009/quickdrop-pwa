import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { ProductItem, CartItem } from '../types';
import { businessConfig } from '../config/business';
import { useNotification } from './NotificationContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('quickdrop_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { success } = useNotification();

  useEffect(() => {
    localStorage.setItem('quickdrop_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: ProductItem) => {
    setItems((currentItems) => {
      const existing = currentItems.find(item => item.product.id === product.id);
      if (existing) {
        return currentItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
    success('Added to Cart', `${product.name} has been added to your cart.`);
  }, [success]);

  const removeFromCart = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
      return;
    }
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(() => items.reduce((total, item) => total + (item.product.price * item.quantity), 0), [items]);
  const deliveryFee = items.length > 0 ? businessConfig.delivery.charge : 0;
  const grandTotal = subtotal + deliveryFee;
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const contextValue = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    grandTotal,
    itemCount,
    isCartOpen,
    setIsCartOpen
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, grandTotal, itemCount, isCartOpen]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
