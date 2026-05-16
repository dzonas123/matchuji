"use client";

import styles from "./ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const Icons = {
    Star: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Cart: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    )
};

type ProductProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    tag?: string;
    rating?: number;
    reviews?: number;
};

export default function ProductCard({ product }: { product: ProductProps }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image
        });
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Default rating if not provided
    const rating = product.rating || 5;
    const reviews = product.reviews || 0;

    const isB2B = product.id === "b2b-samples";
    const productLink = product.id === "matcha-set-bamboo" ? "/product/matcha-set-bamboo" : "/product/ceremonial-matcha";

    const ImageWrapper = () => (
        <div className={styles.imageWrapper}>
            <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.image}
            />
        </div>
    );

    const TitleWrapper = () => (
        <h3 className={styles.productName}>{product.name}</h3>
    );

    return (
        <motion.div
            className={styles.card}
            whileHover={{ y: -5 }}
            transition={{ type: "tween" as const, duration: 0.2 }}
        >
            {product.tag && <span className={styles.tag}>{product.tag}</span>}
            {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}

            {isB2B ? (
                <div className={styles.imageLink}><ImageWrapper /></div>
            ) : (
                <Link href={productLink} className={styles.imageLink}><ImageWrapper /></Link>
            )}

            <div className={styles.info}>
                <div className={styles.ratingRow}>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <Icons.Star key={i} />
                        ))}
                    </div>
                    {reviews > 0 && <span className={styles.reviewCount}>({reviews})</span>}
                </div>

                {isB2B ? (
                    <div className={styles.titleLink}><TitleWrapper /></div>
                ) : (
                    <Link href={productLink} className={styles.titleLink}><TitleWrapper /></Link>
                )}

                <p className={styles.productDesc}>{product.description}</p>

                <div className={styles.priceRow}>
                    <span className={styles.price}>{product.price} Kč</span>
                    {product.originalPrice && (
                        <>
                            <span className={styles.originalPrice}>{product.originalPrice} Kč</span>
                            <span className={styles.discountLabel}>-{discount}%</span>
                        </>
                    )}
                </div>

                <div className={styles.actions} style={isB2B ? { display: 'flex' } : {}}>
                    {!isB2B && (
                        <Link href={productLink} className={styles.btnDetail}>
                            Detail produktu
                        </Link>
                    )}
                    <button
                        className={styles.btnCart}
                        onClick={handleAddToCart}
                        aria-label="Přidat do košíku"
                        style={isB2B ? { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' } : {}}
                    >
                        <Icons.Cart /> {isB2B && "Přidat do košíku"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
