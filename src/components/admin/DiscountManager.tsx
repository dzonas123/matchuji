"use client";

import { useState, useEffect } from "react";
import styles from "@/app/admin/Admin.module.css";

interface DiscountCode {
    id: string;
    code: string;
    type: string;
    value: number;
    minAmount: number;
    freeShipping: boolean;
    isActive: boolean;
    usageCount: number;

    maxUsages: number | null;
    expiryDate: string | null;
}

export default function DiscountManager() {
    const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
    const [editingDiscount, setEditingDiscount] = useState<Partial<DiscountCode> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = async () => {
        try {
            setError(null);
            const res = await fetch("/api/admin/discounts");
            if (!res.ok) throw new Error("Chyba při načítání dat");
            const data = await res.json();
            if (Array.isArray(data)) {
                setDiscounts(data);
            } else {
                setDiscounts([]);
            }
        } catch (err) {
            console.error("Failed to fetch discounts", err);
            setError("Nepodařilo se načíst slevové kódy. Tabulka v databázi pravděpodobně ještě neexistuje.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDiscount) return;
        try {
            const res = await fetch("/api/admin/discounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingDiscount),
            });
            if (res.ok) {
                fetchDiscounts();
                setEditingDiscount(null);
            } else {
                alert("Chyba při ukládání do databáze.");
            }
        } catch (err) {
            alert("Chyba při spojení se serverem.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Opravdu smazat tento slevový kód?")) return;
        try {
            const res = await fetch("/api/admin/discounts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) fetchDiscounts();
        } catch (err) {
            alert("Chyba při mazání");
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Načítání slevových kódů...</div>;

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                <p style={{ color: '#991b1b', fontWeight: 600 }}>{error}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Pro správné fungování je potřeba spustit synchronizaci databáze s novým schématem.</p>
                <button onClick={fetchDiscounts} className={styles.button} style={{ marginTop: '1rem' }}>Zkusit znovu</button>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => setEditingDiscount({ code: "", type: "percentage", value: 10, isActive: true, minAmount: 0 })}
                    className={styles.button}
                >
                    + Vytvořit slevový kód
                </button>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Celkem kódů: {discounts.length}</div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Kód</th>
                            <th>Typ</th>
                            <th>Hodnota</th>
                            <th>Min. nákup</th>
                            <th>Doprava</th>
                            <th>Využití</th>
                            <th>Stav</th>
                            <th>Akce</th>

                        </tr>
                    </thead>
                    <tbody>
                        {discounts.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                                    Žádné slevové kódy nebyly nalezeny.
                                </td>
                            </tr>
                        ) : discounts.map((d) => (
                            <tr key={d.id}>
                                <td><code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>{d.code}</code></td>
                                <td>{d.type === 'percentage' ? 'Procenta' : 'Částka'}</td>
                                <td style={{ fontWeight: 600 }}>{d.value}{d.type === 'percentage' ? '%' : ' Kč'}</td>
                                <td>{d.minAmount || 0} Kč</td>
                                <td>{d.freeShipping ? '✅ Zdarma' : '❌ Standard'}</td>
                                <td>{d.usageCount || 0} {d.maxUsages ? `/ ${d.maxUsages}` : ''}</td>

                                <td>
                                    <span className={`${styles.status} ${d.isActive ? styles.paid : styles.pending}`}>
                                        {d.isActive ? 'Aktivní' : 'Neaktivní'}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => setEditingDiscount(d)} className={styles.button} style={{ padding: '0.2rem 0.5rem', marginRight: '0.5rem', fontSize: '0.8rem' }}>Upravit</button>
                                    <button onClick={() => handleDelete(d.id)} className={styles.button} style={{ padding: '0.2rem 0.5rem', background: '#fee2e2', color: '#991b1b', fontSize: '0.8rem' }}>Smazat</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingDiscount && (
                <div className={styles.modalOverlay} onClick={() => setEditingDiscount(null)}>
                    <div className={styles.modalContent} style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingDiscount.id ? 'Upravit slevu' : 'Nová sleva'}</h2>
                            <button className={styles.closeBtn} onClick={() => setEditingDiscount(null)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave} className={styles.modalBody}>
                            <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>Kód (např. MATCHA10)</label>
                                <input
                                    className={styles.input}
                                    value={editingDiscount.code || ""}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() })}
                                    required
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>Typ slevy</label>
                                    <select
                                        className={styles.input}
                                        value={editingDiscount.type || "percentage"}
                                        onChange={e => setEditingDiscount({ ...editingDiscount, type: e.target.value })}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="percentage">Procentuální (%)</option>
                                        <option value="fixed">Pevná částka (Kč)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>Hodnota</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={editingDiscount.value || 0}
                                        onChange={e => setEditingDiscount({ ...editingDiscount, value: Number(e.target.value) })}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>Minimální nákup (Kč)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={editingDiscount.minAmount || 0}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, minAmount: Number(e.target.value) })}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input
                                    type="checkbox"
                                    id="freeShipping"
                                    checked={editingDiscount.freeShipping ?? false}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, freeShipping: e.target.checked })}
                                    style={{ width: '1.2rem', height: '1.2rem' }}
                                />
                                <label htmlFor="freeShipping" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Doprava zdarma</label>
                            </div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={editingDiscount.isActive ?? true}
                                    onChange={e => setEditingDiscount({ ...editingDiscount, isActive: e.target.checked })}
                                    style={{ width: '1.2rem', height: '1.2rem' }}
                                />
                                <label htmlFor="isActive" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Kód je aktivní</label>
                            </div>
                            <button type="submit" className={styles.button} style={{ width: '100%' }}>
                                {editingDiscount.id ? 'Uložit změny' : 'Vytvořit slevový kód'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
