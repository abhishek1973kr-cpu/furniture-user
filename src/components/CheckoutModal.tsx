'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  ShieldCheck,
  Zap,
  Truck,
  Phone,
  MapPin,
  User,
  ArrowRight,
  Banknote,
  CreditCard,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { OrderFormValues, ConfirmedOrder } from '@/types';
import { createFirestoreOrder } from '@/services/firebaseService';
import { LuxuryImage } from '@/components/LuxuryImage';

// Mandatory online advance for Cash on Delivery to guarantee courier dispatch
const COD_ADVANCE_AMOUNT = 199;

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

  // 2. Dynamic Pincode Address Auto-fill:
  // State and District/City must be blank by default (NO hardcoded state) and set to read-only.
  const [formData, setFormData] = useState<OrderFormValues>({
    fullName: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    streetAddress: '',
    landmark: '',
    city: '', // Blank by default
    state: '', // Blank by default (NO hardcoded 'Maharashtra')
    pincode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  // Pincode lookup state
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [pincodeNotice, setPincodeNotice] = useState<string | null>(null);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  // Pre-fill user data from Google Account if logged in
  useEffect(() => {
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

  // 1. Out of Stock Guard (Product & Checkout):
  // Check the stockQuantity from Firestore inventoryItems
  // If stockQuantity <= 0, strictly block checkout & payment
  const hasOutOfStockItem = itemsToBuy.some(
    (item) =>
      item.product.stockQuantity !== undefined
        ? item.product.stockQuantity <= 0
        : !item.product.inStock
  );

  const totalWholesale = itemsToBuy.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );
  const totalOriginal = itemsToBuy.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSaved = totalOriginal - totalWholesale;

  // 3. COD Partial Advance Calculations:
  // If COD: Pay ₹199 advance online immediately; remaining at delivery
  const payableOnlineNow =
    formData.paymentMethod === 'cod' ? COD_ADVANCE_AMOUNT : totalWholesale;
  const remainingAtDelivery =
    formData.paymentMethod === 'cod'
      ? Math.max(0, totalWholesale - COD_ADVANCE_AMOUNT)
      : 0;

  /**
   * 2. Pincode Lookup Handler:
   * Once 6 digits are entered, fetch location from free public API
   */
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 6);

    setFormData((prev) => {
      const updated = { ...prev, pincode: rawVal };
      if (rawVal.length < 6) {
        updated.city = '';
        updated.state = '';
      }
      return updated;
    });

    if (errors.pincode) {
      setErrors((prev) => ({ ...prev, pincode: undefined }));
    }

    if (rawVal.length < 6) {
      setPincodeNotice(null);
      setPincodeError(null);
      return;
    }

    // 6 digits entered: Trigger location lookup
    setIsFetchingPincode(true);
    setPincodeNotice(null);
    setPincodeError(null);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${rawVal}`);
      const data = await response.json();

      if (
        Array.isArray(data) &&
        data[0]?.Status === 'Success' &&
        Array.isArray(data[0]?.PostOffice) &&
        data[0].PostOffice.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];
        const detectedCity = postOffice.District || postOffice.Block || postOffice.Name || '';
        const detectedState = postOffice.State || '';

        setFormData((prev) => ({
          ...prev,
          city: detectedCity,
          state: detectedState,
        }));

        setErrors((prev) => ({
          ...prev,
          city: undefined,
          state: undefined,
          pincode: undefined,
        }));

        setPincodeNotice(`${detectedCity}, ${detectedState} (Location Verified)`);
      } else {
        setPincodeError('Pincode not found. Please verify the 6-digit PIN.');
      }
    } catch (apiErr) {
      console.warn('Pincode API lookup error:', apiErr);
      setPincodeError('Unable to auto-detect location. Please check your internet connection.');
    } finally {
      setIsFetchingPincode(false);
    }
  };

  // Handle standard Input Changes
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

  // Form Validation
  const validate = () => {
    const newErrors: Partial<Record<keyof OrderFormValues, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Complete delivery address is required';
    }
    if (!formData.pincode.trim() || formData.pincode.replace(/\D/g, '').length !== 6) {
      newErrors.pincode = 'Valid 6-digit PIN code is required';
    }
    if (!formData.city.trim() || !formData.state.trim()) {
      newErrors.city = 'City & State must be auto-filled by entering your 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Order Submission Flow:
   * Handles both:
   * - COD Partial Advance (₹199 online via Razorpay, remaining at delivery)
   * - Full Online Payment (totalWholesale via Razorpay)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strictly block if out of stock
    if (hasOutOfStockItem) {
      setSubmitError('Cannot complete checkout: One or more selected items are currently out of stock.');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const isCod = formData.paymentMethod === 'cod';
    const amountToPayOnline = isCod ? COD_ADVANCE_AMOUNT : totalWholesale;

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setIsSubmitting(false);
        setSubmitError(
          'Unable to initialize Razorpay payment portal. Please check your internet connection and try again.'
        );
        return;
      }

      // Step 1: Create Razorpay Order on Server
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToPayOnline,
          currency: 'INR',
          notes: {
            customerName: formData.fullName.trim(),
            phone: formData.phoneNumber.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            paymentMode: isCod ? 'COD_PARTIAL_ADVANCE' : 'FULL_ONLINE',
            advanceAmount: isCod ? COD_ADVANCE_AMOUNT : totalWholesale,
            balanceDueAtDelivery: remainingAtDelivery,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        setIsSubmitting(false);
        const errorMsg =
          orderData.error ||
          'Could not initiate secure payment gateway. Please verify your connection.';
        setSubmitError(errorMsg);
        return;
      }

      const razorpayKey =
        orderData.key_id || orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const razorpayOrderId = orderData.order_id || orderData.orderId;

      // Step 2: Open Razorpay Payment Modal
      const razorpayOptions = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'LivFabs Smart Living',
        description: isCod
          ? `₹199 Advance Courier Charge for COD Order • Balance ₹${remainingAtDelivery.toLocaleString('en-IN')} on Delivery`
          : `Full Payment for Order (${itemsToBuy.length} items) • 12-Hour Priority Dispatch`,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop',
        order_id: razorpayOrderId,
        prefill: {
          name: formData.fullName.trim(),
          email: formData.email?.trim() || user?.email || '',
          contact: formData.phoneNumber.trim(),
        },
        notes: {
          deliveryAddress: `${formData.streetAddress.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}`,
          isCodAdvance: isCod ? 'YES' : 'NO',
        },
        theme: {
          color: '#8C6E43', // LivFabs signature luxury gold
        },
        modal: {
          ondismiss: () => {
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

            // Step 3: Verify Payment Signature on Backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentResponse),
            });

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment signature verification failed.');
            }

            // Step 4: Save Order to Firestore ONLY AFTER payment verification succeeds
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
                paymentStatus: isCod ? 'Advance Paid (COD)' : 'PAID',
                paymentMethodName: isCod
                  ? 'Cash on Delivery (₹199 Advance Courier Paid)'
                  : 'Online (Razorpay / UPI / Card)',
                advancePaid: amountToPayOnline,
                remainingBalance: remainingAtDelivery,
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
              paymentStatus: isCod ? 'Advance Paid (COD)' : 'PAID',
              advancePaid: amountToPayOnline,
              remainingBalance: remainingAtDelivery,
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
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#8C6E43', '#C5A880', '#D4B489', '#1A1A1A'],
              });
            } catch {
              // ignore
            }
          } catch (err: any) {
            console.error('Order save error:', err);
            setIsSubmitting(false);
            setSubmitError(
              err?.message ||
                'Payment was processed but saving the order to database encountered an issue. Please contact support.'
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
      console.error('Payment initiation error:', err);
      setIsSubmitting(false);
      setSubmitError(
        err?.message || 'Failed to initialize payment gateway. Please check your connection.'
      );
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in-up"
    >
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Main Responsive Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFFFFF] border-t sm:border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] rounded-t-3xl sm:rounded-3xl flex flex-col pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* Mobile Pull-Down Drag Indicator */}
        <div className="w-12 h-1.5 bg-[#C5A880]/40 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3.5 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#C5A880]/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#8C6E43] font-semibold">
              LivFabs Atelier Checkout
            </span>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300">
              12-Hour Priority Dispatch
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#7E7870] hover:text-[#1A1A1A] bg-[#F5F2EB] hover:bg-[#EAE4D8] border border-[#C5A880]/40 rounded-full transition-colors active:scale-95 cursor-pointer shadow-xs"
            aria-label="Close checkout window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1">
          {isSuccess && placedOrder ? (
            /* ================= ORDER SUCCESS CONFIRMATION SCREEN ================= */
            <div className="p-6 sm:p-10 flex flex-col items-center text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-300 shadow-md">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] bg-[#F5F0E6] px-3.5 py-1 rounded-full border border-[#C5A880]/40 mb-2">
                Order Confirmed & Waybill Generated
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] font-bold">
                Thank You, {placedOrder.customer.fullName}
              </h2>

              <p className="text-xs sm:text-sm text-[#55504A] mt-1.5 max-w-md">
                Your luxury smart furniture has been reserved. Our warehouse team is flat-packing your order for 12-hour priority dispatch.
              </p>

              {/* Order Details Receipt Box */}
              <div className="w-full max-w-lg mt-6 p-5 sm:p-6 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl text-left space-y-3 text-xs shadow-xs">
                <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Order Reference ID</span>
                  <span className="font-mono text-sm font-bold text-[#1A1A1A] bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#C5A880]/30">
                    {placedOrder.orderId}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Delivery Destination</span>
                  <span className="font-medium text-[#1A1A1A] text-right truncate max-w-[240px]">
                    {placedOrder.customer.city}, {placedOrder.customer.state} ({placedOrder.customer.pincode})
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Estimated Arrival</span>
                  <span className="text-emerald-800 font-semibold">{placedOrder.estimatedDelivery}</span>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20">
                  <span className="text-[#55504A] uppercase tracking-wider font-medium">Payment Method</span>
                  <span className="text-[#8C6E43] font-semibold">
                    {placedOrder.customer.paymentMethod === 'cod'
                      ? 'Cash on Delivery (Advance Paid)'
                      : 'Paid Online via Razorpay'}
                  </span>
                </div>

                {/* COD Partial Advance Breakdown in Success Screen */}
                {placedOrder.customer.paymentMethod === 'cod' ? (
                  <>
                    <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                      <span className="text-emerald-900 font-medium">✓ Advance Courier Paid Online</span>
                      <span className="font-mono font-bold text-emerald-800">
                        ₹{COD_ADVANCE_AMOUNT} (Paid)
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                      <span className="text-amber-900 font-medium">Remaining to Pay at Delivery</span>
                      <span className="font-mono font-bold text-amber-900 text-sm">
                        ₹{(placedOrder.remainingBalance || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center pb-2.5 border-b border-[#C5A880]/20 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-emerald-900 font-medium">✓ Full Payment Received</span>
                    <span className="font-mono font-bold text-emerald-800">
                      ₹{placedOrder.totalAmount.toLocaleString('en-IN')} (Razorpay)
                    </span>
                  </div>
                )}

                {placedOrder.paymentId && (
                  <div className="flex justify-between items-center pb-2 border-b border-[#C5A880]/20">
                    <span className="text-[#55504A] uppercase tracking-wider font-medium">Razorpay Payment ID</span>
                    <span className="font-mono text-xs font-semibold text-[#8C6E43] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#C5A880]/30">
                      {placedOrder.paymentId}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1 text-sm">
                  <span className="text-[#1A1A1A] font-serif uppercase tracking-wider font-bold">Total Order Value</span>
                  <div className="text-right">
                    <span className="font-serif font-bold text-[#8C6E43] text-lg">
                      ₹{placedOrder.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-semibold">
                      Savings Claimed: ₹{placedOrder.discountSaved.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 12h Dispatch Note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#8C6E43] bg-[#F8F5EE] px-5 py-2.5 rounded-full border border-[#C5A880]/30 shadow-xs">
                <Truck className="w-4 h-4 shrink-0" />
                <span className="font-medium">
                  Dispatch priority confirmed • Tracking updates will be delivered to {placedOrder.customer.phoneNumber}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* ================= CHECKOUT FORM SCREEN ================= */
            <div className="p-5 sm:p-8 flex flex-col md:flex-row gap-8">
              {/* LEFT COLUMN: Customer Delivery Form */}
              <div className="w-full md:w-3/5">
                <div className="mb-4">
                  <h2 id="checkout-title" className="text-xl font-serif text-[#1A1A1A] font-semibold">
                    Delivery Address & Payment
                  </h2>
                  <p className="text-xs text-[#55504A] mt-0.5">
                    Items are flat-packed with transit edge protection and dispatched within 12 hours.
                  </p>
                </div>

                {/* 1. OUT OF STOCK GUARD ALERT IN CHECKOUT */}
                {hasOutOfStockItem && (
                  <div className="mb-4 p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-900 flex items-start gap-3 shadow-xs animate-fade-in-up">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <strong className="font-bold block text-red-950 mb-0.5">Item(s) Out of Stock</strong>
                      <p className="text-red-800 leading-relaxed">
                        One or more items in this order are currently out of stock in our inventory. Checkout and payment are strictly blocked until out-of-stock items are removed.
                      </p>
                    </div>
                  </div>
                )}

                {/* Google Linked Account Badge */}
                {user && (
                  <div className="mb-4 px-4 py-2.5 rounded-2xl bg-[#F5F2EB] border border-[#C5A880]/40 flex items-center justify-between text-xs animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#8C6E43] text-white flex items-center justify-center text-[10px] font-bold">
                        {user.displayName?.charAt(0) || 'G'}
                      </div>
                      <span className="text-[#1A1A1A] font-medium truncate max-w-[220px]">
                        Linked: <strong className="text-[#8C6E43]">{user.email}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-semibold uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Verified
                    </span>
                  </div>
                )}

                {/* Visible Error Alert */}
                {submitError && (
                  <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 flex items-start gap-3 shadow-xs animate-fade-in-up">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <strong className="font-semibold block text-red-950 mb-0.5">Payment / Order Notice</strong>
                      <p className="text-red-800 leading-relaxed">{submitError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="text-red-400 hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                      aria-label="Dismiss error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Aakash Verma"
                          className={`w-full px-4 py-3 sm:py-2.5 bg-[#FAF8F5] border text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                            errors.fullName ? 'border-red-500' : 'border-[#C5A880]/35 focus:border-[#8C6E43]'
                          }`}
                        />
                        <User className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
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
                          className={`w-full px-4 py-3 sm:py-2.5 bg-[#FAF8F5] border text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                            errors.phoneNumber ? 'border-red-500' : 'border-[#C5A880]/35 focus:border-[#8C6E43]'
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
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold">
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
                        placeholder="e.g. 7488574616 (Emergency/courier contact)"
                        className="w-full px-4 py-3 sm:py-2.5 bg-[#FAF8F5] border border-[#C5A880]/35 focus:border-[#8C6E43] text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all"
                      />
                      <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                      Full House / Street Address *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Flat 402, Lotus Towers, Linking Road..."
                        className={`w-full px-4 py-3 sm:py-2.5 bg-[#FAF8F5] border text-base sm:text-xs text-[#1A1A1A] placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          errors.streetAddress ? 'border-red-500' : 'border-[#C5A880]/35 focus:border-[#8C6E43]'
                        }`}
                      />
                      <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#8C827A] absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.streetAddress && <p className="text-[10px] text-red-600 mt-1">{errors.streetAddress}</p>}
                  </div>

                  {/* 2. DYNAMIC PINCODE, DISTRICT/CITY & STATE SECTION */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 6-Digit Pincode Input (Triggers auto-fetch) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold">
                          PIN Code *
                        </label>
                        {isFetchingPincode && (
                          <span className="flex items-center gap-1 text-[10px] text-[#8C6E43]">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Detecting...
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handlePincodeChange}
                        placeholder="e.g. 400050"
                        className={`w-full px-3.5 py-3 sm:py-2.5 bg-[#FAF8F5] border text-base sm:text-xs text-[#1A1A1A] font-mono tracking-wider placeholder-[#8C827A] rounded-xl focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          errors.pincode ? 'border-red-500' : 'border-[#C5A880]/35 focus:border-[#8C6E43]'
                        }`}
                      />
                      {errors.pincode && <p className="text-[10px] text-red-600 mt-1">{errors.pincode}</p>}
                    </div>

                    {/* District/City: BLANK by default, READ-ONLY, Auto-filled by API */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        District / City (Auto) *
                      </label>
                      <input
                        type="text"
                        name="city"
                        readOnly
                        value={formData.city}
                        placeholder={isFetchingPincode ? 'Detecting...' : 'Auto-filled via PIN'}
                        className={`w-full px-3.5 py-3 sm:py-2.5 bg-[#F2EDE4] border border-[#C5A880]/40 text-base sm:text-xs font-medium text-[#1A1A1A] placeholder-[#8C827A] rounded-xl cursor-not-allowed select-none ${
                          errors.city ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                    </div>

                    {/* State: BLANK by default, READ-ONLY, Auto-filled by API (No hardcoded values) */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-1.5">
                        State (Auto) *
                      </label>
                      <input
                        type="text"
                        name="state"
                        readOnly
                        value={formData.state}
                        placeholder={isFetchingPincode ? 'Detecting...' : 'Auto-filled via PIN'}
                        className={`w-full px-3.5 py-3 sm:py-2.5 bg-[#F2EDE4] border border-[#C5A880]/40 text-base sm:text-xs font-medium text-[#1A1A1A] placeholder-[#8C827A] rounded-xl cursor-not-allowed select-none ${
                          errors.state ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Pincode Feedback / Notice */}
                  {pincodeNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-900 animate-fade-in-up">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-[11px]">{pincodeNotice} • Delivery in 5 to 7 days</span>
                    </div>
                  )}

                  {pincodeError && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-2 text-xs text-amber-900 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-medium text-[11px]">{pincodeError}</span>
                    </div>
                  )}

                  {/* 3. PAYMENT METHOD SELECTION & COD PARTIAL ADVANCE BREAKDOWN */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] font-semibold mb-2">
                      Select Payment Method *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* COD Option with Partial Advance Notice */}
                      <label
                        className={`cursor-pointer p-4 border rounded-2xl flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'bg-[#F5F0E6] border-[#8C6E43] ring-2 ring-[#8C6E43]/60 shadow-xs'
                            : 'bg-[#FFFFFF] border-[#C5A880]/30 hover:border-[#8C6E43]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                              <Banknote className="w-4 h-4 text-[#8C6E43]" />
                              Cash on Delivery (COD)
                            </span>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={formData.paymentMethod === 'cod'}
                              onChange={handleChange}
                              className="accent-[#8C6E43] w-4 h-4"
                            />
                          </div>
                          <p className="text-[11px] text-[#55504A] leading-relaxed">
                            Pay <strong className="text-[#8C6E43]">₹{COD_ADVANCE_AMOUNT} Advance Courier Charge</strong> online now. Balance <strong className="text-[#1A1A1A]">₹{remainingAtDelivery.toLocaleString('en-IN')}</strong> at doorstep.
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#C5A880]/20 flex items-center justify-between text-[10px] font-semibold text-[#8C6E43]">
                          <span>Pay Now: ₹{COD_ADVANCE_AMOUNT}</span>
                          <span>At Delivery: ₹{remainingAtDelivery.toLocaleString('en-IN')}</span>
                        </div>
                      </label>

                      {/* Full Online Payment via Razorpay / UPI */}
                      <label
                        className={`cursor-pointer p-4 border rounded-2xl flex flex-col justify-between transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'bg-[#F5F0E6] border-[#8C6E43] ring-2 ring-[#8C6E43]/60 shadow-xs'
                            : 'bg-[#FFFFFF] border-[#C5A880]/30 hover:border-[#8C6E43]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-[#8C6E43]" />
                              Full Online Payment
                            </span>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="upi"
                              checked={formData.paymentMethod === 'upi'}
                              onChange={handleChange}
                              className="accent-[#8C6E43] w-4 h-4"
                            />
                          </div>
                          <p className="text-[11px] text-[#55504A] leading-relaxed">
                            Pay 100% online using UPI (GPay, PhonePe), Credit/Debit Cards, or NetBanking.
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#C5A880]/20 flex items-center justify-between text-[10px] font-semibold text-emerald-800">
                          <span>Pay Now: ₹{totalWholesale.toLocaleString('en-IN')}</span>
                          <span>At Delivery: ₹0 (Zero)</span>
                        </div>
                      </label>
                    </div>

                    {/* COD Clear Breakdown Card */}
                    {formData.paymentMethod === 'cod' && (
                      <div className="mt-3.5 p-3.5 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-2xl animate-fade-in-up text-xs space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-[#8C6E43]">
                          <Lock className="w-3.5 h-3.5 text-[#8C6E43]" />
                          <span>COD Partial Payment Breakdown</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#C5A880]/20">
                          <div>
                            <span className="text-[#7E7870] block">1. Advance Courier Charge:</span>
                            <strong className="text-emerald-800 text-xs">
                              ₹{COD_ADVANCE_AMOUNT} (Payable Online Now)
                            </strong>
                          </div>
                          <div>
                            <span className="text-[#7E7870] block">2. Balance at Doorstep:</span>
                            <strong className="text-[#1A1A1A] text-xs">
                              ₹{remainingAtDelivery.toLocaleString('en-IN')} (Pay at Delivery)
                            </strong>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#7E7870] leading-tight">
                          * A ₹{COD_ADVANCE_AMOUNT} courier advance is required to confirm logistics booking and prevent bogus orders. The remaining amount is collected when you receive and inspect your parcel.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || hasOutOfStockItem}
                      className={`w-full py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        hasOutOfStockItem
                          ? 'bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-400'
                          : 'bg-[#1A1A1A] hover:bg-[#8C6E43] text-white active:scale-98'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>
                            {formData.paymentMethod === 'cod'
                              ? `Opening Razorpay for ₹${COD_ADVANCE_AMOUNT} Advance...`
                              : `Opening Razorpay for ₹${totalWholesale.toLocaleString('en-IN')}...`}
                          </span>
                        </>
                      ) : hasOutOfStockItem ? (
                        <span>Cannot Place Order • Item(s) Out of Stock</span>
                      ) : (
                        <>
                          <span>
                            {formData.paymentMethod === 'cod'
                              ? `Pay ₹${COD_ADVANCE_AMOUNT} Advance & Confirm COD Order`
                              : `Pay ₹${totalWholesale.toLocaleString('en-IN')} via Razorpay / UPI`}
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Policy Banner */}
                    <div className="mt-3.5 p-3 sm:p-3.5 bg-[#F4EFEB] border border-[#C5A880]/50 rounded-2xl text-center shadow-2xs">
                      <p className="text-[11px] sm:text-xs font-bold text-[#8C6E43] tracking-wide flex items-center justify-center flex-wrap gap-1 sm:gap-1.5">
                        <span className="font-semibold">★ 100% Refund Policy</span>
                        <span className="text-[#C5A880] font-normal">|</span>
                        <span className="font-semibold">7-Day Easy Returns</span>
                        <span className="text-[#C5A880] font-normal">|</span>
                        <span className="font-semibold">
                          {formData.paymentMethod === 'cod'
                            ? 'Secure COD Partial Advance'
                            : '256-Bit SSL Razorpay Security'}
                        </span>
                      </p>
                      <p className="text-[10px] text-[#55504A] mt-1 font-medium">
                        {formData.paymentMethod === 'cod'
                          ? `Pay ₹${COD_ADVANCE_AMOUNT} online to confirm dispatch; balance ₹${remainingAtDelivery.toLocaleString('en-IN')} payable at doorstep inspection.`
                          : 'Instant automated order confirmation with 100% refund guarantee upon return.'}
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Order Summary Preview */}
              <div className="w-full md:w-2/5 bg-[#F8F5EE] p-5 sm:p-6 border border-[#C5A880]/30 rounded-2xl flex flex-col justify-between shadow-xs">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6E43] pb-3 border-b border-[#C5A880]/20">
                    Order Summary ({itemsToBuy.length} Item{itemsToBuy.length > 1 ? 's' : ''})
                  </h3>

                  {/* Items List */}
                  <div className="mt-3 divide-y divide-[#C5A880]/15 max-h-52 overflow-y-auto pr-1">
                    {itemsToBuy.map((item, idx) => {
                      const itemOut =
                        item.product.stockQuantity !== undefined
                          ? item.product.stockQuantity <= 0
                          : !item.product.inStock;
                      return (
                        <div key={idx} className="py-2.5 flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden border border-[#C5A880]/30 shrink-0">
                            <LuxuryImage
                              src={item.product.images[0]}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                              fallbackTitle={item.product.title}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">
                              {item.product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-[#7E7870]">
                                Qty: {item.quantity} × ₹{item.product.wholesalePrice.toLocaleString('en-IN')}
                              </span>
                              {itemOut && (
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.2 rounded border border-red-300">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-serif font-bold text-[#8C6E43] shrink-0">
                            ₹{(item.product.wholesalePrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="mt-4 pt-4 border-t border-[#C5A880]/20 space-y-2 text-xs">
                    <div className="flex justify-between text-[#55504A]">
                      <span>Original Retail MRP:</span>
                      <span className="line-through text-[#8C827A]">
                        ₹{totalOriginal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#8C6E43] font-semibold">
                      <span>Wholesale Privilege Savings:</span>
                      <span>- ₹{totalSaved.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-[#55504A]">
                      <span>12-Hour Priority Shipping:</span>
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    </div>

                    <div className="pt-2 border-t border-[#C5A880]/20 flex justify-between items-baseline text-sm font-serif font-bold">
                      <span className="uppercase text-[#1A1A1A]">Total Order Value:</span>
                      <span className="text-lg text-[#8C6E43]">
                        ₹{totalWholesale.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Breakdown according to selected payment method */}
                    <div className="mt-3 p-3 rounded-xl bg-white border border-[#C5A880]/30 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center text-emerald-850 font-bold">
                        <span>Pay Online Now:</span>
                        <span>₹{payableOnlineNow.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-[#55504A] font-semibold">
                        <span>Pay at Delivery:</span>
                        <span>₹{remainingAtDelivery.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dispatch Guarantee Box */}
                <div className="mt-5 p-3.5 bg-white border border-[#C5A880]/30 rounded-xl text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6E43]">
                    <Zap className="w-3.5 h-3.5 fill-[#8C6E43]" />
                    <span>12-Hour Priority Dispatch</span>
                  </div>
                  <p className="text-[10px] text-[#55504A] mt-1 leading-relaxed">
                    Direct warehouse handover to express logistics. Includes doorstep verification & 100% refund protection.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
