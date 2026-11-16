"use client";

import LifestyleHero from "@/components/LifestyleHero";
import ProductsSection from "@/components/ProductsSection";
import MarketingFeatures from "@/components/MarketingFeatures";
import MatchaEducation from "@/components/MatchaEducation";
import CafeB2B from "@/components/CafeB2B";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Matchuji Premium Ceremonial 7A Matcha 50g",
        "image": "https://www.matchuji.cz/images/matcha-single-strawberry.jpg",
        "description": "100% organická 7A ceremoniální Matcha z oblasti Uji v Japonsku. Nejvyšší kvalita pro každodenní energii a soustředění bez hořkosti.",
        "brand": {
          "@type": "Brand",
          "name": "Matchuji"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.matchuji.cz/product/ceremonial-matcha",
          "priceCurrency": "CZK",
          "price": "297",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "24"
        }
      }} />
      <LifestyleHero />
      <MarketingFeatures />
      <ProductsSection />
      <div id="education">
        <MatchaEducation />
      </div>
      <CafeB2B />
    </main>
  );
}
