'use client';

import React, { useState } from 'react';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { WholesalePrivilegeStory } from '@/components/WholesalePrivilegeStory';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { Footer } from '@/components/Footer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { CartDrawer } from '@/components/CartDrawer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Ladies Ornaments' | 'Gents Ornaments'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (
    cat: 'All' | 'Ladies Ornaments' | 'Gents Ornaments'
  ) => {
    setSelectedCategory(cat);
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#141414] text-[#F9F8F6]">
      {/* 1. Top Scrolling Marquee Ticker */}
      <MarqueeTicker />

      {/* 2. Luxury Header & Navigation */}
      <Header
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 3. Hero Section */}
      <Hero onExplore={handleCategorySelect} />

      {/* 4. Curated Product Catalog */}
      <ProductCatalog
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
      />

      {/* 5. Wholesale Atelier Privilege Story */}
      <WholesalePrivilegeStory />

      {/* 6. Client Reviews Side-Scrolling Carousel */}
      <ReviewsCarousel />

      {/* 7. Comprehensive Luxury Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CheckoutModal />
      <CartDrawer />
    </main>
  );
}

