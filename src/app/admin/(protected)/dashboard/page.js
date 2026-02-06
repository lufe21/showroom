"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/Ui/AdminLogoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      }
    });
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600" }}>Panel de administración</h1>
          <p style={{ color: "#666" }}>Gestioná tu tienda</p>
        </div>

        <AdminLogoutButton />
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        <Link href="/admin/products" style={{ background: "white", borderRadius: "16px", padding: "28px", textDecoration: "none", color: "#111", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)", transition: "transform .2s ease, box-shadow .2s ease", display: "block" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)"; }}>
          <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>Productos</h3>
          <p>Crear, editar y eliminar productos</p>
        </Link>

        <Link href="/admin/carousel" style={{ background: "white", borderRadius: "16px", padding: "28px", textDecoration: "none", color: "#111", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)", transition: "transform .2s ease, box-shadow .2s ease", display: "block" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)"; }}>
          <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>Carrusel</h3>
          <p>Administrar imágenes del hero</p>
        </Link>

        <Link href="/admin/settings" style={{ background: "white", borderRadius: "16px", padding: "28px", textDecoration: "none", color: "#111", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)", transition: "transform .2s ease, box-shadow .2s ease", display: "block" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)"; }}>
          <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>Configuración</h3>
          <p>Ajustes generales</p>
        </Link>
      </section>
    </div>
  );
}


