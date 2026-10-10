import "./globals.css";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CartToast from "@/components/Cart/CartToast";
import { CartProvider } from "@/components/Cart/CartContext";
import { FavoritesProvider } from "@/components/Favorites/FavoritesContext";
import { SITE_URL, SITE_NAME, ADDRESS, INSTAGRAM_URL } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const description =
  "Showroom Rox: indumentaria y accesorios con ofertas exclusivas. Mirá el catálogo completo y consultá por WhatsApp.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Tienda online`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "showroom",
    "rox showroom",
    "indumentaria",
    "ropa",
    "ofertas",
    "catálogo",
    "tienda online",
    "San Martin",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Tienda online`,
    description,
    images: [
      {
        url: "/images/logo-showroom.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Tienda online`,
    description,
    images: ["/images/logo-showroom.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/logo-showroom.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressCountry: "AR",
    },
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <html lang="es">
      <body className={`${inter.className} ${fraunces.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <CartProvider>
          <FavoritesProvider>
            <Analytics />
            <Header />
            {children}
            <Footer />
            <CartToast />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
