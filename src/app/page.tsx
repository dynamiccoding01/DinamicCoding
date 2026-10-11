import { Hero } from "@/components/sections/hero";
import { Audiences } from "@/components/sections/audiences";
import { ServiceTypes } from "@/components/sections/service-types";
import { Guide } from "@/components/sections/guide";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Audiences />
      <ServiceTypes />
      <Guide />
      <FeaturedProjects />
      <Process />
      <About />
      <FAQ />
      <CTA />
    </>
  );
}
