'use client';

import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockData';
import { LuxuryImage } from '@/components/LuxuryImage';

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
    <section id="reviews" className="py-16 sm:py-24 bg-[#FDFBF7] text-[#1A1A1A] border-t border-[#C5A880]/20 relative overflow-hidden">
      
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C6E43] font-semibold">
                Client Testimonials & Smart Living
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1A1A]">
              Praised by Over 32,400+ Smart Homeowners
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#55504A] max-w-xl">
              Authentic experiences from verified buyers across Mumbai, Bangalore, Delhi, Hyderabad, and Pune who unlocked luxury space-saving with our factory direct smart furniture collection.
            </p>
          </div>

          {/* Left & Right Swiper Controls (Pill Rounded-full) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 bg-[#FFFFFF] border border-[#C5A880]/30 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] rounded-full transition-all shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 bg-[#FFFFFF] border border-[#C5A880]/30 hover:border-[#8C6E43] text-[#1A1A1A] hover:text-[#8C6E43] rounded-full transition-all shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side-Scrolling Swipable Container with Rounded-3xl Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="w-[85vw] sm:w-[420px] shrink-0 snap-start bg-[#FFFFFF] border border-[#C5A880]/25 p-7 sm:p-8 flex flex-col justify-between hover:border-[#8C6E43] transition-all duration-300 shadow-sm hover:shadow-md rounded-3xl"
            >
              <div>
                {/* Top Row: Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 bg-[#F5F2EB] px-3 py-1 rounded-full border border-[#C5A880]/20">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(review.rating)
                            ? 'text-[#8C6E43] fill-[#8C6E43]'
                            : 'text-[#DDD]'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[#1A1A1A] font-semibold ml-1.5">{review.rating}.0</span>
                  </div>
                  <span className="text-[11px] text-[#78726A]">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#33302D] font-normal leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom: Client Profile & Product Badge */}
              <div className="pt-4 border-t border-[#C5A880]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C5A880]/40 shrink-0 shadow-sm">
                    <LuxuryImage
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      fallbackTitle={review.name}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-serif font-semibold text-[#1A1A1A]">{review.name}</h4>
                      <CheckCircle className="w-3.5 h-3.5 text-[#8C6E43]" />
                    </div>
                    <span className="text-[10px] text-[#78726A]">{review.city}</span>
                  </div>
                </div>

                {/* Purchased Item Thumbnail (Smooth Rounded-xl) */}
                {review.itemImage && (
                  <div className="relative w-11 h-11 bg-[#F5F2EB] border border-[#C5A880]/30 shrink-0 rounded-xl overflow-hidden shadow-sm" title={review.productName}>
                    <LuxuryImage
                      src={review.itemImage}
                      alt={review.productName}
                      fill
                      className="object-cover rounded-xl"
                      fallbackTitle={review.productName}
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
