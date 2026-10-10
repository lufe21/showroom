"use client";

import { useState } from "react";
import { useCart } from "@/components/Cart/CartContext";

export default function AddToCartButton({ product, className, label = "Agregar al carrito" }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={className}
      aria-live="polite"
    >
      {added ? "✓ Agregado" : label}
    </button>
  );
}
