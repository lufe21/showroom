"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useFavorites } from "@/components/Favorites/FavoritesContext";
import styles from "./favoritos.module.css";

export default function Favoritos() {
  const { items, ready } = useFavorites();

  return (
    <div className={styles.page}>
      <header className={styles.banner}>
        <div className={styles.bannerInner}>
          <nav className={styles.breadcrumb} aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span aria-current="page">Favoritos</span>
          </nav>
          <h1 className={styles.title}>Favoritos</h1>
          <p className={styles.subtitle}>
            Guardá lo que te gusta y volvé cuando quieras.
          </p>
          {items.length > 0 && (
            <span className={styles.countPill}>
              {items.length} producto{items.length === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </header>

      {!ready ? (
        <p className={styles.loading}>Cargando favoritos...</p>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ♥
          </span>
          <p>Todavía no guardaste productos en favoritos.</p>
          <Link href="/productos" className={styles.emptyLink}>
            Explorar el catálogo
          </Link>
        </div>
      ) : (
        <section className={styles.grid}>
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.name}
              price={item.price}
              badge={item.badge}
              category={item.category}
            />
          ))}
        </section>
      )}
    </div>
  );
}