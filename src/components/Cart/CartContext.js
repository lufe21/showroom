"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "showroom_cart_v1";
const TOAST_MS = 2200;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // localStorage no disponible
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignorar cuota/privacidad
    }
  }, [items, ready]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
  };

  const clearToast = () => {
    clearTimeout(toastTimer.current);
    setToast(null);
  };

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url,
          qty,
        },
      ];
    });
    notify(`✓ ${product.name}`);
  };

  const remove = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const setQty = (id, qty) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Number(qty) || 1) } : item
      )
    );

  const clear = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      count,
      total,
      ready,
      toast,
      clearToast,
    }),
    [items, ready, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
