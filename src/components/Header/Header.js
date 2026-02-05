"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import style from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const setBodyPadding = () => {
      document.body.style.paddingTop = `${headerRef.current.offsetHeight}px`;
    };

    setBodyPadding();

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // ocultar cuando baja y pasa umbral, mostrar al subir
          if (currentY > lastY && currentY > 60) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          setScrolled(currentY > 20);
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", setBodyPadding);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setBodyPadding);
      document.body.style.paddingTop = "";
    };
  }, []);

  return (
    <header ref={headerRef} className={`${style.header} ${hidden ? style.hidden : ""} ${scrolled ? style.scrolled : ""}`}>
      <div className={style.top}>
        <div className={style.logo}>
          {/* ACA imagen en /public/images/logo.png */}
          <img src="/images/logo-showroom.png" alt="Showroom Rox" className={style.logoImg} />
        </div>

        <nav className={`${style.nav} ${open ? style.open : ""}`}>
          <div className={style.navLinks}>
            <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
            <Link href="/productos" onClick={() => setOpen(false)}>Catalogo</Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          </div>

          {/* Buscador y carrito dentro del dropdown en mobile/tablet */}
          <div className={style.mobileExtras}>
            <form onSubmit={(e) => e.preventDefault()} className={style.searchForm} role="search">
              <input aria-label="Buscar" className={style.searchInput} placeholder="Buscar..." />
            </form>
            <Link href="/cart" onClick={() => setOpen(false)} className={style.cartMobile}>🛒</Link>
          </div>
        </nav>

        <div className={style.right}>
          <button
            className={style.menuBtn}
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span className={style.hamburger} aria-hidden="true"></span>
          </button>

          <div className={style.actions}>
            <form onSubmit={(e) => e.preventDefault()} className={style.searchForm}>
              <input aria-label="Buscar" className={style.searchInput} placeholder="Buscar..." />
            </form>

            <Link href="/cart" className={style.cartBtn}>🛒</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
