"use client";

import styles from "./CafeB2B.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

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

                    <div className={styles.list}>
                        <div className={styles.listItem}>
                            <span className={styles.check}>✓</span>
                            Bezkonkurenční cena
                        </div>
                        <div className={styles.listItem}>
                            <span className={styles.check}>✓</span>
                            Prémiová kvalita
                        </div>
                        <div className={styles.listItem}>
                            <span className={styles.check}>✓</span>
                            Velkoobchodní podmínky
                        </div>
                    </div>
                </div>

                <div className={styles.formSide}>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Vaše jméno" className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="email" placeholder="E-mail" className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Název podniku" className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <textarea placeholder="Zpráva / Poptávka..." className={styles.textarea}></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Odeslat poptávku</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
