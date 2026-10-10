export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import Filters from "@/components/Product/ProductFilters/Filters";
import Pagination from "@/components/Product/ProductFilters/Pagination";
import { getCatalog, getCategories } from "@/lib/store";
import { SITE_URL } from "@/lib/config";
import styles from "./productos.module.css";

export const metadata = {
  title: "Catálogo completo",
  description:
    "Explorá todo el catálogo de Showroom Rox: indumentaria, accesorios y ofertas. Filtrá por categoría y precio.",
  alternates: { canonical: "/productos" },
};

export default async function Catalogo({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const category = typeof sp.category === "string" ? sp.category : "";
  const sort = typeof sp.sort === "string" ? sp.sort : "recent";
  const page = Number(sp.page) || 1;

  const [{ products, totalPages, count }, categories] = await Promise.all([
    getCatalog({ page, q, category, sort }),
    getCategories(),
  ]);

  const hasFilters = Boolean(q || category || sort !== "recent");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Catálogo" },
    ],
  };

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className={styles.banner}>
        <div className={styles.bannerInner}>
          <nav className={styles.breadcrumb} aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span aria-current="page">Catálogo</span>
          </nav>
          <h1 className={styles.title}>Catálogo</h1>
          <p className={styles.subtitle}>
            Descubrí los últimos ingresos y ofertas de Showroom Rox.
          </p>
          <span className={styles.countPill}>
            {count} producto{count === 1 ? "" : "s"}
            {q ? ` · “${q}”` : ""}
          </span>
        </div>
      </header>

      <Suspense fallback={<div className={styles.filtersFallback} />}>
        <Filters categories={categories} />
      </Suspense>

      {hasFilters && (
        <div className={styles.results}>
          <p>
            Mostrando <strong>{count}</strong> resultado{count === 1 ? "" : "s"}
            {category ? ` en "${category}"` : ""}
            {sort !== "recent" ? " ordenados por precio" : ""}
          </p>
          <Link href="/productos" className={styles.clearAll}>
            Limpiar filtros ✕
          </Link>
        </div>
      )}

      {products.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ✕
          </span>
          <p>No encontramos productos{hasFilters ? " con esos filtros" : ""}.</p>
          {hasFilters && (
            <Link href="/productos" className={styles.emptyLink}>
              Ver todo el catálogo
            </Link>
          )}
        </div>
      ) : (
        <section className={styles.grid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.image_url}
              title={p.name}
              price={p.price}
              badge={p.badge}
              category={p.category}
            />
          ))}
        </section>
      )}

      <Suspense fallback={null}>
        <Pagination page={page} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}