'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Phone, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AuthCardProps {
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  isStandalonePage?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  onSuccess,
  title = 'Sign In to LivFabs',
  subtitle = 'Connect to access your orders, live 12-hour dispatch tracking, and wholesale privileges.',
  isStandalonePage = false,
}) => {
  const { signInWithGoogle, sendPhoneOtp, signInWithPhone } = useAuth();

  // Phone Auth State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Google Sign-In Flow
  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage(null);
    try {
      await signInWithGoogle();
      setIsLoadingGoogle(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setIsLoadingGoogle(false);
      setErrorMessage(err?.message || 'Google sign-in could not be completed.');
    }
  };

  // 2. Phone Auth Flow - Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoadingOtp(true);
    setErrorMessage(null);
    try {
      const result = await sendPhoneOtp(cleanPhone, 'recaptcha-container');
      setOtpSent(true);
      setIsLoadingOtp(false);
      if (result.testOtp) {
        setDemoNotice(`OTP sent to +91 ${cleanPhone}. (Verification Code: ${result.testOtp})`);
      } else {
        setDemoNotice(`OTP sent successfully to +91 ${cleanPhone}`);
      }
    } catch (err: any) {
      setIsLoadingOtp(false);
      setErrorMessage(err?.message || 'Failed to send OTP to mobile number.');
    }
  };

  // 2. Phone Auth Flow - Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setErrorMessage('Please enter the verification OTP received on your phone.');
      return;
    }

    setIsLoadingOtp(true);
    setErrorMessage(null);
    try {
      await signInWithPhone(phoneNumber, cleanOtp, fullName);
      setIsLoadingOtp(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setIsLoadingOtp(false);
      setErrorMessage(err?.message || 'Invalid verification OTP code. Please retry.');
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xl rounded-3xl p-6 sm:p-8 text-[#1A1A1A] relative overflow-hidden ${isStandalonePage ? 'my-8' : ''}`}>
      
      {/* Decorative Gold Top Accent Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-[#8C6E43] to-[#C5A880]" />

      {/* Invisible Recaptcha Container for Firebase Phone Auth */}
      <div id="recaptcha-container" />

      {/* Header Seal */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F2EB] border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold mb-2.5">
          <Sparkles className="w-3 h-3 text-[#8C6E43]" />
          LivFabs Patron Authentication
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1A1A1A]">
          {title}
        </h1>

        <p className="mt-1.5 text-xs text-[#55504A] leading-relaxed max-w-sm mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Error Message Notice */}
      {errorMessage && (
        <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fade-in-up">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px] leading-tight font-medium">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Demo / Verification Code Notice */}
      {demoNotice && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] font-medium">{demoNotice}</span>
        </div>
      )}

      {/* 1. SECTION 1: PROMINENT CONTINUE WITH GOOGLE BUTTON */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoadingGoogle || isLoadingOtp}
          className="w-full py-4 px-6 bg-[#FFFFFF] hover:bg-[#FDFBF7] text-[#1A1A1A] border-2 border-[#C5A880]/50 hover:border-[#8C6E43] rounded-full shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3.5 font-medium text-xs sm:text-sm tracking-wide disabled:opacity-60 cursor-pointer group active:scale-98"
        >
          {isLoadingGoogle ? (
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

      {/* ELEGANT SEPARATOR */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#C5A880]/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#FFFFFF] px-3.5 text-[#7E7870] font-semibold tracking-widest text-[10px]">
            Or Login with Phone Number
          </span>
        </div>
      </div>

      {/* 2. SECTION 2: PHONE NUMBER OTP AUTHENTICATION */}
      <div>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Malhotra"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] focus:outline-none focus:border-[#8C6E43] shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                Indian Mobile Number *
              </label>
              <div className="flex items-center bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl overflow-hidden focus-within:border-[#8C6E43] shadow-2xs">
                <span className="px-3.5 py-3 text-xs text-[#8C6E43] font-bold border-r border-[#C5A880]/30 bg-[#F5F2EB]">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full px-3.5 py-3 bg-transparent text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] focus:outline-none font-medium tracking-wide"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingOtp || isLoadingGoogle}
              className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              {isLoadingOtp ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Get OTP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between text-xs text-[#55504A] px-1">
              <span>Code sent to: <strong className="text-[#1A1A1A]">+91 {phoneNumber}</strong></span>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setDemoNotice(null);
                }}
                className="text-[#8C6E43] hover:text-[#1A1A1A] underline text-[11px] font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1">
                Enter 6-Digit OTP *
              </label>
              <input
                type="text"
                required
                autoFocus
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-2 border-[#C5A880]/50 rounded-2xl text-center text-xl font-mono tracking-[0.4em] text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43] shadow-xs font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoadingOtp || isLoadingGoogle}
              className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              {isLoadingOtp ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verify OTP & Log In</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Security Guarantee */}
      <div className="mt-6 pt-4 border-t border-[#C5A880]/20 flex items-center justify-center gap-2 text-[10px] text-[#7E7870]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43]" />
        <span>Firebase Authenticated • 256-Bit SSL Encryption • Zero Spam</span>
      </div>

    </div>
  );
};
