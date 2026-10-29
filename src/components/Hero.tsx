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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#171717] via-[#1A1A1A] to-[#141414] text-[#F9F8F6] border-b border-[#C5A880]/15">
      {/* Subtle radial luxury glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212]/80 border border-[#C5A880]/30 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#C5A880] animate-ping" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Space-Saving Smart Furniture • Exclusive Range ₹1500 - ₹2500
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-[#F9F8F6] leading-[1.15]">
            Compact Smart Living. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#C5A880] tracking-normal">Grand Luxury Comfort</span> at Factory Wholesale.
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F9F8F6]/75 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Reclaim up to 80% of your apartment floor space with multi-functional modular sofa beds, 5-in-1 ottoman cubes, wall-mounted work desks, and rolling underbed storage.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExplore('Smart Living')}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-goldGlow flex items-center justify-center gap-2 group"
            >
              <span>Explore Smart Living</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onExplore('Flexi Work & Dine')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-[#C5A880]/40 hover:border-[#C5A880] text-[#F9F8F6] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Flexi Work & Dine</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

          {/* Urgent Dispatch Countdown Bar */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 bg-[#121212]/90 border border-[#C5A880]/20 rounded-none shadow-sm text-xs text-[#F9F8F6]/90">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span className="uppercase tracking-wider font-semibold text-[11px]">12-Hour Priority Dispatch Cutoff:</span>
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-sm tracking-wider">
              <span className="bg-[#1F1F1F] px-2 py-0.5 border border-[#C5A880]/30 text-white font-bold">{format2(timeLeft.hours)}h</span>
              <span className="text-[#C5A880]">:</span>
              <span className="bg-[#1F1F1F] px-2 py-0.5 border border-[#C5A880]/30 text-white font-bold">{format2(timeLeft.minutes)}m</span>
              <span className="text-[#C5A880]">:</span>
              <span className="bg-[#1F1F1F] px-2 py-0.5 border border-[#C5A880]/30 text-[#C5A880] font-bold">{format2(timeLeft.seconds)}s</span>
            </div>

            <span className="hidden md:inline text-white/30">•</span>
            <span className="text-[11px] text-[#C5A880] font-medium tracking-wide">
              ⚡ Orders placed now dispatch today via heavy-logistics express
            </span>
          </div>
        </div>

        {/* Featured Showcase Grid Cards for the New Categories */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Showcase Card 1: Smart Living */}
          <div
            onClick={() => onExplore('Smart Living')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/25 bg-[#171717] hover:border-[#C5A880] transition-all duration-500 shadow-luxury"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop"
                alt="Smart Living Modular Sofa Cum Bed"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  Category 01
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#C5A880] transition-colors">
                  Smart Living
                </h3>
                <p className="text-xs text-[#9E9A93] mt-1">
                  Sofa cum beds, 5-in-1 ottoman cube & wall murphy beds
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#C5A880]">₹1,999 - ₹2,499</span>
                  <span className="text-xs line-through text-[#9E9A93]">MRP ₹5,999</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    SAVE UP TO 65%
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Showcase Card 2: Flexi Work & Dine */}
          <div
            onClick={() => onExplore('Flexi Work & Dine')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/25 bg-[#171717] hover:border-[#C5A880] transition-all duration-500 shadow-luxury"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop"
                alt="Flexi Work and Dine Smart Tables"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  Category 02
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#C5A880] transition-colors">
                  Flexi Work & Dine
                </h3>
                <p className="text-xs text-[#9E9A93] mt-1">
                  Wall drop-leaf tables, bed desks & extendable dining sets
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#C5A880]">₹1,549 - ₹2,299</span>
                  <span className="text-xs line-through text-[#9E9A93]">MRP ₹4,899</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    SAVE UP TO 62%
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Trust Metrics */}
        <div className="mt-14 pt-8 border-t border-[#C5A880]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">⚡ 12 Hours</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">Fast Dispatch Guarantee</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">₹1500 - ₹2500</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">Factory Wholesale Range</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">Space Saving</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">Reclaims 80% Floor Area</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">Cash on Delivery</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">100% Doorstep Inspection</div>
          </div>
        </div>

      </div>
    </section>
  );
};
