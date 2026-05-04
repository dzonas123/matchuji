"use client";

import Image from "next/image";
import styles from "./BentoGrid.module.css";
import { motion } from "framer-motion";

export default function BentoGrid() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Objevte svět Matcha
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Od ceremoniální kvality po sady pro začátečníky.
                        Každý produkt je pečlivě vybrán pro váš dokonalý rituál.
                    </motion.p>
                </div>

                <div className={styles.grid}>
                    {/* Large Featured Card */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.tag}>Bestseller</div>
                        <Image
                            src="/images/matcha-lifestyle.jpg"
                            alt="Matcha Lifestyle"
                            width={800}
                            height={800}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Matcha Starter Kit</h3>
                            <p className={styles.cardPrice}>890 Kč</p>
                        </div>
                    </motion.div>

                    {/* Medium Card Top Right */}
                    <motion.div
                        className={`${styles.card} ${styles.cardMedium}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.tag}>Novinka</div>
                        <Image
                            src="/images/matcha-bag-single.jpg"
                            alt="Matcha Bag"
                            width={600}
                            height={400}
                            className={styles.cardImage}
                            style={{ objectFit: "contain", padding: "2rem" }}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Ceremoniální Matcha 7A</h3>
                            <p className={styles.cardPrice}>259 Kč</p>
                        </div>
                    </motion.div>

                    {/* Small Card Bottom Right 1 */}
                    <motion.div
                        className={`${styles.card} ${styles.cardSmall}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Image
                            src="/images/matcha-spoon.png"
                            alt="Chasen Whisk"
                            width={400}
                            height={400}
                            className={styles.cardImage}
                            style={{ objectFit: "contain", padding: "1rem" }}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle} style={{ fontSize: "1.2rem" }}>Bambusová lžička</h3>
                            <p className={styles.cardPrice}>120 Kč</p>
                        </div>
                    </motion.div>

                    {/* Small Card Bottom Right 2 */}
                    <motion.div
                        className={`${styles.card} ${styles.cardSmall}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Image
                            src="/images/matcha-premium-3ks.jpg"
                            alt="Bundle"
                            width={400}
                            height={400}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle} style={{ fontSize: "1.2rem" }}>Výhodné balení</h3>
                            <p className={styles.cardPrice}>672 Kč</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

