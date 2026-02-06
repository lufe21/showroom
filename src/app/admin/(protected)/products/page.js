"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./products.module.css";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        setProducts(data || []);
    }

    return (
        <div className={styles.page}>
            <h1>Productos</h1>

            <button className={styles.addBtn}>+ Nuevo producto</button>

            <div className={styles.list}>
                {products.map((p) => (
                    <div key={p.id} className={styles.card}>
                        <img src={p.image_url} />
                        <div>
                            <h3>{p.name}</h3>
                            <p>${p.price}</p>
                            {p.badge && <span>{p.badge}</span>}
                        </div>

                        <div className={styles.actions}>
                            <button>Editar</button>
                            <button>Borrar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
