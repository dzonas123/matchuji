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
        id: "matcha-metlicka",
        name: "Bambusová metlička (chasen)",
        description: "Tradiční metlička (chasen) vyrobená ze 100 bambusových jehel. Nezbytný pomocník pro vyšlehání dokonalé krémové pěny a plné uvolnění chuti čaje matcha.",
        price: 189,
        originalPrice: 249,
        image: "/images/matcha-chasen.jpg",
        tag: "Doporučujeme",
        rating: 5,
        reviews: 18
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
