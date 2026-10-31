'use client';

import React, { useState } from 'react';
import { PolicyHeader } from '@/components/PolicyHeader';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactUsPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormValues({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      <PolicyHeader
        title="Contact Us"
        subtitle="We are here to assist with design inquiries, bulk orders, shipping updates, and after-sales support."
      />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Official Business Contact Details (Razorpay Mandatory) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 shadow-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-semibold block mb-2">
                Official Corporate Entity
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">
                LivFabs Smart Living Private Limited
              </h2>
              <p className="text-xs text-[#55504A] leading-relaxed mb-6">
                Direct designers and manufacturers of robotic-welded, space-saving convertible furniture, modular sofa beds, and smart studio workstations.
              </p>

              <div className="space-y-4 text-xs text-[#403B35]">
                {/* Physical Address */}
                <div className="flex items-start gap-3 p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl">
                  <MapPin className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block font-semibold mb-0.5">
                      Registered Office & Design Atelier:
                    </strong>
                    <span>
                      4th Floor, Design Pavilion, Linking Road, Bandra West, Mumbai, Maharashtra 400050, India
                    </span>
                  </div>
                </div>

                {/* Direct Phone Helpline */}
                <div className="flex items-start gap-3 p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl">
                  <Phone className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block font-semibold mb-0.5">
                      Customer Service Helpline:
                    </strong>
                    <a
                      href="tel:+917488574616"
                      className="text-[#8C6E43] font-semibold hover:underline block"
                    >
                      +91 74885 74616 (Call & WhatsApp Priority Desk)
                    </a>
                    <span className="text-[11px] text-[#7E7870] mt-0.5 block">
                      Direct phone & WhatsApp support
                    </span>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3 p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl">
                  <Mail className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block font-semibold mb-0.5">
                      Support Email:
                    </strong>
                    <a
                      href="mailto:concierge@livfabs.luxury"
                      className="text-[#8C6E43] font-semibold hover:underline block"
                    >
                      concierge@livfabs.luxury
                    </a>
                    <a
                      href="mailto:support@livfabs.com"
                      className="text-[#7E7870] hover:text-[#8C6E43] text-[11px] block mt-0.5"
                    >
                      support@livfabs.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-3.5 bg-[#F8F5EE] border border-[#C5A880]/20 rounded-2xl">
                  <Clock className="w-5 h-5 text-[#8C6E43] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block font-semibold mb-0.5">
                      Operational Hours:
                    </strong>
                    <span>Monday to Sunday: 9:00 AM – 9:00 PM IST</span>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                      ⚡ 12-Hour Priority Dispatch Desk open 7 days
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#C5A880]/20 flex items-center gap-2 text-xs text-[#55504A]">
                <ShieldCheck className="w-4 h-4 text-[#8C6E43] shrink-0" />
                <span>Verified Merchant with Razorpay & RBI Compliant Aggregators</span>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us an Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#C5A880]/30 rounded-3xl p-6 sm:p-10 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mb-1">
                Send a Message to the Atelier
              </h3>
              <p className="text-xs text-[#55504A] mb-6">
                Our client design concierge responds to all inquiries within 2 hours during operational windows.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#F8F5EE] border border-emerald-300 rounded-3xl animate-fade-in-up">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#55504A] mt-1">
                    Thank you for contacting LivFabs. Our senior client advisor will reach out to you via email or phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formValues.phone}
                        onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        value={formValues.subject}
                        onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Order Tracking">Order & 12h Dispatch Tracking</option>
                        <option value="Payment / Razorpay">Payment or Invoice Assistance</option>
                        <option value="Return / Refund">7-Day Easy Return or Exchange</option>
                        <option value="Bulk Corporate">Bulk Wholesale / Interior Designer Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                      Your Message or Order ID *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formValues.message}
                      onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                      placeholder="Please specify your query or mention your LivFabs Order ID (e.g. LF-123456)..."
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8C6E43]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry to Concierge</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

