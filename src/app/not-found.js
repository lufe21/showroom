import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Ups, página no encontrada</h1>
        <p className={styles.text}>
          El destino se mudó o nunca existió. Buscalo en el catálogo o volvé al
          inicio.
        </p>
        <div className={styles.actions}>
          <Link href="/productos" className={styles.primary}>
            Ver catálogo
          </Link>
          <Link href="/" className={styles.secondary}>
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}