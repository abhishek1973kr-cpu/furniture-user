'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthCard } from '@/components/AuthCard';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in-up"
    >
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={closeAuthModal} aria-hidden="true" />

      {/* Modal Wrapper */}
      <div className="relative w-full max-w-md z-10 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* Mobile Pull-Down Indicator */}
        <div className="w-12 h-1 bg-[#C5A880]/60 rounded-full mx-auto mb-2 sm:hidden" />

        {/* Floating Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 sm:-top-3 sm:-right-3 z-20 p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#FFFFFF] hover:bg-[#F5F2EB] border border-[#C5A880]/40 rounded-full transition-colors shadow-md active:scale-95 cursor-pointer"
          aria-label="Close authentication window"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dedicated Auth Card */}
        <AuthCard onSuccess={closeAuthModal} />
      </div>
    </div>
  );
};
