"use client";

import styles from "@/app/admin/Admin.module.css";
import { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

interface Order {
    id: string;
    date: string;
    amount: number;
    status: string;
    shipping: {
        firstName: string;
        lastName: string;
        email: string;
    };
}

interface OrderListProps {
    orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = (
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shipping?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shipping?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.controls} style={{ padding: '1rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #eee' }}>
                <input
                    type="text"
                    placeholder="Hledat (ID, email, jméno)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', minWidth: '300px' }}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="all">Všechny stavy</option>
                    <option value="paid">Zaplaceno</option>
                    <option value="pending">Čekající</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Datum</th>
                            <th>Zákazník</th>
                            <th>Email</th>
                            <th>Částka</th>
                            <th>Stav</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                                    Zatím žádné objednávky 📭
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.id} onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        #{order.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td>{new Date(order.date).toLocaleDateString('cs-CZ')}</td>
                                    <td>
                                        <strong>{order.shipping?.firstName} {order.shipping?.lastName}</strong>
                                    </td>
                                    <td>{order.shipping?.email}</td>
                                    <td><strong>{order.amount.toLocaleString()} Kč</strong></td>
                                    <td>
                                        <span className={`${styles.status} ${order.status === 'paid' ? styles.paid : styles.pending}`}>
                                            {order.status === 'paid' ? 'Zaplaceno' : order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
}
