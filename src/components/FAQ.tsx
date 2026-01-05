"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

const faqs = [
    {
        question: "Jak chutná vaše Matcha Premium 7A?",
        answer: "Naše Matcha má jemnou, krémovou a přirozeně nasládlou chuť (umami). Díky vysoké ceremoniální kvalitě (7A) v ní nenajdete žádnou trpkost či hořkost, která je typická pro levnější kuchyňské druhy."
    },
    {
        question: "Obsahuje Matcha kofein?",
        answer: "Ano, Matcha obsahuje kofein (tein), ale působí jinak než káva. Díky aminokyselině L-theaninu se energie uvolňuje postupně po dobu 4–6 hodin. Nedochází tak k nervozitě ani náhlému poklesu energie (crash efektu)."
    },
    {
        question: "Jak dlouho mi vydrží jedno 50g balení?",
        answer: "Při doporučené dávce 1,5–2g na porci vám jedno balení vydrží na přibližně 25–30 šálků. Pokud si dáváte Matchu každý den, vystačí vám balení na měsíc."
    },
    {
        question: "Je vaše Matcha BIO / Organická?",
        answer: "Ano, naše Matcha pochází z certifikovaného organického pěstování v oblasti Uji v Japonsku. Nepoužíváme žádná hnojiva ani pesticidy. Jde o 100% čistý zelený čaj."
    },
    {
        question: "Jak rychle mi zboží doručíte?",
        answer: "Objednávky přijaté do 12:00 odesíláme týž den. Zpravidla máte balíček doma do 1–2 pracovních dnů. Využíváme spolehlivé dopravce (Zásilkovna, PPL)."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Často kladené otázky</h2>
                    <p className={styles.subtitle}>Vše, co potřebujete vědět o prémiové Matche</p>
                </div>

                <div className={styles.list}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.item}>
                            <button
                                className={`${styles.question} ${activeIndex === index ? styles.active : ''}`}
                                onClick={() => toggleIndex(index)}
                            >
                                {faq.question}
                                <span className={styles.icon}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={styles.answerWrapper}
                                    >
                                        <div className={styles.answer}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
