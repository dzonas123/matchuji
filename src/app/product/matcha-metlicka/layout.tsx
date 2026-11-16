import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const url = "https://www.matchuji.cz/product/matcha-metlicka";

export const metadata: Metadata = {
  title: "Bambusová metlička na matchu (chasen) | Matchuji",
  description:
    "Tradiční bambusová metlička chasen se 100 jemnými jehlami pro dokonale našlehanou matchu a jemnou pěnu.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: "Bambusová metlička na matchu (chasen)",
    description: "Tradiční bambusová metlička pro dokonale našlehanou matchu.",
    images: [{ url: "/images/matcha-chasen.jpg", alt: "Bambusová metlička chasen na matchu" }],
  },
};

export default function MatchaWhiskLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Bambusová metlička (chasen)",
          description: "Tradiční bambusová metlička se 100 jemnými jehlami pro přípravu matchy.",
          image: ["https://www.matchuji.cz/images/matcha-chasen.jpg"],
          sku: "MATCHA-METLICKA-CHASEN",
          gtin13: "2000000000039",
          brand: { "@type": "Brand", name: "Matchuji" },
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "CZK",
            price: "189",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }}
      />
      {children}
    </>
  );
}
