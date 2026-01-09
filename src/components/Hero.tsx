"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const { addItem } = useCart();
    const [sku, setSku] = useState<"single" | "pack3">("single");
    const [quantity, setQuantity] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    // Dynamic images based on SKU selection
    const singleImages = [
        "/images/matcha-50g-1.jpg",
        "/images/matcha-50g-2.jpg",
        "/images/matcha-50g-3.jpg",
        "/images/matcha-50g-4.jpg"
    ];

    const bundleImages = [
        "/images/matcha-bundle-3pack.jpg",
        "/images/matcha-50g-1.jpg",
        "/images/matcha-50g-2.jpg"
    ];


    const currentGallery = sku === "single" ? singleImages : bundleImages;

    useEffect(() => {
        setMounted(true);
        // Reset to first image when sku changes
        setActiveImage(0);
    }, [sku]);

    const handleAddToCart = () => {
        const item = sku === "single"
            ? {
                id: "matcha-50g",
                name: "Ceremoniální Matcha (50g)",
                price: 297.00,
                originalPrice: 399.00,
                image: "/images/matcha-50g-1.jpg"
            }

            : {
                id: "matcha-50g-pack3",
                name: "Matcha Výhodné Balení 3ks (150g)",
                price: 769.00,
                originalPrice: 1197.00,
                image: "/images/matcha-bundle-3pack.jpg"
            };

        for (let i = 0; i < quantity; i++) {
            addItem(item);
        }
    };

    const getDeliveryDate = () => {
        if (!mounted) return "...";
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'numeric' });
    };

    const currentPrice = sku === "single" ? 297 : 769;
    const originalPrice = sku === "single" ? 399 : 1197;


    // Savings constants
    const singleSavings = 399 - 297;
    const pack3Savings = 1197 - 769;

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <motion.div
                    className={styles.imageGallery}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.mainImageWrapper}>
                        <div className={styles.ratingBadge}>
                            <span className={styles.ratingScore}>A</span>
                            <span className={styles.ratingLabel}>NutraSkóre</span>
                        </div>
                        <Image
                            src={currentGallery[activeImage]}
                            alt="Prémiová Matcha"
                            width={500}
                            height={500}
                            className={styles.productImage}
                            priority
                        />
                    </div>
                    <div className={styles.thumbnails}>
                        {currentGallery.map((img, idx) => (
                            <button
                                key={idx}
                                className={`${styles.thumbnail} ${activeImage === idx ? styles.activeThumb : ""}`}
                                onClick={() => setActiveImage(idx)}
                            >
                                <Image src={img} alt="Náhled" width={80} height={80} className={styles.thumbImage} />
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className={styles.productInfo}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={styles.brand}>Matchuji Premium</div>
                    <h1 className={styles.title}>Matcha Premium 7A<br />Ceremoniální Kvalita</h1>

                    <div className={styles.reviews}>
                        <a href="#reviews" className={styles.reviewsLink}>
                            <span className={styles.stars}>★★★★★</span>
                            <span className={styles.reviewCount}>(450+ ověřených recenzí)</span>
                        </a>
                    </div>

                    <p className={styles.shortDescription}>
                        <strong>Kvalita 7A Ceremoniální třídy.</strong> Organická matcha z Uji, Japonsko. Známá svou zářivě zelenou barvou a jemnou, přirozeně nasládlou chutí bez hořkosti. Zažijte ten nejvyšší dostupný přísun antioxidantů.
                    </p>

                    <div className={styles.priceBox}>
                        <div className={styles.priceRow}>
                            <span className={styles.currentPrice}>{currentPrice} Kč</span>
                            <span className={styles.originalPrice}>{originalPrice} Kč</span>
                            <span className={styles.discountBadge}>
                                -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                            </span>
                        </div>
                        <div className={styles.unitRow}>
                            <div className={styles.stockStatus}>
                                <span className={styles.dot}></span> Skladem
                            </div>
                        </div>
                    </div>

                    <div className={styles.variants}>
                        <label className={`${styles.variant} ${sku === "single" ? styles.activeVariant : ""}`}>
                            <input
                                type="radio"
                                name="sku"
                                checked={sku === "single"}
                                onChange={() => setSku("single")}
                            />
                            <span className={styles.variantName}>Jedno balení (50g)</span>
                        </label>
                        <label className={`${styles.variant} ${sku === "pack3" ? styles.activeVariant : ""}`}>
                            <input
                                type="radio"
                                name="sku"
                                checked={sku === "pack3"}
                                onChange={() => setSku("pack3")}
                            />
                            <div className={styles.variantInfo}>
                                <div className={styles.variantText}>
                                    <span className={styles.variantName}>Výhodné balení 3ks</span>
                                    <span className={styles.variantSub}>Ideální pro každý den</span>
                                </div>
                                <span className={styles.saveLabel}>Ušetříte {pack3Savings} Kč</span>
                            </div>
                        </label>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.quantity}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input type="number" min="1" value={quantity} readOnly />
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button className={styles.addToCartButton} onClick={handleAddToCart}>
                            <span className={styles.cartIcon}>+</span>
                            Přidat do košíku
                        </button>
                    </div>

                    <div className={styles.trustSignals}>
                        <div className={styles.signal}>
                            <span className={styles.truckIcon}>🚚</span>
                            <div>
                                <strong>Doprava zdarma nad 800 Kč</strong>
                                <p>Doručení do {getDeliveryDate()}</p>
                            </div>
                        </div>
                        <div className={styles.signal}>
                            <span className={styles.shieldIcon}>💫</span>
                            <div>
                                <strong>Prémiová kvalita 7A</strong>
                                <p>Nejvyšší standard ceremoniální třídy</p>
                            </div>
                        </div>
                        <div className={styles.signal}>
                            <span className={styles.giftIcon}>🎁</span>
                            <div>
                                <strong>10% sleva na další nákup</strong>
                                <p>Věrnostní kód najdete v balíčku</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
