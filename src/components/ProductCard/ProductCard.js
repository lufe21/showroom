"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, whatsappLink, BLUR_DATA_URL } from "@/lib/config";
import AddToCartButton from "@/components/Product/AddToCartButton";
import FavoritesButton from "@/components/Favorites/FavoritesButton";
import style from "./productcard.module.css";

export default function ProductCard({ id, image, title, price, badge, category }) {
  const product = {
    id,
    name: title,
    price,
    image_url: image,
    category: category || null,
    badge: badge || null,
  };
  const detailHref = `/productos/${id}`;
  const consultText = `Hola! Quiero consultar por: ${title}`;

  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <div className={style.media}>
          <Link href={detailHref} className={style.imageWrapper} aria-label={title}>
            {badge && <span className={style.badge}>{badge}</span>}
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 520px) 45vw, (max-width: 900px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className={style.img}
              />
            ) : (
              <div className={style.imagePlaceholder}>Sin imagen</div>
            )}
            <span className={style.viewOverlay} aria-hidden="true">
              <span className={style.viewHint}>Ver detalle</span>
            </span>
          </Link>
          <FavoritesButton product={product} className={style.favBtn} />
        </div>

        <div className={style.info}>
          {category && <span className={style.category}>{category}</span>}
          <h3 className={style.title}>
            <Link href={detailHref}>{title}</Link>
          </h3>
          <p className={style.price}>{formatPrice(price)}</p>

          <div className={style.actions}>
            <AddToCartButton
              product={product}
              className={style.button}
              label="Agregar"
            />
            <a
              href={whatsappLink(consultText)}
              target="_blank"
              rel="noopener noreferrer"
              className={style.waButton}
              aria-label={`Consultar por WhatsApp: ${title}`}
            >
              <img src="/icons/whatsapp.png" alt="" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}