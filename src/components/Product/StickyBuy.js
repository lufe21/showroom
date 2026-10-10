"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/config";
import AddToCartButton from "@/components/Product/AddToCartButton";
import styles from "./stickyBuy.module.css";

export default function StickyBuy({ product, waText }) {
  const [show, setShow] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <span ref={anchorRef} className={styles.anchor} aria-hidden="true" />
      <div className={`${styles.bar} ${show ? styles.show : ""}`}>
        <AddToCartButton
          product={product}
          className={styles.addBtn}
          label="Agregar al carrito"
        />
        <a
          href={whatsappLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.waBtn}
          aria-label="Consultar por WhatsApp"
        >
          <img src="/icons/whatsapp.png" alt="" width={20} height={20} />
          WhatsApp
        </a>
      </div>
    </>
  );
}