"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/Ui/AdminLogoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.replace("/admin/login");
            }
        });
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", flexWrap: "wrap", gap: "15px" }}>
                    <div>
                        <Link href="/admin/dashboard" style={{ display: "inline-block", color: "#ff6b9d", textDecoration: "none", fontWeight: "600", marginBottom: "15px" }}>
                            ← Volver
                        </Link>
                        <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", color: "#333", margin: "0 0 8px 0" }}>Configuración</h1>
                        <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>Ajustes generales de tu tienda</p>
                    </div>

                    <AdminLogoutButton />
                </div>

                <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                    <h2 style={{ fontSize: "18px", color: "#333", margin: "0 0 12px 0" }}>⚙️ Configuración General</h2>
                    <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>Aquí podrás configurar los ajustes principales de tu tienda.</p>

                    <div style={{ background: "#f5f5f5", border: "2px dashed #ddd", borderRadius: "8px", padding: "40px", textAlign: "center", color: "#999" }}>
                        <p>Funcionalidad en desarrollo...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
