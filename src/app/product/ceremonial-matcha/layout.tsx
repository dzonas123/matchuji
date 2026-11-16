import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const url = "https://www.matchuji.cz/product/ceremonial-matcha";

export const metadata: Metadata = {
  title: "Ceremoniální matcha 50 g z Uji – 7A kvalita | Matchuji",
  description:
    "100% organická ceremoniální matcha z Uji v Japonsku. Jemná umami chuť bez hořkosti, ideální pro tradiční přípravu i matcha latte.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: "Ceremoniální matcha 50 g z Uji – 7A kvalita",
    description: "Organická ceremoniální matcha z Uji s jemnou chutí bez hořkosti.",
    images: [{ url: "/images/matcha-single-strawberry.jpg", alt: "Ceremoniální matcha Matchuji 50 g" }],
  },
};

export default function CeremonialMatchaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Ceremoniální Matcha 50 g",
          description: "100% organická ceremoniální matcha z Uji v Japonsku.",
          image: ["https://www.matchuji.cz/images/matcha-single-strawberry.jpg"],
          sku: "MATCHA-50-CER",
          gtin13: "2000000000015",
          brand: { "@type": "Brand", name: "Matchuji" },
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "CZK",
            price: "297",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }}
      />
      {children}
    </>
  );
}
