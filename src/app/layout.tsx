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
  title: 'LivFabs | Exclusive Ladies & Gents Ornaments at Flat ₹99 Wholesale',
  description:
    'Experience handcrafted luxury 18K micro-gold plated ornaments at flat ₹99 wholesale privilege (Original MRP ₹349). Fastly shipped within 12 hours with Cash on Delivery across India.',
  keywords: [
    'LivFabs',
    'Wholesale Ornaments',
    'Ladies Jewelry',
    'Gents Jewelry',
    'Cuban Chain',
    'Solitaire Choker',
    '18K Gold Plated',
    'Anti Tarnish',
    'Flat 99 Wholesale',
  ],
  openGraph: {
    title: 'LivFabs | Exclusive Ladies & Gents Ornaments at Flat ₹99',
    description:
      'Fastly Shipped Within 12 Hours | Flat ₹99 Wholesale Privilege on Timeless Luxury Ornaments.',
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

