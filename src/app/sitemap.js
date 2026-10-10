import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const { data } = await supabasePublic
    .from("products")
    .select("id, created_at");

  const products = (data || []).map((product) => ({
    url: `${SITE_URL}/productos/${product.id}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...products,
  ];
}
