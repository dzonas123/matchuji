"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import styles from "./UpsellModal.module.css";

export default function UpsellModal() {
    const { showUpsell, setShowUpsell, addItem } = useCart();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowUpsell(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [setShowUpsell]);

    const handleAddToCart = () => {
        addItem({
            id: "matcha-set-bamboo",
            name: "Bambusový Matcha Set (4ks)",
            price: 349,
            originalPrice: 490,
            image: "/images/matcha-set-1.jpg",
        });
        setShowUpsell(false);
    };

    return (
        <AnimatePresence>
            {showUpsell && (
                <motion.div
                    ref={overlayRef}
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                        if (e.target === overlayRef.current) setShowUpsell(false);
                    }}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowUpsell(false)}
                            aria-label="Zavřít"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Header text */}
                        <div className={styles.header}>
                            <p className={styles.eyebrow}>🍵 NEZAPOMEŇTE NA PŘÍPRAVU</p>
                            <h2 className={styles.headline}>
                                Matcha je v košíku. <br />
                                <em>Máte správné nástroje na přípravu?</em>
                            </h2>
                            <p className={styles.desc}>
                                Bez tradiční bambusové metličky neuděláte tu správnou krémovou pěnu a bez sítka se nezbavíte hrudek. Přidejte si náš kompletní set a připravte si matchu jako mistr.
                            </p>
                        </div>

                        {/* Product card */}
                        <div className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/matcha-set-1.jpg"
                                    alt="Bambusový Matcha Set"
                                    fill
                                    className={styles.image}
                                />
                                <div className={styles.imageBadge}>-29%</div>
                            </div>

                            <div className={styles.cardBody}>
                                <p className={styles.cardTitle}>Bambusový Matcha Set (4 ks)</p>
                                
                                <div className={styles.chips}>
                                    {["Metlička", "Naběračka", "Lžička", "Sítko"].map((item) => (
                                        <span key={item} className={styles.chip}>{item}</span>
                                    ))}
                                </div>

                                <div className={styles.priceRow}>
                                    <span className={styles.price}>349 Kč</span>
                                    <span className={styles.originalPrice}>490 Kč</span>
                                    <span className={styles.savings}>Ušetříte 141 Kč</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button className={styles.btnAdd} onClick={handleAddToCart}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                Přidat set do košíku
                            </button>
                            <button className={styles.btnDecline} onClick={() => setShowUpsell(false)}>
                                Díky, nepotřebuji
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
