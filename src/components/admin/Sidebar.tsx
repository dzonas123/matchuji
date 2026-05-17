"use client";

import styles from "@/app/admin/Admin.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type View = "dashboard" | "orders" | "products" | "customers" | "discounts";

interface SidebarProps {
    currentView: View;
    onChangeView: (view: View) => void;
    onLogout: () => void;
    isOpen?: boolean;
}

export default function Sidebar({ currentView, onChangeView, onLogout, isOpen = false }: SidebarProps) {
    const menuItems: { id: View; label: string; icon: string }[] = [
        { id: "dashboard", label: "Přehled", icon: "📊" },
        { id: "orders", label: "Objednávky", icon: "📦" },
        { id: "products", label: "Produkty", icon: "🍵" },
        { id: "discounts", label: "Slevy", icon: "🎟️" },
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.sidebarHeader}>
                Matchuji Admin
            </div>
            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${currentView === item.id ? styles.active : ""}`}
                        onClick={() => onChangeView(item.id)}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className={styles.sidebarFooter}>
                <button onClick={onLogout} className={styles.logoutBtn}>
                    🚪 Odhlásit se
                </button>
                <Link href="/" className={styles.backLinkSidebar}>
                    ← Zpět na web
                </Link>
            </div>
        </aside>
    );
}
