import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, getRelatedProducts } from "@/lib/store";
import {
  formatPrice,
  whatsappLink,
  SITE_URL,
  SITE_NAME,
  BLUR_DATA_URL,
} from "@/lib/config";
import AddToCartButton from "@/components/Product/AddToCartButton";
import FavoritesButton from "@/components/Favorites/FavoritesButton";
import ShareButtons from "@/components/Product/ShareButtons";
import StickyBuy from "@/components/Product/StickyBuy";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./detail.module.css";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Producto no encontrado" };

  const description = `Comprá ${product.name} en ${SITE_NAME}.${
    product.category ? ` ${product.category}.` : ""
  } Consultá por WhatsApp.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/productos/${id}` },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: product.image_url ? [{ url: product.image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: product.image_url ? [product.image_url] : undefined,
    },
  };
}

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    category: product.category || null,
    badge: product.badge || null,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image_url ? [product.image_url] : undefined,
    description: product.name,
    category: product.category || undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/productos/${id}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${SITE_URL}/productos`,
      },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className={styles.breadcrumb} aria-label="Miga de pan">
        <Link href="/productos">Catálogo</Link>
        <span>/</span>
        <span className={styles.current}>{product.name}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.imageBox}>
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              className={styles.detailImg}
            />
          ) : (
            <div className={styles.placeholder}>Sin imagen</div>
          )}
        </div>

        <div className={styles.info}>
          {product.category && (
            <span className={styles.category}>{product.category}</span>
          )}
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.note}>
            Consultá disponibilidad, talles y envío antes de coordinar tu compra.
          </p>

          <ul className={styles.perks}>
            <li className={styles.perk}>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path
                  d="M3.5 10.5l4 4 9-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Stock y talles disponibles
            </li>
            <li className={styles.perk}>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path
                  d="M3.5 10.5l4 4 9-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Envíos a San Martín y zona
            </li>
            <li className={styles.perk}>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path
                  d="M3.5 10.5l4 4 9-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Pago coordinado por WhatsApp
            </li>
          </ul>

          <div className={styles.actions}>
            <AddToCartButton
              product={productData}
              className={styles.addBtn}
              label="Agregar al carrito"
            />
            <FavoritesButton
              product={productData}
              variant="detail"
              className={styles.favBtn}
            />
            <a
              href={whatsappLink(`Hola! Quiero consultar por: ${product.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              <img
                src="/icons/whatsapp.png"
                alt=""
                width={22}
                height={22}
                className="wa-white"
              />
              Consultar por WhatsApp
            </a>
          </div>

          <Link href="/cart" className={styles.cartLink}>
            Ir al carrito →
          </Link>

          <ShareButtons product={product} />
        </div>
      </div>

      <StickyBuy
        product={productData}
        waText={`Hola! Quiero consultar por: ${product.name}`}
      />

      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedHeader}>
            <span className={styles.relatedKicker}>Aliados</span>
            <h2 className={styles.relatedTitle}>También te puede gustar</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
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
          </div>
        </section>
      )}
    </div>
  );
}