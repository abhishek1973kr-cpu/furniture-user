'use client';

import React, { useState } from 'react';
import { Eye, ShoppingBag, Zap, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { LuxuryImage } from '@/components/LuxuryImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, openCheckout, addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCheckout(product, 1);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const discountPercentage = Math.round(
    ((product.originalPrice - product.wholesalePrice) / product.originalPrice) * 100
  );

  return (
    <article
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#FFFFFF] border border-[#C5A880]/30 hover:border-[#8C6E43] transition-all duration-300 flex flex-col justify-between rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* Top Media Container with Rounded Corners */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#F4EFEB] rounded-t-3xl">
        
        {/* Badges Overlay (Pill Shaped) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          <span className="bg-[#8C6E43] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Save {discountPercentage}%
          </span>
          {product.isBestseller && (
            <span className="bg-white/95 border border-[#8C6E43]/40 text-[#8C6E43] text-[9px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* 12h Dispatch Badge Top Right (Pill Shaped) */}
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white/95 border border-emerald-500/40 text-emerald-800 text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
            <Zap className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
            12h Dispatch
          </span>
        </div>

        {/* Image Transition (Fluid thumbnail on hover with robust direct URL & fallback support) */}
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <LuxuryImage
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-all duration-500 rounded-t-3xl"
            fallbackTitle={product.title}
          />
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="flex-1 py-2.5 px-4 bg-white/95 hover:bg-[#8C6E43] text-[#1A1A1A] hover:text-white border border-[#C5A880]/40 text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 rounded-full backdrop-blur-sm shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-[#FFFFFF] rounded-b-3xl">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#55504A] mb-2">
            <span className="uppercase tracking-[0.16em] text-[#8C6E43] font-semibold truncate pr-2">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-[#F5F2EB] px-2.5 py-0.5 rounded-full border border-[#C5A880]/30 shrink-0">
              <Star className="w-3 h-3 text-[#8C6E43] fill-[#8C6E43]" />
              <span className="text-[#1A1A1A] font-semibold">{product.rating}</span>
              <span className="text-[#7E7870]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-serif font-medium text-[#1A1A1A] line-clamp-1 group-hover:text-[#8C6E43] transition-colors">
            {product.title}
          </h3>

          {/* Space Saving Highlight */}
          <p className="text-xs text-[#55504A] font-normal line-clamp-1 mt-1.5">
            ⚡ {product.spaceSavingFeature}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-5 pt-3.5 border-t border-[#C5A880]/20">
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#8C6E43]">
                ₹{product.wholesalePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs line-through text-[#7E7870]">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C6E43] font-semibold bg-[#F5F2EB] px-2.5 py-1 rounded-full border border-[#C5A880]/30">
              Wholesale
            </span>
          </div>

          {/* Action Buttons: Fully Pill-Shaped */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleAddToCart}
              className={`py-2.5 px-3 text-[11px] font-semibold uppercase tracking-wider border rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 ${
                addedAnimation
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'bg-transparent border-[#C5A880]/50 text-[#1A1A1A] hover:bg-[#F5F2EB] hover:border-[#8C6E43]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
