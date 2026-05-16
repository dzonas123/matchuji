import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, blogPosts } from "@/data/blogPosts";
import type { Metadata } from "next";
import styles from "./page.module.css";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: ["/images/matcha-lifestyle.jpg"],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key} className={styles.list}>
          {listBuffer.map((item, i) => (
            <li key={i}>{item.replace(/^[-✅•]\s*/, "")}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList(`flush-${i}`);
      elements.push(<h2 key={i} className={styles.h2}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList(`flush-${i}`);
      elements.push(<p key={i} className={styles.bold}>{trimmed.slice(2, -2)}</p>);
    } else if (trimmed.startsWith("---")) {
      flushList(`flush-${i}`);
      elements.push(<hr key={i} className={styles.divider} />);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("✅ ") || trimmed.startsWith("• ")) {
      listBuffer.push(trimmed);
    } else if (trimmed === "") {
      flushList(`flush-${i}`);
    } else if (trimmed) {
      flushList(`flush-${i}`);
      // Replace **bold** inline
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((p, j) =>
        p.startsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
      );
      elements.push(<p key={i} className={styles.para}>{rendered}</p>);
    }
  });

  flushList("final");
  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  const dateFormatted = new Date(post.publishedAt).toLocaleDateString("cs-CZ", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Domů</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>{post.title}</span>
      </nav>

      <article className={styles.article}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.dot}>·</span>
            <time className={styles.date} dateTime={post.publishedAt}>{dateFormatted}</time>
            <span className={styles.dot}>·</span>
            <span className={styles.read}>{post.readTime} min čtení</span>
          </div>
          <div className={styles.emoji}>{post.emoji}</div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {renderContent(post.content)}
        </div>

        {/* Keywords (hidden for SEO) */}
        <div className={styles.keywordList} aria-hidden="true">
          {post.keywords.map(k => (
            <span key={k} className={styles.keyword}>{k}</span>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>🛒 Vyzkoušejte sami</p>
          <h2 className={styles.ctaTitle}>Připraveni ochutnat?</h2>
          <p className={styles.ctaDesc}>7A Ceremonial Grade matcha z Uji, Japonsko — doručení do ČR do 2 dnů.</p>
          <Link href="/product/ceremonial-matcha" className={styles.ctaBtn}>
            Koupit matchu
          </Link>
        </div>
      </section>

      {/* Related posts */}
      <section className={styles.related}>
        <h2 className={styles.relatedTitle}>Další články</h2>
        <div className={styles.relatedGrid}>
          {relatedPosts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.relatedCard}>
              <span className={styles.relatedEmoji}>{p.emoji}</span>
              <span className={styles.relatedCategory}>{p.category}</span>
              <h3 className={styles.relatedCardTitle}>{p.title}</h3>
              <span className={styles.relatedCta}>Číst →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
