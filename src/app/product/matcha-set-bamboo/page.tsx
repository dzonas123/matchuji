"use client";

import Hero from "@/components/Hero";
import ProductDetails from "@/components/ProductDetails";
import ReviewsSection from "@/components/ReviewsSection";
import FAQ from "@/components/FAQ";

export default function BambooSetPage() {
    return (
        <main>
            <Hero
                brand="Matchuji Příslušenství"
                title={<>Bambusový Matcha Set<br />(4 ks)</>}
                subtitle="<strong>Tradiční bambusové nástroje pro dokonalou matchu.</strong> Kompletní sada zahrnuje metličku (chasen), čajovou lžičku, naběračku (chashaku) a jemné nerezové sítko. Vše, co potřebujete pro autentický matcha rituál."
                images={[
                    "/images/matcha-set-1.jpg",
                    "/images/matcha-set-2.jpg",
                    "/images/matcha-set-3.jpg",
                ]}
                variants={[
                    {
                        id: "matcha-set-bamboo",
                        name: "Bambusový Matcha Set (4ks)",
                        shortName: "Kompletní set (4 ks)",
                        price: 349,
                        originalPrice: 490,
                        image: "/images/matcha-set-1.jpg",
                        savingsLabel: "Ušetříte 141 Kč",
                    }
                ]}
                trustSignals={[
                    { icon: "🚚", bold: "Doprava zdarma nad 800 Kč", text: "" },
                    { icon: "🍃", bold: "Tradiční ruční výroba", text: "Řezáno z jednoho kusu kvalitního zlatého bambusu" },
                    { icon: "🎁", bold: "10% sleva na další nákup", text: "Věrnostní kód najdete v balíčku" },
                ]}
                reviewCount="12 ověřených recenzí"
            />

            <ProductDetails
                benefitsTitle="Proč Bambusový Matcha Set?"
                benefitsSubtitle="Správné nástroje jsou klíčem k dokonalé matche. Zažijte tradiční japonský rituál doma."
                benefits={[
                    {
                        icon: "Bamboo",
                        title: "Chasen – bambusová metlička",
                        text: "Ruční metlička ze 100 jehel ze zlatého bambusu vytvoří hedvábně hladkou pěnu. Správná metlička je zásadní pro vytvoření krémové konzistence a plného uvolnění chuti matchy.",
                    },
                    {
                        icon: "Leaf",
                        title: "Chashaku – naběračka",
                        text: "Tradiční bambusová lžička pro přesné dávkování. Jedno plné nabrdnutí odpovídá ideálnímu množství matchy (přibližně 2 g) pro jeden šálek.",
                    },
                    {
                        icon: "Sieve",
                        title: "Nerezové sítko",
                        text: "Jemné sítko z nerezové oceli proseje matchu na ultra-jemný prášek bez hrudek. Výsledkem je dokonale hladký nápoj bez nežádoucích shluků.",
                    },
                    {
                        icon: "Star",
                        title: "Bambusová lžička",
                        text: "Klasická dřevěná lžička pro šetrné míchání a servírování. Ideální doplněk ke každé matcha misce.",
                    },
                ]}
                deepDiveTitle={<>Co dělá <span style={{ color: '#4d7a16', position: 'relative', display: 'inline-block' }}>bambusový set</span> výjimečným?</>}
                deepDiveIntro="Každý nástroj v sadě je pečlivě vyroben z <strong>přírodního zlatého bambusu</strong> dle staletých japonských tradic. Bambusové nástroje jsou přirozeně antibakteriální a šetrné k matche."
                deepDiveFeatures={[
                    { label: "Materiál", value: "100% přírodní zlatý bambus" },
                    { label: "Metlička (chasen)", value: "100 jehel pro dokonalou pěnu" },
                    { label: "Sítko", value: "Nerezová ocel, snadno omyvatelné" },
                ]}
                deepDiveOutro="Ideální jako dárek pro milovníky matchy nebo jako upgrade vašeho každodenního rituálu."
                deepDiveImage="/images/matcha-set-2.jpg"
                deepDiveImageAlt="Bambusový Matcha Set – detail"
                certLink={false}
                preparationTitle="Jak použít set"
                steps={[
                    {
                        icon: "Sieve",
                        number: "01",
                        title: "Přeosít sítkem",
                        text: "Prosejte 1-2 chashaku matchy sítkem do misky. Rozbijete tím hrudky a matcha bude dokonale jemná.",
                    },
                    {
                        icon: "Water",
                        number: "02",
                        title: "Zalít vodou",
                        text: "Přidejte 60ml vody o teplotě 80°C. Nikdy ne vařící – ta by čaj spálila a zhořkl by.",
                    },
                    {
                        icon: "Whisk",
                        number: "03",
                        title: "Šlehat chasen",
                        text: "Šlehejte bambusovou metličkou ve tvaru \"W\" asi minutu, dokud nevznikne hustá, krémová pěna.",
                    },
                ]}
            />

            <ReviewsSection />
            <FAQ />
        </main>
    );
}
