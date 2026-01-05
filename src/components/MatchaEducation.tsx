"use client";

import Image from "next/image";
import styles from "./MatchaEducation.module.css";
import { motion } from "framer-motion";

export default function MatchaEducation() {
    return (
        <section className={styles.section} id="education">
            <div className={styles.container}>

                {/* Block 1: What is Matcha */}
                <div className={styles.row}>
                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Reusing existing images for now, ideally 'field' or 'powder' */}
                        <Image
                            src="/images/matcha-lifestyle.jpg"
                            alt="Matcha Preparation"
                            fill
                            className={styles.image}
                        />
                    </motion.div>

                    <motion.div
                        className={styles.textContent}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.label}>Původ & Historie</span>
                        <h2 className={styles.title}>Zelené zlato z Uji</h2>
                        <p className={styles.paragraph}>
                            Matcha není obyčejný čaj. Je to 800 let starý japonský rituál.
                            Listy Tencha jsou týdny před sklizní zastíněny, což nutí rostlinu produkovat
                            masivní množství chlorofylu a aminokyselin.
                        </p>
                        <p className={styles.paragraph}>
                            Po sklizni se napaří, vysuší a pomaluemelou na žulových kamenech na
                            smaragdově zelený prášek. Pijete tak celý list, ne jen výluh.
                        </p>
                    </motion.div>
                </div>

                {/* Block 2: Benefits */}
                <div className={styles.benefitsSection}>
                    <h2 className={styles.benefitsTitle}>Vaše superschopnost v šálku</h2>
                    <div className={styles.grid}>
                        <motion.div
                            className={styles.card}
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className={styles.icon}>⚡️</span>
                            <h3 className={styles.cardTitle}>Energie bez propadu</h3>
                            <p className={styles.cardText}>
                                Kombinace kofeinu a L-theaninu zajišťuje stabilní příval energie
                                ("Zen Focus") po dobu 4-6 hodin. Žádné bušení srdce, žádný "crash" jako po kávě.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.card}
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className={styles.icon}>🛡️</span>
                            <h3 className={styles.cardTitle}>Imunitní štít</h3>
                            <p className={styles.cardText}>
                                Matcha obsahuje 137x více antioxidantů (EGCG) než běžný zelený čaj.
                                Posiluje imunitu, zrychluje metabolismus a detoxikuje tělo.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.card}
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className={styles.icon}>🧘</span>
                            <h3 className={styles.cardTitle}>Rituál klidu</h3>
                            <p className={styles.cardText}>
                                Příprava matchy je momentem pro vás. Zastavte se v uspěchaném dni,
                                nadechněte se vůně a vychutnejte si přítomný okamžik.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Block 3: Preparation? Or Grades? Let's check user request "reasons". Done. */}
            </div>
        </section>
    );
}
