import React from 'react';
import type { Metadata } from 'next';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | LivFabs Luxury Living',
  description:
    'Learn how LivFabs Smart Living Private Limited protects and respects your privacy. Compliant with Indian IT laws and Razorpay secure payment guidelines.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="Privacy Policy"
        subtitle="Last Updated: October 2026 • Your data security, privacy, and encryption rights"
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-sm text-[#403B35] leading-relaxed">
        <div className="space-y-8 bg-white border border-[#C5A880]/25 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">1. Introduction</h2>
            <p>
              At <strong>LivFabs Smart Living Private Limited</strong> (&quot;LivFabs&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to protecting the privacy and personal data of every visitor and customer. This Privacy Policy outlines what information we collect, how it is used, and the robust safeguards in place to protect it when you visit our website (livfabs.luxury) or purchase space-saving furniture products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">2. Information We Collect</h2>
            <p>
              When you purchase or browse our storefront, we collect information necessary to fulfill your order and provide an exceptional client experience:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>
                <strong>Customer Profile & Delivery Details:</strong> Full Name, Primary Mobile Number, Alternate Contact Number, Delivery Address, Landmark, City, State, and PIN Code.
              </li>
              <li>
                <strong>Account & Authentication:</strong> When using Google Sign-In, we store your Google User ID, Name, Profile Avatar URL, and Email to link your order history and verified customer reviews.
              </li>
              <li>
                <strong>Device & Network Data:</strong> IP address, browser type, and operating system collected for fraud detection and performance analytics.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">3. Payment Information & Razorpay Security Guarantee</h2>
            <p>
              <strong>We do NOT store or process sensitive credit/debit card numbers, CVVs, or bank net banking credentials on our servers.</strong>
            </p>
            <p className="mt-2">
              All digital transactions are seamlessly routed through <strong>Razorpay</strong>, India’s leading RBI-authorized and PCI-DSS Level 1 certified payment aggregator. All transmissions are encrypted using industry-standard <strong>256-bit SSL (Secure Sockets Layer) encryption</strong>. Razorpay handles tokenization, bank authentication (3D Secure OTP), and UPI deep-linking directly with NPCI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">4. How We Use Your Information</h2>
            <p>
              The information we collect is strictly used for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Processing and flat-pack manufacturing of your smart furniture order.</li>
              <li>Handing over parcels with 12-hour priority dispatch to our courier partners (BlueDart, Delhivery).</li>
              <li>Sending live delivery tracking updates and SMS notifications.</li>
              <li>Facilitating doorstep inspection, returns, and instant 100% refund processing.</li>
              <li>Providing dedicated client concierge support via phone (+91 98200 54321) and WhatsApp.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">5. Data Sharing & Non-Disclosure</h2>
            <p>
              We honor your privacy: <strong>we NEVER sell, rent, trade, or monetize your personal information to third-party advertisers or data brokers.</strong>
            </p>
            <p className="mt-2">
              Information is only shared with trusted operational partners strictly under non-disclosure obligations:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Logistics Partners:</strong> For door-to-door delivery and return pickups.</li>
              <li><strong>Payment Aggregator (Razorpay):</strong> To initiate and reconcile payment transactions.</li>
              <li><strong>Legal Authorities:</strong> Only when strictly mandated by law or court order under Indian jurisdiction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">6. Cookies & Tracking Technologies</h2>
            <p>
              We use functional and analytical cookies to remember your cart items, keep you signed in to your account, and analyze website speed and performance. You may disable cookies in your browser settings at any time without restricting your ability to place orders via Cash on Delivery or Razorpay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">7. Data Retention & Your Rights</h2>
            <p>
              Under Indian Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, you hold the right to review, update, or request the deletion of your personal data stored with us. To request deletion of your account or order history records, please contact our Privacy Grievance Officer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">8. Grievance Redressal & Contact Details</h2>
            <p>
              In accordance with the Information Technology Act, 2000 and rules made thereunder:
            </p>
            <div className="mt-3 bg-[#F8F5EE] p-4 rounded-2xl border border-[#C5A880]/30 font-medium">
              Grievance Officer: Mr. Abhishek K.<br />
              LivFabs Smart Living Private Limited<br />
              4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai, Maharashtra 400050<br />
              Email: concierge@livfabs.luxury | Helpline: +91 98200 54321<br />
              Response Window: Within 24 hours
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

