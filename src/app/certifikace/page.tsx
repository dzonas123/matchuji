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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>EU Organic certifikace</h3>
                            <p style={{ marginBottom: '16px' }}>Záruka pěstování bez chemie a pesticidů v souladu s předpisy EU o ekologickém zemědělství. <a href="/certifikace/eu-organic.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline', marginLeft: '10px', fontWeight: 'bold' }}>Stáhnout PDF</a></p>
                            <iframe src="/certifikace/eu-organic.pdf" width="100%" height="600px" style={{ border: '1px solid #eee', borderRadius: '8px' }} title="EU Organic certifikace"></iframe>
                        </div>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>USDA Organic</h3>
                            <p style={{ marginBottom: '16px' }}>Americký standard potvrzující 100% BIO kvalitu surovin. <a href="/certifikace/usda-organic.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline', marginLeft: '10px', fontWeight: 'bold' }}>Stáhnout PDF</a></p>
                            <iframe src="/certifikace/usda-organic.pdf" width="100%" height="600px" style={{ border: '1px solid #eee', borderRadius: '8px' }} title="USDA Organic"></iframe>
                        </div>

                        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>CNAS Testing</h3>
                            <p style={{ marginBottom: '16px' }}>Laboratorní testy akreditované organizací CNAS potvrzující nepřítomnost těžkých kovů a dalších škodlivin. <a href="/certifikace/cnas-testing.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline', marginLeft: '10px', fontWeight: 'bold' }}>Stáhnout PDF</a></p>
                            <iframe src="/certifikace/cnas-testing.pdf" width="100%" height="600px" style={{ border: '1px solid #eee', borderRadius: '8px' }} title="CNAS Testing"></iframe>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-dark-green)' }}>EUROFINS Testing</h3>
                            <p style={{ marginBottom: '16px' }}>Nezávislé a vysoce uznávané celosvětové testování mikrobiologické čistoty a kvality potravin. <a href="/certifikace/eurofins-testing.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-lime)', textDecoration: 'underline', marginLeft: '10px', fontWeight: 'bold' }}>Stáhnout PDF</a></p>
                            <iframe src="/certifikace/eurofins-testing.pdf" width="100%" height="600px" style={{ border: '1px solid #eee', borderRadius: '8px' }} title="EUROFINS Testing"></iframe>
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
