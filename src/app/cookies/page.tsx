import styles from "../zasady-vraceni-zbozi/page.module.css";

export const metadata = {
    title: "Zásady používání souborů cookie | Matchuji",
    description: "Podrobné informace o tom, jaké cookies a technologie používáme na webu Matchuji.cz.",
};

export default function CookiesPolicy() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Zásady používání cookies</h1>
                <p className={styles.subtitle}>Jak a proč používáme soubory cookie</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>1. Co jsou soubory cookie?</h2>
                    <p>
                        Soubory cookie jsou krátké textové soubory, které webová stránka odešle do Vašeho prohlížeče. Umožňují webu zaznamenat informace o Vaší návštěvě, například zvolený jazyk, obsah nákupního košíku a další nastavení. Příští návštěva stránek tak pro Vás může být snazší a produktivnější.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Jaké cookies používáme</h2>
                    <p>Na našem webu používáme tyto druhy cookies:</p>
                    <ul>
                        <li>
                            <strong>Technické (Nezbytné):</strong> Jsou nutné pro základní funkce webu, jako je navigace nebo přidávání produktů do košíku. Bez těchto cookies nemůže web správně fungovat.
                        </li>
                        <li>
                            <strong>Analytické:</strong> Pomáhají nám pochopit, jak návštěvníci web používají (např. které stránky jsou nejčastěji navštěvované). Tyto údaje jsou anonymizované. Používáme zejména Google Analytics.
                        </li>
                        <li>
                            <strong>Marketingové:</strong> Slouží k zobrazení relevantní reklamy na základě Vašich zájmů na stránkách třetích stran (např. Facebook, Google).
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Souhlas a odmítnutí cookies</h2>
                    <p>
                        Používání technických cookies je nezbytné pro provoz webu a nevyžaduje souhlas. Pro analytické a marketingové cookies nám udělujete souhlas prostřednictvím cookie lišty (pokud je implementována) nebo nastavením Vašeho prohlížeče.
                    </p>
                    <p>
                        Většina prohlížečů cookies automaticky přijímá již v základním nastavení. Pokud si ukládání cookies nepřejete, můžete je v nastavení svého prohlížeče blokovat nebo smazat ty již uložené.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Sociální sítě a pluginy</h2>
                    <p>
                        Náš web může obsahovat prvky třetích stran (např. tlačítka „To se mi líbí“ od Facebooku), které mohou rovněž ukládat své vlastní cookies v souladu s jejich zásadami ochrany soukromí.
                    </p>
                </section>

                <div className={styles.contactBox}>
                    <h3>Máte dotaz ke cookies?</h3>
                    <p>Rádi Vám odpovíme na info@matchuji.cz</p>
                </div>
            </div>
        </main>
    );
}
