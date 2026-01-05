"use client";

import styles from "./MarketingFeatures.module.css";
import { motion } from "framer-motion";

const Icons = {
    Leaf: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.79 10-6 10a7 7 0 0 1-3.95-2.05" />
            <path d="M11 15v5" />
        </svg>
    ),
    Zap: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    Trophy: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    )
};

export default function MarketingFeatures() {
    return (
        <section className={styles.section} id="why-us">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>Proč zvolit Matchuji?</h2>
                    <p className={styles.subtitle}>
                        Dovážíme tu nejkvalitnější matchu přímo od farmářů z Uji.
                        Žádné prostředníci, jen čistá energie a chuť.
                    </p>
                </div>

                <div className={styles.grid}>
                    <motion.div
                        className={styles.feature}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.iconWrapper}><Icons.Leaf /></div>
                        <h3 className={styles.featureTitle}>100% BIO Kvalita</h3>
                        <p className={styles.featureText}>
                            Naše matcha je pěstována bez pesticidů a herbicidů.
                            Garantujeme čistotu a organický původ každé šarže.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.feature}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.iconWrapper}><Icons.Zap /></div>
                        <h3 className={styles.featureTitle}>Stabilní Energie</h3>
                        <p className={styles.featureText}>
                            Díky L-theaninu se energie uvolňuje postupně až 6 hodin.
                            Žádné nervózní "jitters" jako u kávy.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.feature}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={styles.iconWrapper}><Icons.Trophy /></div>
                        <h3 className={styles.featureTitle}>Největší Experti</h3>
                        <p className={styles.featureText}>
                            Jsme jedničkou na trhu v České republice.
                            Důvěřují nám tisíce zákazníků i desítky kaváren.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
