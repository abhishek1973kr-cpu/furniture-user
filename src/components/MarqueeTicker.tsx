'use client';

import React from 'react';
import { Sparkles, Zap, ShieldCheck, Home } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 bg-[#121212] border-b border-[#C5A880]/20 text-[#F9F8F6] overflow-hidden py-2.5 text-xs font-medium tracking-widest uppercase selection:bg-[#C5A880] selection:text-black"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Render 4 repeated sets to ensure continuous smooth infinite scroll without gap */}
        {[0, 1, 2, 3].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center space-x-8 px-4 shrink-0">
            <span className="flex items-center gap-2 text-[#C5A880]">
              <Zap className="w-3.5 h-3.5 fill-[#C5A880] animate-pulse" />
              <span className="font-semibold text-white tracking-wider">
                ⚡ LivFabs | Space-Saving Smart Furniture & Comfort Essentials
              </span>
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="text-[#F9F8F6]/90 tracking-widest">
              Exclusive Range <span className="text-[#C5A880] font-bold font-serif text-sm">₹1500 - ₹2500</span> Wholesale Privilege
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="flex items-center gap-1.5 text-[#F9F8F6]/80">
              <Zap className="w-3 h-3 text-[#C5A880]" />
              Fastly Shipped Within 12 Hours
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Cash On Delivery Available Across India
            </span>

            <span className="text-[#C5A880]/40">•</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
