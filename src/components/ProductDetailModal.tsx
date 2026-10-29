'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Zap, ShieldCheck, Heart, Sparkles, Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    closeProductDetail,
    addToCart,
    openCheckout,
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset image index when opened with a new product
  useEffect(() => {
    if (selectedProductForDetail) {
      setActiveImageIndex(0);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  const handleBuyNow = () => {
    closeProductDetail();
    openCheckout(product, quantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in-up"
    >
      {/* Background click to dismiss */}
      <div
        className="fixed inset-0"
        onClick={closeProductDetail}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#171717] border border-[#C5A880]/30 shadow-2xl z-10 text-[#F9F8F6] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-30 p-2 text-[#9E9A93] hover:text-[#C5A880] bg-[#121212]/80 border border-white/10 rounded-full transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: 5-Image Gallery with Fluid Switching Animation */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-[#141414] border-b md:border-b-0 md:border-r border-[#C5A880]/20">
          
          {/* Main Large Image Display */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#0D0D0D] border border-white/5">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.title} angle ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover object-center transition-all duration-500 transform hover:scale-110 cursor-crosshair"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
              <span className="bg-[#C5A880] text-[#1A1A1A] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Flat ₹99 Special
              </span>
              <span className="bg-[#121212]/90 border border-emerald-500/30 text-emerald-400 text-[9px] font-medium px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-emerald-400" />
                12-Hour Priority Dispatch
              </span>
            </div>

            <div className="absolute bottom-2.5 right-2.5 bg-black/75 px-2 py-0.5 text-[10px] text-[#C5A880] border border-[#C5A880]/30 font-mono">
              {activeImageIndex + 1} / {product.images.length}
            </div>
          </div>

          {/* 5-Thumbnail Fluid Selector Bar */}
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#9E9A93] block mb-2">
              Artisan Gallery Angles (Select to Switch)
            </span>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] ring-1 ring-[#C5A880] scale-95 opacity-100 shadow-goldGlow'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-[#C5A880]/60'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail angle ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Specifications & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#9E9A93] mb-2">
              <span className="uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                {product.category} • {product.subCategory}
              </span>
              <div className="flex items-center gap-1 bg-[#121212] px-2 py-0.5 border border-[#C5A880]/20">
                <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
                <span className="text-white font-bold">{product.rating}</span>
                <span className="text-[#9E9A93]">({product.reviewCount} verified)</span>
              </div>
            </div>

            {/* Title */}
            <h2 id="product-detail-title" className="text-xl sm:text-2xl font-serif text-[#F9F8F6] leading-tight">
              {product.title}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#C5A880] font-light mt-1">
              {product.subtitle}
            </p>

            {/* Pricing Section */}
            <div className="mt-4 p-3.5 bg-[#121212] border border-[#C5A880]/25 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A880]">
                  ₹{product.wholesalePrice}
                </span>
                <span className="ml-3 text-sm line-through text-[#9E9A93]">
                  ₹{product.originalPrice}
                </span>
                <span className="ml-2 text-xs text-emerald-400 font-medium">
                  Save ₹{product.originalPrice - product.wholesalePrice} (72% Off)
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold bg-[#C5A880]/15 px-2 py-1 border border-[#C5A880]/30">
                Wholesale Price
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[#F9F8F6]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Luxury Specifications Accordion Grid */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#141414] border border-white/5">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Metal / Plating</span>
                <span className="text-white font-medium text-[11px] mt-0.5 block">{product.specifications.plating}</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Skin Compatibility</span>
                <span className="text-emerald-400 font-medium text-[11px] mt-0.5 block">100% Hypoallergenic</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Warranty Cover</span>
                <span className="text-[#C5A880] font-medium text-[11px] mt-0.5 block">{product.specifications.warranty}</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Dispatch Window</span>
                <span className="text-white font-medium text-[11px] mt-0.5 block">⚡ Under 12 Hours</span>
              </div>
            </div>

            {/* Key Features Bullets */}
            <ul className="mt-4 space-y-1.5">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[#9E9A93]">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer: Quantity Selector, Add to Bag, Buy Now */}
          <div className="mt-6 pt-5 border-t border-[#C5A880]/20">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#9E9A93]">Quantity:</span>
              <div className="flex items-center border border-[#C5A880]/30 bg-[#121212]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#9E9A93] hover:text-[#C5A880] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-white font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#9E9A93] hover:text-[#C5A880] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#9E9A93] uppercase block">Total Payable</span>
                <span className="text-base font-serif font-bold text-[#C5A880]">₹{99 * quantity}</span>
              </div>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 border border-[#C5A880]/50 hover:border-[#C5A880] text-[#F9F8F6] text-xs font-semibold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 hover:bg-white/5"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-goldGlow flex items-center justify-center gap-2"
              >
                <span>Buy Now (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-[#9E9A93]">
              🔒 Pay with Cash on Delivery at doorstep • Fastly shipped within 12 hours
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

