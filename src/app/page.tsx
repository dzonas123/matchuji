"use client";

import LifestyleHero from "@/components/LifestyleHero";
import ProductsSection from "@/components/ProductsSection";
import MarketingFeatures from "@/components/MarketingFeatures";
import MatchaEducation from "@/components/MatchaEducation";
import CafeB2B from "@/components/CafeB2B";

export default function Home() {
  return (
    <main>
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
