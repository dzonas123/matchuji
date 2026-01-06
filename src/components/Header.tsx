"use client";
// Triggering new build for mobile menu visibility

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const { count, setIsOpen } = useCart();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when pathname changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { href: "/", label: "Domů" },
        { href: "/product/ceremonial-matcha", label: "Produkty" },
        { href: "/pro-kavarny", label: "Pro kavárny" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <Image
                            src="/images/matchuji-logo.png"
                            alt="Matchuji Logo"
                            width={120}
                            height={40}
                            style={{ width: 'auto', height: '32px' }}
                        />
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.link} ${isActive(link.href) ? styles.active : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <button className={styles.iconButton} onClick={() => setIsOpen(true)} title="Košík">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {count > 0 && <span className={styles.cartBadge}>{count}</span>}
                    </button>

                    <button
                        className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonActive : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <div className={styles.hamburger}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}>
                <nav className={styles.mobileNav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileActive : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
