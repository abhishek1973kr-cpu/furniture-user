'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthCard } from '@/components/AuthCard';
import { Footer } from '@/components/Footer';

function SignupContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  // If already logged in, redirect smoothly
  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-serif font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Liv<span className="text-[#8C6E43] font-light">Fabs</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold bg-[#F5F0E6] px-2.5 py-1 rounded-full border border-[#C5A880]/30">
              Patron Membership
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+917488574616"
              className="hidden md:flex items-center gap-1.5 text-xs text-[#55504A] hover:text-[#8C6E43] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C6E43]" />
              <span>Concierge: +91 74885 74616</span>
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
      </header>

      {/* Main Signup Card Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <AuthCard
            isStandalonePage={true}
            title="Create Patron Account"
            subtitle="Join the LivFabs circle for priority dispatch, transparent order tracking, and exclusive smart living privileges."
            onSuccess={() => {
              router.push(redirectUrl);
            }}
          />

          {/* Luxury Reassurance Badges below Card */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs text-[#55504A]">
            <div className="p-3 bg-white/80 border border-[#C5A880]/20 rounded-2xl">
              <span className="block text-[#8C6E43] font-bold">100% Refund</span>
              <span className="text-[10px] text-[#7E7870]">No Questions Asked</span>
            </div>
            <div className="p-3 bg-white/80 border border-[#C5A880]/20 rounded-2xl">
              <span className="block text-[#8C6E43] font-bold">7-Day Returns</span>
              <span className="text-[10px] text-[#7E7870]">Doorstep Pick & Check</span>
            </div>
            <div className="p-3 bg-white/80 border border-[#C5A880]/20 rounded-2xl col-span-2 sm:col-span-1">
              <span className="block text-[#8C6E43] font-bold">Secure Delivery</span>
              <span className="text-[10px] text-[#7E7870]">COD & Razorpay Verified</span>
            </div>
          </div>
        </div>
      </main>

      {/* Global Luxury Footer */}
      <Footer />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
          <div className="w-8 h-8 border-2 border-[#8C6E43] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}

