"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent");
    if (saved === "granted" || saved === "denied") {
      setConsent(saved);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setConsent("granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setConsent("denied");
    setShowBanner(false);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1615966982259076');
              fbq('track', 'PageView');
            `}
          </Script>
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wrx7w9wqus");
            `}
          </Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-Q0EFV3Q30P" strategy="afterInteractive" />
          <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11313378334" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-Q0EFV3Q30P');
              gtag('config', 'AW-11313378334');
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className={styles.banner}>
          <div className={styles.content}>
            <p className={styles.text}>
              Používáme cookies k personalizaci obsahu a reklam, poskytování funkcí sociálních médií a analýze naší návštěvnosti. Kliknutím na „Přijmout vše“ souhlasíte s používáním VŠECH cookies pro analytiku a marketing.
            </p>
            <div className={styles.actions}>
              <button onClick={handleDecline} className={styles.btnDecline}>
                Odmítnout vše
              </button>
              <button onClick={handleAccept} className={styles.btnAccept}>
                Přijmout vše
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
