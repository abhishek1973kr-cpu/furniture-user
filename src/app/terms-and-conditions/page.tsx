import React from 'react';
import type { Metadata } from 'next';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms and Conditions | LivFabs Luxury Living',
  description:
    'Read the official Terms and Conditions of LivFabs Smart Living Private Limited. Clear guidelines on purchases, payments, shipping, and warranty.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="Terms & Conditions"
        subtitle="Last Updated: October 2026 • Governing the purchase and use of LivFabs smart living products"
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-sm text-[#403B35] leading-relaxed">
        <div className="space-y-8 bg-white border border-[#C5A880]/25 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">1. Overview & Agreement</h2>
            <p>
              This website is operated by <strong>LivFabs Smart Living Private Limited</strong> (referred to as &quot;LivFabs&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By visiting our website (livfabs.luxury) and/or purchasing from us, you engage in our &quot;Service&quot; and agree to be bound by the following terms and conditions (&quot;Terms of Service&quot;, &quot;Terms&quot;), including those additional terms and policies referenced herein and/or available by hyperlink.
            </p>
            <p className="mt-2">
              Please read these Terms carefully before accessing or placing orders through our website. If you do not agree to all terms and conditions of this agreement, you may not access the website or use any services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">2. Legal Entity & Operating Address</h2>
            <p>
              <strong>Company Name:</strong> LivFabs Smart Living Private Limited<br />
              <strong>Registered Office & Design Atelier:</strong> 4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai, Maharashtra 400050, India<br />
              <strong>Official Helpline:</strong> +91 98200 54321<br />
              <strong>Support Email:</strong> concierge@livfabs.luxury / support@livfabs.com<br />
              <strong>Operating Hours:</strong> Monday through Sunday, 9:00 AM – 9:00 PM IST
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">3. Products & Space-Saving Furniture Specifications</h2>
            <p>
              Certain products, including modular velvet sofa-cum-beds, 5-in-1 Rubik convertible ottoman cubes, studio Murphy wall beds, and rolling under-bed trunks, are produced and flat-packed to order. While we make every effort to display accurate colors, textures, and measurements, slight natural fabric batch variations and manual dimension tolerances (± 0.5 inches) may occur.
            </p>
            <p className="mt-2">
              Prices for our products are subject to change without prior notice. We reserve the right to limit sales quantities or discontinue products at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">4. Order Placement & Acceptance</h2>
            <p>
              When you place an order, you will receive an immediate automated confirmation on-screen, accompanied by SMS tracking dispatch updates. We reserve the right to refuse or cancel any order if fraudulent activity is suspected, or in cases of unforeseen inventory shortages. If your order is canceled after your card or account has been charged via our online gateway, a 100% full refund will be processed immediately to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">5. Payment Methods & Payment Gateway</h2>
            <p>
              We provide two official checkout methods:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>
                <strong>Cash on Delivery (COD):</strong> Customers can pay at their doorstep in cash or via mobile UPI upon physical receipt and external carton inspection.
              </li>
              <li>
                <strong>Online Payment via Razorpay Gateway:</strong> We accept all major Credit Cards, Debit Cards, Net Banking, and UPI apps (Google Pay, PhonePe, Paytm, BHIM). All transactions are encrypted with 256-bit SSL and processed via Razorpay’s PCI-DSS compliant infrastructure. LivFabs does not store customer CVV, card numbers, or UPI PINs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">6. Priority Shipping & Delivery Timelines</h2>
            <p>
              All confirmed orders are processed and handed over to our national freight partners (BlueDart, Delhivery, and Express Cargo) within our <strong>12-Hour Priority Dispatch Guarantee</strong>. Standard transit delivery across all 36 Indian States and Union Territories is completed within <strong>5 to 7 business days</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">7. 7-Day Easy Returns & 100% Refund Policy</h2>
            <p>
              We offer a straightforward <strong>7-Day Doorstep Return & Replacement Policy</strong> from the date of product delivery. If you receive a damaged, defective, or incorrect piece, our courier will pick up the item free of charge. Once picked up, full refunds are credited back to the original payment source within <strong>5 to 7 business days</strong>. For COD orders, refunds are credited directly to your verified bank account or UPI ID.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">8. 2-Year Mechanism & Structural Warranty</h2>
            <p>
              All LivFabs convertible mechanisms (hydraulic Murphy bed pistons, 5-in-1 nested ottoman steel frames, and rolling under-bed industrial casters) include our comprehensive 2-Year Direct Replacement Warranty against manufacturing defects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">9. Limitation of Liability & Governing Law</h2>
            <p>
              LivFabs Smart Living Private Limited shall not be liable for any indirect, incidental, or consequential damages resulting from the misuse or improper assembly of furniture beyond the invoice price of the purchased item.
            </p>
            <p className="mt-2">
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of <strong>India</strong>, with exclusive jurisdiction resting in the competent courts of <strong>Mumbai, Maharashtra</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">10. Contact Information</h2>
            <p>
              Questions regarding these Terms of Service should be directed to:
            </p>
            <p className="mt-2 bg-[#F8F5EE] p-4 rounded-2xl border border-[#C5A880]/30 font-medium">
              Legal & Compliance Officer<br />
              LivFabs Smart Living Private Limited<br />
              4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai 400050<br />
              Email: concierge@livfabs.luxury | Phone: +91 98200 54321
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
