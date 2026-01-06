"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

type Step = "shipping" | "delivery" | "payment" | "success";

const carriers = [
    { id: "zasilkovna", name: "Zásilkovna - Výdejní místa", price: 79, time: "1-2 dny" },
    { id: "ppl", name: "PPL Kurýr", price: 99, time: "Doručení domů" },
    { id: "dpd", name: "DPD Pickup", price: 89, time: "Výdejní místa" },
    { id: "pickup", name: "Osobní odběr (Praha)", price: 0, time: "Ihned k dispozici" }
];

// Payments are handled by Stripe
import { Suspense } from "react";

function CheckoutContent() {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState<Step>("shipping");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const status = searchParams.get("step");
        const sessionId = searchParams.get("session_id");

        if (status === "success" && sessionId) {
            setStep("success");
            clearCart();
        }
    }, [searchParams, clearCart]);

    const [shipping, setShipping] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Česká republika",
        phone: ""
    });

    const [selectedCarrier, setSelectedCarrier] = useState(carriers[0]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (step === "shipping") setStep("delivery");
        else if (step === "delivery") {
            setLoading(true);
            try {
                const response = await fetch("/api/create-checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items,
                        shipping,
                        carrier: selectedCarrier,
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || "Failed to create checkout session");
                }
            } catch (err: any) {
                console.error("Checkout error:", err);
                alert(`Chyba: ${err.message || "Něco se nepodařilo"}`);
                setLoading(false);
            }
        }
    };

    if (items.length === 0 && step !== "success") {
        return (
            <div className={styles.empty}>
                <h1>Váš košík je prázdný</h1>
                <Link href="/">
                    <button className={styles.primaryButton}>Pokračovat v nákupu</button>
                </Link>
            </div>
        );
    }

    if (step === "success") {
        return (
            <div className={styles.success}>
                <span className={styles.successIcon}>🎉</span>
                <h1>Objednávka přijata!</h1>
                <p>Děkujeme za váš nákup. Číslo vaší objednávky je <strong>#MC{Math.floor(Math.random() * 10000)}</strong>.</p>
                <p>Potvrzení jsme zaslali na email <strong>{shipping.email || "vás email"}</strong>.</p>
                <p>🎁 <strong>Získáváte 10% slevu</strong> na příští nákup! Kód vám dorazí v potvrzovacím emailu.</p>
                <Link href="/">
                    <button className={styles.primaryButton} style={{ marginTop: '2rem' }}>Zpět do obchodu</button>
                </Link>
            </div>
        );
    }

    const shippingCost = total > 800 ? 0 : selectedCarrier.price;
    const finalTotal = total + shippingCost;

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <div className={`${styles.step} ${step === "shipping" ? styles.active : ""}`}>1. Údaje</div>
                <div className={styles.line}></div>
                <div className={`${styles.step} ${step === "delivery" ? styles.active : ""}`}>2. Doprava a Platba</div>
            </div>

            <div className={styles.grid}>
                <motion.form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {step === "shipping" && (
                        <>
                            <h2>Kontaktní údaje</h2>
                            <input
                                type="email"
                                placeholder="E-mailová adresa"
                                required
                                value={shipping.email}
                                onChange={e => setShipping({ ...shipping, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Telefonní číslo (+420...)"
                                required
                                value={shipping.phone}
                                onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                            />

                            <h2>Doručovací adresa</h2>
                            <div className={styles.row}>
                                <input
                                    type="text"
                                    placeholder="Jméno"
                                    required
                                    value={shipping.firstName}
                                    onChange={e => setShipping({ ...shipping, firstName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Příjmení"
                                    required
                                    value={shipping.lastName}
                                    onChange={e => setShipping({ ...shipping, lastName: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Ulice a číslo popisné"
                                required
                                value={shipping.address}
                                onChange={e => setShipping({ ...shipping, address: e.target.value })}
                            />
                            <div className={styles.row}>
                                <input
                                    type="text"
                                    placeholder="Město"
                                    required
                                    value={shipping.city}
                                    onChange={e => setShipping({ ...shipping, city: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="PSČ"
                                    required
                                    value={shipping.postalCode}
                                    onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {step === "delivery" && (
                        <>
                            <h2>Vyberte dopravu</h2>
                            {carriers.map(carrier => (
                                <div
                                    key={carrier.id}
                                    className={`${styles.option} ${selectedCarrier.id === carrier.id ? styles.selected : ""}`}
                                    onClick={() => setSelectedCarrier(carrier)}
                                >
                                    <div className={styles.radioCircle}></div>
                                    <div className={styles.optionInfo}>
                                        <span className={styles.optionName}>{carrier.name}</span>
                                        <span className={styles.meta}>{carrier.time}</span>
                                    </div>
                                    <span className={styles.price}>
                                        {total > 800 ? "Zdarma" : (carrier.price === 0 ? "Zdarma" : `${carrier.price} Kč`)}
                                    </span>
                                </div>
                            ))}
                        </>
                    )}

                    {step === "payment" && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Přesměrování na platební bránu...</p>
                        </div>
                    )}

                    <div className={styles.actions}>
                        {step !== "shipping" && (
                            <button type="button" onClick={() => {
                                if (step === "delivery") setStep("shipping");
                            }} className={styles.secondaryButton}>
                                ← Zpět
                            </button>
                        )}
                        <button type="submit" className={styles.primaryButton} disabled={loading}>
                            {loading ? "Přesměrování..." : (step === "delivery" ? "Zaplatit (Stripe)" : "Pokračovat →")}
                        </button>
                    </div>
                </motion.form>

                <div className={styles.summary}>
                    <h2>Rekapitulace ({items.length})</h2>
                    <div className={styles.items}>
                        {items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.imageWrapper}>
                                    <Image src={item.image} alt={item.name} width={60} height={60} className={styles.image} />
                                </div>
                                <div className={styles.details}>
                                    <span className={styles.itemName}>{item.name}</span>
                                    <span className={styles.qty}>Ks: {item.quantity}</span>
                                </div>
                                <span className={styles.itemPrice}>{(item.price * item.quantity).toFixed(0)} Kč</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Mezisoučet</span>
                            <span>{total.toFixed(0)} Kč</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Doprava ({selectedCarrier.name})</span>
                            <span style={{ color: shippingCost === 0 ? '#166534' : 'inherit', fontWeight: shippingCost === 0 ? '700' : 'normal' }}>
                                {shippingCost === 0 ? "ZDARMA" : `${shippingCost} Kč`}
                            </span>
                        </div>
                        <div className={styles.finalTotal}>
                            <span className={styles.finalTotalLabel}>Celkem k úhradě</span>
                            <span>{finalTotal.toFixed(0)} Kč</span>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                            Včetně DPH 21%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={<div className={styles.loading}>Načítání pokladny...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
