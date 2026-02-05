"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function Catalogo() {
    /*const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("id, name, price, image_url, badge")
                .eq("is_active", true);

            if (error) {
                console.error(error);
            } else {
                setProducts(data);
            }
        };

        fetchProducts();
    }, []);*/

    return (
        <>
            <h1 className="">PROXIMAMENTE...</h1>
        </>
        /*<section className="cardGrid">
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    image={p.image_url}
                    title={p.title}
                    price={p.price}
                    badge={p.badge}
                />
            ))}
        </section>*/
    );
}
