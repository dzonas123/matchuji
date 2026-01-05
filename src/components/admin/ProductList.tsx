"use client";

import styles from "@/app/admin/Admin.module.css";
import Image from "next/image";

// Using the same products array for now, ideally this comes from a shared source/API
const products = [
    {
        id: "matcha-50g",
        name: "Ceremoniální Matcha 50g",
        price: 297,
        stock: 45, // Mock stock
        image: "/images/matcha-bag-single.jpg",
    },
    {
        id: "matcha-3pack",
        name: "Matcha Bundle 3-Pack",
        price: 769,
        stock: 12, // Mock stock
        image: "/images/matcha-bundle-3pack.jpg",
    }
];

export default function ProductList() {
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
                                    <button style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Upravit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
