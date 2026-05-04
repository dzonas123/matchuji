"use client";

import styles from "./ProductDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } }
};

// SVG Icons
const Icons = {
    Energy: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    Focus: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Immunity: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Organic: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.79 10-6 10a7 7 0 0 1-3.95-2.05" />
            <path d="M11 15v5" />
        </svg>
    ),
    Sieve: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h16" /><path d="M4 14h16" /><path d="M10 8v12" /><path d="M14 8v12" />
        </svg>
    ),
    Water: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    ),
    Whisk: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
            <path d="M9 7 3 13" />
        </svg>
    ),
    Bamboo: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20" /><path d="M8 6h8" /><path d="M8 12h8" /><path d="M8 18h8" />
        </svg>
    ),
    Star: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Leaf: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.79 10-6 10a7 7 0 0 1-3.95-2.05" />
        </svg>
    ),
};

export type BenefitCard = {
    icon: keyof typeof Icons;
    title: string;
    text: string;
};

export type FeatureItem = {
    label: string;
    value: string;
};

export type StepCard = {
    icon: keyof typeof Icons;
    number: string;
    title: string;
    text: string;
};

export type ProductDetailsProps = {
    /** Header of the benefits section */
    benefitsTitle?: string;
    benefitsSubtitle?: string;
    benefits?: BenefitCard[];
    /** Deep-dive section */
    deepDiveTitle?: React.ReactNode;
    deepDiveIntro?: string;
    deepDiveFeatures?: FeatureItem[];
    deepDiveOutro?: string;
    deepDiveImage?: string;
    deepDiveImageAlt?: string;
    certLink?: boolean;
    /** Preparation steps */
    preparationTitle?: string;
    steps?: StepCard[];
};

const DEFAULT_BENEFITS: BenefitCard[] = [
    { icon: "Energy", title: "Energie na 6+ hodin", text: "Na rozdíl od kávy obsahuje Matcha L-Theanin, který uvolňuje kofein pomalu. Žádná nervozita, žádný propad – jen 6 hodin klidné, soustředěné energie." },
    { icon: "Focus", title: "Laserové soustředění", text: "Používáno zenovými mnichy po staletí k podpoře meditace. L-Theanin podporuje alfa mozkové vlny, navozující stav hlubokého soustředění a jasnosti." },
    { icon: "Immunity", title: "Silná podpora imunity", text: "Jeden šálek matchy má tolik antioxidantů jako 10 šálků běžného zeleného čaje, konkrétně EGCG, které chrání vaše buňky před poškozením." },
    { icon: "Organic", title: "100% Organické a čisté", text: "Certifikováno jako organické. Pěstováno ve stínu 30 dní před sklizní pro zvýšení chlorofylu. Mleté kamennými mlýny na jemný prášek." },
];

const DEFAULT_STEPS: StepCard[] = [
    { icon: "Sieve", number: "01", title: "Přeosít", text: "Prosejte 1-2 lžičky matchy do misky. Rozbijete tím hrudky a matcha bude dokonale jemná." },
    { icon: "Water", number: "02", title: "Zalít", text: "Přidejte 60ml vody o teplotě 80°C. Nikdy ne vařící, ta by čaj spálila a zhořkl by." },
    { icon: "Whisk", number: "03", title: "Šlehat", text: "Šlehejte metličkou ve tvaru \"W\" asi minutu, dokud nevznikne hustá krémová pěna." },
];

export default function ProductDetails({
    benefitsTitle = "Proč Matcha Premium 7A?",
    benefitsSubtitle = "Zažijte rozdíl pravé ceremoniální kvality. Přímo z Uji, Kjóto.",
    benefits = DEFAULT_BENEFITS,
    deepDiveTitle,
    deepDiveIntro,
    deepDiveFeatures,
    deepDiveOutro,
    deepDiveImage = "/images/matcha-lifestyle.jpg",
    deepDiveImageAlt = "Životní styl Matcha Latte",
    certLink = true,
    preparationTitle = "Jak připravit rituál",
    steps = DEFAULT_STEPS,
}: ProductDetailsProps) {
    const resolvedDeepDiveTitle = deepDiveTitle ?? (
        <>V čem je <span className={styles.highlight}>7A kvalita</span> jiná?</>
    );
    const resolvedDeepDiveIntro = deepDiveIntro ?? "Není matcha jako matcha. Naše <strong>ceremoniální třída 7A</strong> představuje to nejlepší horní 1% sklizně.";
    const resolvedDeepDiveFeatures: FeatureItem[] = deepDiveFeatures ?? [
        { label: "Barva", value: "Zářivě elektrická zelená" },
        { label: "Textura", value: "Hedvábně jemná jako pudr" },
        { label: "Chuť", value: "Sladká umami, bez hořkosti" },
    ];
    const resolvedDeepDiveOutro = deepDiveOutro ?? "Ideální pro tradiční ceremoniál jen s vodou, nebo pro to nejluxusnější latte.";

    return (
        <section id="details" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.benefitsHeader}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>{benefitsTitle}</h2>
                    <p>{benefitsSubtitle}</p>
                </motion.div>

                <motion.div
                    className={styles.benefitsGrid}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {benefits.map((b, idx) => {
                        const IconComp = Icons[b.icon];
                        return (
                            <motion.div key={idx} className={styles.benefitCard} variants={item} whileHover={{ y: -10 }}>
                                <div className={styles.iconWrapper}>
                                    <IconComp />
                                </div>
                                <h3>{b.title}</h3>
                                <p>{b.text}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className={styles.deepDive}>
                    <div className={styles.deepDiveContent}>
                        <h3>{resolvedDeepDiveTitle}</h3>
                        <p className={styles.deepDiveIntro} dangerouslySetInnerHTML={{ __html: resolvedDeepDiveIntro }} />
                        <ul className={styles.featureList}>
                            {resolvedDeepDiveFeatures.map((f, i) => (
                                <li key={i}>
                                    <span className={styles.featureDot}></span>
                                    <div className={styles.featureText}>
                                        <strong>{f.label}:</strong> {f.value}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className={styles.deepDiveOutro}>{resolvedDeepDiveOutro}</p>
                        {certLink && (
                            <Link href="/certifikace" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginTop: '20px',
                                padding: '10px 20px',
                                background: 'white',
                                color: 'var(--color-dark-green)',
                                border: '1.5px solid var(--color-dark-green)',
                                borderRadius: '100px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-dark-green)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.color = 'var(--color-dark-green)'; }}
                            >
                                🏅 Zobrazit certifikace o kvalitě
                            </Link>
                        )}
                    </div>
                    <div className={styles.deepDiveImageWrapper}>
                        <Image
                            src={deepDiveImage}
                            alt={deepDiveImageAlt}
                            fill
                            className={styles.lifestyleImage}
                        />
                    </div>
                </div>

                <div className={styles.preparation}>
                    <h2>{preparationTitle}</h2>
                    <div className={styles.steps}>
                        {steps.map((s, idx) => {
                            const StepIcon = Icons[s.icon];
                            return (
                                <div key={idx} className={styles.stepCard}>
                                    <div className={styles.stepHeader}>
                                        <div className={styles.stepIcon}><StepIcon /></div>
                                        <span className={styles.stepNumber}>{s.number}</span>
                                    </div>
                                    <h4>{s.title}</h4>
                                    <p>{s.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
