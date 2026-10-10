"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./filters.module.css";

function pagesWindow(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const set = new Set([1, totalPages, page - 1, page, page + 1]);
  const list = [...set]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const out = [];
  let prev = 0;
  for (const p of list) {
    if (p - prev > 1) out.push(null);
    out.push(p);
    prev = p;
  }
  return out;
}

export default function Pagination({ page, totalPages }) {
  if (!totalPages || totalPages <= 1) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = (target) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(target));
    return `${pathname}?${params.toString()}`;
  };

  const pages = pagesWindow(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      {page > 1 ? (
        <Link href={href(page - 1)} className={styles.pageBtn}>
          ←
        </Link>
      ) : (
        <span className={styles.pageDisabled}>←</span>
      )}

      {pages.map((p, i) =>
        p === null ? (
          <span key={`e${i}`} className={styles.ellipsis} aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${styles.pageBtn} ${p === page ? styles.pageActive : ""}`}
          >
            {p}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={href(page + 1)} className={styles.pageBtn}>
          →
        </Link>
      ) : (
        <span className={styles.pageDisabled}>→</span>
      )}
    </nav>
  );
}