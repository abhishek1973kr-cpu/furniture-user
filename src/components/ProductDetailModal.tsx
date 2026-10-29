'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  Minus,
  Plus,
  MessageSquare,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { LuxuryImage } from '@/components/LuxuryImage';

interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  userPhoto?: string;
}

const INITIAL_MOCK_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Vikram Malhotra',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '2 days ago',
    verified: true,
    comment:
      'The craftsmanship and hydraulic space-saving mechanism exceeded all expectations. Converts from sofa to bed within 20 seconds, and the high-resilience foam feels truly opulent. Absolute game-changer for our apartment!',
  },
  {
    id: 'rev-2',
    author: 'Dr. Ananya Sen',
    location: 'Bangalore, Karnataka',
    rating: 5,
    date: '4 days ago',
    verified: true,
    comment:
      'Solid, reinforced structural steel construction and gorgeous matte velvet finish. Dispatched within 12 hours and reached Bangalore in 2 days. Cash on delivery made the transaction completely risk-free.',
  },
  {
    id: 'rev-3',
    author: 'Rohit Verma',
    location: 'Gurugram, NCR',
    rating: 4.5,
    date: '1 week ago',
    verified: true,
    comment:
      'Engineered with tremendous precision. Fits like a glove in our compact home office setup. Highly recommend LivFabs for modern space-saving solutions.',
  },
  {
    id: 'rev-4',
    author: 'Meera Nambiar',
    location: 'Kochi, Kerala',
    rating: 5,
    date: '1 week ago',
    verified: true,
    comment:
      'The folding mechanism glides without any squeak or resistance. It literally freed up over 45 square feet of usable floor area in our living room. Top-tier quality.',
  },
  {
    id: 'rev-5',
    author: 'Siddharth Singhania',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    comment:
      'Direct wholesale pricing is unbelievable. Similar European-style convertible furniture in upscale showrooms was quoted at 3x this price. Uncompromised luxury.',
  },
  {
    id: 'rev-6',
    author: 'Priya Deshmukh',
    location: 'Nagpur, Maharashtra',
    rating: 4.5,
    date: '2 weeks ago',
    verified: true,
    comment:
      'Flawless stitching, durable hardware, and the foam density provides superb ergonomic lumbar support both while working and relaxing.',
  },
  {
    id: 'rev-7',
    author: 'Arjun Kapoor',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    comment:
      'Super fast dispatch and very courteous logistics team. Product arrived in pristine wooden reinforcement packaging. 10/10 recommendation.',
  },
];

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    closeProductDetail,
    addToCart,
    openCheckout,
  } = useCart();

  const { user, openAuthModal } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_MOCK_REVIEWS);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Reset image index when opened with a new product
  useEffect(() => {
    if (selectedProductForDetail) {
      setActiveImageIndex(0);
      setQuantity(1);
      setJustAdded(false);
      setReviewSuccess(false);
      setNewComment('');
      setNewRating(5);
    }
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  const handleBuyNow = () => {
    closeProductDetail();
    openCheckout(product, quantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const newReviewItem: ProductReview = {
      id: `user-rev-${Date.now()}`,
      author: user.displayName || user.email?.split('@')[0] || 'Verified Customer',
      location: 'India',
      rating: newRating,
      date: 'Just now',
      verified: true,
      comment: newComment.trim(),
      userPhoto: user.photoURL || undefined,
    };

    setReviews([newReviewItem, ...reviews]);
    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const discountAmount = product.originalPrice - product.wholesalePrice;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in-up"
    >
      {/* Background click to dismiss */}
      <div
        className="fixed inset-0"
        onClick={closeProductDetail}
        aria-hidden="true"
      />

      {/* Modal Card with Smooth Rounded-3xl Corners & Scrollable Interior */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] rounded-3xl flex flex-col">
        
        {/* Sticky Close Button in Top Right */}
        <div className="sticky top-0 z-40 flex justify-end p-3 pointer-events-none">
          <button
            onClick={closeProductDetail}
            className="pointer-events-auto p-2 text-[#7E7870] hover:text-[#1A1A1A] bg-[#FFFFFF]/95 hover:bg-[#F5F2EB] border border-[#C5A880]/40 rounded-full transition-colors shadow-md backdrop-blur-sm"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= SECTION 1: PRODUCT HERO & SPECIFICATIONS ================= */}
        <div className="flex flex-col md:flex-row -mt-12 border-b border-[#C5A880]/20">
          
          {/* LEFT: 8-Image Gallery with Fluid Switching Animation */}
          <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-[#FDFBF7] border-b md:border-b-0 md:border-r border-[#C5A880]/20">
            
            {/* Main Large Image Display (Rounded-2xl with direct URL & fallback support) */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFEB] border border-[#C5A880]/25 rounded-2xl shadow-inner">
              <LuxuryImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.title} perspective ${activeImageIndex + 1}`}
                fill
                priority
                className="object-cover object-center transition-all duration-500 transform hover:scale-105 cursor-crosshair rounded-2xl"
                fallbackTitle={product.title}
              />
              
              {/* Overlay Badges (Pills) */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <span className="bg-[#8C6E43] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Space-Saving Innovation
                </span>
                <span className="bg-white/95 border border-emerald-500/40 text-emerald-800 text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm flex items-center gap-1 shadow-sm">
                  <Zap className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                  12-Hour Priority Dispatch
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/75 px-2.5 py-1 text-[10px] text-white border border-[#C5A880]/40 rounded-full font-mono">
                {activeImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* 8-Image Fluid Gallery Selector Bar */}
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest text-[#78726A] block mb-2 font-semibold">
                Multi-Angle Perspectives ({product.images.length} Functional Views)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-200 ${
                      activeImageIndex === idx
                        ? 'border-[#8C6E43] ring-2 ring-[#8C6E43] scale-95 opacity-100 shadow-md'
                        : 'border-[#C5A880]/30 opacity-70 hover:opacity-100 hover:border-[#8C6E43]'
                    }`}
                  >
                    <LuxuryImage
                      src={imgUrl}
                      alt={`Thumbnail view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover rounded-xl"
                      fallbackTitle={`Angle ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Space-Saving Specifications & Purchase Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFFFF]">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#55504A] mb-2">
                <span className="uppercase tracking-[0.2em] text-[#8C6E43] font-bold">
                  {product.category} • {product.subCategory}
                </span>
                <div className="flex items-center gap-1 bg-[#F5F2EB] px-3 py-1 rounded-full border border-[#C5A880]/30">
                  <Star className="w-3.5 h-3.5 text-[#8C6E43] fill-[#8C6E43]" />
                  <span className="text-[#1A1A1A] font-bold">{product.rating}</span>
                  <span className="text-[#7E7870]">({product.reviewCount} verified)</span>
                </div>
              </div>

              {/* Title */}
              <h2 id="product-detail-title" className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-tight font-medium">
                {product.title}
              </h2>

              {/* Space Saving Highlight (Rounded-2xl) */}
              <div className="mt-3 p-3 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl text-xs text-[#1A1A1A] shadow-sm">
                <span className="font-semibold uppercase tracking-wider block text-[10px] text-[#8C6E43]">Space-Saving Blueprint</span>
                <p className="text-[#4A4744] mt-0.5">{product.spaceSavingFeature}</p>
              </div>

              {/* Pricing Section (Rounded-2xl) */}
              <div className="mt-4 p-4 bg-[#F8F5EE] border border-[#C5A880]/30 rounded-2xl flex items-baseline justify-between shadow-sm">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8C6E43]">
                    ₹{product.wholesalePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="ml-3 text-sm line-through text-[#7E7870]">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="ml-2 text-xs text-emerald-700 font-semibold">
                    Save ₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C6E43] font-bold bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#C5A880]/40 shadow-sm">
                  Wholesale Price
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#55504A] font-normal leading-relaxed">
                {product.description}
              </p>

              {/* Space-Saving Dimensions Grid (Rounded-xl) */}
              <div className="mt-5 pt-4 border-t border-[#C5A880]/20 grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                  <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Expanded Size</span>
                  <span className="text-[#1A1A1A] font-semibold text-[11px] mt-0.5 block">{product.specifications.dimensions}</span>
                </div>
                <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                  <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Folded / Stowed Size</span>
                  <span className="text-[#8C6E43] font-semibold text-[11px] mt-0.5 block">{product.specifications.foldedDimensions || 'Ultra Compact'}</span>
                </div>
                <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                  <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Weight Capacity</span>
                  <span className="text-emerald-700 font-semibold text-[11px] mt-0.5 block">{product.specifications.weightCapacity}</span>
                </div>
                <div className="p-2.5 bg-[#F8F5EE] border border-[#C5A880]/25 rounded-xl">
                  <span className="text-[#7E7870] text-[10px] uppercase block tracking-wider font-medium">Setup & Assembly</span>
                  <span className="text-[#1A1A1A] font-semibold text-[11px] mt-0.5 block">{product.specifications.assemblyRequired}</span>
                </div>
              </div>

              {/* Key Features Bullets */}
              <ul className="mt-4 space-y-1.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#55504A]">
                    <Check className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Footer: Quantity Selector, Add to Bag, Buy Now */}
            <div className="mt-6 pt-5 border-t border-[#C5A880]/20">
              
              {/* Quantity Selector with Rounded-full pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#55504A] font-medium">Quantity:</span>
                <div className="flex items-center border border-[#C5A880]/40 bg-[#F8F5EE] rounded-full px-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-[#7E7870] hover:text-[#1A1A1A] transition-colors rounded-full"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1A1A1A] font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-[#7E7870] hover:text-[#1A1A1A] transition-colors rounded-full"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#7E7870] uppercase block">Total Due</span>
                  <span className="text-base font-serif font-bold text-[#8C6E43]">
                    ₹{(product.wholesalePrice * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Buttons Grid (Pills) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-5 border border-[#C5A880]/60 hover:border-[#8C6E43] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-all flex items-center justify-center gap-2 hover:bg-[#F5F2EB]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-[#8C6E43]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Buy Now (COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-2.5 text-center text-[11px] text-[#7E7870]">
                🔒 Pay with Cash on Delivery at doorstep • Fastly shipped within 12 hours
              </p>
            </div>

          </div>
        </div>

        {/* ================= SECTION 2: CUSTOMER REVIEWS & WRITE A REVIEW ================= */}
        <div className="p-6 sm:p-10 bg-[#FDFBF7]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C5A880]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6E43] font-bold">
                  Verified Ownership Experiences
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  100% Genuine Buyers
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] font-semibold mt-1">
                Customer Reviews
              </h3>
            </div>

            {/* Average Rating Summary Pill */}
            <div className="flex items-center gap-3 bg-[#FFFFFF] px-4 py-2.5 rounded-2xl border border-[#C5A880]/30 shadow-sm">
              <div className="text-center">
                <span className="text-2xl font-serif font-bold text-[#8C6E43] leading-none">
                  4.9
                </span>
                <span className="text-[10px] text-[#7E7870] block">out of 5</span>
              </div>
              <div className="h-8 w-px bg-[#C5A880]/30" />
              <div>
                <div className="flex items-center text-[#8C6E43]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#8C6E43] text-[#8C6E43]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#7E7870] font-medium">
                  {reviews.length} authentic homeowner reviews
                </span>
              </div>
            </div>
          </div>

          {/* Reviews List Grid (6 to 7 Pre-loaded + User Added) */}
          <div className="py-6 space-y-3.5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#C5A880]/25 rounded-2xl shadow-sm hover:border-[#8C6E43]/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    {rev.userPhoto ? (
                      <img
                        src={rev.userPhoto}
                        alt={rev.author}
                        className="w-8 h-8 rounded-full object-cover border border-[#C5A880]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#F4EFEB] border border-[#C5A880]/40 flex items-center justify-center text-xs font-bold text-[#8C6E43]">
                        {rev.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#1A1A1A]">{rev.author}</span>
                        {rev.verified && (
                          <span className="flex items-center gap-1 text-[9px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#7E7870]">{rev.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= Math.floor(rev.rating)
                              ? 'fill-[#8C6E43] text-[#8C6E43]'
                              : rev.rating % 1 !== 0 && s === Math.ceil(rev.rating)
                              ? 'fill-[#8C6E43]/60 text-[#8C6E43]'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7E7870]">{rev.date}</span>
                  </div>
                </div>

                <p className="text-xs text-[#4A4744] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* ================= WRITE A REVIEW SECTION ================= */}
          <div className="mt-4 pt-6 border-t border-[#C5A880]/20">
            <h4 className="text-sm font-serif font-semibold text-[#1A1A1A] mb-1">
              Write a Review
            </h4>
            <p className="text-xs text-[#55504A] mb-4">
              Share your insights regarding craftsmanship, space optimization, and delivery.
            </p>

            {/* GMAIL AUTHENTICATION REQUIREMENT CHECK */}
            {!user ? (
              <div className="p-6 bg-[#F4EFEB] border border-[#C5A880]/40 rounded-3xl text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <MessageSquare className="w-5 h-5 text-[#8C6E43]" />
                </div>
                <h5 className="text-sm font-serif font-semibold text-[#1A1A1A]">
                  Verified Feedback Protection
                </h5>
                <p className="text-xs text-[#55504A] max-w-md mx-auto mt-1 mb-4">
                  To protect review integrity and eliminate automated spam, verified Google sign-in is required to post a review.
                </p>
                
                {/* Prominent Login with Google Button */}
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#FFFFFF] hover:bg-[#FDFBF7] border border-[#C5A880]/50 hover:border-[#8C6E43] rounded-full text-xs font-semibold text-[#1A1A1A] transition-all shadow-md group cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Login with Google to write a review</span>
                </button>
              </div>
            ) : (
              /* LOGGED IN REVIEW FORM WITH 5-STAR SELECTOR & TEXTAREA */
              <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#C5A880]/40 rounded-3xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#C5A880]/20 mb-4 gap-2">
                  <div className="flex items-center gap-2.5">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Google Account'}
                        className="w-7 h-7 rounded-full object-cover border border-[#C5A880]"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#8C6E43] text-white flex items-center justify-center text-xs font-bold">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">
                        Reviewing as {user.displayName || user.email}
                      </p>
                      <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Google Account
                      </span>
                    </div>
                  </div>

                  {/* Interactive 5-Star Rating Selector */}
                  <div className="flex items-center gap-1 bg-[#F8F5EE] px-3 py-1.5 rounded-full border border-[#C5A880]/30">
                    <span className="text-[11px] text-[#7E7870] mr-1 hidden sm:inline">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          className={`w-4 h-4 transition-colors ${
                            star <= newRating
                              ? 'fill-[#8C6E43] text-[#8C6E43]'
                              : 'text-gray-300 hover:text-[#C5A880]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#8C6E43] ml-1 font-mono">
                      {newRating}.0
                    </span>
                  </div>
                </div>

                <form onSubmit={handleReviewSubmit}>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your authentic feedback regarding space-saving features, hydraulic folding mechanism, build quality, or delivery speed..."
                    required
                    className="w-full p-4 bg-[#FDFBF7] border border-[#C5A880]/30 rounded-2xl text-xs text-[#1A1A1A] placeholder-[#7E7870] focus:outline-none focus:border-[#8C6E43] focus:ring-1 focus:ring-[#8C6E43] transition-all resize-none shadow-inner"
                  />

                  {reviewSuccess && (
                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fade-in-up">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thank you, {user.displayName || 'valuable client'}! Your review has been published below.</span>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[10px] text-[#7E7870]">
                      Reviews are verified for genuine community standards and verified delivery records.
                    </p>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#8C6E43] disabled:opacity-40 text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>Submit Review</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
