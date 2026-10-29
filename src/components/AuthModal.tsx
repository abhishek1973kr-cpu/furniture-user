'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signInWithGoogle();
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Unable to sign in with Google. Please try again.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in-up"
    >
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={closeAuthModal} aria-hidden="true" />

      {/* Luxury Creamy White Modal Card with Smooth Rounded-3xl Corners */}
      <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] p-6 sm:p-8 rounded-3xl overflow-hidden">
        
        {/* Subtle decorative gold top bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-[#8C6E43] to-[#C5A880]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#F5F2EB] border border-[#C5A880]/20 rounded-full transition-colors"
          aria-label="Close sign-in window"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Atelier Seal / Badge */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F2EB] border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[#8C6E43]" />
            LivFabs Patron Authentication
          </div>

          <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A1A]">
            Sign In to LivFabs
          </h2>

          <p className="mt-2 text-xs text-[#55504A] leading-relaxed max-w-sm mx-auto">
            Connect seamlessly to synchronize your smart furniture orders, access live 12-hour dispatch tracking, and unlock exclusive wholesale privileges.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fade-in-up">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-red-900">Sign-In Notice</span>
              <span className="text-[11px] text-red-700">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 1. Single Premium "Continue with Google" Button */}
        <div className="mt-6 sm:mt-8 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-white hover:bg-[#FDFBF7] text-[#1A1A1A] border-2 border-[#C5A880]/60 hover:border-[#8C6E43] rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3.5 group font-medium text-xs sm:text-sm tracking-wide disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#8C6E43] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="font-semibold">Continue with Google</span>
          </button>
        </div>

        {/* Privilege Feature Bullets */}
        <div className="mt-6 pt-5 border-t border-[#C5A880]/20 space-y-2.5 text-xs text-[#55504A]">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
            <span>Instant One-Click Verification (Zero password friction)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
            <span>Encrypted & Linked to Doorstep Cash On Delivery Orders</span>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-[10px] text-[#7E7870] leading-relaxed">
          By signing in, you agree to LivFabs Terms of Wholesale Sale and 12-Hour Priority Shipping Protocol.
        </p>

      </div>
    </div>
  );
};
