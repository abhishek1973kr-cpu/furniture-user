'use client';

import React from 'react';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const tickerText =
    '⚡ LivFabs | Fastly Shipped Within 12 Hours | Exclusive Ladies & Gents Ornaments at Flat ₹99 Wholesale Price';

  const items = [
    { text: '⚡ LivFabs | Fastly Shipped Within 12 Hours', highlight: true },
    { text: 'Exclusive Ladies & Gents Ornaments at Flat ₹99 Wholesale Price', highlight: false },
    { text: '18K Micro-Gold Anti-Tarnish Guarantee', highlight: true },
    { text: 'Cash on Delivery Across India with Inspection', highlight: false },
  ];

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
                ⚡ LivFabs | Fastly Shipped Within 12 Hours
              </span>
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="text-[#F9F8F6]/90 tracking-widest">
              Exclusive Ladies & Gents Ornaments at <span className="text-[#C5A880] font-bold font-serif text-sm">Flat ₹99</span> Wholesale Price
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="flex items-center gap-1.5 text-[#F9F8F6]/80">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Original MRP <span className="line-through text-[#9E9A93]">₹349</span> (Save 72%)
            </span>

            <span className="text-[#C5A880]/40">•</span>

            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Cash On Delivery Available
            </span>

            <span className="text-[#C5A880]/40">•</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

