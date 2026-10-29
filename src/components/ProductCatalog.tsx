'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles, Radio } from 'lucide-react';
import { ProductCategory } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCatalogProps {
  selectedCategory: 'All' | ProductCategory;
  onSelectCategory: (category: 'All' | ProductCategory) => void;
  searchQuery: string;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Smart Living',
  'On-The-Go Comfort',
  'Flexi Work & Dine',
  'Storage & Utility',
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
}) => {
  const { products, isInventoryLoading, isLiveConnected } = useCart();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Subcategories depending on current main category & live products
  const availableSubCategories = useMemo(() => {
    let prods = products;
    if (selectedCategory !== 'All') {
      prods = prods.filter((p) => p.category === selectedCategory);
    }
    const set = new Set<string>();
    prods.forEach((p) => set.add(p.subCategory));
    return ['All', ...Array.from(set)];
  }, [products, selectedCategory]);

  // Filtered and sorted products from real-time Firestore collection
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // SubCategory match
      if (selectedSubCategory !== 'All' && product.subCategory !== selectedSubCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSubCategory = product.subCategory.toLowerCase().includes(q);
        const matchesFeature = product.spaceSavingFeature.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesCategory || matchesSubCategory || matchesFeature;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.wholesalePrice - b.wholesalePrice;
      }
      if (sortBy === 'price-high') {
        return b.wholesalePrice - a.wholesalePrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // default order
    });
  }, [products, selectedCategory, selectedSubCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#FDFBF7] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6E43] font-semibold flex items-center gap-2">
              The Space-Saving Furniture Atelier
              {isLiveConnected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 text-[9px] tracking-normal font-semibold lowercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  live
                </span>
              )}
            </span>
            <span className="w-8 h-[1px] bg-[#C5A880]" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1A1A1A]">
            Architectural Multi-Function Designs
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#55504A] max-w-xl mx-auto leading-relaxed">
            Direct factory wholesale pricing with instant doorstep Cash on Delivery.
            Every piece is precision packed and dispatched within 12 hours.
          </p>
        </div>

        {/* Primary 4 Category Selector Tabs (Fully Rounded Pills) */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-[#F4EFEB] border border-[#C5A880]/30 rounded-full shadow-sm whitespace-nowrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setSelectedSubCategory('All');
                }}
                className={`px-5 sm:px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FDFBF7] shadow-md'
                    : 'text-[#55504A] hover:text-[#1A1A1A]'
                }`}
              >
                {cat === 'All' ? 'All Curations' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Subcategory Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C5A880]/20">
          
          {/* Subcategory scrollable tags (Rounded-full pills) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all rounded-full border ${
                  selectedSubCategory === sub
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7] shadow-sm'
                    : 'bg-[#FFFFFF] border-[#C5A880]/30 text-[#55504A] hover:text-[#1A1A1A] hover:border-[#8C6E43]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Right: Results Count & Sort Dropdown (Curvy Pill) */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 text-xs">
            <span className="text-[#55504A] tracking-wide">
              Showing <strong className="text-[#1A1A1A] font-semibold">{filteredProducts.length}</strong> creations
            </span>

            <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#C5A880]/30 px-4 py-2 rounded-full shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6E43]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#1A1A1A] text-xs focus:outline-none cursor-pointer uppercase tracking-wider"
              >
                <option value="featured" className="bg-[#FFFFFF] text-[#1A1A1A]">Featured</option>
                <option value="price-low" className="bg-[#FFFFFF] text-[#1A1A1A]">Price: Low to High</option>
                <option value="price-high" className="bg-[#FFFFFF] text-[#1A1A1A]">Price: High to Low</option>
                <option value="rating" className="bg-[#FFFFFF] text-[#1A1A1A]">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-3xl max-w-lg mx-auto p-8 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#8C6E43] mx-auto mb-3" />
            <h3 className="text-lg font-serif text-[#1A1A1A]">No smart furniture found</h3>
            <p className="text-xs text-[#55504A] mt-2">
              Try exploring "Smart Living", "Flexi Work & Dine", or clear your search term.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSelectedSubCategory('All');
              }}
              className="mt-6 px-7 py-3 bg-[#C5A880] text-[#1A1A1A] text-xs uppercase tracking-widest font-semibold rounded-full shadow-goldGlow hover:bg-[#D4B489] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
