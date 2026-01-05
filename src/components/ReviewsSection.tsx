"use client";

import styles from "./ReviewsSection.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reviews = [
    {
        id: 1,
        name: "Jana K.",
        initial: "J",
        text: "Matchu jsem kupovala běžně za 800 Kč v bio kvalitě, ale tahle od Matchuji za necelé tři stovky je snad ještě lepší. Jemná, sladká, bez hořkosti. Nechápu tu cenu, pecka!",
        rating: 5
    },
    {
        id: 2,
        name: "Petr Svoboda",
        initial: "P",
        text: "Nevěřil jsem, že za takovou cenu dostanu takovou kvalitu. Skvělá chuť, krásně pění. Konečně si můžu dopřát ranní rituál každý den bez výčitek.",
        rating: 5
    },
    {
        id: 3,
        name: "Martina V.",
        initial: "M",
        text: "Chuťově vynikající, úplně jiná liga než ty levné směsi z drogerie. A ta cena je fakt bezkonkurenční. Rychlé doručení taky potěšilo.",
        rating: 5
    },
    {
        id: 4,
        name: "Veronika P.",
        initial: "V",
        text: "Dělám si z ní matcha latte každé ráno a ta barva je neskutečná! Zářivě zelená, žádná šedá nebo hnědá jako u konkurence. Všem doporučuji.",
        rating: 5
    },
    {
        id: 5,
        name: "Tomáš H.",
        initial: "T",
        text: "Vyměnil jsem kafe za tuhle matchu a cítím se mnohem líp. Energie mi vydrží celé dopoledne a nemám ten nervózní třes. Super produkt.",
        rating: 5
    },
    {
        id: 6,
        name: "Lucie Králová",
        initial: "L",
        text: "Objednala jsem rovnou to výhodné balení 3ks a nelituji. Balíček přišel hned druhý den a ještě tam byl dárek. Jste skvělí, díky!",
        rating: 5
    }
];

export default function ReviewsSection() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className={styles.section} id="reviews">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Co říkají naši zákazníci</h2>
                    <p className={styles.subtitle}>Přidejte se k více než 450+ spokojeným milovníkům Matchy</p>
                </div>

                <div className={styles.grid}>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.stars}>★★★★★</div>
                            <p className={styles.text}>"{review.text}"</p>
                            <div className={styles.author}>
                                <div className={styles.avatar}>{review.initial}</div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.name}>{review.name}</span>
                                    <span className={styles.verified}>Ověřený nákup</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        className={styles.writeReviewBtn}
                        onClick={() => setIsFormOpen(!isFormOpen)}
                    >
                        {isFormOpen ? 'Zavřít formulář' : 'Napsat recenzi'}
                    </button>
                </div>

                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); alert("Děkujeme! Vaše recenze byla odeslána ke schválení."); setIsFormOpen(false); }}>
                                <div className={styles.row}>
                                    <input type="text" placeholder="Vaše jméno" className={styles.input} required />
                                    <select className={styles.select}>
                                        <option value="5">★★★★★ (5/5)</option>
                                        <option value="4">★★★★☆ (4/5)</option>
                                        <option value="3">★★★☆☆ (3/5)</option>
                                    </select>
                                </div>
                                <textarea placeholder="Vaše zkušenost..." className={styles.textarea} required />
                                <button type="submit" className={styles.submitBtn}>Odeslat recenzi</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
