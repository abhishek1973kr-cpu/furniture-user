'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AuthCardProps {
  onSuccess?: () => void;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  isStandalonePage?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  onSuccess,
  onClose,
  title = 'Patron Sign In',
  subtitle = 'Connect via Google for instant order tracking, client concierge, and seamless one-click checkout.',
  isStandalonePage = false,
}) => {
  const router = useRouter();
  const { signInWithGoogle, closeAuthModal } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const profile = await signInWithGoogle();
      setIsLoading(false);
      setSuccessToast(`Welcome back, ${profile.displayName || 'Patron'}! Authenticated successfully.`);

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onClose) {
          onClose();
        } else {
          closeAuthModal();
        }
        if (isStandalonePage) {
          router.push('/');
        }
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Google Sign-In notice:', err);
      setErrorMessage(
        err?.message || 'Google sign-in could not be completed. Please try again.'
      );
    }
  };

  const containerClasses = isStandalonePage
    ? 'w-full max-w-md mx-auto bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xl rounded-3xl p-6 sm:p-9 text-[#1A1A1A] relative overflow-hidden my-6 sm:my-8'
    : 'w-full max-w-md mx-auto bg-[#FFFFFF] border-t sm:border border-[#C5A880]/35 shadow-2xl rounded-t-[32px] sm:rounded-3xl rounded-b-none sm:rounded-b-3xl px-6 py-7 sm:p-9 text-[#1A1A1A] relative overflow-y-auto max-h-[90vh] sm:max-h-none pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-9 transition-all duration-300';

  return (
    <div className={containerClasses}>
      {/* Decorative Gold Top Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-[#8C6E43] to-[#C5A880]" />

      {/* Mobile Top Drag Indicator for bottom sheet */}
      {!isStandalonePage && (
        <div className="w-12 h-1 bg-[#C5A880]/40 rounded-full mx-auto -mt-2 mb-4 sm:hidden" />
      )}

      {/* Integrated Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#F5F2EB] hover:bg-[#EAE4D9] rounded-full transition-colors active:scale-95 cursor-pointer shadow-2xs"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Success Toast Banner */}
      {successToast && (
        <div className="mb-5 p-4 rounded-2xl bg-[#FDFBF7] border-2 border-[#C5A880] shadow-md animate-fade-in-up flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">{successToast}</p>
            <p className="text-[11px] text-[#8C6E43] font-medium mt-0.5">Redirecting to your luxury storefront...</p>
          </div>
        </div>
      )}

      {/* Header Seal */}
      <div className="text-center pt-1 px-4 sm:px-0">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F2EB] border border-[#C5A880]/30 text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#8C6E43] font-semibold mb-2.5">
          <Sparkles className="w-3 h-3 text-[#8C6E43]" />
          LivFabs Patron Authentication
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
          {title}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#55504A] leading-relaxed max-w-xs sm:max-w-sm mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Error Message Notification */}
      {errorMessage && (
        <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fade-in-up">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px] sm:text-xs leading-tight font-medium">
            {errorMessage}
          </div>
        </div>
      )}

      {/* REFINED, CENTERED & HIGHLIGHTED "CONTINUE WITH GOOGLE" BUTTON */}
      <div className="mt-7 sm:mt-8">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-[#FFFFFF] hover:bg-[#FDFBF7] text-[#1A1A1A] border-2 border-[#C5A880]/60 hover:border-[#8C6E43] rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3.5 cursor-pointer group active:scale-98 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-[#8C6E43] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#1A1A1A]">
                Connecting with Google...
              </span>
            </>
          ) : (
            <>
              {/* Correctly Sized Google SVG (w-6 h-6 shrink-0) */}
              <svg
                className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="text-sm sm:text-base font-semibold tracking-wide text-[#1A1A1A]">
                Continue with Google
              </span>
            </>
          )}
        </button>
      </div>

      {/* Luxury Patron Benefits Badges */}
      <div className="mt-7 pt-6 border-t border-[#C5A880]/20 space-y-2.5">
        <div className="flex items-center gap-2.5 text-xs text-[#55504A]">
          <div className="w-5 h-5 rounded-full bg-[#F5F2EB] border border-[#C5A880]/40 flex items-center justify-center shrink-0">
            <Lock className="w-3 h-3 text-[#8C6E43]" />
          </div>
          <span>Instant 1-click passwordless Google sign-in</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-[#55504A]">
          <div className="w-5 h-5 rounded-full bg-[#F5F2EB] border border-[#C5A880]/40 flex items-center justify-center shrink-0">
            <Truck className="w-3 h-3 text-[#8C6E43]" />
          </div>
          <span>Real-time 12-hour dispatch tracking & order history</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-[#55504A]">
          <div className="w-5 h-5 rounded-full bg-[#F5F2EB] border border-[#C5A880]/40 flex items-center justify-center shrink-0">
            <RotateCcw className="w-3 h-3 text-[#8C6E43]" />
          </div>
          <span>100% Refund Policy & 7-Day Doorstep Returns</span>
        </div>
      </div>

      {/* Security Guarantee Footer */}
      <div className="mt-6 pt-4 border-t border-[#C5A880]/20 flex items-center justify-center gap-1.5 text-[10px] text-[#7E7870]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43]" />
        <span>Firebase Google Auth • 256-Bit SSL Encryption • Zero Spam</span>
      </div>
    </div>
  );
};
