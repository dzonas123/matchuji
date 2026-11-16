"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import styles from "./CartDrawer.module.css";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, savings } = useCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
                onClick={() => setIsOpen(false)}
            />

            <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2>Váš košík</h2>
                    <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                        ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Váš košík je prázdný.</p>
                        <button onClick={() => setIsOpen(false)} className={styles.continueButton}>
                            Pokračovat v nákupu
                        </button>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressLabel}>
                                {total >= 800 ? (
                                    <span>🎉 Dopravu máte zdarma!</span>
                                ) : (
                                    <span>Chybí {800 - total} Kč do dopravy zdarma</span>
                                )}
                                <span>{Math.min(100, (total / 800) * 100).toFixed(0)}%</span>
                            </div>
                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${Math.min(100, (total / 800) * 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className={styles.loyaltyInfo}>
                            <span className={styles.giftIcon}>🎁</span>
                            <span><strong>10% sleva na další nákup</strong> je vaše!<br />Kód najdete v balení.</span>
                        </div>

                        <div className={styles.items}>
                            {items.map((item) => (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className={styles.image}
                                        />
                                    </div>
                                    <div className={styles.details}>
                                        <h3>{item.name}</h3>
                                        <div className={styles.priceContainer}>
                                            <p className={styles.price}>{item.price.toFixed(0)} Kč</p>
                                            {item.originalPrice && item.originalPrice > item.price && (
                                                <>
                                                    <p className={styles.originalPrice}>{item.originalPrice.toFixed(0)} Kč</p>
                                                    <span className={styles.discountBadge}>
                                                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <div className={styles.controls}>
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.total}>
                                <span>Celkem</span>
                                <div className={styles.totalPriceGroup}>
                                    {savings > 0 && (
                                        <span className={styles.totalOriginal}>{(total + savings).toFixed(2)} Kč</span>
                                    )}
                                    <span className={styles.totalFinal}>{total.toFixed(2)} Kč</span>
                                </div>
                            </div>
                            <Link href="/checkout">
                                <button className={styles.checkoutButton} onClick={() => setIsOpen(false)}>
                                    K pokladně
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
