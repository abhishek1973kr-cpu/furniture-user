'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp, RefreshCw, FileText, Lock, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4EFEB] text-[#1A1A1A] border-t border-[#C5A880]/30 pt-10 pb-24 md:pb-10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#C5A880]/20">
          
          {/* Column 1: Brand & Promise */}
          <div className="space-y-3">
            <span className="text-2xl font-serif uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold">
              Liv<span className="text-[#8C6E43] font-light">Fabs</span>
            </span>
            <p className="text-xs text-[#55504A] leading-relaxed max-w-sm">
              Smart space-saving furniture designed for modern homes. Foldable sofa beds, ottoman cubes, and folding tables at direct factory prices.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6E43]">
              <Zap className="w-3.5 h-3.5 fill-[#8C6E43]" />
              <span>Fast 12-Hour Priority Dispatch Across India</span>
            </div>
          </div>

          {/* Column 2: Legal & Support Policies (Razorpay Mandatory & Trust) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-3">
              Trust & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#55504A]">
              <li>
                <Link href="/refund-policy" className="hover:text-[#1A1A1A] flex items-center gap-1.5 font-medium">
                  <RefreshCw className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>★ 100% Refund & 7-Day Returns</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#1A1A1A] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Free Shipping & Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#1A1A1A] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Privacy Policy & SSL Security</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#1A1A1A] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-3">
              Support & Address
            </h4>
            <div className="space-y-2.5 text-xs text-[#55504A]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                <a href="tel:+917488574616" className="text-[#1A1A1A] font-semibold hover:text-[#8C6E43]">
                  +91 74885 74616 (Call & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                <a href="mailto:concierge@livfabs.luxury" className="hover:text-[#8C6E43]">
                  concierge@livfabs.luxury
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C6E43] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai 400050, India
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Razorpay Trust & Payment Badges */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#55504A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C6E43]" />
            <span className="font-semibold text-[#1A1A1A]">100% Safe Checkout</span>
            <span className="text-[#C5A880]">|</span>
            <span>Powered by Razorpay & Cash on Delivery</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-[#55504A]">
            <span className="px-2 py-0.5 bg-white border border-[#C5A880]/30 rounded-md">UPI (GPay / PhonePe)</span>
            <span className="px-2 py-0.5 bg-white border border-[#C5A880]/30 rounded-md">Cards</span>
            <span className="px-2 py-0.5 bg-white border border-[#C5A880]/30 rounded-md">NetBanking</span>
            <span className="px-2 py-0.5 bg-white border border-[#C5A880]/30 rounded-md text-[#8C6E43]">COD Available</span>
          </div>
        </div>

        {/* Bottom Copyright & Top Button */}
        <div className="pt-4 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-[#7E7870]">
          <div>
            <span>© {new Date().getFullYear()} LivFabs Smart Living Private Limited. All Rights Reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 sm:px-3 sm:py-1.5 bg-white border border-[#C5A880]/40 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] rounded-full transition-all flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider shadow-xs cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
