"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import styles from "./cartButton.module.css";

export default function CartButton({ className = "" }) {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className={`${styles.cartBtn} ${className}`}
      aria-label={`Carrito, ${count} producto${count === 1 ? "" : "s"}`}
    >
      <span aria-hidden="true">🛒</span>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
}
