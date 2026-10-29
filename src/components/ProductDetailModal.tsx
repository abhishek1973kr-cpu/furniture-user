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
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFFFFF] border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] flex flex-col md:flex-row rounded-3xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-30 p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#F5F2EB] border border-[#C5A880]/30 rounded-full transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: 8-Image Gallery with Fluid Switching Animation */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-[#FDFBF7] border-b md:border-b-0 md:border-r border-[#C5A880]/20">
          
          {/* Main Large Image Display (Rounded-2xl) */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFEB] border border-[#C5A880]/25 rounded-2xl shadow-inner">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.title} perspective ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover object-center transition-all duration-500 transform hover:scale-105 cursor-crosshair rounded-2xl"
            />
            
            {/* Overlay Badges (Pills) */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
              <span className="bg-[#8C6E43] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Space-Saving Innovation
              </span>
              <span className="bg-white/95 border border-emerald-500/40 text-emerald-800 text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm flex items-center gap-1 shadow-sm">
                <Zap className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                12-Hour Priority Dispatch
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/75 px-2.5 py-1 text-[10px] text-white border border-[#C5A880]/40 rounded-full font-mono">
              {activeImageIndex + 1} / {product.images.length}
            </div>
          </div>

          {/* 8-Image Fluid Gallery Selector Bar */}
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#78726A] block mb-2 font-semibold">
              Multi-Angle Perspectives ({product.images.length} Functional Views)
            </span>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-[#8C6E43] ring-2 ring-[#8C6E43] scale-95 opacity-100 shadow-md'
                      : 'border-[#C5A880]/30 opacity-70 hover:opacity-100 hover:border-[#8C6E43]'
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
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFFFF]">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#55504A] mb-2">
              <span className="uppercase tracking-[0.2em] text-[#8C6E43] font-bold">
                {product.category} • {product.subCategory}
              </span>
              <div className="flex items-center gap-1 bg-[#F5F2EB] px-3 py-1 rounded-full border border-[#C5A880]/30">
                <Star className="w-3.5 h-3.5 text-[#8C6E43] fill-[#8C6E43]" />
                <span className="text-[#1A1A1A] font-bold">{product.rating}</span>
                <span className="text-[#7E7870]">({product.reviewCount} verified)</span>
              </div>
            </div>

            {/* Title */}
            <h2 id="product-detail-title" className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-tight font-medium">
              {product.title}
            </h2>

            {/* Space Saving Highlight (Rounded-2xl) */}
            <div className="mt-3 p-3 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl text-xs text-[#1A1A1A] shadow-sm">
              <span className="font-semibold uppercase tracking-wider block text-[10px] text-[#8C6E43]">Space-Saving Blueprint</span>
              <p className="text-[#4A4744] mt-0.5">{product.spaceSavingFeature}</p>
            </div>

            {/* Pricing Section (Rounded-2xl) */}
            <div className="mt-4 p-4 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl flex items-baseline justify-between shadow-sm">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8C6E43]">
                  ₹{product.wholesalePrice.toLocaleString('en-IN')}
                </span>
                <span className="ml-3 text-sm line-through text-[#7E7870]">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="ml-2 text-xs text-emerald-700 font-semibold">
                  Save ₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C6E43] font-bold bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#C5A880]/40 shadow-sm">
                Wholesale Price
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[#55504A] font-normal leading-relaxed">
              {product.description}
            </p>

            {/* Space-Saving Dimensions Grid (Rounded-xl) */}
            <div className="mt-5 pt-4 border-t border-[#C5A880]/20 grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Expanded Size</span>
                <span className="text-[#1A1A1A] font-semibold text-[11px] mt-0.5 block">{product.specifications.dimensions}</span>
              </div>
              <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Folded / Stowed Size</span>
                <span className="text-[#8C6E43] font-semibold text-[11px] mt-0.5 block">{product.specifications.foldedDimensions || 'Ultra Compact'}</span>
              </div>
              <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Weight Capacity</span>
                <span className="text-emerald-700 font-semibold text-[11px] mt-0.5 block">{product.specifications.weightCapacity}</span>
              </div>
              <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Setup & Assembly</span>
                <span className="text-[#1A1A1A] font-semibold text-[11px] mt-0.5 block">{product.specifications.assemblyRequired}</span>
              </div>
            </div>

            {/* Key Features Bullets */}
            <ul className="mt-4 space-y-1.5">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[#55504A]">
                  <Check className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer: Quantity Selector, Add to Bag, Buy Now */}
          <div className="mt-6 pt-5 border-t border-[#C5A880]/20">
            
            {/* Quantity Selector with Rounded-full pill */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#55504A] font-medium">Quantity:</span>
              <div className="flex items-center border border-[#C5A880]/40 bg-[#F8F5EE] rounded-full px-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#7E7870] hover:text-[#1A1A1A] transition-colors rounded-full"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-[#1A1A1A] font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#7E7870] hover:text-[#1A1A1A] transition-colors rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#7E7870] uppercase block">Total Due</span>
                <span className="text-base font-serif font-bold text-[#8C6E43]">
                  ₹{(product.wholesalePrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Buttons Grid (Pills) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-5 border border-[#C5A880]/60 hover:border-[#8C6E43] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-all flex items-center justify-center gap-2 hover:bg-[#F5F2EB]"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#8C6E43]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Buy Now (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2.5 text-center text-[11px] text-[#7E7870]">
              🔒 Pay with Cash on Delivery at doorstep • Fastly shipped within 12 hours
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
