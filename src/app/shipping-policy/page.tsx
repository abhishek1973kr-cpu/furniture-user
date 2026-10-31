import React from 'react';
import type { Metadata } from 'next';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shipping and Delivery Policy | LivFabs Luxury Living',
  description:
    'LivFabs 12-Hour Priority Dispatch & Express Nationwide Shipping Policy. Free doorstep delivery across India in 5 to 7 business days.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="Shipping & Delivery Policy"
        subtitle="12-Hour Priority Dispatch Guarantee • 100% Free Express Delivery Across India"
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-sm text-[#403B35] leading-relaxed">
        <div className="space-y-8 bg-white border border-[#C5A880]/25 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">1. Shipping Coverage & Free Delivery</h2>
            <p>
              <strong>LivFabs Smart Living Private Limited</strong> provides <strong>100% Free Express Doorstep Shipping</strong> on all space-saving smart furniture orders across all <strong>36 Indian States and Union Territories</strong>. There are zero hidden handling charges, octroi surcharges, or delivery convenience fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">2. 12-Hour Priority Dispatch Guarantee</h2>
            <p>
              Unlike conventional custom furniture makers with weeks of waiting, every LivFabs item featured on our storefront is pre-engineered and stocked in modular flat-pack form.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Orders placed Monday through Saturday before 4:00 PM IST:</strong> Dispatched from our central Mumbai hub on the same business day.</li>
              <li><strong>Orders placed after 4:00 PM IST or on Sunday:</strong> Dispatched within the first 12 hours of the next business morning.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">3. Estimated Delivery Timelines</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#C5A880]/30 rounded-2xl overflow-hidden mt-2">
                <thead>
                  <tr className="bg-[#F8F5EE] text-[#1A1A1A] font-semibold text-xs uppercase tracking-wider">
                    <th className="p-3 border-b border-[#C5A880]/30">Destination Region</th>
                    <th className="p-3 border-b border-[#C5A880]/30">Estimated Delivery Window</th>
                    <th className="p-3 border-b border-[#C5A880]/30">Transit Freight Partner</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-[#C5A880]/20">
                    <td className="p-3 font-semibold text-[#8C6E43]">Metro Cities (Mumbai, Delhi-NCR, Bengaluru, Pune, Hyderabad, Chennai)</td>
                    <td className="p-3">3 – 5 Business Days</td>
                    <td className="p-3">BlueDart Express Air / Express Surface</td>
                  </tr>
                  <tr className="border-b border-[#C5A880]/20">
                    <td className="p-3 font-semibold text-[#8C6E43]">Tier-2 Cities & State Capitals across all 36 States & UTs</td>
                    <td className="p-3">5 – 7 Business Days</td>
                    <td className="p-3">Delhivery Heavy Surface Cargo</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#8C6E43]">Remote, Hill Station & Island Pincodes (J&K, Ladakh, Andaman & Nicobar)</td>
                    <td className="p-3">7 – 9 Business Days</td>
                    <td className="p-3">Dedicated Heavy Postal Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">4. Packaging & Damage-Proof Transit Protection</h2>
            <p>
              To ensure pristine condition upon arrival, every LivFabs product is packed inside industrial-grade 7-ply corrugated cartons reinforced with high-density EPE foam corner bumpers and honeycomb impact barriers. Furniture mechanisms, hydraulic pistons, and hardware are vacuum-sealed separately with numbered assembly manuals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">5. Live Waybill & Tracking SMS Updates</h2>
            <p>
              As soon as your shipment is picked up by the logistics carrier:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>You receive an automated SMS with the live tracking URL and official Air Waybill (AWB) number.</li>
              <li>You can contact our logistics desk 7 days a week via WhatsApp or phone with your Order ID for real-time truck location updates.</li>
              <li>The delivery personnel calls the registered recipient phone number 2 to 3 hours prior to arriving at your doorstep.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">6. Doorstep Inspection & Cash on Delivery Verification</h2>
            <p>
              Customers selecting <strong>Cash on Delivery (COD)</strong> are encouraged to visually inspect the external carton condition before handing over cash or completing digital UPI at the doorstep. If any box shows heavy compression or tears, you may ask the delivery agent to note the condition or refuse delivery for an immediate fresh dispatch.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">7. Logistics Inquiries & Dispatch Desk</h2>
            <div className="mt-2 bg-[#F8F5EE] p-4 rounded-2xl border border-[#C5A880]/30 font-medium">
              LivFabs Central Dispatch Hub<br />
              LivFabs Smart Living Private Limited<br />
              Warehouse & Logistics Wing, 4th Floor, Design Pavilion, Linking Road, Mumbai 400050<br />
              Logistics Helpline: +91 98200 54321 | Email: logistics@livfabs.luxury / concierge@livfabs.luxury
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
