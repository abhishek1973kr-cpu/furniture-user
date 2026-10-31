'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ConfirmedOrder } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { subscribeToLiveInventory } from '@/services/firebaseService';

interface CartContextType {
  // Live Inventory from Firestore 'inventoryItems'
  products: Product[];
  isInventoryLoading: boolean;
  isLiveConnected: boolean;

  // Cart Management
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  originalSubtotal: number;
  totalSaved: number;

  // Cart Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Product Detail Modal
  selectedProductForDetail: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  checkoutProduct: Product | null;
  checkoutQuantity: number;
  openCheckout: (product?: Product, quantity?: number) => void;
  closeCheckout: () => void;

  // Last Confirmed Order
  confirmedOrder: ConfirmedOrder | null;
  setConfirmedOrder: (order: ConfirmedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Real-time Live Inventory state from Firestore 'inventoryItems'
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isInventoryLoading, setIsInventoryLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Cart & Modals State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // 1. Subscribe to live Firestore `inventoryItems` collection using onSnapshot
  useEffect(() => {
    const unsubscribe = subscribeToLiveInventory(
      (liveItems) => {
        setProducts(liveItems);
        setIsInventoryLoading(false);
        setIsLiveConnected(true);
      },
      (err) => {
        console.warn('Firestore onSnapshot listener error:', err);
        setIsInventoryLoading(false);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Initialize cart from localStorage smoothly
  useEffect(() => {
    try {
      const saved = localStorage.getItem('livfabs_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('livfabs_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    const isOutOfStock =
      product.stockQuantity !== undefined ? product.stockQuantity <= 0 : !product.inStock;
    if (isOutOfStock) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openProductDetail = (product: Product) => {
    setSelectedProductForDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductForDetail(null);
  };

  const openCheckout = (product?: Product, quantity = 1) => {
    if (product) {
      const isOutOfStock =
        product.stockQuantity !== undefined ? product.stockQuantity <= 0 : !product.inStock;
      if (isOutOfStock) return;
      setCheckoutProduct(product);
      setCheckoutQuantity(quantity);
    } else {
      setCheckoutProduct(null);
    }
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.wholesalePrice * item.quantity,
    0
  );
  const originalSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const totalSaved = originalSubtotal - subtotal;

  return (
    <CartContext.Provider
      value={{
        products,
        isInventoryLoading,
        isLiveConnected,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        originalSubtotal,
        totalSaved,
        isCartOpen,
        openCart,
        closeCart,
        selectedProductForDetail,
        openProductDetail,
        closeProductDetail,
        isCheckoutOpen,
        checkoutProduct,
        checkoutQuantity,
        openCheckout,
        closeCheckout,
        confirmedOrder,
        setConfirmedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
