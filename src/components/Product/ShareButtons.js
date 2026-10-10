"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/config";
import styles from "./share.module.css";

export default function ShareButtons({ product }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/productos/${product.id}`;
  const text = `Mirá este producto en Showroom Rox: ${product.name} — ${url}`;
  const waShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard no disponible
    }
  };

  return (
    <div className={styles.row}>
      <span className={styles.label}>Compartir:</span>
      <a
        href={waShare}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.wa}`}
      >
        <img src="/icons/whatsapp.png" alt="" width={16} height={16} />
        WhatsApp
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={styles.button}
        aria-live="polite"
      >
        {copied ? "✓ Copiado" : "Copiar link"}
      </button>
    </div>
  );
}