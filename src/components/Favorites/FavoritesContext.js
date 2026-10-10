"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "showroom_favorites_v1";

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

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

  const toggle = (product) =>
    setItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image_url,
              category: product.category || null,
              badge: product.badge || null,
            },
          ]
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const isFavorite = (id) => items.some((item) => item.id === id);

  const count = items.length;

  const value = useMemo(
    () => ({ items, toggle, remove, isFavorite, count, ready }),
    [items, ready]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  }
  return context;
}