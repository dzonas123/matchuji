"use client";

import styles from "@/app/admin/Admin.module.css";

interface StatsCardProps {
    label: string;
    value: string | number;
}

export default function StatsCard({ label, value }: StatsCardProps) {
    return (
        <div className={styles.statCard}>
            <h3>{label}</h3>
            <p>{value}</p>
        </div>
    );
}
