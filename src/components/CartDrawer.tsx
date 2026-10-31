'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { LuxuryImage } from '@/components/LuxuryImage';

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
  const { user, openAuthModal } = useAuth();

  if (!isCartOpen) return null;

  const hasOutOfStockItem = cartItems.some(
    (item) => (item.product.stockQuantity !== undefined ? item.product.stockQuantity <= 0 : !item.product.inStock)
  );

  const handleProceedToCheckout = () => {
    if (hasOutOfStockItem) return;
    closeCart();
    if (!user) {
      openAuthModal(() => {
        openCheckout();
      });
    } else {
      openCheckout();
    }
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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Side Slider Panel - Leaving visible backdrop on mobile so it doesn't take 100% full screen */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-[85vw] sm:w-[420px] max-w-md bg-[#FFFFFF] border-l border-[#C5A880]/30 shadow-2xl flex flex-col text-[#1A1A1A] animate-fade-in-up rounded-l-3xl overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-[#C5A880]/20 bg-[#F8F5EE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C6E43]" />
              <h2 id="cart-drawer-title" className="text-base font-serif font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Furniture Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            
            <button
              onClick={closeCart}
              className="p-2 text-[#7E7870] hover:text-[#1A1A1A] rounded-full hover:bg-[#F5F2EB] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 12-Hour Priority Shipping Notice */}
          <div className="px-5 py-2.5 bg-[#F5F2EB] border-b border-[#C5A880]/20 flex items-center gap-2 text-xs text-[#8C6E43] font-medium">
            <Zap className="w-3.5 h-3.5 fill-[#8C6E43] shrink-0" />
            <span>Eligible for 12-Hour Priority Dispatch & Free Express Delivery</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F2EB] border border-[#C5A880]/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#8C6E43]" />
                </div>
                <h3 className="text-base font-serif text-[#1A1A1A] font-semibold">Your Furniture Bag is Empty</h3>
                <p className="text-xs text-[#55504A] mt-1 max-w-xs">
                  Discover our exclusive space-saving smart furniture collection at direct factory wholesale rates.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-7 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-md hover:bg-[#8C6E43] transition-all"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl flex gap-3.5 relative group shadow-sm"
                >
                  {/* Thumbnail (Rounded-xl) */}
                  <div className="relative w-20 h-20 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-xl overflow-hidden shrink-0">
                    <LuxuryImage
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover rounded-xl"
                      fallbackTitle={item.product.title}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-serif font-semibold text-[#1A1A1A] line-clamp-1 pr-4">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#7E7870] hover:text-red-600 p-1 rounded-full transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#8C6E43] font-semibold uppercase tracking-wider block">
                          {item.product.category}
                        </span>
                        {(item.product.stockQuantity !== undefined ? item.product.stockQuantity <= 0 : !item.product.inStock) && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.2 rounded-full border border-red-300">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Quantity modifier with pill shape */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#C5A880]/40 bg-[#FFFFFF] rounded-full px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2 text-[#7E7870] hover:text-[#1A1A1A] rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-[#1A1A1A]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2 text-[#7E7870] hover:text-[#1A1A1A] rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-[#8C6E43]">
                          ₹{(item.product.wholesalePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[10px] line-through text-[#8C827A]">
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
            <div className="p-5 border-t border-[#C5A880]/20 bg-[#F8F5EE] space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#55504A]">
                  <span>Subtotal MRP:</span>
                  <span className="line-through text-[#8C827A]">₹{originalSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8C6E43] font-semibold">
                  <span>Wholesale Privilege Savings:</span>
                  <span>- ₹{totalSaved.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#55504A]">
                  <span>12-Hour Priority Shipping:</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="pt-2 border-t border-[#C5A880]/20 flex justify-between items-baseline text-sm">
                  <span className="font-serif uppercase tracking-wider text-[#1A1A1A] font-bold">Payable (COD):</span>
                  <span className="text-xl font-serif font-bold text-[#8C6E43]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                disabled={hasOutOfStockItem}
                onClick={handleProceedToCheckout}
                className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 ${
                  hasOutOfStockItem
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-400'
                    : 'bg-[#1A1A1A] hover:bg-[#8C6E43] text-white cursor-pointer active:scale-98'
                }`}
              >
                <span>{hasOutOfStockItem ? 'Item(s) Out of Stock' : 'Proceed to Checkout'}</span>
                {!hasOutOfStockItem && <ArrowRight className="w-4 h-4" />}
              </button>

              {hasOutOfStockItem && (
                <p className="text-[11px] text-red-600 text-center font-medium">
                  Please remove out-of-stock item(s) from your bag to proceed.
                </p>
              )}

              <div className="text-center">
                <span className="text-[10px] text-[#55504A] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#8C6E43]" />
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
