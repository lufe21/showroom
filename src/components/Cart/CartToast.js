"use client";

import { useCart } from "@/components/Cart/CartContext";
import styles from "./cartToast.module.css";

export default function CartToast() {
  const { toast, clearToast } = useCart();

  if (!toast) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        ✓
      </span>
      <span className={styles.message}>{toast}</span>
      <button
        type="button"
        className={styles.close}
        onClick={clearToast}
        aria-label="Cerrar aviso"
      >
        ×
      </button>
    </div>
  );
}