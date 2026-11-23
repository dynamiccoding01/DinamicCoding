import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteBackground } from "@/components/layout/site-background";
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

const title = "Dynamic Coding — Páginas web, apps y sistemas a medida";
const description =
  "Asesoría y desarrollo de páginas web, aplicaciones móviles y sistemas de gestión a medida: landing pages, páginas corporativas, catálogos digitales, tiendas online, reservas y soluciones a medida.";

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
    "aplicaciones móviles",
    "sistemas de gestión",
    "desarrollo de software a medida",
    "tienda online",
    "catálogo digital",
    "landing page",
    "asesoría y consultoría",
    "Dynamic Coding",
    "DC Consultores",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_LA",
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
        <div aria-hidden className="scroll-progress no-print" />
        <SiteBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
