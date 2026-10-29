'use client';

import React from 'react';
import { Sparkles, Shield, Zap, Award, Gem, CheckCircle2 } from 'lucide-react';
import { WHOLESALE_BENEFITS } from '@/data/mockData';

export const WholesalePrivilegeStory: React.FC = () => {
  return (
    <section id="wholesale-story" className="py-16 sm:py-24 bg-[#141414] text-[#F9F8F6] border-t border-[#C5A880]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                The LivFabs Direct Atelier
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#F9F8F6] leading-[1.2]">
              Why Flat ₹99 When Others Charge ₹1,200+?
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#9E9A93] font-light leading-relaxed">
              Traditional high-street jewelry brands spend up to 70% of product retail prices on opulent showroom rents, celebrity endorsements, and multiple layers of distributors.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#9E9A93] font-light leading-relaxed">
              At <strong className="text-white font-medium">LivFabs</strong>, our pieces are cast directly in our precision ateliers and delivered straight to your door within 12 hours. By dismantling distributor markups, we deliver royal 18K electro-plated brilliance at a flat wholesale price of <strong className="text-[#C5A880] font-serif font-bold text-lg">₹99</strong>.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Genuine Micro-Gold Electroplate</h4>
                  <p className="text-xs text-[#9E9A93]">Triple-layered anti-tarnish coating formulated for heat, humidity, and perfume contact.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Fast 12-Hour Priority Dispatch</h4>
                  <p className="text-xs text-[#9E9A93]">Zero waiting. Orders pass automated QC and dispatch with express airway bills within 12 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">100% Cash On Delivery Assurance</h4>
                  <p className="text-xs text-[#9E9A93]">Touch, inspect, and fall in love with the weight and shine before you pay.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Comparison Card */}
          <div className="p-6 sm:p-8 bg-[#171717] border border-[#C5A880]/30 shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C5A880] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1">
              Atelier Direct
            </div>

            <h3 className="text-xl font-serif text-white mb-6">Retail Showrooms vs. LivFabs Wholesale</h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#121212] border border-white/5 flex items-center justify-between">
                <span className="text-[#9E9A93]">Showroom Rent & Middlemen Markups</span>
                <span className="text-red-400 font-medium">+ ₹750 Retail Markup</span>
              </div>

              <div className="p-3 bg-[#121212] border border-white/5 flex items-center justify-between">
                <span className="text-[#9E9A93]">Celebrity Endorsement Fees</span>
                <span className="text-red-400 font-medium">+ ₹350 Ad Cost</span>
              </div>

              <div className="p-3 bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-white font-medium">LivFabs Direct Artisan Cast</span>
                </div>
                <span className="text-[#C5A880] font-serif font-bold text-base">Flat ₹99 (Zero Markups)</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9A93] block">MRP Price</span>
                <span className="text-base line-through text-white/50">₹349</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9A93] block text-right">You Save</span>
                <span className="text-base font-bold text-emerald-400">₹250 (72% Off)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

