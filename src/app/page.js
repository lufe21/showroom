export const dynamic = "force-dynamic";

import styles from "./page.module.css";
import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function Home() {
  // 🔹 Productos destacados
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  // 🔹 Imagenes carrousel
  const { data: heroImages, error } = await supabase
    .from("carousel_images")
    .select("image_url")
    .eq("is_active", true);


  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <section className={styles.HeroCarousel}>
          <HeroCarousel
            images={heroImages?.map((img) => ({
              url: img.image_url,
            }))}
          />

        </section>

        <section className={styles.showroomIntro}>
          <img
            src="/images/logo-showroom.png"
            alt="Logo"
            className={styles.logo}
          />
          <p>¡Descubre nuestros productos y ofertas exclusivas!</p>
        </section>

        <section className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Productos Destacados</h2>
          <Link href="/productos" className={styles.exploraCatalogo}>
            Explora nuestro catálogo
          </Link>
        </section>

        <section className={styles.cardContainer}>
          {products?.map((product) => (
            <ProductCard  
              key={product.id}
              image={product.image_url}
              title={product.name}
              price={product.price}
              badge={product.badge}
            />
          ))}
        </section>

      </main>
    </div>
  );
}
