"use client";

import { useFavorites } from "./FavoritesContext";
import styles from "./favorites.module.css";

function Heart({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      className={styles.heartIcon}
    >
      <path
        d="M12 21s-6.5-4.35-9.5-8.5C1 9.2 3.1 5.5 6.5 5.5c1.8 0 3.2 1 4 2.3h3c.8-1.3 2.2-2.3 4-2.3C20.9 5.5 23 9.2 21.5 12.5 18.5 16.65 12 21 12 21z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FavoritesButton({
  product,
  variant = "card",
  className = "",
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      className={`${styles.heartBtn} ${
        variant === "detail" ? styles.heartBtnDetail : ""
      } ${active ? styles.heartBtnActive : ""} ${className}`}
      onClick={() => toggle(product)}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart filled={active} />
    </button>
  );
}