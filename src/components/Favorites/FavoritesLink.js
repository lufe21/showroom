"use client";

import Link from "next/link";
import { useFavorites } from "./FavoritesContext";
import styles from "./favorites.module.css";

export default function FavoritesLink({ className = "" }) {
  const { count } = useFavorites();

  return (
    <Link
      href="/favoritos"
      className={`${styles.navLink} ${className}`}
      aria-label={`Favoritos, ${count} producto${count === 1 ? "" : "s"}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
        className={styles.navHeart}
      >
        <path
          d="M12 21s-6.5-4.35-9.5-8.5C1 9.2 3.1 5.5 6.5 5.5c1.8 0 3.2 1 4 2.3h3c.8-1.3 2.2-2.3 4-2.3C20.9 5.5 23 9.2 21.5 12.5 18.5 16.65 12 21 12 21z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
}