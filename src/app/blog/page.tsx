"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import styles from "./page.module.css";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Všechny");

  const filtered = activeCategory === "Všechny"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>🍵 Matcha blog</span>
        <h1 className={styles.heroTitle}>
          Recepty, tipy & průvodci<br />
          <em>pro milovníky matchy</em>
        </h1>
        <p className={styles.heroDesc}>
          Vše o matche — jak ji správně připravit, kde koupit, jaké má účinky a nejlepší recepty.
        </p>
      </section>

      {/* Category filter */}
      <div className={styles.filters}>
        {blogCategories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className={styles.grid}>
        {filtered.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <div className={styles.cardEmoji}>{post.emoji}</div>
            <div className={styles.cardMeta}>
              <span className={styles.cardCategory}>{post.category}</span>
              <span className={styles.cardRead}>{post.readTime} min čtení</span>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>
            <span className={styles.cardCta}>
              Číst článek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>🛒 Vyzkoušejte sami</p>
          <h2 className={styles.ctaTitle}>Připraveni ochutnat?</h2>
          <p className={styles.ctaDesc}>7A Ceremonial Grade matcha z Uji — objednejte online s doručením po celé ČR.</p>
          <Link href="/product/ceremonial-matcha" className={styles.ctaBtn}>
            Koupit matchu
          </Link>
        </div>
      </section>
    </main>
  );
}
