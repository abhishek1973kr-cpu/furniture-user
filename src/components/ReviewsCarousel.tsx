'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockData';

export const ReviewsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#171717] text-[#F9F8F6] border-t border-[#C5A880]/15 relative overflow-hidden">
      
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                Client Testimonials & Smart Living
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-serif text-[#F9F8F6]">
              Praised by Over 32,400+ Smart Homeowners
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#9E9A93] max-w-xl">
              Authentic experiences from verified buyers across Mumbai, Bangalore, Delhi, Hyderabad, and Pune who unlocked luxury space-saving with our ₹1,500 – ₹2,500 wholesale collection.
            </p>
          </div>

          {/* Left & Right Swiper Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-[#121212] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#F9F8F6] hover:text-[#C5A880] transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-[#121212] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#F9F8F6] hover:text-[#C5A880] transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side-Scrolling Swipable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="w-[85vw] sm:w-[420px] shrink-0 snap-start bg-[#141414] border border-[#C5A880]/20 p-6 sm:p-7 flex flex-col justify-between hover:border-[#C5A880]/50 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Top Row: Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(review.rating)
                            ? 'text-[#C5A880] fill-[#C5A880]'
                            : 'text-[#555]'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-white font-medium ml-1.5">{review.rating}.0</span>
                  </div>
                  <span className="text-[11px] text-[#9E9A93]">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#F9F8F6]/85 font-light leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom: Client Profile & Product Badge */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C5A880]/40 shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-serif font-medium text-white">{review.name}</h4>
                      <CheckCircle className="w-3 h-3 text-[#C5A880]" />
                    </div>
                    <span className="text-[10px] text-[#9E9A93]">{review.city}</span>
                  </div>
                </div>

                {/* Purchased Item Thumbnail */}
                {review.itemImage && (
                  <div className="relative w-10 h-10 bg-[#0D0D0D] border border-white/10 shrink-0 rounded-none overflow-hidden" title={review.productName}>
                    <Image
                      src={review.itemImage}
                      alt={review.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
