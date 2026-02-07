"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/Ui/AdminLogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./carousel.module.css";

export default function CarouselAdminPage() {
  const router = useRouter();
  const [slides, setSlides] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const VALID_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

  /* =======================
     VALIDAR IMAGEN
  ======================= */
  function validateImage(imgFile) {
    if (!imgFile) return false;

    // Verificar extensión
    const ext = imgFile.name.split(".").pop().toLowerCase();
    if (!VALID_EXTENSIONS.includes(ext)) {
      setError(`❌ Extensión no válida. Usa: ${VALID_EXTENSIONS.join(", ").toUpperCase()}`);
      return false;
    }

    // Verificar tamaño
    if (imgFile.size > MAX_FILE_SIZE) {
      setError(`❌ El archivo es muy pesado. Máximo 5MB. Tu archivo: ${(imgFile.size / 1024 / 1024).toFixed(2)}MB`);
      return false;
    }

    setError("");
    return true;
  }

  /* =======================
     MANEJAR CAMBIO DE ARCHIVO
  ======================= */
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (validateImage(selectedFile)) {
      setFile(selectedFile);
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
        fetchSlides();
      }
    });
  }, []);

  /* =======================
     TRAER SLIDES
  ======================= */
  async function fetchSlides() {
    const { data } = await supabase
      .from("carousel")
      .select("*")
      .order("order", { ascending: true });

    if (data) setSlides(data);
  }



  /* =======================
     SUBIR SLIDE
  ======================= */
  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Seleccioná una imagen");

    setLoading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // subir a storage
    const { error: uploadError } = await supabase.storage
      .from("carousel")
      .upload(fileName, file);

    if (uploadError) {
      setLoading(false);
      return alert("Error subiendo imagen");
    }

    // obtener url pública
    const { data } = supabase.storage
      .from("carousel")
      .getPublicUrl(fileName);

    // guardar en tabla
    const { error } = await supabase.from("carousel").insert({
      image_url: data.publicUrl,
      order: slides.length + 1,
    });

    if (error) {
      setLoading(false);
      return alert("Error guardando slide");
    }

    setFile(null);
    fetchSlides();
    setLoading(false);
  }

  /* =======================
    ELIMINAR SLIDE
  ======================= */
  async function deleteSlide(slide) {
    const fileName = slide.image_url.split("/").pop();

    await supabase.storage.from("carousel").remove([fileName]);
    await supabase.from("carousel").delete().eq("id", slide.id);

    fetchSlides();
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <Link href="/admin/dashboard" style={{ display: "inline-block", color: "#ff6b9d", textDecoration: "none", fontWeight: "600", marginBottom: "15px" }}>
              ← Volver
            </Link>
            <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", color: "#333", marginBottom: "8px", margin: "0 0 8px 0" }}>Gestionar Carrusel</h1>
            <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>Administra las imágenes del hero principal</p>
          </div>
          <AdminLogoutButton />
        </div>

        {/* SUBIR */}
        <form onSubmit={handleUpload} style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>📸 Subir Nueva Imagen</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                flex: "1",
                minWidth: "200px"
              }}
            />
            {error && (
              <div style={{
                padding: "10px",
                backgroundColor: "#ffebee",
                border: "1px solid #ef5350",
                borderRadius: "8px",
                color: "#c62828",
                fontSize: "12px",
                flex: "1",
                minWidth: "200px"
              }}>
                {error}
              </div>
            )}
            <button
              disabled={loading || !file}
              style={{
                padding: "10px 24px",
                backgroundColor: !file ? "#ccc" : "#ff6b9d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: !file ? "default" : "pointer",
                fontWeight: "600",
                whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Subiendo..." : "Agregar imagen"}
            </button>
          </div>
        </form>

        {/* LISTADO */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#333" }}>🖼️ Imágenes Actuales</h2>
          {slides.length === 0 ? (
            <div style={{ background: "#f5f5f5", border: "2px dashed #ddd", borderRadius: "8px", padding: "40px", textAlign: "center", color: "#999" }}>
              <p>No hay imágenes en el carrusel. ¡Agrega una para comenzar!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {slides.map((slide) => (
                <div key={slide.id} className={styles.card}>
                  <img src={slide.image_url} alt="carousel slide" />
                  <button
                    onClick={() => deleteSlide(slide)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px"
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
