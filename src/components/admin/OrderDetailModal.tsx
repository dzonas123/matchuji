"use client";

import styles from "@/app/admin/Admin.module.css";
import Image from "next/image";

interface OrderDetailModalProps {
    order: any;
    onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Detail objednávky #{order.id.slice(-6).toUpperCase()}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.section}>
                        <h3>📦 Zákazník a doručení</h3>
                        <div className={styles.infoGrid}>
                            <div>
                                <label>Jméno</label>
                                <p>{order.shipping.firstName} {order.shipping.lastName}</p>
                            </div>
                            <div>
                                <label>Email</label>
                                <p>{order.shipping.email}</p>
                            </div>
                            <div>
                                <label>Telefon</label>
                                <p>{order.shipping.phone || "-"}</p>
                            </div>
                            <div>
                                <label>Adresa</label>
                                <p>{order.shipping.address}, {order.shipping.city}, {order.shipping.postalCode}</p>
                            </div>
                            <div>
                                <label>Doprava</label>
                                <p>{order.carrier}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>🛒 Položky objednávky</h3>
                        <div className={styles.itemsList}>
                            {order.items.map((item: any) => (
                                <div key={item.id} className={styles.itemRow}>
                                    <div className={styles.itemInfo}>
                                        <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.id}
                                    </div>
                                    {/* Price would ideally be here if stored in items array */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section} style={{ borderBottom: 'none' }}>
                        <div className={styles.totalBlock}>
                            <span>Celkem zaplaceno</span>
                            <span className={styles.totalAmount}>{order.amount.toLocaleString()} Kč</span>
                        </div>
                        <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#666' }}>
                            Objednáno: {new Date(order.date).toLocaleString('cs-CZ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
