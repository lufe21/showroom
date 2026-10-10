import { createClient } from "@supabase/supabase-js";

// Cliente de solo lectura para Server Components (datos públicos de la tienda).
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
