import type { Metadata } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dynamiccoding.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dynamic Coding — Consultora y desarrolladora de software",
    template: "%s — Dynamic Coding",
  },
  description:
    "Diseñamos y desarrollamos productos digitales a la medida: aplicaciones web, móviles y sistemas de gestión. Conoce nuestros proyectos y nuestro equipo.",
  keywords: [
    "desarrollo de software",
    "consultora de software",
    "aplicaciones web",
    "aplicaciones móviles",
    "Next.js",
    "Dynamic Coding",
  ],
  openGraph: {
    title: "Dynamic Coding — Consultora y desarrolladora de software",
    description:
      "Diseñamos y desarrollamos productos digitales a la medida. Conoce nuestros proyectos y nuestro equipo.",
    type: "website",
    locale: "es_ES",
    siteName: "Dynamic Coding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic Coding — Consultora y desarrolladora de software",
    description:
      "Diseñamos y desarrollamos productos digitales a la medida. Conoce nuestros proyectos y nuestro equipo.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} ${jbmono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
