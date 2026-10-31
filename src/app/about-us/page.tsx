import React from 'react';
import type { Metadata } from 'next';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';
import { Sparkles, ShieldCheck, Zap, Award, Factory, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | LivFabs Luxury Smart Furniture Atelier',
  description:
    'Discover the LivFabs story. Space-saving modular furniture engineered with precision craftsmanship and direct factory wholesale privilege.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="The LivFabs Atelier"
        subtitle="Pioneering precision-engineered, space-saving smart living furniture at direct factory wholesale value."
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Story Banner */}
        <div className="bg-white border border-[#C5A880]/30 rounded-3xl p-6 sm:p-12 shadow-xs mb-12">
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold block mb-2">
              Our Founding Vision
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">
              Modern Urban Living Demands Space Intelligence.
            </h2>
            <p className="text-sm text-[#55504A] leading-relaxed mb-4">
              Modern urban apartments in Mumbai, Delhi, Bengaluru, and Pune are precious. Yet conventional luxury furniture remains heavy, rigid, and single-purpose — wasting up to 60% of usable floor area during the daytime.
            </p>
            <p className="text-sm text-[#55504A] leading-relaxed">
              <strong>LivFabs Smart Living Private Limited</strong> was founded to solve this dilemma. By combining aerodynamic mechanical hardware, robotic steel laser welding, and plush stain-resistant velvet textiles, we create transformable furniture that doubles your room’s usable space in seconds.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#C5A880]/25 rounded-3xl p-6 shadow-xs">
            <div className="w-10 h-10 bg-[#F5F0E6] rounded-2xl flex items-center justify-center mb-4 text-[#8C6E43]">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] mb-1.5">Direct Factory Wholesale</h3>
            <p className="text-xs text-[#55504A] leading-relaxed">
              We eliminate intermediaries, luxury showroom rents, and retail markups. Every piece is delivered directly from our atelier floor to your doorstep at true wholesale rates.
            </p>
          </div>

          <div className="bg-white border border-[#C5A880]/25 rounded-3xl p-6 shadow-xs">
            <div className="w-10 h-10 bg-[#F5F0E6] rounded-2xl flex items-center justify-center mb-4 text-[#8C6E43]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] mb-1.5">12-Hour Priority Dispatch</h3>
            <p className="text-xs text-[#55504A] leading-relaxed">
              Forget waiting 4 to 6 weeks for custom carpentry. Our pre-engineered modular flat-pack inventory is ready to ship nationwide within 12 hours of order confirmation.
            </p>
          </div>

          <div className="bg-white border border-[#C5A880]/25 rounded-3xl p-6 shadow-xs">
            <div className="w-10 h-10 bg-[#F5F0E6] rounded-2xl flex items-center justify-center mb-4 text-[#8C6E43]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] mb-1.5">100% Satisfaction Guarantee</h3>
            <p className="text-xs text-[#55504A] leading-relaxed">
              Shop with absolute peace of mind. We provide 7-Day doorstep returns, Cash on Delivery with box inspection, and 2-Year structural mechanism warranties.
            </p>
          </div>
        </div>

        {/* Corporate Identity & Headquarters Details */}
        <div className="bg-[#F8F5EE] border border-[#C5A880]/40 rounded-3xl p-6 sm:p-10 text-xs text-[#403B35]">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-3">
            Company Information & Atelier Registered Office
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Entity Name:</strong> LivFabs Smart Living Private Limited</p>
              <p className="mt-1"><strong>Operating Hub:</strong> 4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai 400050, India</p>
              <p className="mt-1"><strong>Helpline:</strong> +91 98200 54321</p>
            </div>
            <div>
              <p><strong>Customer Inquiries:</strong> concierge@livfabs.luxury</p>
              <p className="mt-1"><strong>Payment Gateways:</strong> Razorpay (UPI, Credit/Debit Cards, NetBanking) & Cash on Delivery</p>
              <p className="mt-1"><strong>Nationwide Logistics:</strong> BlueDart, Delhivery Heavy Cargo (36 States & UTs)</p>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-[#C5A880]/30 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-[11px] text-[#7E7870]">
              All furniture designs and trademarks belong to LivFabs Smart Living Private Limited.
            </span>
            <Link
              href="/"
              className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white font-semibold uppercase tracking-wider rounded-full transition-all text-xs"
            >
              Explore Curated Catalog
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
