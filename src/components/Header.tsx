'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Sparkles, PhoneCall, User as UserIcon, Package, ArrowRight, ShieldCheck, RefreshCw, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
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
  const { user, openAuthModal, openProfileModal, signOutUser } = useAuth();
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
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#C5A880]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Container with Absolute Center Alignment for Brand Identity */}
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Menu Toggle & Search Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-[#1A1A1A] hover:text-[#8C6E43] rounded-full hover:bg-[#F5F2EB] transition-colors focus:outline-none lg:hidden active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:p-2.5 text-[#1A1A1A] hover:text-[#8C6E43] rounded-full hover:bg-[#F5F2EB] transition-colors focus:outline-none lg:hidden active:scale-95"
              aria-label="Search smart furniture"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium uppercase tracking-[0.16em] text-[#2C2A29]">
              <button
                onClick={() => handleNavClick('Smart Living')}
                className="hover:text-[#8C6E43] transition-colors py-2 relative group"
              >
                Smart Living
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
              <button
                onClick={() => handleNavClick('On-The-Go Comfort')}
                className="hover:text-[#8C6E43] transition-colors py-2 relative group"
              >
                On-The-Go Comfort
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
              <button
                onClick={() => handleNavClick('Flexi Work & Dine')}
                className="hover:text-[#8C6E43] transition-colors py-2 relative group"
              >
                Flexi Work & Dine
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
              <button
                onClick={() => handleNavClick('Storage & Utility')}
                className="hover:text-[#8C6E43] transition-colors py-2 relative group"
              >
                Storage & Utility
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            </nav>
          </div>

          {/* EXACT CENTER ALIGNED BRAND IDENTITY (Fixed Alignment on Mobile & Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer select-none text-center pointer-events-auto">
            <div
              className="flex items-center gap-1.5"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-xl sm:text-2xl font-serif tracking-[0.22em] text-[#1A1A1A] font-semibold uppercase">
                Liv<span className="text-[#8C6E43] font-light">Fabs</span>
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#8C6E43] font-medium -mt-0.5 sm:mt-0.5">
              Space-Saving Smart Furniture
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-5 z-10">
            {/* Desktop Search Bar (Curvy Pill) */}
            <div className="hidden lg:flex items-center relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search sofa bed, tables, cubes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 xl:w-64 pl-10 pr-7 py-2 bg-[#F4EFEB] border border-[#C5A880]/30 rounded-full text-xs text-[#1A1A1A] placeholder-[#7E7870] focus:outline-none focus:border-[#C5A880] transition-all shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-[#8C6E43] absolute left-3.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-xs text-[#7E7870] hover:text-[#1A1A1A]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Concierge Support Helpline (Desktop) */}
            <a
              href="https://wa.me/917488574616?text=Hello%20LivFabs,%20I%20have%20an%20inquiry%20regarding%20Space-Saving%20Smart%20Furniture"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#2C2A29] hover:text-[#8C6E43] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#8C6E43]" />
              <span className="text-[11px] tracking-widest font-medium">Concierge</span>
            </a>

            {/* Profile or Sign In Button (Desktop) */}
            {user ? (
              <button
                onClick={openProfileModal}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-[#C5A880]/50 hover:border-[#8C6E43] text-[#1A1A1A] transition-all shadow-xs group cursor-pointer"
                title={`Signed in as ${user.displayName || user.email || 'LivFabs Patron'}`}
                aria-label="My Profile"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User Profile'}
                    className="w-6 h-6 rounded-full object-cover border border-[#C5A880]/60"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#8C6E43] text-[#FDFBF7] flex items-center justify-center text-[10px] font-semibold">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-[#1A1A1A]">
                  My Profile
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-[#C5A880]/40 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] transition-all text-xs tracking-wider uppercase font-semibold shadow-xs cursor-pointer"
                aria-label="Login"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#8C6E43]" />
                <span className="text-[11px] font-semibold">Login</span>
              </button>
            )}

            {/* Shopping Bag Button (Pill Rounded-full) */}
            <button
              onClick={openCart}
              className="relative p-2.5 sm:p-3 rounded-full bg-[#F4EFEB] border border-[#C5A880]/40 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] transition-all duration-200 group shadow-xs hover:shadow-md"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-fade-in-up">
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
                placeholder="Search sofa bed, ottoman, tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#F4EFEB] border border-[#C5A880]/40 rounded-full text-base text-[#1A1A1A] placeholder-[#7E7870] focus:outline-none focus:border-[#C5A880] shadow-sm"
              />
              <Search className="w-4 h-4 text-[#8C6E43] absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-sm text-[#7E7870] hover:text-[#1A1A1A]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu Backdrop & Best Practices Menu Popdown */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/60 backdrop-blur-xs z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#FDFBF7] border-b border-[#C5A880]/30 shadow-2xl p-5 sm:p-6 transition-all z-50 rounded-b-3xl max-h-[82vh] overflow-y-auto">
            
            {/* 1. Best Practices User Auth Section (Login vs Orders) */}
            {user ? (
              <div className="p-4 bg-[#FFFFFF] border border-[#C5A880]/40 rounded-2xl mb-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User Profile'}
                        className="w-11 h-11 rounded-full object-cover border border-[#C5A880]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#8C6E43] text-[#FDFBF7] flex items-center justify-center font-bold text-sm shadow-xs">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A1A] truncate max-w-[170px]">
                        {user.displayName || 'Verified Patron'}
                      </h4>
                      <p className="text-[11px] text-[#7E7870] truncate max-w-[170px]">
                        {user.email || user.phoneNumber || 'Authenticated User'}
                      </p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="mt-4 pt-3 border-t border-[#C5A880]/20 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openProfileModal();
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOutUser();
                    }}
                    className="py-2.5 px-3.5 bg-[#FAF8F5] border border-[#C5A880]/30 hover:border-red-300 text-[#55504A] hover:text-red-700 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FFFFFF] border border-[#C5A880]/40 rounded-2xl mb-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E6] border border-[#C5A880]/40 text-[#8C6E43] flex items-center justify-center font-bold">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Welcome to LivFabs</h4>
                    <p className="text-[11px] text-[#7E7870]">Sign in to track orders & claim wholesale prices</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="mt-3.5 w-full py-3 px-4 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Continue with Google</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 2. Non-Redundant Navigation Links */}
            <div className="space-y-1 text-xs uppercase tracking-wider font-medium text-[#2C2A29]">
              <span className="block text-[10px] tracking-widest text-[#8C6E43] font-bold px-3 py-1">
                Collections
              </span>
              <button
                onClick={() => handleNavClick('Smart Living', 'catalog')}
                className="w-full text-left py-2.5 px-3 text-[#1A1A1A] hover:text-[#8C6E43] hover:bg-[#F4EFEB] rounded-xl transition-all flex items-center justify-between"
              >
                <span>Smart Living</span>
                <span className="text-[10px] text-[#7E7870] lowercase tracking-normal">sofa beds & cubes</span>
              </button>

              <button
                onClick={() => handleNavClick('On-The-Go Comfort', 'catalog')}
                className="w-full text-left py-2.5 px-3 text-[#1A1A1A] hover:text-[#8C6E43] hover:bg-[#F4EFEB] rounded-xl transition-all flex items-center justify-between"
              >
                <span>On-The-Go Comfort</span>
                <span className="text-[10px] text-[#7E7870] lowercase tracking-normal">deluxe air beds</span>
              </button>

              <button
                onClick={() => handleNavClick('Flexi Work & Dine', 'catalog')}
                className="w-full text-left py-2.5 px-3 text-[#1A1A1A] hover:text-[#8C6E43] hover:bg-[#F4EFEB] rounded-xl transition-all flex items-center justify-between"
              >
                <span>Flexi Work & Dine</span>
                <span className="text-[10px] text-[#7E7870] lowercase tracking-normal">wall tables</span>
              </button>

              <button
                onClick={() => handleNavClick('Storage & Utility', 'catalog')}
                className="w-full text-left py-2.5 px-3 text-[#1A1A1A] hover:text-[#8C6E43] hover:bg-[#F4EFEB] rounded-xl transition-all flex items-center justify-between"
              >
                <span>Storage & Utility</span>
                <span className="text-[10px] text-[#7E7870] lowercase tracking-normal">rolling trunks</span>
              </button>
            </div>

            {/* 3. Helpful Service Policies */}
            <div className="mt-4 pt-3 border-t border-[#C5A880]/20 space-y-1.5 text-xs text-[#55504A]">
              <Link
                href="/refund-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F4EFEB] hover:text-[#1A1A1A] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#8C6E43]" />
                <span>★ 100% Refund & 7-Day Returns Policy</span>
              </Link>
              <Link
                href="/shipping-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F4EFEB] hover:text-[#1A1A1A] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C6E43]" />
                <span>12-Hour Priority Dispatch Information</span>
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F4EFEB] hover:text-[#1A1A1A] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#8C6E43]" />
                <span>Contact Us & Mumbai Atelier</span>
              </Link>
            </div>

            {/* Helpline Notice */}
            <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#C5A880]/30 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-[#55504A]">Direct Helpline:</span>
              <a href="tel:+917488574616" className="text-[#8C6E43] font-bold">
                +91 74885 74616
              </a>
            </div>

          </div>
        </>
      )}
    </header>
  );
};
