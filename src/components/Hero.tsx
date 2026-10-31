'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock, Star, Maximize2 } from 'lucide-react';
import { ProductCategory } from '@/types';
import { LuxuryImage } from '@/components/LuxuryImage';

interface HeroProps {
  onExplore: (category: 'All' | ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  // Live countdown timer for dispatch batch urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 34, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F5EE] to-[#F3EFEA] text-[#1A1A1A] border-b border-[#C5A880]/20">
      {/* Subtle radial luxury glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 relative z-10">
        
        {/* Top Announcement Pill (Rounded-full) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFFFF]/90 border border-[#C5A880]/40 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#8C6E43] animate-ping" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6E43] font-semibold">
              Space-Saving Smart Furniture & Comfort Essentials
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-[#1A1A1A] leading-[1.15]">
            Compact Smart Living. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#8C6E43] tracking-normal">Grand Luxury Comfort</span> at Factory Wholesale.
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#4A4744] font-sans font-normal max-w-2xl mx-auto leading-relaxed">
            Reclaim up to 80% of your apartment floor space with multi-functional modular sofa beds, 5-in-1 ottoman cubes, wall-mounted work desks, and rolling underbed storage.
          </p>

          {/* Action CTAs (Pill Rounded-full) - Unified All Collections */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onExplore('All')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] hover:bg-[#8C6E43] text-[#FDFBF7] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore All Smart Furniture</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                onExplore('All');
                const catalogElem = document.getElementById('catalog');
                if (catalogElem) catalogElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF] hover:bg-[#F4EFEB] border border-[#C5A880]/50 hover:border-[#8C6E43] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View All Wholesale Inventory</span>
              <Sparkles className="w-4 h-4 text-[#8C6E43]" />
            </button>
          </div>

          {/* Urgent Dispatch Countdown Bar (Rounded-2xl sm:rounded-full) */}
          <div className="mt-8 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-2xl sm:rounded-full shadow-sm text-xs text-[#2C2A29] max-w-full">
            <div className="flex items-center gap-1.5 text-[#8C6E43]">
              <Clock className="w-3.5 h-3.5 text-[#8C6E43]" />
              <span className="uppercase tracking-wider font-semibold text-[10px] sm:text-[11px]">12h Dispatch Cutoff:</span>
            </div>
            
            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm tracking-wider">
              <span className="bg-[#F4EFEB] px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#C5A880]/40 rounded-md sm:rounded-lg text-[#1A1A1A] font-bold">{format2(timeLeft.hours)}h</span>
              <span className="text-[#8C6E43] font-bold">:</span>
              <span className="bg-[#F4EFEB] px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#C5A880]/40 rounded-md sm:rounded-lg text-[#1A1A1A] font-bold">{format2(timeLeft.minutes)}m</span>
              <span className="text-[#8C6E43] font-bold">:</span>
              <span className="bg-[#F4EFEB] px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#C5A880]/40 rounded-md sm:rounded-lg text-[#8C6E43] font-bold">{format2(timeLeft.seconds)}s</span>
            </div>

            <span className="hidden sm:inline text-black/20">•</span>
            <span className="text-[10px] sm:text-[11px] text-[#8C6E43] font-semibold tracking-wide w-full sm:w-auto text-center">
              ⚡ Orders placed now dispatch today via heavy express logistics
            </span>
          </div>
        </div>

        {/* Featured Showcase: Unified All Collections Atelier Showcase (Category 01 & 02 Removed) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div
            onClick={() => onExplore('All')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/30 bg-[#FFFFFF] hover:border-[#8C6E43] transition-all duration-500 shadow-md rounded-3xl"
          >
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-3xl">
              <LuxuryImage
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
                alt="All LivFabs Space-Saving Smart Furniture Collections"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                fallbackTitle="All LivFabs Smart Furniture Collections"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent rounded-3xl" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E3CEB2] font-semibold">
                  All Collections
                </span>
                <h3 className="text-xl sm:text-3xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#E3CEB2] transition-colors font-medium">
                  Complete Space-Saving Furniture Curations
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                  Modular velvet sofa cum beds, 5-in-1 ottoman cubes, wall-mounted drop-leaf desks, and rolling underbed trunks.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#E3CEB2]">
                    Direct Factory Wholesale
                  </span>
                  <span className="text-[10px] px-3 py-1 bg-[#C5A880]/30 text-white border border-[#C5A880]/50 font-medium rounded-full backdrop-blur-sm">
                    100% Cash on Delivery
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0 shadow-md">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Trust Metrics */}
        <div className="mt-14 pt-8 border-t border-[#C5A880]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#8C6E43]">⚡ 12 Hours</div>
            <div className="text-xs text-[#55504A] font-medium uppercase tracking-wider mt-1">Fast Dispatch Guarantee</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#8C6E43]">Factory Direct</div>
            <div className="text-xs text-[#55504A] font-medium uppercase tracking-wider mt-1">Direct Wholesale Rates</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#8C6E43]">Space Saving</div>
            <div className="text-xs text-[#55504A] font-medium uppercase tracking-wider mt-1">Reclaims 80% Floor Area</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#8C6E43]">Cash on Delivery</div>
            <div className="text-xs text-[#55504A] font-medium uppercase tracking-wider mt-1">100% Doorstep Inspection</div>
          </div>
        </div>

      </div>
    </section>
  );
};
