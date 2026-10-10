"use client";

import Link from "next/link";
import { useCart } from "@/components/Cart/CartContext";
import { formatPrice, whatsappLink } from "@/lib/config";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, remove, setQty, clear, total, count, ready } = useCart();

  const checkout = () => {
    const lines = items.map(
      (item) =>
        `• ${item.name} x${item.qty} - ${formatPrice(Number(item.price) * item.qty)}`
    );
    const message = [
      "Hola! Quiero hacer el siguiente pedido:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(total)}`,
      "",
      "Nombre:",
      "Entrega / retiro:",
    ].join("\n");

    window.open(whatsappLink(message), "_blank");
  };

  if (!ready) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Cargando carrito...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu carrito</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Tu carrito está vacío.</p>
          <Link href="/productos" className={styles.shopLink}>
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Link href={`/productos/${item.id}`} className={styles.thumb}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className={styles.thumbPlaceholder} />
                  )}
                </Link>

                <div className={styles.itemInfo}>
                  <Link href={`/productos/${item.id}`} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <span className={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </span>
                </div>

                <div className={styles.qty}>
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label="Restar unidad"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    aria-label="Sumar unidad"
                  >
                    +
                  </button>
                </div>

                <span className={styles.subtotal}>
                  {formatPrice(Number(item.price) * item.qty)}
                </span>

                <button
                  className={styles.remove}
                  onClick={() => remove(item.id)}
                  aria-label={`Quitar ${item.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <aside className={styles.summary}>
            <div className={styles.totalRow}>
              <span>Total ({count} art.)</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button className={styles.checkout} onClick={checkout}>
              Finalizar pedido por WhatsApp
            </button>
            <button className={styles.clear} onClick={clear}>
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
