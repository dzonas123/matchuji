"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Admin.module.css";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import OrderList from "@/components/admin/OrderList";
import ProductList from "@/components/admin/ProductList";
import DiscountManager from "@/components/admin/DiscountManager";


export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [currentView, setCurrentView] = useState<"dashboard" | "orders" | "products" | "customers" | "discounts">("dashboard");


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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                setIsLoggedIn(true);
                localStorage.setItem("admin_session", "true");
                fetchOrders();
            } else {
                alert("Nesprávné přihlašovací údaje");
            }
        } catch {
            alert("Chyba připojení k serveru");
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

    // Finanční výpočty
    const COST_PER_UNIT = 42;
    const totalCost = orders.reduce((total, order) => {
        const orderItems = order.items || [];
        const orderCOG = orderItems.reduce((cogSum: number, item: any) => {
            // Pokud je to 3-pack, počítáme 3 jednotky
            const units = (item.id === 'matcha-3pack' || (item.name && item.name.toLowerCase().includes('3-pack'))) ? 3 : 1;
            return cogSum + (units * COST_PER_UNIT * (item.quantity || 1));
        }, 0);
        return total + orderCOG;
    }, 0);

    const netProfit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return (
        <AdminLayout currentView={currentView} onChangeView={setCurrentView} onLogout={handleLogout}>
            {/* Header for content area */}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {currentView === 'dashboard' && 'Přehled'}
                    {currentView === 'orders' && 'Objednávky'}
                    {currentView === 'products' && 'Produkty'}
                    {currentView === 'discounts' && 'Slevové kódy'}
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
                        <StatsCard label="Náklady (produkty)" value={`${totalCost.toLocaleString()} Kč`} />
                        <StatsCard label="Čistý zisk" value={`${netProfit.toLocaleString()} Kč`} />
                        <StatsCard label="Marže" value={`${margin.toFixed(1)} %`} />
                        <StatsCard label="Průměrná objednávka" value={`${orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0} Kč`} />
                    </div>

                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#0d2112' }}>Poslední objednávky</h2>
                    <OrderList orders={orders.slice(0, 5)} onUpdate={fetchOrders} />

                    <div className={styles.senderInfoCard} style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0d2112' }}>📦 Fulfillment & API</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Odesílatel ID:</p>
                                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 700, fontSize: '1.2rem', color: '#166534' }}>540317</p>
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Fakturační status:</p>
                                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>Neplátce DPH</p>
                            </div>

                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>API pro skladový systém:</p>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                                    <code style={{ background: '#fff', padding: '0.4rem', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #cbd5e1', flex: 1 }}>/api/v1/orders/new</code>
                                    <button
                                        onClick={() => {
                                            const url = window.location.origin + '/api/v1/orders/new';
                                            navigator.clipboard.writeText(url);
                                            alert('URL zkopírována do schránky');
                                        }}
                                        className={styles.button}
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                                    >
                                        V6 Kopírovat
                                    </button>
                                </div>
                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: '#999' }}>Vrací seznam nových objednávek (JSON)</p>
                            </div>
                        </div>
                    </div>

                </>
            )}

            {currentView === 'orders' && (
                <OrderList orders={orders} onUpdate={fetchOrders} />
            )}

            {currentView === 'products' && (
                <ProductList />
            )}

            {currentView === 'discounts' && (
                <DiscountManager />
            )}
        </AdminLayout>

    );
}
