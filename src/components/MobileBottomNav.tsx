'use client';

import React from 'react';
import { Home, LayoutGrid, ShoppingBag, MessageCircle, User as UserIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ProductCategory } from '@/types';

interface MobileBottomNavProps {
  onSelectCategory?: (category: 'All' | ProductCategory) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onSelectCategory }) => {
  const { totalItems, subtotal, openCart } = useCart();
  const { user, openAuthModal, openProfileModal } = useAuth();

  const handleHomeClick = () => {
    if (onSelectCategory) {
      onSelectCategory('All');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalogClick = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#C5A880]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden transition-all duration-300 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around">
        
        {/* 1. Home Tab */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#1A1A1A] hover:text-[#8C6E43] transition-colors rounded-xl active:scale-95 group focus:outline-none"
          aria-label="Go to Home"
        >
          <Home className="w-5 h-5 text-[#8C6E43] transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1 text-[#1A1A1A]">
            Home
          </span>
        </button>

        {/* 2. Collections / Catalog Tab */}
        <button
          onClick={handleCatalogClick}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#55504A] hover:text-[#8C6E43] transition-colors rounded-xl active:scale-95 group focus:outline-none"
          aria-label="Explore Furniture Catalog"
        >
          <LayoutGrid className="w-5 h-5 text-[#55504A] transition-transform group-hover:scale-110 group-hover:text-[#8C6E43]" />
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1 text-[#55504A]">
            Catalog
          </span>
        </button>

        {/* 3. Shopping Bag Tab with Live Badge & Pulsing Counter */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 px-3 text-[#1A1A1A] hover:text-[#8C6E43] transition-colors rounded-2xl active:scale-95 group focus:outline-none"
          aria-label="View Shopping Bag"
        >
          <div className="relative">
            <div className="p-2 bg-[#F4EFEB] border border-[#C5A880]/50 rounded-full group-hover:border-[#8C6E43] transition-all shadow-xs">
              <ShoppingBag className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#8C6E43] transition-colors" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7] shadow-md animate-fade-in-up">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5 text-[#8C6E43]">
            {totalItems > 0 ? `₹${subtotal.toLocaleString('en-IN')}` : 'Bag'}
          </span>
        </button>

        {/* 4. WhatsApp Concierge */}
        <a
          href="https://wa.me/919820054321?text=Hello%20LivFabs,%20I%20have%20an%20inquiry%20regarding%20Space-Saving%20Smart%20Furniture"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#55504A] hover:text-[#8C6E43] transition-colors rounded-xl active:scale-95 group focus:outline-none"
          aria-label="Chat with Concierge on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-emerald-600 transition-transform group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1 text-[#55504A]">
            Concierge
          </span>
        </a>

        {/* 5. Google Account Profile / Sign In */}
        {user ? (
          <button
            onClick={openProfileModal}
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[#1A1A1A] hover:text-[#8C6E43] transition-colors rounded-xl active:scale-95 group focus:outline-none"
            aria-label="My Account"
          >
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Google Profile'}
                  className="w-5 h-5 rounded-full object-cover border border-[#C5A880]"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#8C6E43] text-white flex items-center justify-center text-[9px] font-bold">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </div>
            <span className="text-[10px] font-medium tracking-wider uppercase mt-1 text-[#1A1A1A] max-w-[48px] truncate">
              {user.displayName?.split(' ')[0] || 'Account'}
            </span>
          </button>
        ) : (
          <button
            onClick={openAuthModal}
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[#55504A] hover:text-[#8C6E43] transition-colors rounded-xl active:scale-95 group focus:outline-none"
            aria-label="Sign In with Google"
          >
            <UserIcon className="w-5 h-5 text-[#55504A] transition-transform group-hover:scale-110 group-hover:text-[#8C6E43]" />
            <span className="text-[10px] font-medium tracking-wider uppercase mt-1 text-[#55504A]">
              Sign In
            </span>
          </button>
        )}

      </div>
    </nav>
  );
};

