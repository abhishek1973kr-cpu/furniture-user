'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Armchair, Sparkles } from 'lucide-react';

interface LuxuryImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  alt: string;
  fallbackTitle?: string;
  containerClassName?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  fallbackTitle = 'LivFabs Smart Furniture',
  className = '',
  containerClassName = '',
  fill,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Validate that src is a non-empty direct string
  const cleanSrc = typeof src === 'string' ? src.trim() : '';
  const shouldRenderImage = cleanSrc.length > 0 && !hasError;

  if (!shouldRenderImage) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F8F5EE] border border-[#C5A880]/30 text-[#8C6E43] p-4 text-center select-none ${
          fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[120px]'
        } ${className} ${containerClassName}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#C5A880]/40 flex items-center justify-center mb-1.5 shadow-xs">
          <Armchair className="w-5 h-5 text-[#8C6E43]" />
        </div>
        <span className="text-[10px] font-serif uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
          LivFabs
        </span>
        <span className="text-[9px] text-[#7E7870] tracking-wider mt-0.5 line-clamp-1 max-w-[140px]">
          {fallbackTitle}
        </span>
        <div className="mt-1 flex items-center gap-1 text-[8px] text-[#8C6E43]/80 uppercase tracking-widest font-semibold">
          <Sparkles className="w-2 h-2" />
          <span>Atelier Showcase</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''} ${containerClassName}`}>
      <Image
        {...props}
        src={cleanSrc}
        alt={alt || fallbackTitle}
        fill={fill}
        unoptimized // Allows direct HTTP/HTTPS URLs from any domain without Next.js domain restrictions
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 bg-[#F4EFEB] animate-pulse flex items-center justify-center ${className}`}
        >
          <Armchair className="w-5 h-5 text-[#C5A880]/50" />
        </div>
      )}
    </div>
  );
};

