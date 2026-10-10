import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import {
  SITE_NAME,
  ADDRESS,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  whatsappLink,
} from "@/lib/config";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaTitle}>
              ¿Lista para tu <em className={styles.ctaEm}>próximo look?</em>
            </h2>
            <p className={styles.ctaText}>
              Consultanos por WhatsApp, coordinamos envíos y retiros en San
              Martín y zona.
            </p>
          </div>
          <a
            href={whatsappLink("Hola! Quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoCard}>
            <Image
              src="/images/logo-showroom.png"
              alt={SITE_NAME}
              width={140}
              height={60}
              className={styles.logo}
            />
          </div>
          <address className={styles.address}>
            <span className={styles.addressLine}>{ADDRESS.street}</span>
            <span className={styles.addressLine}>{ADDRESS.city}</span>
          </address>
        </div>

        <nav className={styles.nav} aria-label="Enlaces principales">
          <p className={styles.heading}>Navegación</p>
          <ul className={styles.linkList}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Catálogo</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/admin/login">Iniciar sesión</Link></li>
          </ul>
        </nav>

        <div className={styles.contact}>
          <p className={styles.heading}>Contacto</p>
          <a
            href={whatsappLink("Hola! Quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <span className={styles.dot} aria-hidden="true" /> WhatsApp directo
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.channel}>
            <span className={styles.dot} aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <span className={styles.dot} aria-hidden="true" /> @rox.showroom24
          </a>
        </div>
      </div>

      <div className={styles.socialBar}>
        <div className={styles.social}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={INSTAGRAM_URL}
            aria-label="Instagram"
            className={styles.socialLink}
          >
            <img
              src="/icons/logotipo-instagram.png"
              alt=""
              className={styles.socialIcon}
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappLink("Hola! Quiero hacer una consulta.")}
            aria-label="WhatsApp"
            className={styles.socialLink}
          >
            <img src="/icons/whatsapp.png" alt="" className={styles.socialIcon} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${CONTACT_EMAIL}?subject=Consulta%20desde%20la%20tienda&body=Hola%2C%20quiero%20consultar%20por%20un%20producto.`}
            aria-label="Email"
            className={styles.socialLink}
          >
            <img
              src="/icons/correo-electronico.png"
              alt=""
              className={styles.socialIcon}
            />
          </a>
        </div>
        <p className={styles.socialNote}>Respondemos en minutos</p>
      </div>

      <div className={styles.credit}>
        © {new Date().getFullYear()} {SITE_NAME} · Creado por{" "}
        <span className={styles.author}>Lucas.H</span>
      </div>
    </footer>
  );
}