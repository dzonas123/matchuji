import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Matchuji | Premium Ceremonial 7A Matcha",
  description: "Experience the finest organic 7A Ceremonial Grade Matcha from Uji, Japan. Sustained energy, laser-sharp focus, and 100% organic purity.",
  openGraph: {
    title: "Matchuji | Premium Ceremonial 7A Matcha",
    description: "Experience the finest organic 7A Ceremonial Grade Matcha from Uji, Japan.",
    images: ["/images/matcha-lifestyle.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${poppins.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
