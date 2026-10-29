'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 bg-[#1A1A1A] border-b border-[#C5A880]/30 text-[#F9F8F6] overflow-hidden py-2.5 text-xs font-medium tracking-widest uppercase selection:bg-[#C5A880] selection:text-black"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Render repeated sets for smooth infinite scroll */}
        {[0, 1, 2, 3].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center space-x-10 px-6 shrink-0">
            <span className="flex items-center gap-2 text-[#C5A880]">
              <Zap className="w-3.5 h-3.5 fill-[#C5A880] animate-pulse" />
              <span className="font-semibold text-white tracking-wider">
                ⚡ LivFabs | Space-Saving Smart Furniture & Comfort Essentials | Fastly Shipped Within 12 Hours
              </span>
            </span>

            <span className="text-[#C5A880]/50">•</span>

            <span className="text-[#F9F8F6]/90 tracking-widest">
              100% Cash On Delivery Available Across India
            </span>

            <span className="text-[#C5A880]/50">•</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
