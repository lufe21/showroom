"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/config";
import styles from "./heroCarousel.module.css";

export default function HeroCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const count = images.length;
  const go = useCallback(
    (dir) => setIndex((prev) => (prev + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 5500);
    return () => clearInterval(interval);
  }, [count]);

  if (!count) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) go(1);
    else if (diff < -50) go(-1);
  };

  return (
    <section
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carrusel"
    >
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.url}
          alt=""
          fill
          sizes="100vw"
          className={`${styles.image} ${i === index ? styles.active : ""}`}
          priority={i === 0}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      ))}

      <div className={styles.scrim} aria-hidden="true" />

      {count > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
