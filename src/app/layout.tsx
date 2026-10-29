import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LivFabs | Space-Saving Smart Furniture & Comfort Essentials (₹1500 - ₹2500)',
  description:
    'Discover multi-functional space-saving smart furniture: sofa cum beds, 5-in-1 convertible ottoman cubes, wall-mounted murphy beds, and rolling underbed storage strictly priced at ₹1,500 – ₹2,500. Fastly shipped within 12 hours with Cash on Delivery.',
  keywords: [
    'LivFabs',
    'Smart Furniture',
    'Space Saving Furniture',
    'Sofa Cum Bed',
    'Convertible Ottoman Cube',
    'Murphy Bed',
    'Wall Mounted Desk',
    'Underbed Storage with Wheels',
    'Wholesale Furniture',
    'Air Beds',
  ],
  openGraph: {
    title: 'LivFabs | Space-Saving Smart Furniture & Comfort Essentials',
    description:
      'Fastly Shipped Within 12 Hours | Exclusive Range ₹1500 - ₹2500 | Multi-Functional Space-Saving Designs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-[#141414] text-[#F9F8F6] antialiased min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-[#1A1A1A]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
