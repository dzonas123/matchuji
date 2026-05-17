"use client";

import { ReactNode, useState } from "react";
import styles from "@/app/admin/Admin.module.css";
import Sidebar from "./Sidebar";

type View = "dashboard" | "orders" | "products" | "customers" | "discounts";

interface AdminLayoutProps {
    children: ReactNode;
    currentView: View;
    onChangeView: (view: View) => void;
    onLogout: () => void;
}

export default function AdminLayout({ children, currentView, onChangeView, onLogout }: AdminLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className={styles.layout}>
            {/* Mobile Header (Only visible on mobile) */}
            <div className={styles.mobileHeader}>
                <div className={styles.mobileHeaderBrand}>Matchuji Admin</div>
                <button 
                    className={styles.hamburgerBtn} 
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Otevřít menu"
                >
                    ☰
                </button>
            </div>

            {/* Overlay for mobile when menu is open */}
            {isMobileMenuOpen && (
                <div 
                    className={styles.mobileOverlay} 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <Sidebar 
                currentView={currentView} 
                onChangeView={(view) => {
                    onChangeView(view);
                    setIsMobileMenuOpen(false); // Close menu on selection
                }} 
                onLogout={onLogout}
                isOpen={isMobileMenuOpen}
            />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
