"use client";

import styles from "./LifestyleHero.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const LeafIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3C21 3 21 10 15 15C9 20 3 21 3 21C3 21 3 14 9 9C15 4 21 3 21 3Z" stroke="none" />
        <path d="M21 3C21 3 9 14 3 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export default function LifestyleHero() {
    const featuredProduct = {
        id: "matcha-50g-hero",
        name: "Ceremoniální Matcha 50g",
        description: "Ideální pro začátečníky. Jemná chuť, vysoká kvalita.",
        price: 297,
        originalPrice: 390,
        image: "/images/matcha-bag-single.jpg",
        tag: "Bestseller",
        rating: 5,
        reviews: 128
    };

    // Tone down: fewer leaves (20), slower, subtler opacity
    const leaves = [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotate: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.5,
        duration: 15 + Math.random() * 20, // Slower movement
        delay: Math.random() * 10
    }));

    return (
        <section className={styles.section}>
            <div className={styles.bgContainer}>
                <div className={styles.blob1} />
                <div className={styles.blob2} />

                {leaves.map((leaf) => (
                    <motion.div
                        key={leaf.id}
                        className={styles.floatingLeaf}
                        style={{
                            left: `${leaf.x}%`,
                            top: `${leaf.y}%`,
                        }}
                        animate={{
                            y: [0, -120, 0],
                            x: [0, 40, -40, 0],
                            rotate: [leaf.rotate, leaf.rotate + 360],
                            opacity: [0, 0.6, 0], // Subtle peak opacity
                            scale: [leaf.scale, leaf.scale * 1.2, leaf.scale]
                        }}
                        transition={{
                            duration: leaf.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: leaf.delay
                        }}
                    >
                        <LeafIcon className={styles.leafIcon} />
                    </motion.div>
                ))}
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            ORIGINÁL Z UJI, JAPONSKO
                        </div>
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        ENERGIE,<br />
                        <span className={styles.titleHighlight}>KTERÁ VYDRŽÍ.</span>
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Zapomeňte na kávové propady. <br />
                        Ceremoniální Matcha Premium 7A vám dodá
                        <strong> stabilní soustředění až na 6 hodin</strong>.
                        Čistá mysl, žádný stres.
                    </motion.p>

                    <motion.div
                        className={styles.ctaGroup}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link href="#products" className={styles.btnPrimary}>
                            Chci energii
                        </Link>
                        <Link href="/pro-kavarny" className={styles.btnSecondary}>
                            Pro kavárny
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.visual}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    <div className={styles.productCardWrapper}>
                        <ProductCard product={featuredProduct} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
