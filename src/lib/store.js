import { supabasePublic } from "./supabasePublic";

export const PAGE_SIZE = 12;

/**
 * Imágenes del hero desde la tabla `carousel_images` (is_active = true).
 */
export async function getHeroImages() {
  const { data } = await supabasePublic
    .from("carousel_images")
    .select("image_url")
    .eq("is_active", true);

  const urls = (data || []).map((row) => row.image_url).filter(Boolean);
  return [...new Set(urls)];
}

export async function getFeaturedProducts(limit = 10) {
  const { data } = await supabasePublic
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data || [];
}

export async function getProductById(id) {
  const { data } = await supabasePublic
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return data;
}

export async function getRelatedProducts(product, limit = 4) {
  if (!product) return [];

  const { id, category } = product;

  if (category) {
    const { data } = await supabasePublic
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", id)
      .limit(limit);

    if (data && data.length) return data;
  }

  const { data } = await supabasePublic
    .from("products")
    .select("*")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(limit);

  return data || [];
}

export async function getCategories() {
  const { data } = await supabasePublic.from("products").select("category");

  const categories = [...new Set((data || []).map((row) => row.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return categories;
}

export async function getCatalog({
  page = 1,
  pageSize = PAGE_SIZE,
  q = "",
  category = "",
  sort = "recent",
} = {}) {
  const safePage = Math.max(1, Number(page) || 1);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabasePublic
    .from("products")
    .select("*", { count: "exact" });

  if (q) query = query.ilike("name", `%${q}%`);
  if (category) query = query.eq("category", category);

  if (sort === "price-asc") query = query.order("price", { ascending: true });
  else if (sort === "price-desc") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, count } = await query.range(from, to);

  return {
    products: data || [],
    count: count || 0,
    page: safePage,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)),
  };
}
