import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
