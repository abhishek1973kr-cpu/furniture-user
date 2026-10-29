'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    originalSubtotal,
    totalSaved,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Blurred dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171717] border-l border-[#C5A880]/30 shadow-2xl flex flex-col text-[#F9F8F6] animate-fade-in-up rounded-l-3xl overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-[#C5A880]/20 bg-[#141414] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h2 id="cart-drawer-title" className="text-base font-serif font-normal uppercase tracking-wider text-white">
                Furniture Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            
            <button
              onClick={closeCart}
              className="p-2 text-[#9E9A93] hover:text-[#C5A880] rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 12-Hour Priority Shipping Notice */}
          <div className="px-5 py-2.5 bg-[#121212] border-b border-white/5 flex items-center gap-2 text-xs text-[#C5A880]">
            <Zap className="w-3.5 h-3.5 fill-[#C5A880] shrink-0" />
            <span>Eligible for 12-Hour Priority Dispatch & Free Express Delivery</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#C5A880]/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#C5A880]/60" />
                </div>
                <h3 className="text-base font-serif text-white">Your Furniture Bag is Empty</h3>
                <p className="text-xs text-[#9E9A93] mt-1 max-w-xs">
                  Discover our exclusive Space-Saving Smart Furniture strictly in the ₹1,500 – ₹2,500 range.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-7 py-3 bg-[#C5A880] text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-full shadow-goldGlow hover:bg-[#D4B489] transition-all"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-[#141414] border border-[#C5A880]/20 rounded-2xl flex gap-3.5 relative group shadow-sm"
                >
                  {/* Thumbnail (Rounded-xl) */}
                  <div className="relative w-20 h-20 bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-serif text-white line-clamp-1 pr-4">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9E9A93] hover:text-red-400 p-1 rounded-full transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#C5A880] uppercase tracking-wider block mt-0.5">
                        {item.product.category}
                      </span>
                    </div>

                    {/* Price and Quantity modifier with pill shape */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#C5A880]/30 bg-[#121212] rounded-full px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2 text-[#9E9A93] hover:text-[#C5A880] rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2 text-[#9E9A93] hover:text-[#C5A880] rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-[#C5A880]">
                          ₹{(item.product.wholesalePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[10px] line-through text-[#9E9A93]">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#C5A880]/20 bg-[#141414] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9E9A93]">
                  <span>Subtotal MRP:</span>
                  <span className="line-through">₹{originalSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#C5A880]">
                  <span>Wholesale Privilege Savings:</span>
                  <span>- ₹{totalSaved.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#9E9A93]">
                  <span>12-Hour Priority Shipping:</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm">
                  <span className="font-serif uppercase tracking-wider text-white">Payable (COD):</span>
                  <span className="text-xl font-serif font-bold text-[#C5A880]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-goldGlow flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-[10px] text-[#9E9A93] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                  Pay with Cash on Delivery at doorstep
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
