"use client";

import styles from "./ProductsSection.module.css";
import ProductCard from "./ProductCard";

const products = [
    {
        id: "matcha-50g",
        name: "Ceremoniální Matcha 50g",
        description: "Ideální pro začátečníky. Jemná chuť, vysoká kvalita.",
        price: 297,
        originalPrice: 390,
        image: "/images/matcha-bag-single.jpg",
        tag: "Bestseller",
        rating: 5,
        reviews: 128
    },
    {
        id: "matcha-3pack",
        name: "Matcha Bundle 3-Pack",
        description: "Zásoba energie na 3 měsíce. Ušetříte 15%.",
        price: 769,
        originalPrice: 1197,
        image: "/images/matcha-premium-3ks.jpg",
        tag: "Nejvýhodnější",
        rating: 5,
        reviews: 45
    },
    {
        id: "matcha-set-bamboo",
        name: "Bambusový Matcha Set (4ks)",
        description: "Tradiční kompletní set pro přípravu matchy. Obsahuje metličku (chasen), čajovou lžičku, naběračku a sítko.",
        price: 349,
        originalPrice: 490,
        image: "/images/matcha-set-1.jpg",
        tag: "Novinka",
        rating: 5,
        reviews: 12
    }
];

export default function ProductsSection() {
    return (
        <section className={styles.section} id="products">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Vyberte si svou energii</h2>
                    <p className={styles.subtitle}>Prémiová kvalita přímo z Uji, Japonsko.</p>
                </div>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.cardWrapper}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
