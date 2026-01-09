"use client";

import { useState, useEffect } from "react";
import styles from "@/app/admin/Admin.module.css";

interface DiscountCode {
    id: string;
    code: string;
    type: string;
    value: number;
    minAmount: number;
    isActive: boolean;
    usageCount: number;
    maxUsages: number | null;
    expiryDate: string | null;
}

export default function DiscountManager() {
    const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
    const [editingDiscount, setEditingDiscount] = useState<Partial<DiscountCode> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = async () => {
        try {
            const res = await fetch("/api/admin/discounts");
            const data = await res.json();
            setDiscounts(data);
        } catch (err) {
            console.error("Failed to fetch discounts", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/discounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingDiscount),
            });
            if (res.ok) {
                fetchDiscounts();
                setEditingDiscount(null);
            }
        } catch (err) {
            alert("Chyba při ukládání");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Opravdu smazat tento slevový kód?")) return;
        try {
            await fetch("/api/admin/discounts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchDiscounts();
        } catch (err) {
            alert("Chyba při mazání");
        }
    };

    if (loading) return <div>Načítání slevových kódů...</div>;

    return (
        <div className={styles.tableWrapper}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                <button
                    onClick={() => setEditingDiscount({ code: "", type: "percentage", value: 10, isActive: true, minAmount: 0 })}
                    className={styles.button}
                >
                    + Vytvořit slevový kód
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Kód</th>
                            <th>Typ</th>
                            <th>Hodnota</th>
                            <th>Min. nákup</th>
                            <th>Využití</th>
                            <th>Stav</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((d) => (
                            <tr key={d.id}>
                                <td><strong>{d.code}</strong></td>
                                <td>{d.type === 'percentage' ? 'Procenta' : 'Částka'}</td>
                                <td>{d.value}{d.type === 'percentage' ? '%' : ' Kč'}</td>
                                <td>{d.minAmount} Kč</td>
                                <td>{d.usageCount} {d.maxUsages ? `/ ${d.maxUsages}` : ''}</td>
                                <td>
                                    <span className={`${styles.status} ${d.isActive ? styles.paid : styles.pending}`}>
                                        {d.isActive ? 'Aktivní' : 'Neaktivní'}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => setEditingDiscount(d)} className={styles.button} style={{ padding: '0.2rem 0.5rem', marginRight: '0.5rem' }}>Upravit</button>
                                    <button onClick={() => handleDelete(d.id)} className={styles.button} style={{ padding: '0.2rem 0.5rem', background: '#fee2e2', color: '#991b1b' }}>Smazat</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingDiscount && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent} style={{ maxWidth: '400px' }}>
                        <div className={styles.modalHeader}>
                            <h2>{editingDiscount.id ? 'Upravit slevu' : 'Nová sleva'}</h2>
                            <button className={styles.closeBtn} onClick={() => setEditingDiscount(null)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave} className={styles.modalBody}>
                            <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Kód (např. MATCHA10)</label>
                                <input
                                    className={styles.input}
                                    value={editingDiscount.code}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Typ slevy</label>
                                    <select
                                        className={styles.input}
                                        value={editingDiscount.type}
                                        onChange={e => setEditingDiscount({ ...editingDiscount, type: e.target.value })}
                                    >
                                        <option value="percentage">Procentuální (%)</option>
                                        <option value="fixed">Pevná částka (Kč)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Hodnota</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={editingDiscount.value}
                                        onChange={e => setEditingDiscount({ ...editingDiscount, value: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Minimální nákup (Kč)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={editingDiscount.minAmount}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, minAmount: Number(e.target.value) })}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    checked={editingDiscount.isActive}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, isActive: e.target.checked })}
                                />
                                <label>Aktivní</label>
                            </div>
                            <button type="submit" className={styles.button} style={{ width: '100%' }}>Uložit slevový kód</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
