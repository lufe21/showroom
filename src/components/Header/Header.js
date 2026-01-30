"use client";

import { useState } from "react";
import Link from "next/link";
import style from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.top}>
        <h1 className={style.logo}>Showroom Rox</h1>

        <button
          className={style.menuBtn}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className={style.nav}>
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/productos" onClick={() => setOpen(false)}>Productos</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
        </nav>
      )}
    </header>
  );
}
