'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock, Star } from 'lucide-react';

interface HeroProps {
  onExplore: (category: 'Ladies Ornaments' | 'Gents Ornaments') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  // Live countdown timer for dispatch batch urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 18 });

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212]/80 border border-[#C5A880]/30 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#C5A880] animate-ping" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Wholesale Privilege • Original MRP <span className="line-through text-white/50">₹349</span> Flat ₹99
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-[#F9F8F6] leading-[1.15]">
            Timeless Luxury Ornaments. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#C5A880] tracking-normal">Direct from Atelier</span> at Flat ₹99.
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F9F8F6]/75 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Experience 18K micro-gold plated jewelry crafted for royal grandeur. Fastly shipped within 12 hours with 100% Cash on Delivery protection.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExplore('Ladies Ornaments')}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-goldGlow flex items-center justify-center gap-2 group"
            >
              <span>Explore Ladies Ornaments</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onExplore('Gents Ornaments')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-[#C5A880]/40 hover:border-[#C5A880] text-[#F9F8F6] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Gents Ornaments</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

          {/* Urgent Dispatch Countdown Bar */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 bg-[#121212]/90 border border-[#C5A880]/20 rounded-none shadow-sm text-xs text-[#F9F8F6]/90">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span className="uppercase tracking-wider font-semibold text-[11px]">Next 12-Hour Batch Cutoff:</span>
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
              ⚡ Orders placed now dispatch today by Bluedart Priority
            </span>
          </div>
        </div>

        {/* Featured Showcase Grid Cards */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Ladies Showcase Card */}
          <div
            onClick={() => onExplore('Ladies Ornaments')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/25 bg-[#171717] hover:border-[#C5A880] transition-all duration-500 shadow-luxury"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
                alt="Ladies Haute Ornaments"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  Curated Collection
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#C5A880] transition-colors">
                  Ladies Ornaments
                </h3>
                <p className="text-xs text-[#9E9A93] mt-1">
                  Solitaire chokers, bridal drops & filigree kadas
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#C5A880]">Flat ₹99</span>
                  <span className="text-xs line-through text-[#9E9A93]">MRP ₹349</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    SAVE 72%
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Gents Showcase Card */}
          <div
            onClick={() => onExplore('Gents Ornaments')}
            className="group relative cursor-pointer overflow-hidden border border-[#C5A880]/25 bg-[#171717] hover:border-[#C5A880] transition-all duration-500 shadow-luxury"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop"
                alt="Gents Sovereign Ornaments"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  Curated Collection
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] mt-1 group-hover:text-[#C5A880] transition-colors">
                  Gents Ornaments
                </h3>
                <p className="text-xs text-[#9E9A93] mt-1">
                  Cuban link chains, obsidian signets & lion kadas
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-[#C5A880]">Flat ₹99</span>
                  <span className="text-xs line-through text-[#9E9A93]">MRP ₹349</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    SAVE 72%
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
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">₹99 Wholesale</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">MRP ₹349 (Save 72%)</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">18K Micro Gold</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">Anti-Tarnish Sealed</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#C5A880]">Cash on Delivery</div>
            <div className="text-xs text-[#9E9A93] uppercase tracking-wider mt-1">100% Doorstep Assurance</div>
          </div>
        </div>

      </div>
    </section>
  );
};

