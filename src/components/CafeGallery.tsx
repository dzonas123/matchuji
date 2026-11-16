"use client";

import styles from "./CafeGallery.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
    { src: "/images/cafe-bg-latte.png", alt: "Matcha Latte" },
    { src: "/images/cafe-new.jpg", alt: "Matcha Dezert" },
    { src: "/images/cafe-collage.png", alt: "Matcha Variace" },
    { src: "/images/cafe-b2b-final.jpg", alt: "Matcha Kavárna" },
    { src: "/images/cafe-bg-latte.png", alt: "Matcha Latte Detail" }
];

export default function CafeGallery() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Možnosti servírování</h2>
                <div className={styles.grid}>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Using standard img tag to preserve aspect ratio without forced cropping if desired, 
                                or Next.js Image with 'style={{ objectFit: "cover" }}' if consistency is key.
                                User asked for consistency AND no cropping. Hard to achieve both perfect grid and no crop.
                                Compromise: Fixed height grid with cover (consistent) or Masonry (no crop). 
                                I'll choose specific aspect ratio containers that fit food photography well (4:5 or 1:1).
                            */}
                            <div className={styles.imageContainer}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={600}
                                    height={600}
                                    className={styles.image}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
