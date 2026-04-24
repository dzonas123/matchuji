import styles from "../zasady-vraceni-zbozi/page.module.css";
import Link from "next/link";

export const metadata = {
    title: "Certifikace a kvalita | Matchuji",
    description: "Zaručujeme 100% prémiovou kvalitu naší Matchy z Uji doloženou přísnými laboratorními testy a EU Organic certifikací.",
};

export default function Certifications() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>Certifikace a kvalita</h1>
                <p className={styles.subtitle}>Naše matcha prochází těmi nejpřísnějšími testy a splňuje nejvyšší standardy</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>100% Průhlednost a kvalita</h2>
                    <p>
                        Zakládáme si na tom, že naše Matcha je té nejvyšší možné ceremoniální kvality (7A). 
                        Níže si můžete stáhnout a prohlédnout naše oficiální certifikace a laboratorní testy, které 
                        potvrzují čistotu, organický původ a prvotřídní složení našeho produktu.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Dostupné certifikace</h2>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        <li>
                            <strong>EU Organic certifikace</strong><br/>
                            Záruka pěstování bez chemie a pesticidů v souladu s předpisy EU o ekologickém zemědělství.<br/>
                            <a href="/certifikace/eu-organic.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline' }}>Stáhnout PDF</a>
                        </li>
                        <li>
                            <strong>USDA Organic</strong><br/>
                            Americký standard potvrzující 100% BIO kvalitu surovin.<br/>
                            <a href="/certifikace/usda-organic.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline' }}>Stáhnout PDF</a>
                        </li>
                        <li>
                            <strong>CNAS Testing</strong><br/>
                            Laboratorní testy akreditované organizací CNAS potvrzující nepřítomnost těžkých kovů a dalších škodlivin.<br/>
                            <a href="/certifikace/cnas-testing.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline' }}>Stáhnout PDF</a>
                        </li>
                        <li>
                            <strong>EUROFINS Testing</strong><br/>
                            Nezávislé a vysoce uznávané celosvětové testování mikrobiologické čistoty a kvality potravin.<br/>
                            <a href="/certifikace/eurofins-testing.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline' }}>Stáhnout PDF</a>
                        </li>
                    </ul>
                </section>

                <div className={styles.contactBox}>
                    <h3>Máte dotaz k našim certifikacím?</h3>
                    <p>Pokud potřebujete podrobnější informace nebo další testy, neváhejte se nám ozvat.</p>
                    <p>E-mail: info@matchuji.cz</p>
                </div>
            </div>
        </main>
    );
}
