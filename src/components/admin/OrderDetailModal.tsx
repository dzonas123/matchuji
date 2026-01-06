"use client";

import styles from "@/app/admin/Admin.module.css";

interface OrderDetailModalProps {
    order: any;
    onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null;

    const s = order.shipping || {};

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detail objednávky</span>
                        <h2 style={{ fontSize: '1.4rem' }}>#{order.id.slice(-6).toUpperCase()}</h2>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.section}>
                        <h3>👤 Kontaktní údaje</h3>
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
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>🛒 Produkty</h3>
                        <div className={styles.itemsList}>
                            {order.items && order.items.map((item: any, idx: number) => (
                                <div key={idx} className={styles.itemRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: '#eee', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifySelf: 'center', fontSize: '10px', color: '#999' }}>IMG</div>
                                        <div>
                                            <p style={{ fontWeight: 600, margin: 0 }}>{item.name || item.id}</p>
                                            <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>ID: {item.id}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, margin: 0 }}>{item.quantity} ks</p>
                                    </div>
                                </div>
                            ))}
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
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#999' }}>
                            <span>Stav: <strong style={{ color: '#166534' }}>● ZAPLACENO</strong></span>
                            <span>Vytvořeno: {new Date(order.date).toLocaleString('cs-CZ')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
