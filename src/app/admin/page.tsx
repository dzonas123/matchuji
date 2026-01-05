"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Admin.module.css";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import OrderList from "@/components/admin/OrderList";
import ProductList from "@/components/admin/ProductList";

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [currentView, setCurrentView] = useState<"dashboard" | "orders" | "products" | "customers">("dashboard");

    useEffect(() => {
        // Simple session check
        const session = localStorage.getItem("admin_session");
        if (session === "true") {
            setIsLoggedIn(true);
            fetchOrders();
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (e) {
            console.error("Failed to fetch orders", e);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            localStorage.setItem("admin_session", "true");
            fetchOrders();
        } else {
            alert("Nesprávné údaje");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("admin_session");
        setUsername("");
        setPassword("");
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h1>Matchuji Admin</h1>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Přihlašovací jméno"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Heslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>Přihlásit se</button>
                    </form>
                    <Link href="/" className={styles.backLink}>← Zpět na web</Link>
                </div>
            </div>
        );
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    return (
        <AdminLayout currentView={currentView} onChangeView={setCurrentView} onLogout={handleLogout}>
            {/* Header for content area */}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {currentView === 'dashboard' && 'Přehled'}
                    {currentView === 'orders' && 'Objednávky'}
                    {currentView === 'products' && 'Produkty'}
                    {currentView === 'customers' && 'Zákazníci'}
                </h1>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </header>

            {currentView === 'dashboard' && (
                <>
                    <div className={styles.stats}>
                        <StatsCard label="Počet objednávek" value={orders.length} />
                        <StatsCard label="Celkové tržby" value={`${totalRevenue.toLocaleString()} Kč`} />
                        <StatsCard label="Průměrná hodnota" value={`${orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0} Kč`} />
                    </div>

                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#0d2112' }}>Poslední objednávky</h2>
                    <OrderList orders={orders.slice(0, 5)} />
                </>
            )}

            {currentView === 'orders' && (
                <OrderList orders={orders} />
            )}

            {currentView === 'products' && (
                <ProductList />
            )}
        </AdminLayout>
    );
}
