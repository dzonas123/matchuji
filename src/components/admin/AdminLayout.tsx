"use client";

import { ReactNode } from "react";
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
    return (
        <div className={styles.layout}>
            <Sidebar currentView={currentView} onChangeView={onChangeView} onLogout={onLogout} />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
