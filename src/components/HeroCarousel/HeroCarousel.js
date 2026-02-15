"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heroCarousel.module.css";

export default function HeroCarousel({ images = [] }) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // ⛔ si no hay imágenes, no renderizar nada
    if (!images.length) return null;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Cambiado a 5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const diff = touchStartX.current - touchEndX.current;

        if (diff > 50) {
            setIndex((prev) => (prev + 1) % images.length);
        } else if (diff < -50) {
            setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }
    };

    return (
        <section
            className={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img.url}
                    className={`${styles.image} ${i === index ? styles.active : ""}`}
                    alt=""
                />
            ))}

            <div className={styles.dots}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    );
}
