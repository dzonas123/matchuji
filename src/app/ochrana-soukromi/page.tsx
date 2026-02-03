import styles from "../zasady-vraceni-zbozi/page.module.css";

export const metadata = {
    title: "Ochrana osobních údajů (GDPR) | Matchuji",
    description: "Zásady zpracování osobních údajů v souladu s nařízením GDPR na webu Matchuji.cz",
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Ochrana osobních údajů</h1>
                <p className={styles.subtitle}>Informace o zpracování osobních údajů (GDPR)</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>1. Správce osobních údajů</h2>
                    <p>
                        Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR”) je provozovatel e-shopu Matchuji.cz (dále jen: „správce“).
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Zákonný důvod a účel zpracování</h2>
                    <p>Zákonným důvodem zpracování osobních údajů je:</p>
                    <ul>
                        <li>Plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR.</li>
                        <li>Oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR.</li>
                        <li>Váš souhlas se zpracováním pro účely poskytování přímého marketingu podle čl. 6 odst. 1 písm. a) GDPR.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Rozsah zpracovávaných údajů</h2>
                    <p>
                        Zpracováváme pouze údaje nezbytné k úspěšnému vyřízení objednávky: jméno a příjmení, e-mailovou adresu, telefonní číslo, fakturační a doručovací adresu, případně údaje o Vašich nákupech.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Příjemci osobních údajů</h2>
                    <p>Příjemci osobních údajů jsou osoby:</p>
                    <ul>
                        <li>Podílející se na dodání zboží / realizaci plateb na základě smlouvy (dopravci, poskytovatelé platebních služeb).</li>
                        <li>Zajišťující služby provozu e-shopu a další technické služby.</li>
                        <li>Poskytovatelé marketingových služeb.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>5. Vaše práva</h2>
                    <p>Za podmínek stanovených v GDPR máte:</p>
                    <ul>
                        <li>Právo na přístup ke svým osobním údajům.</li>
                        <li>Právo na opravu osobních údajů.</li>
                        <li>Právo na výmaz osobních údajů („právo být zapomenut“).</li>
                        <li>Právo na omezení zpracování a právo vznést námitku proti zpracování.</li>
                        <li>Právo na přenositelnost údajů.</li>
                    </ul>
                    <p>
                        Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaše právo na ochranu osobních údajů.
                    </p>
                </section>

                <div className={styles.contactBox}>
                    <h3>Dotazy k ochraně údajů</h3>
                    <p>Své dotazy či žádosti o výmaz zasílejte na info@matchuji.cz</p>
                </div>
            </div>
        </main>
    );
}
