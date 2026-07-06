"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Script from "next/script";

declare global {
    interface Window {
        Packeta: any;
    }
}

type Step = "shipping" | "delivery" | "payment" | "success";

const carriers = [
    { id: "zasilkovna", name: "Zásilkovna - Výdejní místa", price: 89, time: "1-2 dny" },
    { id: "zasilkovna_home", name: "Zásilkovna - Na adresu", price: 129, time: "1-2 dny" }
];

import { Suspense } from "react";

function CheckoutContent() {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState<Step>("shipping");
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
    const [discountError, setDiscountError] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const status = searchParams.get("step");
        const sessionId = searchParams.get("session_id");

        if (status === "success" && sessionId) {
            setStep("success");
            clearCart();
        }
    }, [searchParams, clearCart]);

    useEffect(() => {
        const pendingDiscount = sessionStorage.getItem("matchuji_pending_discount");
        if (pendingDiscount && !appliedDiscount && !isApplying) {
            setCouponCode(pendingDiscount);
            // We use a small timeout to ensure state is set before calling apply,
            // or just define the logic inline to immediately apply it.
            const applyPending = async () => {
                setIsApplying(true);
                setDiscountError("");
                try {
                    const res = await fetch("/api/v1/discounts/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code: pendingDiscount, cartAmount: total }),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setAppliedDiscount(data);
                        setCouponCode("");
                        sessionStorage.removeItem("matchuji_pending_discount");
                    } else {
                        setDiscountError(data.error);
                        sessionStorage.removeItem("matchuji_pending_discount");
                    }
                } catch (err) {
                    setDiscountError("Chyba při uplatnění kódu");
                } finally {
                    setIsApplying(false);
                }
            };
            if (total > 0) {
                applyPending();
            }
        }
    }, [total, appliedDiscount, isApplying]);

    const [shipping, setShipping] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Česká republika",
        phone: "",
        zasilkovna_id: "",
        zasilkovna_name: ""
    });

    const [selectedCarrier, setSelectedCarrier] = useState(carriers[0]);

    const openZasilkovnaWidget = () => {
        if (typeof window !== "undefined" && window.Packeta) {
            window.Packeta.Widget.pick("de1146aa1641a90e", (point: any) => {
                if (point) {
                    setShipping(prev => ({
                        ...prev,
                        zasilkovna_id: point.id,
                        zasilkovna_name: point.name,
                        address: point.name,
                        city: point.city,
                        postalCode: point.zip
                    }));
                }
            }, {
                language: 'cs',
                country: 'cz'
            });
        }
    };

    const applyDiscount = async () => {
        if (!couponCode) return;
        setIsApplying(true);
        setDiscountError("");
        try {
            const res = await fetch("/api/v1/discounts/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode, cartAmount: total }),
            });
            const data = await res.json();
            if (data.success) {
                setAppliedDiscount(data);
                setCouponCode("");
            } else {
                setDiscountError(data.error);
            }
        } catch (err) {
            setDiscountError("Chyba při uplatnění kódu");
        } finally {
            setIsApplying(false);
        }
    };

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
                        discount: appliedDiscount,
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
                <Script id="google-ads-conversion" strategy="afterInteractive">
                    {`
                      gtag('event', 'conversion', {
                          'send_to': 'AW-11313378334/t50JCI38oaAZEJ7o0ZIq',
                          'value': 1.0,
                          'currency': 'CZK'
                      });
                    `}
                </Script>
                <span className={styles.successIcon}>🎉</span>
                <h1>Objednávka přijata!</h1>
                <p>Děkujeme za váš nákup. Číslo vaší objednávky je <strong>#MC{searchParams.get("session_id")?.slice(-6).toUpperCase() || "SUCCESS"}</strong>.</p>

                <p>Potvrzení jsme zaslali na email <strong>{shipping.email || "vás email"}</strong>.</p>
                <p>🎁 <strong>Získáváte 10% slevu</strong> na příští nákup! Kód vám dorazí v potvrzovacím emailu.</p>
                <Link href="/">
                    <button className={styles.primaryButton} style={{ marginTop: '2rem' }}>Zpět do obchodu</button>
                </Link>
            </div>
        );
    }

    const isFreeShipping = total > 800 || appliedDiscount?.freeShipping;
    const shippingCost = isFreeShipping ? 0 : selectedCarrier.price;
    const discountValue = appliedDiscount?.amount || 0;
    const finalTotal = total + shippingCost - discountValue;


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
                                    style={{ cursor: 'pointer', marginBottom: '1.5rem', padding: '1.5rem' }}
                                >
                                    <div className={styles.radioCircle}></div>
                                    <div className={styles.optionInfo} style={{ flex: 1 }}>
                                        <span className={styles.optionName} style={{ fontSize: '1.1rem', fontWeight: 700 }}>{carrier.name}</span>
                                        <span className={styles.meta} style={{ display: 'block', marginTop: '0.2rem' }}>{carrier.time}</span>

                                        {carrier.id === "zasilkovna" && (
                                            shipping.zasilkovna_id ? (
                                                <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#166534', fontWeight: 600, textTransform: 'uppercase' }}>Vybrané místo:</p>
                                                    <p style={{ margin: '0.1rem 0', fontWeight: 600 }}>{shipping.zasilkovna_name}</p>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); openZasilkovnaWidget(); }}
                                                        style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer', padding: 0, fontSize: '0.8rem', textDecoration: 'underline', marginTop: '0.3rem' }}
                                                    >
                                                        Změnit výdejní místo
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); openZasilkovnaWidget(); }}
                                                    className={styles.secondaryButton}
                                                    style={{ width: '100%', marginTop: '1rem', background: '#fff', border: '2px solid #bef264', color: '#2d4a22' }}
                                                >
                                                    📍 Vybrat výdejní místo
                                                </button>
                                            )
                                        )}
                                        {carrier.id === "zasilkovna_home" && (
                                            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                                                Doručení přímo na vaši adresu: <br/>
                                                <strong>{shipping.address}, {shipping.city}</strong>
                                            </div>
                                        )}
                                    </div>
                                    <span className={styles.price} style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                                        {isFreeShipping ? "Zdarma" : `${carrier.price} Kč`}
                                    </span>

                                </div>
                            ))}
                        </>
                    )}

                    <div className={styles.actions}>
                        {step !== "shipping" && (
                            <button type="button" onClick={() => {
                                if (step === "delivery") setStep("shipping");
                            }} className={styles.secondaryButton}>
                                ← Zpět
                            </button>
                        )}
                        <button
                            type="submit"
                            className={styles.primaryButton}
                            disabled={loading || (step === "delivery" && selectedCarrier.id === "zasilkovna" && !shipping.zasilkovna_id)}
                            style={{
                                opacity: (loading || (step === "delivery" && selectedCarrier.id === "zasilkovna" && !shipping.zasilkovna_id)) ? 0.6 : 1,
                                cursor: (step === "delivery" && selectedCarrier.id === "zasilkovna" && !shipping.zasilkovna_id) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? "Přesměrování..." : (
                                step === "delivery"
                                    ? (selectedCarrier.id === "zasilkovna" && !shipping.zasilkovna_id ? "Vyberte výdejní místo" : "Zaplatit (Stripe) →")
                                    : "Pokračovat →"
                            )}
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

                    <div className={styles.discountSection} style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                        {appliedDiscount ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', padding: '0.75rem', borderRadius: '6px' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>Uplatněná sleva:</span>
                                    <span style={{ fontWeight: 700 }}>{appliedDiscount.code}</span>
                                </div>
                                <button
                                    onClick={() => setAppliedDiscount(null)}
                                    style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                                >
                                    Odstranit
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Slevový kód"
                                        value={couponCode}
                                        onChange={e => setCouponCode(e.target.value.toUpperCase())}
                                        style={{ flex: 1, padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={applyDiscount}
                                        disabled={isApplying || !couponCode}
                                        className={styles.button}
                                        style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', background: '#0d2112', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Použít
                                    </button>
                                </div>
                                {discountError && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>{discountError}</p>}
                            </div>
                        )}
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
                        {appliedDiscount && (
                            <div className={styles.totalRow} style={{ color: '#166534', fontWeight: 600 }}>
                                <span>Sleva ({appliedDiscount.code})</span>
                                <span>-{appliedDiscount.amount} Kč</span>
                            </div>
                        )}
                        <div className={styles.finalTotal}>
                            <span className={styles.finalTotalLabel}>Celkem k úhradě</span>
                            <span>{finalTotal < 0 ? 0 : finalTotal.toFixed(0)} Kč</span>
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
            <Script src="https://widget.packeta.com/v6/www/js/library.js" strategy="lazyOnload" />
            <CheckoutContent />
        </Suspense>
    );
}
