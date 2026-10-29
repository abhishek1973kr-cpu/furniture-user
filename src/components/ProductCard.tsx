'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ShoppingBag, Zap, Star, Check, Maximize2 } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

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
      className="group relative bg-[#171717] border border-[#C5A880]/20 hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-luxury"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#121212]">
        
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 pointer-events-none">
          <span className="bg-[#C5A880] text-[#1A1A1A] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
            Save {discountPercentage}%
          </span>
          {product.isBestseller && (
            <span className="bg-[#121212]/90 border border-[#C5A880]/40 text-[#C5A880] text-[9px] font-medium px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* 12h Dispatch Badge Top Right */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-[#121212]/90 border border-emerald-500/30 text-emerald-400 text-[9px] font-medium px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
            <Zap className="w-2.5 h-2.5 fill-emerald-400" />
            12h Dispatch
          </span>
        </div>

        {/* Image Transition (Fluid thumbnail on hover) */}
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-all duration-500"
          />
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="flex-1 py-2 bg-[#121212]/90 hover:bg-[#C5A880] text-[#F9F8F6] hover:text-[#1A1A1A] border border-[#C5A880]/40 text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 backdrop-blur-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#171717]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#9E9A93] mb-1.5">
            <span className="uppercase tracking-[0.15em] text-[#C5A880]/90 font-medium truncate pr-2">
              {product.category}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-[#9E9A93]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-serif font-normal text-[#F9F8F6] line-clamp-1 group-hover:text-[#C5A880] transition-colors">
            {product.title}
          </h3>

          {/* Space Saving Highlight */}
          <p className="text-xs text-[#9E9A93] font-light line-clamp-1 mt-1">
            ⚡ {product.spaceSavingFeature}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-4 pt-3 border-t border-[#C5A880]/15">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#C5A880]">
                ₹{product.wholesalePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs line-through text-[#9E9A93]">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#C5A880]/90 font-medium bg-[#C5A880]/10 px-2 py-0.5 border border-[#C5A880]/20">
              Wholesale
            </span>
          </div>

          {/* Action Buttons: Classic Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-2 text-[11px] font-semibold uppercase tracking-wider border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                addedAnimation
                  ? 'bg-emerald-800/80 border-emerald-500 text-white'
                  : 'bg-transparent border-[#C5A880]/40 text-[#F9F8F6] hover:bg-white/5 hover:border-[#C5A880]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2 px-2 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
