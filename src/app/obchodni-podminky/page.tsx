import styles from "../zasady-vraceni-zbozi/page.module.css";

export const metadata = {
    title: "Obchodní podmínky | Matchuji",
    description: "Kompletní obchodní podmínky e-shopu Matchuji.cz v souladu s platnou legislativou ČR.",
};

export default function TermsAndConditions() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Obchodní podmínky</h1>
                <p className={styles.subtitle}>Platné a účinné od 1. ledna 2024</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>1. Úvodní ustanovení</h2>
                    <p>
                        Tyto obchodní podmínky (dále jen „obchodní podmínky“) upravují v souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, ve znění pozdějších předpisů (dále jen „občanský zákoník“) vzájemná práva a povinnosti vzniklé v souvislosti s nebo na základě kupní smlouvy uzavírané mezi prodávajícím a jinou fyzickou osobou (dále jen „kupující“) prostřednictvím internetového obchodu prodávajícího na adrese www.matchuji.cz.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Uzavření kupní smlouvy</h2>
                    <p>
                        Veškerá prezentace zboží umístěná v e-shopu je informativního charakteru a prodávající není povinen uzavřít kupní smlouvu ohledně tohoto zboží. Ustanovení § 1732 odst. 2 občanského zákoníku se nepoužije.
                    </p>
                    <p>
                        Kupní smlouva vzniká v okamžiku doručení přijetí objednávky (akceptace), jež je prodávajícím zasláno kupujícímu elektronickou poštou na adresu uvedenou v objednávce.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Cena zboží a platební podmínky</h2>
                    <p>
                        Ceny zboží jsou uvedeny včetně daně z přidané hodnoty a všech souvisejících poplatků. Cena zboží nezahrnuje náklady na dopravu, které jsou vyčísleny v nákupním košíku před dokončením objednávky.
                    </p>
                    <p>Kupující může uhradit cenu zboží následujícími způsoby:</p>
                    <ul>
                        <li>Online platební kartou prostřednictvím zabezpečené platební brány.</li>
                        <li>Dalšími metodami aktuálně nabízenými v rozhraní e-shopu.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Odstoupení od smlouvy</h2>
                    <p>
                        Kupující má právo odstoupit od smlouvy ve lhůtě 14 dnů od převzetí zboží.
                        <strong> Upozornění:</strong> Podle § 1837 písm. g) občanského zákoníku nelze odstoupit od smlouvy o dodávce zboží v uzavřeném obalu, které kupující z obalu vyňal a z hygienických důvodů jej není možné vrátit (typicky rozdělané balení čaje/matcha).
                    </p>
                    <p>
                        V případě platného odstoupení vrátí prodávající kupujícímu všechny přijaté peněžní prostředky do 14 dnů, a to stejným způsobem, jakým je přijal.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Práva z vadného plnění (Reklamace)</h2>
                    <p>
                        Práva a povinnosti stran ohledně práv z vadného plnění se řídí příslušnými obecně závaznými předpisy (zejména § 1914 až 1925, § 2099 až 2117 a § 2161 až 2174 občanského zákoníku a zákonem č. 634/1992 Sb., o ochraně spotřebitele).
                    </p>
                    <p>
                        Prodávající odpovídá kupujícímu, že zboží při převzetí nemá vady. Zejména, že má vlastnosti ujednané, odpovídá jakostem pro daný druh potraviny a vyhovuje požadavkům právních předpisů.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Mimosoudní řešení sporů</h2>
                    <p>
                        K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je příslušná Česká obchodní inspekce, se sídlem Štěpánská 567/15, 120 00 Praha 2, IČ: 000 20 869, internetová adresa: https://adr.coi.cz.
                    </p>
                    <p>
                        Evropská komise provozuje platformu pro řešení sporů online na adrese: http://ec.europa.eu/consumers/odr.
                    </p>
                </section>

                <div className={styles.contactBox}>
                    <h3>Provozovatel</h3>
                    <p>Matchuji.cz</p>
                    <p>E-mail: info@matchuji.cz</p>
                </div>
            </div>
        </main>
    );
}
