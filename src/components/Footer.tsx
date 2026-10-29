'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Zap, Sparkles, Check, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

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
    <footer className="bg-[#F4EFEB] text-[#1A1A1A] border-t border-[#C5A880]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Privilege Club Row */}
        <div className="pb-12 border-b border-[#C5A880]/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold">
              The LivFabs Smart Home Club
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-1">
              Be the First to Claim Limited Furniture Drops
            </h3>
            <p className="text-xs text-[#55504A] mt-1 max-w-md">
              Receive secret VIP preview notifications before our 12-hour dispatch inventory sells out.
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C6E43] font-semibold mt-1 mb-4">
              Smart Space Furniture Atelier
            </p>
            <p className="text-xs text-[#55504A] leading-relaxed mb-4">
              Direct robotic casting of space-saving modular furniture and on-the-go comfort essentials. Delivered nationwide with 12-hour priority dispatch.
            </p>

            <div className="space-y-2 text-xs text-[#55504A]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C6E43] shrink-0 mt-0.5" />
                <span>
                  LivFabs Studio & Atelier, 4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai 400050, India
                </span>
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
                Our furniture assembly & design concierges are available 7 days a week (9:00 AM – 9:00 PM IST).
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
                  ⚡ 12-Hour Dispatch Active
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Essential Legal Policies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] mb-4">
              Essential Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#55504A]">
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-[#1A1A1A] transition-colors text-left"
                >
                  ⚡ 12-Hour Priority Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('replacement')}
                  className="hover:text-[#1A1A1A] transition-colors text-left"
                >
                  🛡️ 7-Day Doorstep Replacement Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('warranty')}
                  className="hover:text-[#1A1A1A] transition-colors text-left"
                >
                  ✨ 2-Year Mechanism & Frame Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-[#1A1A1A] transition-colors text-left"
                >
                  🔒 Client Privacy & Data Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-[#1A1A1A] transition-colors text-left"
                >
                  📜 Terms of Wholesale Sale
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Trust & Copyright Row */}
        <div className="pt-8 border-t border-[#C5A880]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#55504A]">
          <div className="flex items-center gap-3">
            <span className="text-[#8C6E43] font-serif font-semibold">LivFabs Smart Living Private Limited</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
            <span className="text-[#1A1A1A] font-medium">Cash On Delivery</span>
            <span>•</span>
            <span className="text-[#1A1A1A] font-medium">Bluedart Heavy Logistics</span>
            <span>•</span>
            <span className="text-[#8C6E43] font-semibold">Factory Direct Wholesale</span>
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

      {/* Policy Modal Overlay if triggered (Rounded-3xl) */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
        >
          <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#C5A880]/40 p-7 text-[#1A1A1A] text-xs rounded-3xl shadow-2xl">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 text-[#7E7870] hover:text-[#1A1A1A] p-1 rounded-full"
            >
              ✕
            </button>

            {activePolicyModal === 'shipping' && (
              <div>
                <h3 className="text-base font-serif text-[#8C6E43] font-bold mb-2">⚡ 12-Hour Priority Shipping Policy</h3>
                <p className="text-[#55504A] leading-relaxed mb-3">
                  All confirmed smart furniture orders at LivFabs are packaged in reinforced honeycomb transit cartons and dispatched from our Mumbai atelier within 12 hours. Express logistics ensure metro delivery within 24–48 hours and rest of India within 2–3 business days.
                </p>
                <p className="text-[#55504A] leading-relaxed">
                  Real-time SMS waybills and WhatsApp dispatch tracking updates are dispatched automatically to your registered phone number.
                </p>
              </div>
            )}

            {activePolicyModal === 'replacement' && (
              <div>
                <h3 className="text-base font-serif text-[#8C6E43] font-bold mb-2">🛡️ 7-Day Doorstep Replacement Guarantee</h3>
                <p className="text-[#55504A] leading-relaxed mb-3">
                  Every smart furniture item undergoes mechanical and surface inspection before dispatch. If your package arrives damaged or missing components, notify our concierge within 7 days for a 100% free doorstep replacement with zero return shipping fee.
                </p>
              </div>
            )}

            {activePolicyModal === 'warranty' && (
              <div>
                <h3 className="text-base font-serif text-[#8C6E43] font-bold mb-2">✨ 2-Year Mechanism & Frame Warranty</h3>
                <p className="text-[#55504A] leading-relaxed mb-3">
                  Our foldable joints, hydraulic pistons, and structural steel frames are covered under a comprehensive 2-year warranty against manufacturing defects and structural sag.
                </p>
              </div>
            )}

            {activePolicyModal === 'privacy' && (
              <div>
                <h3 className="text-base font-serif text-[#8C6E43] font-bold mb-2">🔒 Client Privacy & Data Security</h3>
                <p className="text-[#55504A] leading-relaxed mb-3">
                  Your delivery address and phone number are strictly utilized for airway bill generation and courier delivery. We never sell, lease, or share your contact info with third-party advertisers.
                </p>
              </div>
            )}

            {activePolicyModal === 'terms' && (
              <div>
                <h3 className="text-base font-serif text-[#8C6E43] font-bold mb-2">📜 Terms of Wholesale Sale</h3>
                <p className="text-[#55504A] leading-relaxed mb-3">
                  LivFabs provides an exclusive direct-to-consumer factory wholesale privilege. Standard retail MRP reflects traditional showroom markups. Quantities are limited to batch availability.
                </p>
              </div>
            )}

            <button
              onClick={() => setActivePolicyModal(null)}
              className="mt-6 w-full py-3 bg-[#1A1A1A] text-white font-semibold uppercase tracking-widest text-[11px] rounded-full shadow-md hover:bg-[#8C6E43] transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
