"use client";

import Image from "next/image";
import styles from "./LandingHero.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function LandingHero() {
    const { addItem } = useCart();
    const [sku, setSku] = useState<"single" | "pack3">("single");
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const item = sku === "single"
            ? {
                id: "matcha-50g",
                name: "Ceremoniální Matcha (50g)",
                price: 259.00,
                image: "/images/matcha-bag-single.jpg"
            }
            : {
                id: "matcha-50g-pack3",
                name: "Matcha Výhodné Balení 3ks (150g)",
                price: 672.00,
                image: "/images/matcha-premium-3ks.jpg"
            };

        for (let i = 0; i < quantity; i++) {
            addItem(item);
        }
    };

    const currentPrice = sku === "single" ? 259 : 672;
    // const originalPrice = sku === "single" ? 399 : 1197;
    const currentImage = sku === "single" ? "/images/matcha-bag-single.jpg" : "/images/matcha-premium-3ks.jpg";

    return (
        <section className={styles.hero}>
            {/* Background Atmosphere */}
            <div className={styles.bigTextLayer}>
                <h1 className={styles.bigText}>MATCHUJI</h1>
            </div>

            <div className={styles.container}>
                {/* Left Side: Brand & Intro */}
                <div className={styles.sideContent}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className={styles.verticalTagline}>
                            JUST<br />
                            <span className={styles.highlight}>PURE</span><br />
                            ENERGY
                        </h2>
                        <p className={styles.description}>
                            Prémiová ceremoniální matcha z Uji.
                            <br />Jemná chuť, maximální soustředění.
                        </p>
                    </motion.div>
                </div>

                {/* Center: Dynamic Product Image */}
                <div className={styles.centerStage}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={sku}
                            initial={{ opacity: 0, y: 20, rotate: -5 }}
                            animate={{ opacity: 1, y: 0, rotate: -15 }}
                            exit={{ opacity: 0, y: -20, rotate: -25 }}
                            transition={{ duration: 0.5 }}
                            className={styles.imageWrapper}
                        >
                            <Image
                                src={currentImage}
                                alt="Matcha Product"
                                fill
                                style={{ objectFit: 'contain' }}
                                className={styles.floatingProduct}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Functional UI Cards (Glassmorphism) */}
                <div className={styles.uiOverlay}>

                    {/* Variant Selector Card */}
                    <motion.div
                        className={styles.controlCard}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className={styles.cardHeader}>Vyberte variantu</h3>
                        <div className={styles.variantToggle}>
                            <button
                                className={`${styles.variantBtn} ${sku === 'single' ? styles.active : ''}`}
                                onClick={() => setSku('single')}
                            >
                                <span className={styles.variantTitle}>Single Bag</span>
                                <span className={styles.variantDetail}>50g</span>
                            </button>
                            <button
                                className={`${styles.variantBtn} ${sku === 'pack3' ? styles.active : ''}`}
                                onClick={() => setSku('pack3')}
                            >
                                <span className={styles.variantTitle}>3-Pack Bundle</span>
                                <span className={styles.variantDetail}>Ušetříte 525 Kč</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Purchase Card */}
                    <motion.div
                        className={`${styles.controlCard} ${styles.purchaseCard}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={styles.priceSection}>
                            <span className={styles.priceLabel}>Cena</span>
                            <span className={styles.priceValue}>{currentPrice} Kč</span>
                        </div>

                        <div className={styles.actionsRow}>
                            <div className={styles.quantityControl}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                                Do košíku
                                <span className={styles.cartIcon}>+</span>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
