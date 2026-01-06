"use client";

import styles from "@/app/admin/Admin.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingProduct),
            });

            if (res.ok) {
                setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
                setEditingProduct(null);
                alert("Produkt byl úspěšně upraven!");
            }
        } catch (err) {
            console.error("Failed to update product:", err);
            alert("Nepodařilo se uložit změny.");
        }
    };

    if (loading) return <div>Načítání produktů...</div>;

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Obrázek</th>
                            <th>Název produktu</th>
                            <th>Cena</th>
                            <th>Skladem</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ width: 40, height: 40, position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </td>
                                <td><strong>{product.name}</strong></td>
                                <td>{product.price} Kč</td>
                                <td>
                                    <span style={{ color: product.stock < 20 ? '#e67700' : 'inherit' }}>
                                        {product.stock} ks
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className={styles.button}
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}
                                    >
                                        Upravit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingProduct && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent} style={{ maxWidth: '400px' }}>
                        <div className={styles.modalHeader}>
                            <h2>Upravit produkt</h2>
                            <button className={styles.closeBtn} onClick={() => setEditingProduct(null)}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <form onSubmit={handleUpdate} className={styles.form}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Název produktu</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={editingProduct.name}
                                        onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Cena (Kč)</label>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Sklad (ks)</label>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <button type="submit" className={styles.button}>Uložit změny</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
