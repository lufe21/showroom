export const SITE_NAME = "Showroom Rox";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const WHATSAPP_PHONE = "1144160737";

export const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}`;

export const CONTACT_EMAIL = "shop.nature2020@gmail.com";

export const INSTAGRAM_URL = "https://www.instagram.com/rox.showroom24/";

export const ADDRESS = {
  street: "Salguero 2223",
  city: "San Martin, Argentina",
};

export function whatsappLink(text) {
  if (!text) return `${WHATSAPP_BASE}&text&type=phone_number&app_absent=0`;
  return `${WHATSAPP_BASE}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
}

export function formatPrice(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(number);
}

export const BLUR_DATA_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="100%" height="100%" fill="#f6e4ef"/></svg>'
  );
