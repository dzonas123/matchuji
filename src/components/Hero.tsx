"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type HeroVariant = {
    id: string;
    name: string;
    shortName: string;
    price: number;
    originalPrice: number;
    image: string;
    savingsLabel?: string;
    subLabel?: string;
};

export type HeroProps = {
    brand?: string;
    title?: React.ReactNode;
    subtitle?: string;
    images?: string[];
    variants?: HeroVariant[];
    /** Signals displayed below add-to-cart */
    trustSignals?: { icon: string; bold: string; text?: string }[];
    /** Review count label */
    reviewCount?: string;
};

const DEFAULT_IMAGES = [
    "/images/matcha-50g-1.jpg",
    "/images/matcha-50g-2.jpg",
    "/images/matcha-50g-3.jpg",
    "/images/matcha-50g-4.jpg"
];

const DEFAULT_VARIANTS: HeroVariant[] = [
    {
        id: "matcha-50g",
        name: "Ceremoniální Matcha (50g)",
        shortName: "Jedno balení (50g)",
        price: 297,
        originalPrice: 399,
        image: "/images/matcha-50g-1.jpg",
    },
    {
        id: "matcha-50g-pack3",
        name: "Matcha Výhodné Balení 3ks (150g)",
        shortName: "Výhodné balení 3ks",
        price: 769,
        originalPrice: 1197,
        image: "/images/matcha-premium-3ks.jpg",
        savingsLabel: "Ušetříte 428 Kč",
        subLabel: "Ideální pro každý den",
    }
];

const DEFAULT_SIGNALS = [
    { icon: "🚚", bold: "Doprava zdarma nad 800 Kč", text: "" },
    { icon: "💫", bold: "Prémiová kvalita 7A", text: "Nejvyšší standard ceremoniální třídy" },
    { icon: "🎁", bold: "10% sleva na další nákup", text: "Věrnostní kód najdete v balíčku" },
];

export default function Hero({
    brand = "Matchuji Premium",
    title,
    subtitle,
    images,
    variants,
    trustSignals,
    reviewCount = "450+ ověřených recenzí",
}: HeroProps) {
    const { addItem } = useCart();
    const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const resolvedVariants = variants ?? DEFAULT_VARIANTS;
    const resolvedSignals = trustSignals ?? DEFAULT_SIGNALS;
    const selectedVariant = resolvedVariants[selectedVariantIdx];

    // If external images provided use them; otherwise use per-variant logic (legacy matcha behaviour)
    const resolvedImages = images ?? (selectedVariantIdx === 0 ? DEFAULT_IMAGES : [
        "/images/matcha-premium-3ks.jpg",
        "/images/matcha-50g-1.jpg",
        "/images/matcha-50g-2.jpg"
    ]);

    useEffect(() => {
        setMounted(true);
        setActiveImage(0);
    }, [selectedVariantIdx]);

    const getDeliveryDate = () => {
        if (!mounted) return "...";
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "numeric" });
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: selectedVariant.id,
                name: selectedVariant.name,
                price: selectedVariant.price,
                originalPrice: selectedVariant.originalPrice,
                image: selectedVariant.image,
            });
        }
    };

    const discount = Math.round(
        ((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100
    );

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
                        <Image
                            src={resolvedImages[activeImage]}
                            alt={selectedVariant.name}
                            width={500}
                            height={500}
                            className={styles.productImage}
                            priority
                        />
                    </div>
                    <div className={styles.thumbnails}>
                        {resolvedImages.map((img, idx) => (
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
                    <div className={styles.brand}>{brand}</div>
                    <h1 className={styles.title}>
                        {title ?? (<>Matcha Premium 7A<br />Ceremoniální Kvalita</>)}
                    </h1>

                    <div className={styles.reviews}>
                        <a href="#reviews" className={styles.reviewsLink}>
                            <span className={styles.stars}>★★★★★</span>
                            <span className={styles.reviewCount}>({reviewCount})</span>
                        </a>
                    </div>

                    {subtitle && (
                        <p className={styles.shortDescription}>
                            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
                        </p>
                    )}

                    {!subtitle && (
                        <p className={styles.shortDescription}>
                            <strong>Kvalita 7A Ceremoniální třídy.</strong> Organická matcha z Uji, Japonsko. Známá svou zářivě zelenou barvou a jemnou, přirozeně nasládlou chutí bez hořkosti. Zažijte ten nejvyšší dostupný přísun antioxidantů.
                        </p>
                    )}

                    <div className={styles.priceBox}>
                        <div className={styles.priceRow}>
                            <span className={styles.currentPrice}>{selectedVariant.price} Kč</span>
                            <span className={styles.originalPrice}>{selectedVariant.originalPrice} Kč</span>
                            <span className={styles.discountBadge}>-{discount}%</span>
                        </div>
                        <div className={styles.unitRow}>
                            <div className={styles.stockStatus}>
                                <span className={styles.dot}></span> Skladem
                            </div>
                        </div>
                    </div>

                    <div className={styles.variants}>
                        {resolvedVariants.map((variant, idx) => (
                            <label
                                key={variant.id}
                                className={`${styles.variant} ${selectedVariantIdx === idx ? styles.activeVariant : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="sku"
                                    checked={selectedVariantIdx === idx}
                                    onChange={() => setSelectedVariantIdx(idx)}
                                />
                                {variant.savingsLabel || variant.subLabel ? (
                                    <div className={styles.variantInfo}>
                                        <div className={styles.variantText}>
                                            <span className={styles.variantName}>{variant.shortName}</span>
                                            {variant.subLabel && <span className={styles.variantSub}>{variant.subLabel}</span>}
                                        </div>
                                        {variant.savingsLabel && (
                                            <span className={styles.saveLabel}>{variant.savingsLabel}</span>
                                        )}
                                    </div>
                                ) : (
                                    <span className={styles.variantName}>{variant.shortName}</span>
                                )}
                            </label>
                        ))}
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
                        {resolvedSignals.map((s, i) => (
                            <div key={i} className={styles.signal}>
                                <span className={styles.truckIcon}>{s.icon}</span>
                                <div>
                                    <strong>{s.bold}</strong>
                                    {s.text ? <p>{s.text === "__delivery__" ? `Doručení do ${getDeliveryDate()}` : s.text}</p> : null}
                                    {i === 0 && !s.text && <p>Doručení do {getDeliveryDate()}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
