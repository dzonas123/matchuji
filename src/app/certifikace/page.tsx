import styles from "./page.module.css";
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
                        Níže si můžete prohlédnout a stáhnout naše oficiální certifikace a laboratorní testy, které 
                        potvrzují čistotu, organický původ a prvotřídní složení našeho produktu.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Dostupné certifikace</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>EU Organic certifikace</h3>
                                    <p style={{ margin: 0 }}>Záruka pěstování bez chemie a pesticidů v souladu s předpisy EU o ekologickém zemědělství.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <a href="/certifikace/eu-organic.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Zvětšit na celou obrazovku</a>
                                    <a href="/certifikace/eu-organic.pdf" download className={styles.downloadButton}>Stáhnout</a>
                                </div>
                            </div>
                            <iframe src="/certifikace/eu-organic.pdf" width="100%" height="700px" style={{ border: '1px solid #ddd', borderRadius: '8px' }} title="EU Organic certifikace"></iframe>
                        </div>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>USDA Organic</h3>
                                    <p style={{ margin: 0 }}>Americký standard potvrzující 100% BIO kvalitu surovin.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <a href="/certifikace/usda-organic.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Zvětšit na celou obrazovku</a>
                                    <a href="/certifikace/usda-organic.pdf" download className={styles.downloadButton}>Stáhnout</a>
                                </div>
                            </div>
                            <iframe src="/certifikace/usda-organic.pdf" width="100%" height="700px" style={{ border: '1px solid #ddd', borderRadius: '8px' }} title="USDA Organic"></iframe>
                        </div>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>CNAS Testing</h3>
                                    <p style={{ margin: 0 }}>Laboratorní testy akreditované organizací CNAS potvrzující nepřítomnost těžkých kovů a dalších škodlivin.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <a href="/certifikace/cnas-testing.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Zvětšit na celou obrazovku</a>
                                    <a href="/certifikace/cnas-testing.pdf" download className={styles.downloadButton}>Stáhnout</a>
                                </div>
                            </div>
                            <iframe src="/certifikace/cnas-testing.pdf" width="100%" height="700px" style={{ border: '1px solid #ddd', borderRadius: '8px' }} title="CNAS Testing"></iframe>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>EUROFINS Testing</h3>
                                    <p style={{ margin: 0 }}>Nezávislé a vysoce uznávané celosvětové testování mikrobiologické čistoty a kvality potravin.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <a href="/certifikace/eurofins-testing.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Zvětšit na celou obrazovku</a>
                                    <a href="/certifikace/eurofins-testing.pdf" download className={styles.downloadButton}>Stáhnout</a>
                                </div>
                            </div>
                            <iframe src="/certifikace/eurofins-testing.pdf" width="100%" height="700px" style={{ border: '1px solid #ddd', borderRadius: '8px' }} title="EUROFINS Testing"></iframe>
                        </div>

                    </div>
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
