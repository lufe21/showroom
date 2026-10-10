export const dynamic = "force-dynamic";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard/ProductCard";
import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import { getFeaturedProducts, getHeroImages, getCategories } from "@/lib/store";
import { whatsappLink, BLUR_DATA_URL } from "@/lib/config";

const TICKER = [
  "Envíos coordinados",
  "Nuevos ingresos",
  "Atención por WhatsApp",
  "Combos exclusivos",
  "Mostrá tu estilo",
];

const TESTIMONIALS = [
  {
    name: "María L.",
    text: "Me atendieron súper bien por WhatsApp y la ropa llegó tal cual las fotos. ¡Las ofertas son reales!",
  },
  {
    name: "Juli G.",
    text: "Compré para el cumple de mi hija y quedó encantada. Atención de 10 y envío rapidísimo.",
  },
  {
    name: "Carla P.",
    text: "El showroom tiene cosas divinas que no encontrás en ningún lado. Ya repetí varias veces.",
  },
];

export default async function Home() {
  const [products, heroImages, categories] = await Promise.all([
    getFeaturedProducts(10),
    getHeroImages(),
    getCategories(),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroCarousel images={heroImages.map((url) => ({ url }))} />

          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}>Nueva colección</span>
            <h1 className={styles.heroTitle}>
              Encontrá tu estilo en{" "}
              <span className={styles.brandWord}>Showroom Rox</span>
            </h1>
            <p className={styles.heroText}>
              Moda, accesorios y ofertas exclusivas con atención personalizada.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/productos" className={styles.ctaPrimary}>
                Ver catálogo
              </Link>
              <a
                href={whatsappLink("Hola! Quiero hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.marqueeGroup} key={copy}>
                {TICKER.map((item) => (
                  <span className={styles.marqueeItem} key={item}>
                    {item}
                    <span className={styles.marqueeDot}>·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className={styles.promo}>
          <div className={styles.promoInner}>
            <div className={styles.promoCopy}>
              <span className={styles.promoKicker}>Solo por tiempo limitado</span>
              <h2 className={styles.promoTitle}>
                Ofertas de <em className={styles.promoEm}>temporada</em>
              </h2>
              <p className={styles.promoText}>
                Combos exclusivos y precios especiales en los nuevos ingresos.
                Preguntanos y coordinamos tu entrega.
              </p>
              <div className={styles.promoCtas}>
                <a
                  href={whatsappLink(
                    "Hola! Quiero consultar por las ofertas de temporada."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.promoPrimary}
                >
                  Consultar por WhatsApp
                </a>
                <Link href="/productos" className={styles.promoSecondary}>
                  Ver catálogo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {categories.length > 0 && (
          <section className={styles.catSection}>
            <div className={styles.headerSection}>
              <div>
                <span className={styles.sectionKicker}>Explorá por categoría</span>
                <h2 className={styles.sectionTitle}>Comprá por categoría</h2>
              </div>
            </div>

            <div className={styles.catGrid}>
              {categories.slice(0, 4).map((cat, i) => {
                const sample = products.find((p) => p.category === cat);
                return (
                  <Link
                    key={cat}
                    href={`/productos?category=${encodeURIComponent(cat)}`}
                    className={styles.catCard}
                  >
                    {sample?.image_url ? (
                      <Image
                        src={sample.image_url}
                        alt=""
                        fill
                        sizes="(max-width: 520px) 45vw, 25vw"
                        className={styles.catImg}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    ) : (
                      <div className={styles.catFallback}>
                        {cat.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className={styles.catOverlay} aria-hidden="true" />
                    <span className={styles.catName}>{cat}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className={styles.headerSection}>
          <div>
            <span className={styles.sectionKicker}>Recién llegados</span>
            <h2 className={styles.sectionTitle}>Productos destacados</h2>
          </div>
          <Link href="/productos" className={styles.exploraCatalogo}>
            Ver todo el catálogo →
          </Link>
        </section>

        <section className={styles.cardContainer}>
          {products.length === 0 ? (
            <p className={styles.empty}>Pronto sumaremos productos nuevos ✨</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image_url}
                title={product.name}
                price={product.price}
                badge={product.badge}
                category={product.category}
              />
            ))
          )}
        </section>

        <section className={styles.testiSection}>
          <div className={styles.headerSection}>
            <div>
              <span className={styles.sectionKicker}>Testimonios</span>
              <h2 className={styles.sectionTitle}>Lo que dicen nuestras clientas</h2>
            </div>
          </div>

          <div className={styles.testiGrid}>
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className={styles.testiCard}>
                <div className={styles.stars} aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote className={styles.quote}>“{t.text}”</blockquote>
                <figcaption className={styles.testiName}>{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}