"use client";

import styles from "./CafeB2B.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "./ProductCard";

export default function CafeB2B() {
    return (
        <section className={styles.section} id="cafe-b2b">
            <div className={styles.container}>
                <div className={styles.textSide}>
                    <span className={styles.headerLabel}>Pro kavárny & Firmy</span>
                    <h2 className={styles.title}>Nabídněte tu <span className={styles.underline}>nejlepší matchu</span> ve městě</h2>
                    <p className={styles.description}>
                        Hledáte spolehlivého dodavatele prémiové matchy pro vaši kavárnu,
                        bistro nebo kancelář? Spolupracujeme s více než 50 podniky v ČR.
                    </p>

                    <div className={styles.b2bTableWrapper}>
                        <h3 className={styles.tableTitle}>B2B Velkoobchodní Ceník</h3>
                        <table className={styles.b2bTable}>
                            <thead>
                                <tr>
                                    <th>Množství</th>
                                    <th>Sleva</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nad 500 g</td>
                                    <td><strong>15 %</strong></td>
                                </tr>
                                <tr>
                                    <td>Nad 1 kg</td>
                                    <td><strong>20 %</strong></td>
                                </tr>
                                <tr>
                                    <td>Nad 2 kg</td>
                                    <td><strong>25 %</strong></td>
                                </tr>
                                <tr className={styles.highlightRow}>
                                    <td>4 kg a více</td>
                                    <td><strong>30 %</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className={styles.tableNote}>Pro velkoobchodní objednávky nás prosím kontaktujte e-mailem.</p>
                    </div>
                </div>

                <div className={styles.sampleSide}>
                    <div className={styles.sampleHeader}>
                        <h3>Otestujte kvalitu sami</h3>
                        <p>Zkuste naše testovací vzorky za 149 Kč. Obsahují naši standardní matchu a 2 vyšší třídy až do kvality 9A.</p>
                    </div>
                    <div className={styles.cardWrapper}>
                        <ProductCard product={{
                            id: "b2b-samples",
                            name: "B2B Testovací Vzorky (vč. 9A kvality)",
                            description: "Testovací sada pro kavárny. Standardní kvalita + 2 vyšší třídy (až 9A) pro porovnání chuti a výběr ideálního produktu.",
                            price: 149,
                            image: "/images/matcha-farm-uji.jpg",
                            tag: "Pro kavárny",
                            rating: 5,
                            reviews: 0
                        }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
