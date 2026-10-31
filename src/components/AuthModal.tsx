'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, sendPhoneOtp, signInWithPhone } = useAuth();
  
  // Tab: 'google' or 'phone'
  const [activeTab, setActiveTab] = useState<'google' | 'phone'>('google');
  
  // Phone OTP Flow State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpNotice, setDemoOtpNotice] = useState<string | null>(null);

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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await sendPhoneOtp(cleanPhone);
      setOtpSent(true);
      setIsLoading(false);
      setDemoOtpNotice(`OTP Sent to +91 ${cleanPhone}. (Use OTP: ${res.testOtp || '123456'})`);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP received on your mobile.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signInWithPhone(phoneNumber, otp.trim(), fullName);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in-up"
    >
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={closeAuthModal} aria-hidden="true" />

      {/* Luxury Modal Card */}
      <div className="relative w-full max-w-md bg-[#FFFFFF] border-t sm:border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] p-6 sm:p-8 rounded-t-3xl sm:rounded-3xl overflow-hidden pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        
        {/* Mobile Pull-Down Drag Bar */}
        <div className="w-12 h-1 bg-[#C5A880]/40 rounded-full mx-auto -mt-2 mb-3 sm:hidden" />

        {/* Subtle decorative gold top bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-[#8C6E43] to-[#C5A880]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#F5F2EB] border border-[#C5A880]/20 rounded-full transition-colors active:scale-95"
          aria-label="Close sign-in window"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Atelier Seal / Header */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F2EB] border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-[#8C6E43]" />
            Patron Login Required
          </div>

          <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-serif font-medium text-[#1A1A1A]">
            Sign In to Continue
          </h2>

          <p className="mt-1 text-xs text-[#55504A] leading-relaxed max-w-sm mx-auto">
            Please log in to proceed to checkout and track your order.
          </p>
        </div>

        {/* Tabs: Google Login vs Phone Login */}
        <div className="mt-5 grid grid-cols-2 p-1 bg-[#F5F2EB] rounded-full border border-[#C5A880]/30 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('google'); setErrorMessage(null); }}
            className={`py-2 rounded-full transition-all ${
              activeTab === 'google'
                ? 'bg-[#FFFFFF] text-[#1A1A1A] shadow-sm font-bold'
                : 'text-[#55504A] hover:text-[#1A1A1A]'
            }`}
          >
            Google Sign-In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('phone'); setErrorMessage(null); }}
            className={`py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'phone'
                ? 'bg-[#FFFFFF] text-[#1A1A1A] shadow-sm font-bold'
                : 'text-[#55504A] hover:text-[#1A1A1A]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#8C6E43]" />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-[11px] leading-tight">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Demo OTP Banner */}
        {demoOtpNotice && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-medium">{demoOtpNotice}</span>
          </div>
        )}

        {/* TAB 1: GOOGLE SIGN-IN */}
        {activeTab === 'google' && (
          <div className="mt-6 space-y-4">
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
              <span>Continue with Google</span>
            </button>

            <p className="text-[11px] text-[#7E7870] text-center">
              One-click instant login. No password required.
            </p>
          </div>
        )}

        {/* TAB 2: MOBILE NUMBER & OTP LOGIN */}
        {activeTab === 'phone' && (
          <div className="mt-5">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-base sm:text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex items-center bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl overflow-hidden focus-within:border-[#8C6E43]">
                    <span className="px-3.5 text-xs text-[#8C6E43] font-semibold border-r border-[#C5A880]/30">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-3 bg-transparent text-base sm:text-xs text-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Get Verification OTP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[#55504A]">
                  <span>Sent to <strong>+91 {phoneNumber}</strong></span>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(''); setDemoOtpNotice(null); }}
                    className="text-[#8C6E43] underline text-[11px]"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                    Enter 6-Digit OTP *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP (e.g. 123456)"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-center text-lg font-mono tracking-widest text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Security Assurance */}
        <div className="mt-5 pt-3 border-t border-[#C5A880]/20 flex items-center justify-center gap-2 text-[10px] text-[#7E7870]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43]" />
          <span>Your information is protected with 256-Bit SSL Encryption</span>
        </div>

      </div>
    </div>
  );
};
