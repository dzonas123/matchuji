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
import UpsellModal from "@/components/UpsellModal";
import Script from "next/script";
import Tracker from "@/components/Tracker";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";


export const metadata: Metadata = {
  metadataBase: new URL('https://www.matchuji.cz'),
  title: "Matchuji | Prémiová ceremoniální matcha z Uji",
  description: "Nejkvalitnější 100% organická 7A ceremoniální Matcha z japonského Uji. Dodá vám dlouhotrvající energii, ostré soustředění a podporuje zdraví. Bez hořkosti.",
  keywords: ["Matcha", "Ceremoniální matcha", "Zelený čaj", "Uji matcha", "Matchuji", "Japonský čaj", "Zdravá energie", "Bio matcha", "Kde koupit matchu"],
  openGraph: {
    title: "Matchuji | Prémiová Ceremoniální 7A Matcha",
    description: "Nejkvalitnější 100% organická 7A ceremoniální Matcha z japonského Uji. Dlouhotrvající energie a zdraví v jednom šálku.",
    url: "https://www.matchuji.cz",
    siteName: "Matchuji",
    locale: "cs_CZ",
    type: "website",
    images: ["/images/matcha-lifestyle.jpg"],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Matchuji | Prémiová ceremoniální matcha z Uji",
    description: "100% organická ceremoniální matcha z Uji v Japonsku. Jemná chuť bez hořkosti.",
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
      <head>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Matchuji",
          "url": "https://www.matchuji.cz",
          "logo": "https://www.matchuji.cz/icon.png",
          "description": "Prémiová ceremoniální Matcha 7A z japonského Uji. Dodáváme tu nejkvalitnější organickou matchu.",
        }} />
      </head>
      <body className={`${poppins.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CookieConsent />
        <Tracker />
        <Analytics />
        <CartProvider>
          <Header />
          <CartDrawer />
          <UpsellModal />
          <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
