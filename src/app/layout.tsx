import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
};

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
  title: 'LivFabs | Space-Saving Smart Furniture & Comfort Essentials',
  description:
    'Discover multi-functional space-saving smart furniture: sofa cum beds, 5-in-1 convertible ottoman cubes, wall-mounted murphy beds, and rolling underbed storage. Fastly shipped within 12 hours with Cash on Delivery.',
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
      'Fastly Shipped Within 12 Hours | Space-Saving Smart Furniture & Comfort Essentials | Multi-Functional Designs.',
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
      <body className="bg-[#FDFBF7] text-[#1A1A1A] antialiased min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-[#1A1A1A]">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
