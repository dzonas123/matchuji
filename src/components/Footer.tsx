import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Image
                            src="/images/matchuji-logo.png"
                            alt="Matchuji"
                            width={140}
                            height={46}
                            className={styles.logo}
                        />
                        <p>Prémiová ceremoniální Matcha přímo z japonského Uji. Čistá energie pro váš každodenní rituál.</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Odkazy</h4>
                        <div className={styles.links}>
                            <Link href="/">Domů</Link>
                            <Link href="/product/ceremonial-matcha">Náš produkt</Link>
                            <Link href="/#education">O Matcha</Link>
                            <Link href="/certifikace">Certifikace a kvalita</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Bezpečná platba</h4>
                        <div className={styles.links}>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                                Používáme šifrované SSL spojení pro maximální bezpečnost vašich plateb.
                            </p>
                            <div className={styles.paymentMethods}>
                                <span className={styles.paymentIcon}>💳</span>
                                <span className={styles.paymentIcon}></span>
                                <span className={styles.paymentIcon}>G</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>&copy; {new Date().getFullYear()} Matchuji. Všechna práva vyhrazena.</div>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link href="/zasady-vraceni-zbozi" style={{ color: 'inherit', textDecoration: 'none' }}>Reklamace a vrácení</Link>
                        <Link href="/obchodni-podminky" style={{ color: 'inherit', textDecoration: 'none' }}>Obchodní podmínky</Link>
                        <Link href="/ochrana-soukromi" style={{ color: 'inherit', textDecoration: 'none' }}>Ochrana soukromí</Link>
                        <Link href="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
