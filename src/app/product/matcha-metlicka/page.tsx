"use client";

import Hero from "@/components/Hero";
import ProductDetails from "@/components/ProductDetails";
import ReviewsSection from "@/components/ReviewsSection";
import FAQ from "@/components/FAQ";

export default function BambooWhiskPage() {
    return (
        <main>
            <Hero
                brand="Matchuji Příslušenství"
                title={<>Bambusová metlička<br />(chasen)</>}
                subtitle="<strong>Tradiční bambusový pomocník pro dokonalé vyšlehání.</strong> Metlička chasen vyrobená ze 100 jemných jehel z jednoho kusu zlatého bambusu. Vytvoří hedvábně jemnou nefritovou pěnu a plně rozvine chuť vaší matchy."
                images={[
                    "/images/matcha-chasen.jpg",
                ]}
                variants={[
                    {
                        id: "matcha-metlicka",
                        name: "Bambusová metlička (chasen)",
                        shortName: "Tradiční metlička chasen",
                        price: 189,
                        originalPrice: 249,
                        image: "/images/matcha-chasen.jpg",
                        savingsLabel: "Ušetříte 60 Kč",
                    }
                ]}
                trustSignals={[
                    { icon: "🚚", bold: "Doprava zdarma nad 800 Kč", text: "" },
                    { icon: "🍃", bold: "Tradiční ruční výroba", text: "Řezáno z jednoho kusu kvalitního zlatého bambusu" },
                    { icon: "🎁", bold: "10% sleva na další nákup", text: "Věrnostní kód najdete v balíčku" },
                ]}
                reviewCount="18 ověřených recenzí"
            />

            <ProductDetails
                benefitsTitle="Proč Bambusová Metlička Chasen?"
                benefitsSubtitle="Tradiční nástroj je klíčem k dokonalé matche. Zažijte autentický japonský čajový rituál doma."
                benefits={[
                    {
                        icon: "Bamboo",
                        title: "100 bambusových jehel",
                        text: "Ruční metlička ze 100 jehel ze zlatého bambusu vytvoří tu nejjemnější, hedvábně hladkou pěnu. Správná metlička je zásadní pro plné uvolnění chuti matchy.",
                    },
                    {
                        icon: "Leaf",
                        title: "Tradiční ruční práce",
                        text: "Každá metlička je pečlivě vyřezána z jednoho kusu vysoce kvalitního a vyzrálého bambusu čajovými mistry s dlouholetou tradicí.",
                    },
                    {
                        icon: "Star",
                        title: "Zvýraznění chuti a pěny",
                        text: "Díky flexibilním jehlám metlička dokonale promíchá jemný matcha prášek s vodou bez kovové pachuti a zachová plný antioxidační profil.",
                    },
                    {
                        icon: "Organic",
                        title: "100% Přírodní materiál",
                        text: "Zlatý bambus je ekologický a přirozeně antibakteriální materiál. Neobsahuje žádné chemikálie, laky, plasty ani lepidla.",
                    },
                ]}
                deepDiveTitle={<>Co dělá <span style={{ color: '#4d7a16', position: 'relative', display: 'inline-block' }}>metličku chasen</span> výjimečnou?</>}
                deepDiveIntro="Metlička chasen je po staletí nejdůležitějším nástrojem při japonském čajovém obřadu. Správným šleháním docílíte nejen husté pěny, ale i dokonale krémové a sladké chuti čaje bez nežádoucích hrudek."
                deepDiveFeatures={[
                    { label: "Materiál", value: "100% přírodní zlatý bambus" },
                    { label: "Počet jehel", value: "100 pro extra jemnou a hustou pěnu" },
                    { label: "Trvanlivost", value: "Vysoká při správném sušení a péči" },
                ]}
                deepDiveOutro="Nepostradatelný společník pro každého milovníka tradiční přípravy matchy nebo pro to nejluxusnější domácí matcha latte."
                deepDiveImage="/images/matcha-chasen.jpg"
                deepDiveImageAlt="Bambusová metlička chasen"
                certLink={false}
                preparationTitle="Jak správně používat metličku"
                steps={[
                    {
                        icon: "Water",
                        number: "01",
                        title: "Namočit štětiny",
                        text: "Před šleháním ponořte metličku chasen na chvíli do teplé vody. Jehly změknou a budou ohebnější, což prodlouží jejich životnost.",
                    },
                    {
                        icon: "Sieve",
                        number: "02",
                        title: "Přeosít a zalít",
                        text: "Prosejte 1-2 bambusové lžičky matchy do misky, zalijte 60ml vody o teplotě 75-80°C. Nikdy nepoužívejte vroucí vodu.",
                    },
                    {
                        icon: "Whisk",
                        number: "03",
                        title: "Šlehat do tvaru W",
                        text: "Uvolněte zápěstí a šlehejte rychlým kmitavým pohybem ve tvaru písmene \"W\" nebo \"M\" po dobu 30-40 vteřin, dokud nevznikne hustá pěna.",
                    },
                ]}
            />

            <ReviewsSection />
            <FAQ />
        </main>
    );
}
