"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import ReviewsSection from "@/components/ReviewsSection";
import FAQ from "@/components/FAQ";

export default function BambooSetPage() {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "/images/matcha-set-1.jpg",
        "/images/matcha-set-2.jpg",
        "/images/matcha-set-3.jpg"
    ];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: "matcha-set-bamboo",
                name: "Bambusový Matcha Set (4ks)",
                price: 349,
                originalPrice: 490,
                image: "/images/matcha-set-1.jpg"
            });
        }
    };

    return (
        <main>
            <section style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f9faeb', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
                    
                    {/* Left Column - Gallery */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: '1 1 500px' }}
                    >
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden', marginBottom: '20px', backgroundColor: 'white' }}>
                            <Image
                                src={images[activeImage]}
                                alt="Bambusový Matcha Set"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {images.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    style={{ 
                                        width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', 
                                        border: activeImage === idx ? '3px solid var(--color-dark-green)' : '3px solid transparent',
                                        cursor: 'pointer', position: 'relative', backgroundColor: 'white'
                                    }}
                                >
                                    <Image src={img} alt="Náhled" fill style={{ objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    >
                        <div style={{ color: 'var(--color-dark-green)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>
                            Matchuji Příslušenství
                        </div>
                        <h1 style={{ fontSize: '3rem', color: 'var(--color-dark-green)', marginBottom: '15px', lineHeight: '1.1' }}>
                            Bambusový Matcha Set (4ks)
                        </h1>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                            <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</span>
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>(12 ověřených recenzí)</span>
                        </div>

                        <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.6', marginBottom: '30px' }}>
                            Tradiční sada čtyř bambusových nástrojů pro dosažení dokonale napěněné a hladké matchy. 
                            Set obsahuje klasickou metličku (chasen) pro hustou pěnu bez hrudek, 
                            čajovou lžičku, naběračku (chashaku) pro přesné dávkování a jemné nerezové sítko pro prosévání matchy.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', marginBottom: '30px' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-dark-green)', lineHeight: '1' }}>349 Kč</span>
                            <span style={{ fontSize: '1.3rem', color: '#999', textDecoration: 'line-through', marginBottom: '5px' }}>490 Kč</span>
                            <span style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: 'red', padding: '4px 10px', borderRadius: '100px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>
                                Ušetříte 141 Kč
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '100px', padding: '5px 20px', backgroundColor: 'white' }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>-</button>
                                <input type="text" readOnly value={quantity} style={{ width: '40px', textAlign: 'center', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', background: 'transparent' }} />
                                <button onClick={() => setQuantity(quantity + 1)} style={{ fontSize: '1.3rem', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>+</button>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                style={{ 
                                    flex: 1, backgroundColor: 'var(--color-dark-green)', color: 'white', border: 'none', 
                                    borderRadius: '100px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                                    transition: 'background 0.2s ease', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                    minWidth: '200px', padding: '15px 0'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3c28'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-dark-green)'}
                            >
                                Přidat do košíku
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '30px' }}>
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                                <span style={{ fontSize: '1.5rem' }}>✅</span>
                                <div>
                                    <strong style={{ color: 'var(--color-dark-green)' }}>Skladem, ihned k odeslání</strong>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <span style={{ fontSize: '1.5rem' }}>🍃</span>
                                <div>
                                    <strong style={{ color: 'var(--color-dark-green)' }}>Tradiční ruční výroba</strong>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>Všechny bambusové nástroje jsou vyřezány z jednoho kusu kvalitního zlatého bambusu.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            <ReviewsSection />
            <FAQ />
        </main>
    );
}
