"use client";

import styles from "./ProductDetails.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } }
};

// SVG Icons
const Icons = {
    Energy: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    Focus: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Immunity: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Organic: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.79 10-6 10a7 7 0 0 1-3.95-2.05" />
            <path d="M11 15v5" />
        </svg>
    ),
    Sieve: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h16" /><path d="M4 14h16" /><path d="M10 8v12" /><path d="M14 8v12" />
        </svg>
    ),
    Water: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    ),
    Whisk: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
            <path d="M9 7 3 13" />
        </svg>
    )
};

export default function ProductDetails() {
    return (
        <section id="details" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.benefitsHeader}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Proč Matcha Premium 7A?</h2>
                    <p>Zažijte rozdíl pravé ceremoniální kvality. Přímo z Uji, Kjóto.</p>
                </motion.div>

                <motion.div
                    className={styles.benefitsGrid}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div className={styles.benefitCard} variants={item} whileHover={{ y: -10 }}>
                        <div className={styles.iconWrapper}>
                            <Icons.Energy />
                        </div>
                        <h3>Energie na 6+ hodin</h3>
                        <p>Na rozdíl od kávy obsahuje Matcha L-Theanin, který uvolňuje kofein pomalu. Žádná nervozita, žádný propad – jen 6 hodin klidné, soustředěné energie.</p>
                    </motion.div>

                    <motion.div className={styles.benefitCard} variants={item} whileHover={{ y: -10 }}>
                        <div className={styles.iconWrapper}>
                            <Icons.Focus />
                        </div>
                        <h3>Laserové soustředění</h3>
                        <p>Používáno zenovými mnichy po staletí k podpoře meditace. L-Theanin podporuje alfa mozkové vlny, navozující stav hlubokého soustředění a jasnosti.</p>
                    </motion.div>

                    <motion.div className={styles.benefitCard} variants={item} whileHover={{ y: -10 }}>
                        <div className={styles.iconWrapper}>
                            <Icons.Immunity />
                        </div>
                        <h3>Silná podpora imunity</h3>
                        <p>Jeden šálek matchy má tolik antioxidantů jako 10 šálků běžného zeleného čaje, konkrétně EGCG, které chrání vaše buňky před poškozením.</p>
                    </motion.div>

                    <motion.div className={styles.benefitCard} variants={item} whileHover={{ y: -10 }}>
                        <div className={styles.iconWrapper}>
                            <Icons.Organic />
                        </div>
                        <h3>100% Organické a čisté</h3>
                        <p>Certifikováno jako organické. Pěstováno ve stínu 30 dní před sklizní pro zvýšení chlorofylu. Mleté kamennými mlýny na jemný prášek.</p>
                    </motion.div>
                </motion.div>

                <div className={styles.deepDive}>
                    <div className={styles.deepDiveContent}>
                        <h3>V čem je <span className={styles.highlight}>7A kvalita</span> jiná?</h3>
                        <p className={styles.deepDiveIntro}>
                            Není matcha jako matcha. Naše <strong>ceremoniální třída 7A</strong> představuje to nejlepší horní 1% sklizně.
                        </p>
                        <ul className={styles.featureList}>
                            <li>
                                <span className={styles.featureDot}></span>
                                <div className={styles.featureText}>
                                    <strong>Barva:</strong> Zářivě elektrická zelená
                                </div>
                            </li>
                            <li>
                                <span className={styles.featureDot}></span>
                                <div className={styles.featureText}>
                                    <strong>Textura:</strong> Hedvábně jemná jako pudr
                                </div>
                            </li>
                            <li>
                                <span className={styles.featureDot}></span>
                                <div className={styles.featureText}>
                                    <strong>Chuť:</strong> Sladká umami, bez hořkosti
                                </div>
                            </li>
                        </ul>
                        <p className={styles.deepDiveOutro}>
                            Ideální pro tradiční ceremoniál jen s vodou, nebo pro to nejluxusnější latte.
                        </p>
                    </div>
                    <div className={styles.deepDiveImageWrapper}>
                        <Image
                            src="/images/matcha-lifestyle.jpg"
                            alt="Životní styl Matcha Latte"
                            fill
                            className={styles.lifestyleImage}
                        />
                    </div>
                </div>

                <div className={styles.preparation}>
                    <h2>Jak připravit rituál</h2>
                    <div className={styles.steps}>
                        <div className={styles.stepCard}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIcon}><Icons.Sieve /></div>
                                <span className={styles.stepNumber}>01</span>
                            </div>
                            <h4>Přeosít</h4>
                            <p>Prosejte 1-2 lžičky matchy do misky. Rozbijete tím hrudky a matcha bude dokonale jemná.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIcon}><Icons.Water /></div>
                                <span className={styles.stepNumber}>02</span>
                            </div>
                            <h4>Zalít</h4>
                            <p>Přidejte 60ml vody o teplotě 80°C. Nikdy ne vařící, ta by čaj spálila a zhořkl by.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIcon}><Icons.Whisk /></div>
                                <span className={styles.stepNumber}>03</span>
                            </div>
                            <h4>Šlehat</h4>
                            <p>Šlehejte metličkou ve tvaru "W" asi minutu, dokud nevznikne hustá krémová pěna.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
