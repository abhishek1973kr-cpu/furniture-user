'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Zap, ShieldCheck, Check, ArrowRight, Minus, Plus } from 'lucide-react';
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

  const discountAmount = product.originalPrice - product.wholesalePrice;

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

      {/* Modal Card with Smooth Rounded-3xl Corners */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#171717] border border-[#C5A880]/30 shadow-2xl z-10 text-[#F9F8F6] flex flex-col md:flex-row rounded-3xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-30 p-2 text-[#9E9A93] hover:text-[#C5A880] bg-[#121212]/80 border border-white/10 rounded-full transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: 5-Image Gallery with Fluid Switching Animation */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-[#141414] border-b md:border-b-0 md:border-r border-[#C5A880]/20">
          
          {/* Main Large Image Display (Rounded-2xl) */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#0D0D0D] border border-white/5 rounded-2xl shadow-inner">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.title} perspective ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover object-center transition-all duration-500 transform hover:scale-105 cursor-crosshair rounded-2xl"
            />
            
            {/* Overlay Badges (Pills) */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
              <span className="bg-[#C5A880] text-[#1A1A1A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Space-Saving Innovation
              </span>
              <span className="bg-[#121212]/90 border border-emerald-500/30 text-emerald-400 text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-emerald-400" />
                12-Hour Priority Dispatch
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/75 px-2.5 py-1 text-[10px] text-[#C5A880] border border-[#C5A880]/30 rounded-full font-mono">
              {activeImageIndex + 1} / {product.images.length}
            </div>
          </div>

          {/* 8-Image Fluid Gallery Selector Bar */}
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#9E9A93] block mb-2 font-medium">
              Multi-Angle Perspectives ({product.images.length} Functional Views)
            </span>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880] scale-95 opacity-100 shadow-goldGlow'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-[#C5A880]/60'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Space-Saving Specifications & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#9E9A93] mb-2">
              <span className="uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                {product.category} • {product.subCategory}
              </span>
              <div className="flex items-center gap-1 bg-[#121212] px-3 py-1 rounded-full border border-[#C5A880]/20">
                <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
                <span className="text-white font-bold">{product.rating}</span>
                <span className="text-[#9E9A93]">({product.reviewCount} verified)</span>
              </div>
            </div>

            {/* Title */}
            <h2 id="product-detail-title" className="text-xl sm:text-2xl font-serif text-[#F9F8F6] leading-tight">
              {product.title}
            </h2>

            {/* Space Saving Highlight (Rounded-2xl) */}
            <div className="mt-3 p-3 bg-[#121212] border border-[#C5A880]/25 rounded-2xl text-xs text-[#C5A880] shadow-sm">
              <span className="font-semibold uppercase tracking-wider block text-[10px]">Space-Saving Blueprint</span>
              <p className="text-white/90 mt-0.5">{product.spaceSavingFeature}</p>
            </div>

            {/* Pricing Section (Rounded-2xl) */}
            <div className="mt-4 p-4 bg-[#121212] border border-[#C5A880]/25 rounded-2xl flex items-baseline justify-between shadow-sm">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A880]">
                  ₹{product.wholesalePrice.toLocaleString('en-IN')}
                </span>
                <span className="ml-3 text-sm line-through text-[#9E9A93]">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="ml-2 text-xs text-emerald-400 font-medium">
                  Save ₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30">
                Wholesale Price
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[#F9F8F6]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Space-Saving Dimensions Grid (Rounded-xl) */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-[#141414] border border-white/5 rounded-xl">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Expanded Size</span>
                <span className="text-white font-medium text-[11px] mt-0.5 block">{product.specifications.dimensions}</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5 rounded-xl">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Folded / Stowed Size</span>
                <span className="text-[#C5A880] font-medium text-[11px] mt-0.5 block">{product.specifications.foldedDimensions || 'Ultra Compact'}</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5 rounded-xl">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Weight Capacity</span>
                <span className="text-emerald-400 font-medium text-[11px] mt-0.5 block">{product.specifications.weightCapacity}</span>
              </div>
              <div className="p-2.5 bg-[#141414] border border-white/5 rounded-xl">
                <span className="text-[#9E9A93] text-[10px] uppercase block tracking-wider">Setup & Assembly</span>
                <span className="text-white font-medium text-[11px] mt-0.5 block">{product.specifications.assemblyRequired}</span>
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
            
            {/* Quantity Selector with Rounded-full pill */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#9E9A93]">Quantity:</span>
              <div className="flex items-center border border-[#C5A880]/30 bg-[#121212] rounded-full px-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#9E9A93] hover:text-[#C5A880] transition-colors rounded-full"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-white font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#9E9A93] hover:text-[#C5A880] transition-colors rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#9E9A93] uppercase block">Total Due</span>
                <span className="text-base font-serif font-bold text-[#C5A880]">
                  ₹{(product.wholesalePrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Buttons Grid (Pills) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-5 border border-[#C5A880]/50 hover:border-[#C5A880] text-[#F9F8F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-all flex items-center justify-center gap-2 hover:bg-white/5"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#C5A880]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-5 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all shadow-goldGlow flex items-center justify-center gap-2"
              >
                <span>Buy Now (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2.5 text-center text-[11px] text-[#9E9A93]">
              🔒 Pay with Cash on Delivery at doorstep • Fastly shipped within 12 hours
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
