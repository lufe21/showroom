"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function Catalogo() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error(error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px", color: "#333" }}>📦 Catálogo Completo</h1>
            {loading ? (
                <p style={{ textAlign: "center", color: "#666" }}>Cargando productos...</p>
            ) : products.length === 0 ? (
                <p style={{ textAlign: "center", color: "#999", marginTop: "40px" }}>No hay productos disponibles</p>
            ) : (
                <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
                    {products.map((p) => (
                        <ProductCard
                            key={p.id}
                            image={p.image_url}
                            title={p.name}
                            price={p.price}
                            badge={p.badge}
                            category={p.category}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
