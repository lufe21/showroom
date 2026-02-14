"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/Ui/AdminLogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProductsAdminPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [badge, setBadge] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const VALID_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

    /* =======================
       VALIDAR IMAGEN
    ======================= */
    function validateImage(file) {
        if (!file) return true;

        // Verificar extensión
        const ext = file.name.split(".").pop().toLowerCase();
        if (!VALID_EXTENSIONS.includes(ext)) {
            setError(`❌ Extensión no válida. Usa: ${VALID_EXTENSIONS.join(", ").toUpperCase()}`);
            return false;
        }

        // Verificar tamaño
        if (file.size > MAX_FILE_SIZE) {
            setError(`❌ El archivo es muy pesado. Máximo 5MB. Tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            return false;
        }

        setError("");
        return true;
    }

    /* =======================
       MANEJAR CAMBIO DE ARCHIVO
    ======================= */
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (validateImage(file)) {
            setImageFile(file);
        } else {
            e.target.value = ""; // Limpiar el input
        }
    }

    /* =======================
       VERIFICAR AUTENTICACIÓN
    ======================= */
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.replace("/admin/login");
            } else {
                fetchProducts();
            }
        });
    }, []);

    /* =======================
       CARGAR PRODUCTOS
    ======================= */
    async function fetchProducts() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setProducts(data);
    }



    /* =======================
       SUBIR IMAGEN
    ======================= */
    async function uploadImage(file) {
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;

        const { error } = await supabase.storage
            .from("products")
            .upload(fileName, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from("products")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }

    /* =======================
       GUARDAR / EDITAR
    ======================= */
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = imageUrl;

            if (imageFile) {
                finalImageUrl = await uploadImage(imageFile);
            }

            if (editingId) {
                // EDITAR
                const { error } = await supabase
                    .from("products")
                    .update({
                        name,
                        price,
                        badge: badge || null,
                        image_url: finalImageUrl,
                    })
                    .eq("id", editingId);

                if (error) throw error;
            } else {
                // CREAR
                const { error } = await supabase.from("products").insert({
                    name,
                    price,
                    badge: badge || null,
                    image_url: finalImageUrl,
                });

                if (error) throw error;
            }

            resetForm();
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Error al guardar producto");
        } finally {
            setLoading(false);
        }
    }

    /* =======================
       ELIMINAR
    ======================= */
    async function deleteProduct(id, img) {
        if (!confirm("¿Eliminar producto?")) return;

        await supabase.from("products").delete().eq("id", id);

        if (img) {
            const fileName = img.split("/").pop();
            await supabase.storage.from("products").remove([fileName]);
        }

        fetchProducts();
    }

    /* =======================
       EDITAR (CARGA FORM)
    ======================= */
    function startEdit(product) {
        setEditingId(product.id);
        setName(product.name);
        setPrice(product.price);
        setBadge(product.badge || "");
        setImageUrl(product.image_url);
        setImageFile(null);
    }

    function resetForm() {
        setEditingId(null);
        setName("");
        setPrice("");
        setBadge("");
        setImageFile(null);
        setImageUrl("");
    }

    /* =======================
       UI
    ======================= */
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", gap: "15px" }}>
                    <div>
                        <Link href="/admin/dashboard" style={{ display: "inline-block", color: "#ff6b9d", textDecoration: "none", fontWeight: "600", marginBottom: "15px" }}>
                            ← Volver
                        </Link>
                        <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", color: "#333", marginBottom: "8px", margin: "0 0 8px 0" }}>Gestionar Productos</h1>
                        <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>Administra tu catálogo de productos</p>
                    </div>
                    <AdminLogoutButton />
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} style={{
                    ...styles.form,
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "30px",
                    padding: "20px"
                }}>
                    <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>{editingId ? "✏️ Editar producto" : "➕ Nuevo producto"}</h3>

                    <input
                        placeholder="Nombre *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Precio *"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Badge (opcional - ej: Nuevo, -20%, Oferta)"
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        style={{
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    {error && (
                        <div style={{
                            padding: "12px",
                            backgroundColor: "#ffebee",
                            border: "1px solid #ef5350",
                            borderRadius: "8px",
                            color: "#c62828",
                            fontSize: "13px"
                        }}>
                            {error}
                        </div>
                    )}

                    {imageUrl && (
                        <img src={imageUrl} alt="preview" style={{ maxWidth: "150px", height: "auto", marginTop: "10px", borderRadius: "8px" }} />
                    )}

                    <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
                        <button
                            disabled={loading}
                            style={{
                                padding: "12px 24px",
                                backgroundColor: "#ff6b9d",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                flex: "1",
                                minWidth: "200px",
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "#ddd",
                                    color: "#333",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    minWidth: "150px"
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                {/* LISTA */}
                <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                    <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>📦 Lista de Productos</h2>
                    <div style={styles.grid}>
                        {products.length === 0 ? (
                            <div style={{ gridColumn: "1 / -1", background: "#f5f5f5", border: "2px dashed #ddd", borderRadius: "8px", padding: "40px", textAlign: "center", color: "#999" }}>
                                <p>No hay productos aún. ¡Crea uno para comenzar!</p>
                            </div>
                        ) : (
                            products.map((p) => (
                                <div key={p.id} style={styles.card}>
                                    {p.image_url && (
                                        <img src={p.image_url} alt={p.name} style={styles.image} />
                                    )}

                                    <h4 style={{ margin: "12px 0 8px 0", fontSize: "16px", color: "#333" }}>{p.name}</h4>
                                    {p.badge && (
                                        <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#ff6b9d", fontWeight: "600" }}>
                                            🏷️ {p.badge}
                                        </p>
                                    )}
                                    <p style={{ margin: "0 0 15px 0", fontSize: "18px", fontWeight: "bold", color: "#ff6b9d" }}>${p.price}</p>

                                    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                                        <button
                                            onClick={() => startEdit(p)}
                                            style={{
                                                padding: "10px",
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                width: "100%"
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(p.id, p.image_url)}
                                            style={{
                                                padding: "10px",
                                                backgroundColor: "#f44336",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                width: "100%"
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =======================
   STYLES (CSS INLINE)
======================= */
const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(150px, 22vw, 280px), 1fr))",
        gap: "16px",
    },
    card: {
        backgroundColor: "#f9f9f9",
        border: "1px solid #eee",
        padding: "15px",
        borderRadius: "8px",
        transition: "box-shadow 0.3s",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "6px",
        marginBottom: "10px",
    },
};
