import React from 'react';
import type { Metadata } from 'next';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | LivFabs Luxury Living',
  description:
    '100% Refund & 7-Day Doorstep Return Policy of LivFabs Smart Living Private Limited. Fast refunds within 5-7 business days for Razorpay and COD purchases.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="Refund & Cancellation Policy"
        subtitle="100% Money-Back Guarantee • 7-Day Doorstep Replacement & Hassle-Free Returns"
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-sm text-[#403B35] leading-relaxed">
        <div className="space-y-8 bg-white border border-[#C5A880]/25 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">1. The LivFabs 100% Satisfaction Guarantee</h2>
            <p>
              At <strong>LivFabs Smart Living Private Limited</strong>, we engineer our multi-functional furniture to transform your home with precision, durability, and elegance. If you are not completely satisfied with your purchase, or if your piece arrives damaged or defective, we provide an iron-clad <strong>100% Refund and 7-Day Easy Replacement Policy</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">2. Order Cancellation Policy (Before Dispatch)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cancellation Window:</strong> You can cancel any order free of charge within <strong>12 hours of placement</strong> or before the item has been dispatched from our Mumbai atelier warehouse.
              </li>
              <li>
                <strong>Instant Refund for Prepaid Orders:</strong> If your order was paid online via <strong>Razorpay (Cards, UPI, NetBanking)</strong>, a 100% full cancellation refund is initiated immediately and returned to your original payment method.
              </li>
              <li>
                <strong>How to Cancel:</strong> Call our priority helpline at <strong>+91 98200 54321</strong> or message our concierge on WhatsApp with your Order ID (e.g. LF-123456).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">3. 7-Day Doorstep Return & Exchange Policy (After Delivery)</h2>
            <p>
              You have <strong>7 calendar days</strong> from the date of physical delivery to request a return or free replacement for any of the following reasons:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Transit Damage:</strong> Dents, scratches, or fabric tears incurred during shipping.</li>
              <li><strong>Manufacturing Defect:</strong> Faulty hydraulic pistons, misaligned hinges, or mechanism jams.</li>
              <li><strong>Mismatched Item:</strong> Received a different model, fabric color, or configuration than ordered.</li>
              <li><strong>Size or Fitment:</strong> Item does not comfortably fit your planned room space.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">4. Return Pickup Process & Reverse Logistics</h2>
            <p>
              Returning an item is seamless and 100% free:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>
                <strong>Step 1: Contact Concierge</strong> — Reach us via email at <a href="mailto:concierge@livfabs.luxury" className="text-[#8C6E43] font-semibold underline">concierge@livfabs.luxury</a> or call <strong>+91 98200 54321</strong> with photos/video of the issue.
              </li>
              <li>
                <strong>Step 2: Free Doorstep Pickup</strong> — Within 24-48 hours, our logistics partner (BlueDart / Delhivery Heavy Freight) will arrive at your address to inspect and pack the furniture.
              </li>
              <li>
                <strong>Step 3: Quality Check & Refund</strong> — Once the pickup waybill is generated and scanned by the courier, your refund is approved instantly.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">5. Refund Timeline & Crediting Mechanism</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#C5A880]/30 rounded-2xl overflow-hidden mt-2">
                <thead>
                  <tr className="bg-[#F8F5EE] text-[#1A1A1A] font-semibold text-xs uppercase tracking-wider">
                    <th className="p-3 border-b border-[#C5A880]/30">Original Payment Mode</th>
                    <th className="p-3 border-b border-[#C5A880]/30">Refund Method</th>
                    <th className="p-3 border-b border-[#C5A880]/30">Processing Timeline</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-[#C5A880]/20">
                    <td className="p-3 font-semibold text-[#8C6E43]">UPI (GPay, PhonePe, Paytm)</td>
                    <td className="p-3">Credited back directly to original VPA / Bank</td>
                    <td className="p-3 font-medium">1 – 2 Business Days</td>
                  </tr>
                  <tr className="border-b border-[#C5A880]/20">
                    <td className="p-3 font-semibold text-[#8C6E43]">Credit / Debit Card (Razorpay)</td>
                    <td className="p-3">Credited to the original card statement</td>
                    <td className="p-3 font-medium">5 – 7 Business Days</td>
                  </tr>
                  <tr className="border-b border-[#C5A880]/20">
                    <td className="p-3 font-semibold text-[#8C6E43]">Net Banking</td>
                    <td className="p-3">Direct NEFT/RTGS to source bank account</td>
                    <td className="p-3 font-medium">3 – 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#8C6E43]">Cash on Delivery (COD)</td>
                    <td className="p-3">Direct UPI transfer or NEFT bank transfer</td>
                    <td className="p-3 font-medium">2 – 3 Business Days upon pickup</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[#55504A]">
              * Timelines follow standard RBI banking clearing cycles. Razorpay transaction reference IDs are sent directly to your registered email and mobile number.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">6. Conditions for Return Eligibility</h2>
            <p>
              To ensure smooth processing, we request customers to maintain:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>The original flat-pack accessories, modular pillows, and mechanism bolts.</li>
              <li>The item free of intentional damage or unauthorized DIY structural modifications.</li>
              <li>Proof of purchase (Order ID or invoice received via SMS/Email).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">7. Official Support Contact</h2>
            <p>
              For any refund or replacement inquiry, our dedicated concierge team is at your service 7 days a week:
            </p>
            <div className="mt-3 bg-[#F8F5EE] p-4 rounded-2xl border border-[#C5A880]/30 font-medium">
              LivFabs Returns & Customer Concierge<br />
              LivFabs Smart Living Private Limited<br />
              4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai 400050<br />
              Email: concierge@livfabs.luxury | Direct Helpline: +91 98200 54321
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

