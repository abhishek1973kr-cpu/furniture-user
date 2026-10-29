'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Zap, Sparkles, Check, ArrowUp, RefreshCw, FileText, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<
    'refund' | 'privacy' | 'terms' | 'shipping' | 'warranty' | null
  >(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4EFEB] text-[#1A1A1A] border-t border-[#C5A880]/30 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Privilege Club Row */}
        <div className="pb-12 border-b border-[#C5A880]/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold">
              The LivFabs Smart Home Club
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-1 font-semibold">
              Be the First to Claim Limited Furniture Drops
            </h3>
            <p className="text-xs text-[#55504A] mt-1 max-w-md">
              Receive secret VIP preview notifications before our 12-hour dispatch space-saving inventory sells out.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto items-center p-1 bg-[#FFFFFF] border border-[#C5A880]/40 rounded-full shadow-sm">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your VIP email address..."
              className="w-full sm:w-72 px-5 py-2.5 bg-transparent text-xs text-[#1A1A1A] placeholder-[#7E7870] focus:outline-none rounded-full"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap shadow-sm"
            >
              {subscribed ? 'Subscribed' : 'Join VIP'}
            </button>
          </form>
        </div>

        {/* Main Footer Links & Address Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Atelier Address */}
          <div>
            <span className="text-xl font-serif uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold">
              Liv<span className="text-[#8C6E43] font-light">Fabs</span>
            </span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C6E43] font-semibold mt-1 mb-3">
              Space-Saving Smart Furniture
            </p>
            <p className="text-xs text-[#55504A] leading-relaxed mb-4">
              Direct robotic casting of multi-functional modular sofa beds, ottoman cubes, and folding desks. Factory-direct wholesale pricing delivered nationwide with 12-hour priority dispatch.
            </p>

            {/* Official Company Address */}
            <div className="space-y-2 text-xs text-[#55504A]">
              <div className="flex items-start gap-2.5 p-3 bg-[#FFFFFF] border border-[#C5A880]/25 rounded-2xl shadow-xs">
                <MapPin className="w-4 h-4 text-[#8C6E43] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-[#1A1A1A] block font-semibold">Corporate Headquarters:</strong>
                  <span>LivFabs Luxury Headquarters, Cyber City, India</span>
                  <span className="block text-[11px] text-[#7E7870] mt-0.5">
                    Studio & Atelier: 4th Floor, Design Pavilion, Linking Road, Mumbai 400050
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Curated Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-4">
              Smart Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#55504A]">
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  Modular Velvet Sofa Cum Beds
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  5-in-1 Rubik Convertible Ottoman Cubes
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  Hydraulic Studio Murphy Wall Beds
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  AeroPlush Deluxe Air Beds with Pump
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  Drop-Leaf Wall-Mounted Smart Tables
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#1A1A1A] transition-colors">
                  GlideMaster Rolling Under-Bed Trunks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-4">
              Client Concierge
            </h4>
            <div className="space-y-3 text-xs text-[#55504A]">
              <p>
                Our furniture design & delivery concierges are available 7 days a week (9:00 AM – 9:00 PM IST).
              </p>
              
              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <Phone className="w-3.5 h-3.5 text-[#8C6E43]" />
                <a href="tel:+919820054321" className="hover:text-[#8C6E43] transition-colors font-medium">
                  +91 98200 54321 (Priority Helpline)
                </a>
              </div>

              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <Mail className="w-3.5 h-3.5 text-[#8C6E43]" />
                <a href="mailto:concierge@livfabs.luxury" className="hover:text-[#8C6E43] transition-colors font-medium">
                  concierge@livfabs.luxury
                </a>
              </div>

              <div className="pt-2">
                <span className="inline-block px-3.5 py-1.5 bg-[#FFFFFF] border border-[#C5A880]/40 text-[10px] text-[#8C6E43] font-semibold uppercase tracking-wider rounded-full shadow-sm">
                  ⚡ 12-Hour Priority Dispatch Active
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Essential Legal Policies & Guarantees */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-4">
              Trust & Legal Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#55504A]">
              {/* 100% Refund Policy */}
              <li>
                <button
                  onClick={() => setActivePolicyModal('refund')}
                  className="hover:text-[#1A1A1A] transition-colors text-left font-semibold text-[#8C6E43] flex items-center gap-1.5 group"
                >
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                  <span>★ 100% Refund Policy</span>
                </button>
              </li>

              {/* Privacy Policy */}
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-[#1A1A1A] transition-colors text-left flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Privacy Policy</span>
                </button>
              </li>

              {/* Terms of Service */}
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-[#1A1A1A] transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>Terms of Service</span>
                </button>
              </li>

              {/* 12-Hour Shipping Policy */}
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-[#1A1A1A] transition-colors text-left flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>12-Hour Priority Shipping Policy</span>
                </button>
              </li>

              {/* 2-Year Mechanism Warranty */}
              <li>
                <button
                  onClick={() => setActivePolicyModal('warranty')}
                  className="hover:text-[#1A1A1A] transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43]" />
                  <span>2-Year Mechanism & Frame Warranty</span>
                </button>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-2xl">
              <span className="text-[10px] text-[#8C6E43] font-bold uppercase tracking-wider block">
                Zero Risk Promise
              </span>
              <p className="text-[11px] text-[#55504A] mt-0.5">
                Inspect items upon delivery with Cash on Delivery. 7-Day easy returns guaranteed.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Trust & Copyright Row with Direct Policy Links */}
        <div className="pt-8 border-t border-[#C5A880]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#55504A]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-[#8C6E43] font-serif font-semibold">LivFabs Luxury Headquarters</span>
            <span>•</span>
            <span>Cyber City, India</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          {/* Quick Legal Policy Links */}
          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={() => setActivePolicyModal('refund')}
              className="hover:text-[#8C6E43] transition-colors underline font-medium"
            >
              100% Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-[#8C6E43] transition-colors underline font-medium"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-[#8C6E43] transition-colors underline font-medium"
            >
              Terms of Service
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 bg-[#FFFFFF] border border-[#C5A880]/40 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] rounded-full transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider shadow-sm"
            aria-label="Scroll to top of storefront"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Policy Modal Overlay (Rounded-3xl) */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
        >
          <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#C5A880]/40 p-7 sm:p-8 text-[#1A1A1A] text-xs rounded-3xl shadow-2xl">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 text-[#7E7870] hover:text-[#1A1A1A] p-2 bg-[#F8F5EE] rounded-full transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* 100% Refund Policy Modal Content */}
            {activePolicyModal === 'refund' && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#8C6E43]">
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Client Protection Guarantee</span>
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A] font-bold mb-3">★ 100% Refund Policy & 7-Day Easy Returns</h3>
                <div className="space-y-2.5 text-[#55504A] leading-relaxed">
                  <p>
                    At LivFabs, client satisfaction is our absolute benchmark. If your smart space furniture fails to meet your expectations, arrives with transit damage, or does not fit your space specifications, you are entitled to a <strong>100% unconditional refund or replacement</strong>.
                  </p>
                  <p>
                    <strong>7-Day Doorstep Guarantee:</strong> Request a return or exchange within 7 days of delivery. Our courier partners will inspect and retrieve the parcel from your doorstep with <strong>zero return logistics fees</strong>.
                  </p>
                  <p>
                    <strong>Cash on Delivery Safety:</strong> With Cash on Delivery, your payment is made only when the product physically reaches your premises. For online prepayments, refunds are credited back to your original payment method within 24 to 48 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy Modal Content */}
            {activePolicyModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#8C6E43]">
                  <Lock className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Data Confidentiality</span>
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A] font-bold mb-3">Privacy Policy</h3>
                <div className="space-y-2.5 text-[#55504A] leading-relaxed">
                  <p>
                    LivFabs operates with strict client privacy protocols. All customer contact details, phone numbers, delivery addresses, and Google authentication tokens are encrypted using enterprise 256-bit SSL encryption.
                  </p>
                  <p>
                    We never sell, lease, monetize, or disclose your personal records to third-party marketing entities. Your delivery address and telephone number are strictly shared with our logistics partners (e.g., Blue Dart Heavy Logistics) solely for waybill generation, SMS tracking, and physical delivery completion.
                  </p>
                </div>
              </div>
            )}

            {/* Terms of Service Modal Content */}
            {activePolicyModal === 'terms' && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#8C6E43]">
                  <FileText className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Legal Agreement</span>
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A] font-bold mb-3">Terms of Service</h3>
                <div className="space-y-2.5 text-[#55504A] leading-relaxed">
                  <p>
                    By ordering through the LivFabs storefront, you are accessing factory-direct wholesale pricing privileges. Each piece of furniture is engineered to exact specifications, utilizing robotic welding, kiln-dried structural wood, and premium high-density fabrics.
                  </p>
                  <p>
                    Wholesale allocations are limited to inventory batch capacity. Orders placed with Cash on Delivery require phone or SMS OTP verification prior to 12-hour dispatch.
                  </p>
                </div>
              </div>
            )}

            {/* Shipping Policy Modal Content */}
            {activePolicyModal === 'shipping' && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#8C6E43]">
                  <Zap className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Fast Fulfillment</span>
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A] font-bold mb-3">⚡ 12-Hour Priority Shipping Policy</h3>
                <div className="space-y-2.5 text-[#55504A] leading-relaxed">
                  <p>
                    Every confirmed order is packed in reinforced multi-layer honeycomb transit cartons and dispatched within 12 hours from our central fulfillment hubs.
                  </p>
                  <p>
                    Metro deliveries are fulfilled within 24 to 48 hours. Tier-2 and Tier-3 cities receive delivery within 2 to 4 business days with full real-time SMS waybill tracking.
                  </p>
                </div>
              </div>
            )}

            {/* Warranty Modal Content */}
            {activePolicyModal === 'warranty' && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#8C6E43]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Long-Term Reliability</span>
                </div>
                <h3 className="text-lg font-serif text-[#1A1A1A] font-bold mb-3">✨ 2-Year Mechanism & Frame Warranty</h3>
                <div className="space-y-2.5 text-[#55504A] leading-relaxed">
                  <p>
                    All moving hydraulic pistons, foldable hinges, steel sliding tracks, and structural load-bearing frames are backed by an official 2-year warranty against any manufacturing defect.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActivePolicyModal(null)}
              className="mt-6 w-full py-3 bg-[#1A1A1A] text-white font-semibold uppercase tracking-widest text-[11px] rounded-full shadow-md hover:bg-[#8C6E43] transition-all"
            >
              Close Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
