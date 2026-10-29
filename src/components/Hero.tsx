'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock, Star, Maximize2 } from 'lucide-react';
import { ProductCategory } from '@/types';

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

          {/* Action CTAs (Pill Rounded-full) */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExplore('Smart Living')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] hover:bg-[#8C6E43] text-[#FDFBF7] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Smart Living</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onExplore('Flexi Work & Dine')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF] hover:bg-[#F4EFEB] border border-[#C5A880]/50 hover:border-[#8C6E43] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Flexi Work & Dine</span>
              <ArrowRight className="w-4 h-4 text-[#8C6E43]" />
            </button>
          </div>

          {/* Urgent Dispatch Countdown Bar (Rounded-full) */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3.5 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-full shadow-sm text-xs text-[#2C2A29]">
            <div className="flex items-center gap-2 text-[#8C6E43]">
              <Clock className="w-4 h-4 text-[#8C6E43]" />
              <span className="uppercase tracking-wider font-semibold text-[11px]">12-Hour Priority Dispatch Cutoff:</span>
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-sm tracking-wider">
              <span className="bg-[#F4EFEB] px-2.5 py-1 border border-[#C5A880]/40 rounded-lg text-[#1A1A1A] font-bold">{format2(timeLeft.hours)}h</span>
              <span className="text-[#8C6E43] font-bold">:</span>
              <span className="bg-[#F4EFEB] px-2.5 py-1 border border-[#C5A880]/40 rounded-lg text-[#1A1A1A] font-bold">{format2(timeLeft.minutes)}m</span>
              <span className="text-[#8C6E43] font-bold">:</span>
              <span className="bg-[#F4EFEB] px-2.5 py-1 border border-[#C5A880]/40 rounded-lg text-[#8C6E43] font-bold">{format2(timeLeft.seconds)}s</span>
            </div>

            <span className="hidden md:inline text-black/20">•</span>
            <span className="text-[11px] text-[#8C6E43] font-semibold tracking-wide">
              ⚡ Orders placed now dispatch today via heavy-logistics express
            </span>
          </div>
        </div>

        {/* Featured Showcase Grid Cards with Generous Rounded-3xl Corners */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Showcase Card 1: Smart Living */}
          <div
            onClick={() => onExplore('Smart Living')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/30 bg-[#FFFFFF] hover:border-[#8C6E43] transition-all duration-500 shadow-md rounded-3xl"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop"
                alt="Smart Living Modular Sofa Cum Bed"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent rounded-3xl" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E3CEB2] font-semibold">
                  Category 01
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#E3CEB2] transition-colors">
                  Smart Living
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Sofa cum beds, 5-in-1 ottoman cube & wall murphy beds
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#E3CEB2]">Smart Innovations</span>
                  <span className="text-[10px] px-3 py-1 bg-[#C5A880]/30 text-white border border-[#C5A880]/50 font-medium rounded-full backdrop-blur-sm">
                    FACTORY DIRECT
                  </span>
                </div>
              </div>

              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0 shadow-md">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Showcase Card 2: Flexi Work & Dine */}
          <div
            onClick={() => onExplore('Flexi Work & Dine')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/30 bg-[#FFFFFF] hover:border-[#8C6E43] transition-all duration-500 shadow-md rounded-3xl"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop"
                alt="Flexi Work and Dine Smart Tables"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent rounded-3xl" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E3CEB2] font-semibold">
                  Category 02
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#E3CEB2] transition-colors">
                  Flexi Work & Dine
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Wall drop-leaf tables, bed desks & extendable dining sets
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#E3CEB2]">Space-Saving Tables</span>
                  <span className="text-[10px] px-3 py-1 bg-[#C5A880]/30 text-white border border-[#C5A880]/50 font-medium rounded-full backdrop-blur-sm">
                    FACTORY DIRECT
                  </span>
                </div>
              </div>

              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0 shadow-md">
                <ArrowRight className="w-4 h-4" />
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
