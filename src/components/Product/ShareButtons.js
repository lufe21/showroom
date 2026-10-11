"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/config";
import styles from "./share.module.css";

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, ta.value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // continuar con fallback
    }
  }
  return fallbackCopy(text);
}

export default function ShareButtons({ product }) {
  const [state, setState] = useState("idle");
  const url = `${SITE_URL}/productos/${product.id}`;
  const text = `Mirá este producto en Showroom Rox: ${product.name} — ${url}`;
  const waShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

  const handleCopy = async () => {
    const ok = await copyText(url);
    setState(ok ? "copied" : "error");
    setTimeout(() => setState("idle"), 2200);
  };

  const label =
    state === "copied" ? "✓ Copiado" : state === "error" ? "No se pudo copiar" : "Copiar link";

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
        onClick={handleCopy}
        className={`${styles.button} ${
          state === "copied" ? styles.copied : ""
        }`}
        title="Copiar enlace del producto"
        aria-live="polite"
      >
        {label}
      </button>
    </div>
  );
}