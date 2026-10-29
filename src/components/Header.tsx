'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductCategory } from '@/types';

interface HeaderProps {
  onSelectCategory?: (category: 'All' | ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (category?: 'All' | ProductCategory, targetId = 'catalog') => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#C5A880]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Toggle & Secondary Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#F9F8F6] hover:text-[#C5A880] rounded-full transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-[#F9F8F6] hover:text-[#C5A880] rounded-full transition-colors focus:outline-none"
              aria-label="Search smart furniture"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium uppercase tracking-[0.16em] text-[#F9F8F6]/80">
            <button
              onClick={() => handleNavClick('Smart Living')}
              className="hover:text-[#C5A880] transition-colors py-2 relative group"
            >
              Smart Living
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <button
              onClick={() => handleNavClick('On-The-Go Comfort')}
              className="hover:text-[#C5A880] transition-colors py-2 relative group"
            >
              On-The-Go Comfort
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <button
              onClick={() => handleNavClick('Flexi Work & Dine')}
              className="hover:text-[#C5A880] transition-colors py-2 relative group"
            >
              Flexi Work & Dine
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <button
              onClick={() => handleNavClick('Storage & Utility')}
              className="hover:text-[#C5A880] transition-colors py-2 relative group"
            >
              Storage & Utility
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer select-none py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#F9F8F6] font-normal uppercase">
                Liv<span className="text-[#C5A880] font-light">Fabs</span>
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-medium mt-0.5">
              Smart Furniture • ₹1500 - ₹2500
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Desktop Search Bar (Curvy Pill) */}
            <div className="hidden lg:flex items-center relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search sofa bed, ottoman, tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-7 py-2 bg-[#121212] border border-[#C5A880]/30 rounded-full text-xs text-[#F9F8F6] placeholder-[#9E9A93] focus:outline-none focus:border-[#C5A880] transition-all shadow-sm"
                />
                <Search className="w-3.5 h-3.5 text-[#C5A880] absolute left-3.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-xs text-[#9E9A93] hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Concierge Support Helpline */}
            <a
              href="https://wa.me/919820054321?text=Hello%20LivFabs,%20I%20have%20an%20inquiry%20regarding%20Space-Saving%20Smart%20Furniture"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#F9F8F6]/80 hover:text-[#C5A880] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] tracking-widest">Concierge</span>
            </a>

            {/* Shopping Bag Button (Pill Rounded-full) */}
            <button
              onClick={openCart}
              className="relative p-3 rounded-full bg-[#121212] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#F9F8F6] hover:text-[#C5A880] transition-all duration-200 group shadow-sm hover:shadow-goldGlow"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#1A1A1A] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-goldGlow animate-fade-in-up">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Popdown */}
        {searchOpen && (
          <div className="lg:hidden pb-4 pt-1 animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search sofa bed, ottoman cube, air bed, tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#121212] border border-[#C5A880]/40 rounded-full text-sm text-[#F9F8F6] placeholder-[#9E9A93] focus:outline-none focus:border-[#C5A880] shadow-md"
              />
              <Search className="w-4 h-4 text-[#C5A880] absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-sm text-[#9E9A93] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#121212] border-b border-[#C5A880]/30 shadow-2xl p-6 transition-all z-50 rounded-b-3xl">
          <div className="flex flex-col space-y-4 text-sm uppercase tracking-[0.18em]">
            <button
              onClick={() => handleNavClick('All', 'catalog')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5 flex items-center justify-between"
            >
              <span>Explore All Smart Furniture</span>
              <span className="text-[#C5A880] font-serif text-xs">₹1500 - ₹2500</span>
            </button>

            <button
              onClick={() => handleNavClick('Smart Living', 'catalog')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5 flex items-center justify-between"
            >
              <span>Smart Living</span>
              <span className="text-xs text-[#9E9A93]">Sofa Beds, Ottoman, Murphy</span>
            </button>

            <button
              onClick={() => handleNavClick('On-The-Go Comfort', 'catalog')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5 flex items-center justify-between"
            >
              <span>On-The-Go Comfort</span>
              <span className="text-xs text-[#9E9A93]">Air Beds, Loungers, Wedge</span>
            </button>

            <button
              onClick={() => handleNavClick('Flexi Work & Dine', 'catalog')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5 flex items-center justify-between"
            >
              <span>Flexi Work & Dine</span>
              <span className="text-xs text-[#9E9A93]">Wall Desks, Laptop & Dining</span>
            </button>

            <button
              onClick={() => handleNavClick('Storage & Utility', 'catalog')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5 flex items-center justify-between"
            >
              <span>Storage & Utility</span>
              <span className="text-xs text-[#9E9A93]">Rolling Under-Bed Trunks</span>
            </button>

            <button
              onClick={() => handleNavClick(undefined, 'reviews')}
              className="text-left py-2.5 px-3 text-[#F9F8F6] hover:text-[#C5A880] hover:bg-white/5 rounded-xl transition-all border-b border-white/5"
            >
              Client Reviews (4.9★)
            </button>

            <div className="pt-2 flex flex-col gap-3">
              <div className="p-4 bg-[#1A1A1A] border border-[#C5A880]/20 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A880] shrink-0" />
                <div className="text-xs tracking-normal">
                  <p className="text-white font-medium">12-Hour Priority Dispatch</p>
                  <p className="text-[#9E9A93] text-[11px]">Free delivery on orders placed today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
