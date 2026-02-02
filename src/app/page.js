import styles from "./page.module.css";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Rox Showroom</h1>
      <p>¡Descubre nuestros productos y ofertas exclusivas!</p> 
      <main className={styles.main}>
      <section className={styles.cardContainer}>
        <ProductCard
          image="/images/remera.webp"
          title="Premium Headphones"
          price={199.99}
          badge="Nuevo"
        />
        <ProductCard
          image="/images/remera.webp"
          width="100"
          height="100"
          title="Classic T-Shirt"
          price={29.99}
        />
        <ProductCard
          image="/images/remera.webp"
          title="Wireless Earbuds"
          price={129.99}
        />
                <ProductCard
          image="/images/remera.webp"
          title="Wireless Earbuds"
          price={129.99}
        />
                <ProductCard
          image="/images/remera.webp"
          title="Wireless Earbuds"
          price={129.99}
        />
                <ProductCard
          image="/images/remera.webp"
          title="Wireless Earbuds"
          price={129.99}
        />
                <ProductCard
          image="/images/remera.webp"
          title="Wireless Earbuds"
          price={129.99}
        />
      </section>
      </main>
    </div>
  );
}
