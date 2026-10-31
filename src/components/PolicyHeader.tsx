'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, ShieldCheck, Zap } from 'lucide-react';

interface PolicyHeaderProps {
  title: string;
  subtitle?: string;
}

export const PolicyHeader: React.FC<PolicyHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full bg-[#FDFBF7] border-b border-[#C5A880]/20">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-serif font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]">
            Liv<span className="text-[#8C6E43] font-light">Fabs</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold bg-[#F5F0E6] px-2.5 py-1 rounded-full border border-[#C5A880]/30">
            Smart Living Atelier
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+919820054321"
            className="hidden md:flex items-center gap-1.5 text-xs text-[#55504A] hover:text-[#8C6E43] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#8C6E43]" />
            <span>+91 98200 54321</span>
          </a>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </Link>
        </div>
      </div>

      {/* Page Title Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F5F0E6] border border-[#C5A880]/30 rounded-full text-[11px] uppercase tracking-widest text-[#8C6E43] font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Legal & Compliance Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] font-semibold">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#55504A] mt-2 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

