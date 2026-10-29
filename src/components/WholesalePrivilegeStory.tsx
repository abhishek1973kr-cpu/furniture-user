'use client';

import React from 'react';
import { Sparkles, Shield, Zap, Award, Gem, CheckCircle2, Home, Maximize2 } from 'lucide-react';
import { WHOLESALE_BENEFITS } from '@/data/mockData';

export const WholesalePrivilegeStory: React.FC = () => {
  return (
    <section id="wholesale-story" className="py-16 sm:py-24 bg-[#F8F5EE] text-[#1A1A1A] border-t border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C6E43] font-semibold">
                The LivFabs Furniture Atelier
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] leading-[1.2]">
              Why Showrooms Charge ₹7,000+ for Smart Furniture?
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#55504A] font-normal leading-relaxed">
              Traditional high-street furniture retailers lease massive multi-thousand square-foot showrooms in prime commercial zones, incurring crippling overheads passed down to you as 400% retail markups.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#55504A] font-normal leading-relaxed">
              At <strong className="text-[#1A1A1A] font-semibold">LivFabs</strong>, our smart multi-functional furniture is flat-packed directly at our precision robotic ateliers and shipped straight to your apartment door within 12 hours. By eliminating middlemen and showroom leases, we deliver architectural space-saving comfort directly at <strong className="text-[#8C6E43] font-serif font-bold text-lg">honest factory wholesale rates</strong>.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">80% Floor Area Reclaimed</h4>
                  <p className="text-xs text-[#55504A]">Dual-fold mechanisms and nesting engineering liberate square footage instantly in 1BHKs and studios.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Fast 12-Hour Priority Dispatch</h4>
                  <p className="text-xs text-[#55504A]">Zero waiting. Orders pass transit padding inspection and dispatch via express logistics within 12 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/25 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">100% Cash On Delivery Assurance</h4>
                  <p className="text-xs text-[#55504A]">Inspect the heavy-duty build and finish right at your doorstep before paying.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Comparison Card (Rounded-3xl) */}
          <div className="p-7 sm:p-9 bg-[#FFFFFF] border border-[#C5A880]/30 shadow-md relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 bg-[#8C6E43] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Atelier Direct
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mb-6">Commercial Showroom vs. LivFabs Smart Direct</h3>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl flex items-center justify-between">
                <span className="text-[#55504A]">Showroom Rent & Display Floor Markup</span>
                <span className="text-red-600 font-semibold">+ ₹2,800 Added Cost</span>
              </div>

              <div className="p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl flex items-center justify-between">
                <span className="text-[#55504A]">Wholesale Distributor & Dealer Margins</span>
                <span className="text-red-600 font-semibold">+ ₹1,650 Added Cost</span>
              </div>

              <div className="p-4 bg-[#F5F0E6] border border-[#C5A880]/40 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#8C6E43]" />
                  <span className="text-[#1A1A1A] font-semibold">LivFabs Direct Factory Privilege</span>
                </div>
                <span className="text-[#8C6E43] font-serif font-bold text-base">Direct Factory Price</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#55504A] block">Typical Retail MRP</span>
                <span className="text-base line-through text-[#8C827A]">₹5,499</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#55504A] block text-right">You Save</span>
                <span className="text-base font-bold text-emerald-700">Up to 68% Off Retail</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
