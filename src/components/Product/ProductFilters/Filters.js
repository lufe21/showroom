"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./filters.module.css";

export default function Filters({ categories = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "recent";

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const update = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    update({ q: query.trim() });
  };

  const SORTS = [
    { value: "recent", label: "Recientes" },
    { value: "price-asc", label: "$ ↑" },
    { value: "price-desc", label: "$ ↓" },
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.searchRow}>
        <form onSubmit={submitSearch} className={styles.searchForm} role="search">
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm10 2-4.35-4.35"
            />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className={styles.search}
          />
          <button type="submit" className={styles.searchBtn}>
            Buscar
          </button>
        </form>

        <div className={styles.sortGroup} role="group" aria-label="Ordenar productos">
          {SORTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => update({ sort: s.value })}
              className={`${styles.sortBtn} ${sort === s.value ? styles.sortActive : ""}`}
              aria-pressed={sort === s.value}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chipsRow}>
        <span className={styles.chipsLabel}>Categorías</span>
        <div className={styles.chips} role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            onClick={() => update({ category: "" })}
            className={`${styles.chip} ${category === "" ? styles.chipActive : ""}`}
            aria-pressed={category === ""}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ category: category === c ? "" : c })}
              className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}