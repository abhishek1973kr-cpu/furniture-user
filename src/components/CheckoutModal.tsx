'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Zap, Truck, Phone, MapPin, User, ArrowRight, Banknote, CreditCard, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { OrderFormValues, ConfirmedOrder } from '@/types';
import { createFirestoreOrder } from '@/services/firebaseService';
import { LuxuryImage } from '@/components/LuxuryImage';

const ALL_INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi (NCR)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Puducherry',
];

/**
 * Dynamically loads the official Razorpay Standard Checkout SDK
 */
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay checkout.js script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

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

  const { user } = useAuth();

  // Form State
  const [formData, setFormData] = useState<OrderFormValues>({
    fullName: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  // Pre-fill user data from Google Account if logged in
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<ConfirmedOrder | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  // Determine items being purchased:
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
    if (submitError) {
      setSubmitError(null);
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
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Complete delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Order Submission Flow: saves order to Firestore 'orders' collection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // ==========================================
    // Flow 1: Online Payment via Razorpay
    // ==========================================
    if (formData.paymentMethod === 'upi') {
      try {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          setIsSubmitting(false);
          setSubmitError(
            'Unable to initialize Razorpay checkout script. Please check your internet connection or try again.'
          );
          return;
        }

        // Create Order on Server
        const orderResponse = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalWholesale,
            currency: 'INR',
            notes: {
              customerName: formData.fullName.trim(),
              phone: formData.phoneNumber.trim(),
              city: formData.city.trim(),
              itemsCount: itemsToBuy.length,
            },
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok || !orderData.success) {
          setIsSubmitting(false);
          const errorMsg =
            orderData.error ||
            'Could not initiate Razorpay payment. Please verify Razorpay keys in .env.local.';
          setSubmitError(errorMsg);
          return;
        }

        // Open Razorpay Standard Checkout Popup
        const razorpayOptions = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'LivFabs Smart Living',
          description: `Order (${itemsToBuy.length} items) • 12-Hour Priority Dispatch`,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop',
          order_id: orderData.orderId,
          prefill: {
            name: formData.fullName.trim(),
            email: formData.email?.trim() || user?.email || '',
            contact: formData.phoneNumber.trim(),
          },
          notes: {
            deliveryAddress: `${formData.streetAddress.trim()}, ${formData.city.trim()}, ${formData.state} - ${formData.pincode.trim()}`,
          },
          theme: {
            color: '#8C6E43', // LivFabs signature luxury gold
          },
          modal: {
            ondismiss: () => {
              // Gracefully stop loading spinner if user closes payment modal
              setIsSubmitting(false);
            },
          },
          handler: async (paymentResponse: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              setIsSubmitting(true);

              // Verify payment signature on backend
              const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentResponse),
              });

              const verifyData = await verifyResponse.json();
              if (!verifyResponse.ok || !verifyData.success) {
                throw new Error('Payment signature verification failed. Please contact support.');
              }

              // Save order to Firestore with payment details
              const { orderId } = await createFirestoreOrder(
                formData,
                itemsToBuy,
                totalWholesale,
                totalSaved,
                user,
                {
                  razorpayPaymentId: paymentResponse.razorpay_payment_id,
                  razorpayOrderId: paymentResponse.razorpay_order_id,
                  razorpaySignature: paymentResponse.razorpay_signature,
                  paymentStatus: 'PAID',
                  paymentMethodName: 'Online (Razorpay / UPI / Card)',
                }
              );

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
                estimatedDelivery: '5 – 7 Business Days (12-Hour Priority Dispatch)',
                paymentId: paymentResponse.razorpay_payment_id,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                paymentStatus: 'PAID',
              };

              setPlacedOrder(order);
              setConfirmedOrder(order);
              setIsSubmitting(false);
              setIsSuccess(true);

              if (!checkoutProduct) {
                clearCart();
              }

              try {
                confetti({
                  particleCount: 90,
                  spread: 75,
                  origin: { y: 0.6 },
                  colors: ['#8C6E43', '#C5A880', '#D4B489', '#1A1A1A'],
                });
              } catch {
                // ignore
              }
            } catch (err: any) {
              console.error('Online order completion error:', err);
              setIsSubmitting(false);
              setSubmitError(
                err?.message ||
                  'Payment was received but recording the order encountered an issue. Please contact support.'
              );
            }
          },
        };

        const rzp = new (window as any).Razorpay(razorpayOptions);
        rzp.on('payment.failed', (failResponse: any) => {
          setIsSubmitting(false);
          setSubmitError(
            `Payment declined: ${
              failResponse.error?.description || 'Transaction could not be completed.'
            }`
          );
        });

        rzp.open();
      } catch (err: any) {
        console.error('Razorpay flow initiation error:', err);
        setIsSubmitting(false);
        setSubmitError(
          err?.message || 'Failed to initialize online payment. Please check your connection or choose COD.'
        );
      }
      return;
    }

    // ==========================================
    // Flow 2: Cash On Delivery (COD)
    // ==========================================
    try {
      const { orderId } = await createFirestoreOrder(
        formData,
        itemsToBuy,
        totalWholesale,
        totalSaved,
        user
      );

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
        estimatedDelivery: '5 – 7 Business Days (12-Hour Priority Dispatch)',
      };

      setPlacedOrder(order);
      setConfirmedOrder(order);
      setIsSubmitting(false);
      setIsSuccess(true);

      if (!checkoutProduct) {
        clearCart();
      }

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8C6E43', '#C5A880', '#D4B489', '#1A1A1A'],
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.error('Failed to submit order to Firestore:', err);
      setIsSubmitting(false);
      const errorMsg =
        err?.message ||
        'Failed to save order to database. Please check your internet connection or Firestore rules.';
      setSubmitError(errorMsg);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPlacedOrder(null);
    setSubmitError(null);
    closeCheckout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in-up"
    >
      {/* Dark backdrop click */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Centered Half-Screen Modal / Mobile Bottom-Sheet with Smooth Rounded Corners */}
      <div className="relative w-full md:w-[70vw] lg:w-[65vw] max-w-4xl h-[95vh] sm:h-auto md:h-[75vh] max-h-[95vh] sm:max-h-[85vh] bg-[#FFFFFF] border-t sm:border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden">
        
        {/* Mobile Pull-Down Drag Bar */}
        <div className="w-12 h-1.5 bg-[#C5A880]/40 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#C5A880]/20 bg-[#F8F5EE] flex items-center justify-between shrink-0 rounded-t-3xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base font-serif font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]">
              Liv<span className="text-[#8C6E43]">Fabs</span>
            </span>
            <span className="text-black/20">|</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#8C6E43] font-semibold flex items-center gap-1 sm:gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-[#8C6E43]" />
              Express 12h Priority Checkout
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#7E7870] hover:text-[#1A1A1A] bg-[#FFFFFF] border border-[#C5A880]/30 rounded-full transition-colors active:scale-95"
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5F2EB] border-2 border-[#8C6E43] flex items-center justify-center text-[#8C6E43] mb-6 shadow-md">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C6E43] font-bold">
                Smart Space Furniture Confirmation
              </span>

              {/* Title */}
              <h2 id="checkout-title" className="text-2xl sm:text-4xl font-serif text-[#1A1A1A] mt-2 mb-3 font-medium">
                Order Successfully Confirmed!
              </h2>

              <p className="text-xs sm:text-sm text-[#55504A] max-w-md mx-auto leading-relaxed">
                Thank you for choosing LivFabs. Your smart furniture pieces are being allocated and transit-padded for dispatch within 12 hours.
              </p>

              {/* Order Details Receipt Box (Rounded-2xl) */}
              <div className="w-full mt-6 p-5 sm:p-6 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl text-left text-xs space-y-3 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Order Reference</span>
                  <span className="font-mono text-sm text-[#8C6E43] font-bold">{placedOrder.orderId}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Customer Name</span>
                  <span className="text-[#1A1A1A] font-semibold">{placedOrder.customer.fullName} ({placedOrder.customer.phoneNumber})</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium shrink-0 mr-4">Delivery Address</span>
                  <span className="text-[#1A1A1A] text-right font-normal">
                    {placedOrder.customer.streetAddress}, {placedOrder.customer.city}, {placedOrder.customer.state} - {placedOrder.customer.pincode}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Payment Method</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {placedOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery (Pay at Doorstep)' : 'Paid Online via Razorpay'}
                  </span>
                </div>

                {placedOrder.paymentId && (
                  <div className="flex justify-between items-center pb-3 border-b border-[#C5A880]/20">
                    <span className="text-[#55504A] uppercase tracking-wider font-medium">Razorpay Payment ID</span>
                    <span className="font-mono text-xs font-semibold text-[#8C6E43] bg-[#F5F0E6] px-2 py-0.5 rounded">
                      {placedOrder.paymentId}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1 text-sm">
                  <span className="text-[#1A1A1A] font-serif uppercase tracking-wider font-bold">Total Amount Payable</span>
                  <div className="text-right">
                    <span className="font-serif font-bold text-[#8C6E43] text-lg">
                      ₹{placedOrder.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-semibold">
                      Total Savings: ₹{placedOrder.discountSaved.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 12h Dispatch Note (Pill Shaped) */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#8C6E43] bg-[#F8F5EE] px-5 py-2.5 rounded-full border border-[#C5A880]/30 shadow-sm">
                <Truck className="w-4 h-4 shrink-0" />
                <span className="font-medium">Waybill generated with Bluedart Heavy Logistics • Tracking SMS sent to {placedOrder.customer.phoneNumber}</span>
              </div>

              {/* Action Buttons (Pill Shaped) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <a
                  href={`https://wa.me/919820054321?text=Hello%20LivFabs,%20I%20just%20placed%20Order%20${placedOrder.orderId}%20for%20₹${placedOrder.totalAmount}.%20Please%20share%20the%2012-hour%20dispatch%20tracking%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Track on WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md"
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
                  <h2 id="checkout-title" className="text-xl font-serif text-[#1A1A1A] font-semibold">
                    Delivery & Doorstep Information
                  </h2>
                  <p className="text-xs text-[#55504A] mt-0.5">
                    Items are carefully flat-packed with transit edge protection & dispatched within 12 hours.
                  </p>
                </div>

                {/* Google Linked Account Badge */}
                {user && (
                  <div className="mb-4 px-4 py-2.5 rounded-2xl bg-[#F5F2EB] border border-[#C5A880]/40 flex items-center justify-between text-xs animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#8C6E43] text-white flex items-center justify-center text-[10px] font-bold">
                        {user.displayName?.charAt(0) || 'G'}
                      </div>
                      <span className="text-[#1A1A1A] font-medium">
                        Order will be linked to Google Account: <strong className="text-[#8C6E43]">{user.email}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-semibold uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                      Linked
                    </span>
                  </div>
                )}

                {/* Visible Error Alert / Toast */}
                {submitError && (
                  <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 flex items-start gap-3 shadow-sm animate-fade-in-up">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <strong className="font-semibold block text-red-950 mb-0.5">Order Submission Error</strong>
                      <p className="text-red-800 leading-relaxed">{submitError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="text-red-400 hover:text-red-700 p-1 rounded-full transition-colors"
                      aria-label="Dismiss error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Quick Mobile Order Overview Strip */}
                <div className="md:hidden mb-4 p-3.5 bg-[#F8F5EE] border border-[#C5A880]/40 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white border border-[#C5A880]/40 shrink-0">
                      <LuxuryImage
                        src={itemsToBuy[0]?.product.images[0]}
                        alt={itemsToBuy[0]?.product.title}
                        fill
                        className="object-cover"
                        fallbackTitle={itemsToBuy[0]?.product.title}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate max-w-[160px]">
                        {itemsToBuy[0]?.product.title}
                      </p>
                      <span className="text-[10px] text-[#7E7870] block">
                        {itemsToBuy.length > 1 ? `+${itemsToBuy.length - 1} more items` : `Qty: ${itemsToBuy[0]?.quantity}`}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-serif font-bold text-[#8C6E43]">
                      ₹{totalWholesale.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider block text-emerald-700 font-semibold">
                      COD Free
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Aakash Verma"
                          className={`w-full px-4 py-3 sm:py-2.5 bg-[#F8F5EE] border text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                            errors.fullName ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#8C6E43]'
                          }`}
                        />
                        <User className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                        10-Digit Mobile Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          inputMode="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          maxLength={10}
                          placeholder="9820012345"
                          className={`w-full px-4 py-3 sm:py-2.5 bg-[#F8F5EE] border text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                            errors.phoneNumber ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#8C6E43]'
                          }`}
                        />
                        <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                      {errors.phoneNumber && <p className="text-[10px] text-red-600 mt-1">{errors.phoneNumber}</p>}
                    </div>
                  </div>

                  {/* Alternate Phone Number (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium">
                        Alternate Mobile Number
                      </label>
                      <span className="text-[10px] text-[#8C6E43] font-semibold uppercase tracking-wider bg-[#F5F2EB] px-2.5 py-0.5 rounded-full border border-[#C5A880]/30">
                        Optional
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        inputMode="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone || ''}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="e.g. 9820054321 (Optional emergency/courier contact)"
                        className="w-full px-4 py-3 sm:py-2.5 bg-[#F8F5EE] border border-[#C5A880]/30 focus:border-[#8C6E43] text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all"
                      />
                      <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                      Full House / Street Address *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Flat 402, Lotus Towers, Linking Road..."
                        className={`w-full px-4 py-3 sm:py-2.5 bg-[#F8F5EE] border text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          errors.streetAddress ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#8C6E43]'
                        }`}
                      />
                      <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.streetAddress && <p className="text-[10px] text-red-600 mt-1">{errors.streetAddress}</p>}
                  </div>

                  {/* City, State, PIN code */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai / Delhi"
                        className={`w-full px-3 py-3 sm:py-2.5 bg-[#F8F5EE] border text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          errors.city ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#8C6E43]'
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                        State (All India) *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-2 sm:px-3 py-3 sm:py-2.5 bg-[#F8F5EE] border border-[#C5A880]/30 text-sm sm:text-xs text-[#1A1A1A] rounded-xl focus:outline-none focus:border-[#8C6E43] transition-all cursor-pointer"
                      >
                        {ALL_INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="bg-[#FFFFFF] text-[#1A1A1A]">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-medium mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="e.g. 400050"
                        className={`w-full px-3 py-3 sm:py-2.5 bg-[#F8F5EE] border text-sm sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          errors.pincode ? 'border-red-500' : 'border-[#C5A880]/30 focus:border-[#8C6E43]'
                        }`}
                      />
                      {errors.pincode && <p className="text-[10px] text-red-600 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* 5 se 7 Din Delivery Reassurance Banner (Triggered when 6-digit PIN is entered) */}
                  {formData.pincode.trim().length === 6 ? (
                    <div className="p-3.5 bg-emerald-50/90 border border-emerald-300 rounded-2xl flex items-start gap-3 animate-fade-in-up shadow-xs">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 text-emerald-800">
                        <Truck className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1">
                            ⚡ 5 se 7 Din me Delivery Hogi (5 – 7 Days)
                          </span>
                          <span className="text-[10px] font-mono font-semibold bg-emerald-200/80 px-2 py-0.5 rounded-full text-emerald-900">
                            PIN: {formData.pincode}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-850 mt-0.5 leading-relaxed">
                          Aapke PIN code <strong>{formData.pincode}</strong> par standard logistics se <strong>5 se 7 din</strong> lagenge.
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-emerald-800 font-medium">
                          <span className="flex items-center gap-1 font-semibold text-emerald-950">
                            <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                            12 Ghante Me Dispatch Guaranteed
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-950">
                            100% Cash on Delivery Available
                          </span>
                          <span>•</span>
                          <span>Free Doorstep Inspection</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7E7870] px-1">
                      <Truck className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                      <span>PIN code enter karein — standard delivery me 5 se 7 din lagenge.</span>
                    </div>
                  )}

                  {/* Payment Selection: Cash on Delivery preselected (Rounded-2xl cards) */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-2">
                      Payment Mode *
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`cursor-pointer p-3.5 border rounded-2xl flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'bg-[#F5F0E6] border-[#8C6E43] ring-1 ring-[#8C6E43]'
                            : 'bg-[#FFFFFF] border-[#C5A880]/30 hover:border-[#8C6E43]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                            <Banknote className="w-4 h-4 text-[#8C6E43]" />
                            Cash On Delivery
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleChange}
                            className="accent-[#8C6E43]"
                          />
                        </div>
                        <span className="text-[10px] text-[#55504A]">Pay at doorstep after physical inspection of furniture box</span>
                      </label>

                      <label
                        className={`cursor-pointer p-3.5 border rounded-2xl flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'bg-[#F5F0E6] border-[#8C6E43] ring-1 ring-[#8C6E43]'
                            : 'bg-[#FFFFFF] border-[#C5A880]/30 hover:border-[#8C6E43]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-[#8C6E43]" />
                            UPI / Online
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleChange}
                            className="accent-[#8C6E43]"
                          />
                        </div>
                        <span className="text-[10px] text-[#55504A]">GPay, PhonePe, Paytm, or Credit/Debit Card</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button (Pill-shaped) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>
                            {formData.paymentMethod === 'upi'
                              ? 'Opening Secure Razorpay Portal...'
                              : 'Reserving Smart Furniture Inventory...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            {formData.paymentMethod === 'upi'
                              ? `Pay ₹${totalWholesale.toLocaleString('en-IN')} with Razorpay / UPI`
                              : `Confirm Order • Pay ₹${totalWholesale.toLocaleString('en-IN')} (COD)`}
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    
                    {/* PERSISTENT HIGHLY VISIBLE POLICY BANNER (BELOW CONFIRM ORDER BUTTON) */}
                    <div className="mt-3.5 p-3 sm:p-3.5 bg-[#F4EFEB] border border-[#C5A880]/50 rounded-2xl text-center shadow-xs">
                      <p className="text-[11px] sm:text-xs font-bold text-[#8C6E43] tracking-wide flex items-center justify-center flex-wrap gap-1 sm:gap-1.5">
                        <span className="font-semibold">★ 100% Refund Policy</span>
                        <span className="text-[#C5A880] font-normal">|</span>
                        <span className="font-semibold">7-Day Easy Returns</span>
                        <span className="text-[#C5A880] font-normal">|</span>
                        <span className="font-semibold">
                          {formData.paymentMethod === 'upi' ? '256-Bit SSL Razorpay Security' : 'Secure Cash on Delivery'}
                        </span>
                      </p>
                      <p className="text-[10px] text-[#55504A] mt-1 font-medium">
                        {formData.paymentMethod === 'upi'
                          ? 'Instant automated order confirmation with 100% refund guarantee upon return.'
                          : 'Doorstep inspection guaranteed. Zero prepayment risk.'}
                      </p>
                    </div>

                    <p className="text-[11px] text-[#55504A] text-center mt-2.5 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8C6E43]" />
                      {formData.paymentMethod === 'upi'
                        ? 'Official Razorpay Checkout • Instant 12-hour dispatch receipt'
                        : 'Zero prepayment risk • 12-hour dispatch guarantee'}
                    </p>
                  </div>

                </form>
              </div>

              {/* RIGHT COLUMN: Order Summary Preview (Rounded-2xl) */}
              <div className="w-full md:w-2/5 bg-[#F8F5EE] p-5 sm:p-6 border border-[#C5A880]/30 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] pb-3 border-b border-[#C5A880]/20">
                    Order Summary ({itemsToBuy.length} Item{itemsToBuy.length > 1 ? 's' : ''})
                  </h3>

                  {/* Items List */}
                  <div className="mt-3 divide-y divide-[#C5A880]/15 max-h-48 overflow-y-auto pr-1">
                    {itemsToBuy.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-[#FFFFFF] border border-[#C5A880]/30 shrink-0 rounded-xl overflow-hidden shadow-sm">
                          <LuxuryImage
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            fallbackTitle={item.product.title}
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="text-[#1A1A1A] truncate font-semibold">{item.product.title}</h4>
                          <span className="text-[10px] text-[#55504A]">Qty: {item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-[#8C6E43] text-sm">
                            ₹{(item.product.wholesalePrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[10px] line-through text-[#8C827A]">
                            ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="mt-4 pt-4 border-t border-[#C5A880]/20 space-y-2 text-xs">
                    <div className="flex justify-between text-[#55504A]">
                      <span>Original Retail MRP:</span>
                      <span className="line-through text-[#8C827A]">₹{totalOriginal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-[#8C6E43] font-semibold">
                      <span>LivFabs Wholesale Privilege:</span>
                      <span>- ₹{totalSaved.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-[#55504A]">
                      <span>12-Hour Priority Shipping:</span>
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    </div>

                    <div className="flex justify-between text-[#55504A]">
                      <span>Transit Edge Protection:</span>
                      <span className="text-emerald-700 font-semibold">INCLUDED</span>
                    </div>
                  </div>
                </div>

                {/* Final Total Amount */}
                <div className="mt-6 pt-4 border-t border-[#C5A880]/30">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#55504A] block font-medium">Total Amount Due</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">Cash on Delivery</span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#8C6E43]">
                      ₹{totalWholesale.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Persistent Reassurance Policy Strip at Modal Bottom */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F8F5EE] border-t border-[#C5A880]/25 flex items-center justify-center text-center shrink-0 rounded-b-3xl">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#8C6E43] tracking-wide">
            ★ 100% Refund Policy &nbsp;|&nbsp; 7-Day Easy Returns &nbsp;|&nbsp; Secure Cash on Delivery
          </span>
        </div>

      </div>
    </div>
  );
};
