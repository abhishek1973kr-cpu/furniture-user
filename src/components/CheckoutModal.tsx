'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle, ShieldCheck, Zap, Truck, Phone, MapPin, User, ArrowRight, Sparkles, CreditCard, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { OrderFormValues, ConfirmedOrder } from '@/types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    checkoutProduct,
    checkoutQuantity,
    cartItems,
    clearCart,
    setConfirmedOrder,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState<OrderFormValues>({
    fullName: '',
    phoneNumber: '',
    email: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<ConfirmedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  // Determine items being purchased:
  // Either a single direct "Buy Now" item, or all items in the cart
  const itemsToBuy = checkoutProduct
    ? [{ product: checkoutProduct, quantity: checkoutQuantity }]
    : cartItems;

  const totalWholesale = itemsToBuy.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );
  const totalOriginal = itemsToBuy.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSaved = totalOriginal - totalWholesale;

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validation
  const validate = () => {
    const newErrors: Partial<Record<keyof OrderFormValues, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Complete street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Order Submission Flow
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury order verification & waybill allocation
    setTimeout(() => {
      const orderId = `LF-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: ConfirmedOrder = {
        orderId,
        customer: formData,
        items: itemsToBuy,
        totalAmount: totalWholesale,
        discountSaved: totalSaved,
        orderedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        estimatedDelivery: '2 - 3 Business Days (12h Dispatch)',
      };

      setPlacedOrder(order);
      setConfirmedOrder(order);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Clear cart if entire cart was bought
      if (!checkoutProduct) {
        clearCart();
      }

      // Celebratory luxury gold & bronze confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#D4B489', '#F9F8F6', '#8C6E43'],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPlacedOrder(null);
    closeCheckout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in-up"
    >
      {/* Dark backdrop click */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Centered Half-Screen Modal Popup (~60-70% height & width on desktop) */}
      <div className="relative w-full md:w-[70vw] lg:w-[65vw] max-w-4xl h-full md:h-[75vh] max-h-[85vh] bg-[#171717] border border-[#C5A880]/30 shadow-2xl z-10 text-[#F9F8F6] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#C5A880]/20 bg-[#141414] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-serif font-normal uppercase tracking-[0.2em] text-[#F9F8F6]">
              Liv<span className="text-[#C5A880]">Fabs</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-[#C5A880]" />
              Express 12-Hour Priority Checkout
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#9E9A93] hover:text-[#C5A880] bg-[#121212] border border-white/10 rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto">
          {isSuccess && placedOrder ? (
            /* ================= SUCCESS SCREEN ================= */
            <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto h-full animate-fade-in-up">
              
              {/* Luxury Seal Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1A1A1A] border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880] mb-6 shadow-goldGlow">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                Haute Joaillerie Atelier Confirmation
              </span>

              {/* Title */}
              <h2 id="checkout-title" className="text-2xl sm:text-4xl font-serif text-[#F9F8F6] mt-2 mb-3">
                Order Successfully Confirmed!
              </h2>

              <p className="text-xs sm:text-sm text-[#9E9A93] max-w-md mx-auto leading-relaxed">
                Thank you for choosing LivFabs. Your exclusive wholesale selection is being hand-inspected and prepared for dispatch within 12 hours.
              </p>

              {/* Order Details Receipt Box */}
              <div className="w-full mt-6 p-4 sm:p-6 bg-[#141414] border border-[#C5A880]/30 text-left text-xs space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[#9E9A93] uppercase tracking-wider">Order Reference</span>
                  <span className="font-mono text-sm text-[#C5A880] font-bold">{placedOrder.orderId}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[#9E9A93] uppercase tracking-wider">Recipient Name</span>
                  <span className="text-white font-medium">{placedOrder.customer.fullName} ({placedOrder.customer.phoneNumber})</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-white/10">
                  <span className="text-[#9E9A93] uppercase tracking-wider shrink-0 mr-4">Delivery Address</span>
                  <span className="text-white text-right font-light">
                    {placedOrder.customer.streetAddress}, {placedOrder.customer.city}, {placedOrder.customer.state} - {placedOrder.customer.pincode}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[#9E9A93] uppercase tracking-wider">Payment Method</span>
                  <span className="text-emerald-400 font-medium">
                    {placedOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery (Pay at Doorstep)' : 'UPI / Online Verified'}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1 text-sm">
                  <span className="text-white font-serif uppercase tracking-wider font-semibold">Total Amount Payable</span>
                  <div className="text-right">
                    <span className="font-serif font-bold text-[#C5A880] text-lg">₹{placedOrder.totalAmount}</span>
                    <span className="block text-[10px] text-emerald-400">Total Savings: ₹{placedOrder.discountSaved}</span>
                  </div>
                </div>
              </div>

              {/* 12h Dispatch Note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#C5A880] bg-[#1A1A1A] px-4 py-2 border border-[#C5A880]/20">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Waybill generated with Bluedart Express • Tracking SMS sent to {placedOrder.customer.phoneNumber}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <a
                  href={`https://wa.me/919820054321?text=Hello%20LivFabs,%20I%20just%20placed%20Order%20${placedOrder.orderId}%20for%20₹${placedOrder.totalAmount}.%20Please%20share%20the%2012-hour%20dispatch%20tracking%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366]/20 border border-[#25D366]/50 text-white hover:bg-[#25D366]/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Track on WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          ) : (
            /* ================= CHECKOUT FORM SCREEN ================= */
            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              
              {/* LEFT COLUMN: Customer Delivery Form */}
              <div className="w-full md:w-3/5">
                <div className="mb-4">
                  <h2 id="checkout-title" className="text-xl font-serif text-[#F9F8F6]">
                    Delivery & Doorstep Information
                  </h2>
                  <p className="text-xs text-[#9E9A93] mt-0.5">
                    Items are packed in velvet presentation cases & dispatched within 12 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Radhika Sharma"
                          className={`w-full px-3 py-2 bg-[#121212] border text-xs text-white placeholder-[#555] focus:outline-none ${
                            errors.fullName ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#C5A880]'
                          }`}
                        />
                        <User className="w-3.5 h-3.5 text-[#9E9A93] absolute right-3 top-3 pointer-events-none" />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          maxLength={10}
                          placeholder="9820012345"
                          className={`w-full px-3 py-2 bg-[#121212] border text-xs text-white placeholder-[#555] focus:outline-none ${
                            errors.phoneNumber ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#C5A880]'
                          }`}
                        />
                        <Phone className="w-3.5 h-3.5 text-[#9E9A93] absolute right-3 top-3 pointer-events-none" />
                      </div>
                      {errors.phoneNumber && <p className="text-[10px] text-red-400 mt-1">{errors.phoneNumber}</p>}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                      Full House / Street Address *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Flat 402, Royal Palms, MG Road..."
                        className={`w-full px-3 py-2 bg-[#121212] border text-xs text-white placeholder-[#555] focus:outline-none ${
                          errors.streetAddress ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#C5A880]'
                        }`}
                      />
                      <MapPin className="w-3.5 h-3.5 text-[#9E9A93] absolute right-3 top-3 pointer-events-none" />
                    </div>
                    {errors.streetAddress && <p className="text-[10px] text-red-400 mt-1">{errors.streetAddress}</p>}
                  </div>

                  {/* City, State, PIN code */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className={`w-full px-3 py-2 bg-[#121212] border text-xs text-white placeholder-[#555] focus:outline-none ${
                          errors.city ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#C5A880]'
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-red-400 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-2 py-2 bg-[#121212] border border-[#C5A880]/30 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Other">All Other States</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="400050"
                        className={`w-full px-3 py-2 bg-[#121212] border text-xs text-white placeholder-[#555] focus:outline-none ${
                          errors.pincode ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#C5A880]'
                        }`}
                      />
                      {errors.pincode && <p className="text-[10px] text-red-400 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Payment Selection: Cash on Delivery preselected */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#9E9A93] mb-2">
                      Payment Mode *
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`cursor-pointer p-3 border flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'bg-[#C5A880]/10 border-[#C5A880] ring-1 ring-[#C5A880]'
                            : 'bg-[#121212] border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                            <Banknote className="w-4 h-4 text-[#C5A880]" />
                            Cash On Delivery
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleChange}
                            className="accent-[#C5A880]"
                          />
                        </div>
                        <span className="text-[10px] text-[#9E9A93]">Pay in cash at doorstep after physical inspection</span>
                      </label>

                      <label
                        className={`cursor-pointer p-3 border flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'bg-[#C5A880]/10 border-[#C5A880] ring-1 ring-[#C5A880]'
                            : 'bg-[#121212] border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-[#C5A880]" />
                            UPI / Online
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleChange}
                            className="accent-[#C5A880]"
                          />
                        </div>
                        <span className="text-[10px] text-[#9E9A93]">GPay, PhonePe, Paytm, or Card</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#D4B489] text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-goldGlow flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Reserving Wholesale Inventory...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Order • Pay ₹{totalWholesale} (COD)</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-[11px] text-[#9E9A93] text-center mt-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                      Zero prepayment risk • 12-hour dispatch guarantee
                    </p>
                  </div>

                </form>
              </div>

              {/* RIGHT COLUMN: Order Summary Preview */}
              <div className="w-full md:w-2/5 bg-[#141414] p-5 border border-[#C5A880]/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] pb-3 border-b border-white/10">
                    Order Summary ({itemsToBuy.length} Item{itemsToBuy.length > 1 ? 's' : ''})
                  </h3>

                  {/* Items List */}
                  <div className="mt-3 divide-y divide-white/5 max-h-48 overflow-y-auto pr-1">
                    {itemsToBuy.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-[#0D0D0D] border border-white/10 shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="text-white truncate font-medium">{item.product.title}</h4>
                          <span className="text-[10px] text-[#9E9A93]">Qty: {item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-[#C5A880] text-sm">
                            ₹{item.product.wholesalePrice * item.quantity}
                          </span>
                          <span className="block text-[10px] line-through text-[#9E9A93]">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-[#9E9A93]">
                      <span>Original Retail MRP:</span>
                      <span className="line-through text-white/50">₹{totalOriginal}</span>
                    </div>

                    <div className="flex justify-between text-[#C5A880]">
                      <span>LivFabs Wholesale Privilege:</span>
                      <span>- ₹{totalSaved} (72% Off)</span>
                    </div>

                    <div className="flex justify-between text-[#9E9A93]">
                      <span>12-Hour Priority Shipping:</span>
                      <span className="text-emerald-400 font-medium">FREE</span>
                    </div>

                    <div className="flex justify-between text-[#9E9A93]">
                      <span>Signature Velvet Box:</span>
                      <span className="text-emerald-400 font-medium">COMPLIMENTARY</span>
                    </div>
                  </div>
                </div>

                {/* Final Total Amount */}
                <div className="mt-6 pt-4 border-t border-[#C5A880]/30">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#9E9A93] block">Total Amount Due</span>
                      <span className="text-[11px] text-emerald-400">Cash on Delivery</span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#C5A880]">
                      ₹{totalWholesale}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

