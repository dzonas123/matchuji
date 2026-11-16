import styles from "./page.module.css";

export const metadata = {
    title: "Reklamace a vrácení zboží | Matchuji",
    description: "Informace o tom, jak postupovat při reklamaci nebo vrácení zboží zakoupeného na Matchuji.",
};

export default function ReturnsPolicy() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Reklamace a vrácení zboží</h1>
                <p className={styles.subtitle}>Chceme, abyste byli s naším Matchou maximálně spokojeni. Pokud něco není v pořádku, jsme tu pro vás.</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Odstoupení od smlouvy (Vrácení zboží)</h2>
                    <p>
                        Jako spotřebitel máte právo odstoupit od smlouvy do 14 dnů od převzetí zboží bez udání důvodu. 
                        Vzhledem k povaze našeho zboží (potraviny) je však možné vrátit pouze zboží, které je <strong>v původním, nepoškozeném a neotevřeném obalu</strong>.
                    </p>
                    <p><strong>Důležité upozornění:</strong> U potravin, které byly po dodání rozbaleny, nelze z hygienických důvodů od smlouvy odstoupit (ust. § 1837 písm. g) občanského zákoníku).</p>
                    <ul>
                        <li>Zboží musí být vráceno kompletní, v původním stavu.</li>
                        <li>Náklady na dopravu při vrácení zboží hradí kupující.</li>
                        <li>Peníze vám vrátíme do 14 dnů od doručení vráceného zboží na náš účet.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Reklamace (Záruka)</h2>
                    <p>
                        Záruční doba na naše produkty je 24 měsíců, nebo do data minimální trvanlivosti uvedeného na obalu. 
                        Pokud má zboží při převzetí vadu (např. poškozený obal, jiný než objednaný produkt), máte právo na řádné vyřízení reklamace.
                    </p>
                    <ul>
                        <li>Reklamaci uplatněte co nejdříve po zjištění vady.</li>
                        <li>V případě uznané reklamace hradíme náklady na dopravu zpět k nám.</li>
                        <li>Reklamaci vyřídíme nejpozději do 30 dnů, zpravidla však mnohem rychleji.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Jak postupovat?</h2>
                    <p>Pro nejrychlejší vyřízení nás prosím kontaktujte jedním z následujících způsobů:</p>
                    <ul>
                        <li>E-mailem na <strong>info@matchuji.cz</strong> (uveďte číslo objednávky).</li>
                        <li>Telefonicky na naší infolince.</li>
                    </ul>
                    <p>Zboží následně bezpečně zabalte a zašlete na adresu, kterou vám sdělíme v potvrzovacím e-mailu (zpravidla naše expediční centrum).</p>
                </section>

                <div className={styles.contactBox}>
                    <h3>Potřebujete poradit?</h3>
                    <p>Jsme vám k dispozici každý pracovní den.</p>
                    <div style={{ marginTop: "20px" }}>
                        <p><strong>E-mail:</strong> info@matchuji.cz</p>
                        <p><strong>Web:</strong> www.matchuji.cz</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
