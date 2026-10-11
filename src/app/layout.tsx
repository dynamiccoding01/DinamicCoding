import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/ui/whatsapp-button";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const title = "Dynamic Coding — Páginas web a la medida de tu negocio";
const description =
  "Asesoría y desarrollo de páginas web en Santa Cruz de la Sierra, Bolivia: landing pages, páginas corporativas, catálogos digitales, tiendas online, reservas y soluciones a medida.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Dynamic Coding",
  },
  description,
  keywords: [
    "páginas web",
    "diseño de páginas web",
    "tienda online",
    "catálogo digital",
    "landing page",
    "asesoría y consultoría",
    "Santa Cruz de la Sierra",
    "Bolivia",
    "Dynamic Coding",
    "DC Consultores",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_BO",
    siteName: "Dynamic Coding",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
