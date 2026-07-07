"use client";

import { useState } from "react";

import styles from "@/app/admin/Admin.module.css";

interface OrderDetailModalProps {
    order: any;
    onClose: () => void;
    onUpdate?: () => void;
}

export default function OrderDetailModal({ order, onClose, onUpdate }: OrderDetailModalProps) {
    const [trackingNumber, setTrackingNumber] = useState(order?.zasilkovna_tracking_number || "");
    const [isSavingTracking, setIsSavingTracking] = useState(false);
    const [isCreatingZasilkovna, setIsCreatingZasilkovna] = useState(false);

    const handleCreateZasilkovna = async () => {
        setIsCreatingZasilkovna(true);
        try {
            const res = await fetch(`/api/orders/${order.id}/zasilkovna`, {
                method: "POST",
            });
            const data = await res.json();
            if (data.success) {
                setTrackingNumber(data.barcode);
                alert("Zásilka byla úspěšně vytvořena v Zásilkovně!");
                if (onUpdate) onUpdate();
            } else {
                alert("Chyba při vytváření zásilky: " + (data.error || "Neznámá chyba"));
            }
        } catch (err: any) {
            console.error(err);
            alert("Chyba při komunikaci se serverem: " + err.message);
        } finally {
            setIsCreatingZasilkovna(false);
        }
    };

    if (!order) return null;

    const s = order.shipping || {};

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detail objednávky</span>
                        <h2 style={{ fontSize: '1.4rem' }}>
                            {order.variableSymbol ? `#${order.variableSymbol}` : `#${order.id.slice(-6).toUpperCase()}`}
                            {order.variableSymbol && <span style={{ fontSize: '0.9rem', color: '#999', marginLeft: '0.5rem', fontWeight: 'normal' }}>(Stripe ID: {order.id.slice(-8)})</span>}

                        </h2>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>👤 Kontaktní údaje</h3>
                            <div style={{ background: '#f0fdf4', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                                <label style={{ fontSize: '0.7rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Variabilní symbol</label>
                                <span style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>{order.variableSymbol || "Nenastaveno"}</span>
                            </div>
                        </div>
                        <div className={styles.infoGrid}>
                            <div>
                                <label>Celé jméno</label>
                                <p>{s.firstName} {s.lastName}</p>
                            </div>
                            <div>
                                <label>E-mail</label>
                                <p style={{ color: '#2563eb', textDecoration: 'underline' }}>{s.email}</p>
                            </div>
                            <div>
                                <label>Telefon</label>
                                <p>{s.phone || "-"}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>📍 Doručovací adresa</h3>
                        <div className={styles.infoGrid}>
                            <div>
                                <label>Ulice a číslo</label>
                                <p>{s.address}</p>
                            </div>
                            <div>
                                <label>Město</label>
                                <p>{s.city}</p>
                            </div>
                            <div>
                                <label>PSČ</label>
                                <p>{s.postalCode}</p>
                            </div>
                            <div>
                                <label>Země</label>
                                <p>{s.country || "Česká republika"}</p>
                            </div>
                        </div>
                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #eee' }}>
                            <label style={{ fontSize: '0.8rem', color: '#999' }}>Způsob dopravy</label>
                            <p style={{ fontWeight: 600, color: '#0d2112' }}>🚚 {order.carrier || "Standardní doručení"}</p>
                            {order.carrier?.toLowerCase().includes('zasilkovna') && (
                                <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                                    <label style={{ fontSize: '0.7rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700 }}>Pobočka / Z-BOX (ID)</label>
                                    <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', color: '#166534' }}>{order.zasilkovna_branch_id || s.zasilkovna_id || order.shipping?.zasilkovna_id || "Nenastaveno"}</p>

                                    {s.zasilkovna_name && <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#166534', opacity: 0.8 }}>{s.zasilkovna_name}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>🛒 Produkty (Fulfillment data)</h3>
                        <div className={styles.itemsList}>
                            {order.items && order.items.map((item: any, idx: number) => {
                                const is3ksBundleName = (item.name || "").toLowerCase().includes('3');
                                const is3ksBundleId = (item.id || "").toLowerCase().includes('3');
                                const is3ksBundle = is3ksBundleName || is3ksBundleId;
                                const displayName = item.name || (is3ksBundle ? '3ks balení' : (item.id || 'Neznámý produkt'));
                                return (
                                <div key={idx} className={styles.itemRow} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: '#eee', borderRadius: '4px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>IMG</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, margin: 0, fontSize: '1rem' }}>{displayName}</p>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                    <label style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>SKU</label>
                                                    <span style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, fontFamily: 'monospace' }}>{item.sku || 'Nenastaveno'}</span>
                                                </div>
                                                <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                    <label style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>EAN</label>
                                                    <span style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, fontFamily: 'monospace' }}>{item.ean || 'Nenastaveno'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                            <p style={{ fontWeight: 800, margin: 0, fontSize: '1.2rem', color: '#166534' }}>{item.quantity} ks</p>
                                            {is3ksBundle && (
                                                <span style={{ fontSize: '0.7rem', color: '#666', display: 'block' }}>(Počítáno jako 3ks balení)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '100%' }}>
                                <label style={{ fontSize: '0.7rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Tracking číslo (Sledování Zásilkovny)</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <input 
                                        type="text" 
                                        value={trackingNumber} 
                                        onChange={(e) => setTrackingNumber(e.target.value)} 
                                        placeholder="Např. Z123456789"
                                        style={{ flex: 1, minWidth: '150px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.9rem', outline: 'none' }} 
                                    />
                                    <button 
                                        disabled={isSavingTracking || trackingNumber === (order.zasilkovna_tracking_number || "")}
                                        onClick={async () => {
                                            setIsSavingTracking(true);
                                            try {
                                                const res = await fetch(`/api/orders/${order.id}`, {
                                                    method: 'PATCH',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ zasilkovna_tracking_number: trackingNumber, status: order.status })
                                                });
                                                if (res.ok) {
                                                    if (onUpdate) onUpdate();
                                                } else {
                                                    alert('Chyba při ukládání tracking čísla');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert('Chyba při ukládání tracking čísla');
                                            } finally {
                                                setIsSavingTracking(false);
                                            }
                                        }}
                                        style={{ padding: '0.5rem 1rem', background: '#166534', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', opacity: isSavingTracking || trackingNumber === (order.zasilkovna_tracking_number || "") ? 0.5 : 1, transition: 'all 0.2s' }}
                                    >
                                        {isSavingTracking ? '...' : 'Uložit'}
                                    </button>
                                </div>

                                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <button
                                        disabled={isCreatingZasilkovna || !!trackingNumber}
                                        onClick={handleCreateZasilkovna}
                                        style={{ 
                                            padding: '0.5rem 1.2rem', 
                                            background: '#a6e22e', 
                                            color: '#0c3314', 
                                            border: 'none', 
                                            borderRadius: '6px', 
                                            cursor: trackingNumber ? 'not-allowed' : 'pointer', 
                                            fontSize: '0.85rem', 
                                            fontWeight: 'bold', 
                                            opacity: isCreatingZasilkovna || !!trackingNumber ? 0.5 : 1, 
                                            transition: 'all 0.2s' 
                                        }}
                                    >
                                        {isCreatingZasilkovna ? 'Vytvářím...' : 'Vytvořit zásilku v Zásilkovně 📦'}
                                    </button>

                                    {trackingNumber && (
                                        <a
                                            href={`/api/orders/${order.id}/zasilkovna`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ 
                                                display: 'inline-block',
                                                padding: '0.5rem 1.2rem', 
                                                background: '#2563eb', 
                                                color: 'white', 
                                                textDecoration: 'none',
                                                borderRadius: '6px', 
                                                fontSize: '0.85rem', 
                                                fontWeight: 'bold', 
                                                transition: 'all 0.2s' 
                                            }}
                                        >
                                            📄 Tisk štítku (PDF)
                                        </a>
                                    )}
                                </div>

                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>Zadané číslo se automaticky vloží do e-mailu zákazníkovi při změně stavu na Odesláno.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section} style={{ borderBottom: 'none', marginBottom: 0 }}>
                        <div className={styles.totalBlock}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Celkem zaplaceno</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>včetně DPH a dopravy</span>
                            </div>
                            <span className={styles.totalAmount}>{order.amount.toLocaleString()} Kč</span>
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '0.85rem', color: '#666' }}>Stav objednávky:</span>
                                <select
                                    value={order.status}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;

                                        try {
                                            const res = await fetch(`/api/orders/${order.id}`, {
                                                method: 'PATCH',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ 
                                                    status: newStatus,
                                                    ...(trackingNumber && trackingNumber !== "" && { zasilkovna_tracking_number: trackingNumber })
                                                }),
                                            });
                                            if (res.ok) {
                                                if (onUpdate) onUpdate();
                                                onClose();
                                            } else {
                                                alert('Chyba při aktualizaci stavu');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            alert('Chyba při aktualizaci stavu');
                                        }
                                    }}
                                    className={styles.statusSelect}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="paid">Zaplaceno</option>
                                    <option value="packed">Zabaleno</option>
                                    <option value="shipped">Odesláno</option>
                                    <option value="delivered">Vyzvednuto</option>
                                    <option value="pending">Čekající</option>
                                    <option value="delayed">Zpožděno</option>
                                </select>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#999' }}>Vytvořeno: {new Date(order.date).toLocaleString('cs-CZ')}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #fecaca' }}>
                        <button
                            onClick={async () => {
                                if (confirm('Opravdu chcete tuto objednávku smazat? Tato akce je nevratná.')) {
                                    try {
                                        const res = await fetch(`/api/orders/${order.id}`, {
                                            method: 'DELETE',
                                        });
                                        if (res.ok) {
                                            if (onUpdate) onUpdate();
                                            onClose();
                                        } else {
                                            alert('Chyba při mazání objednávky');
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        alert('Chyba při mazání objednávky');
                                    }
                                }
                            }}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fee2e2'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fef2f2'; }}
                        >
                            🗑️ Smazat objednávku
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
