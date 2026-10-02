import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { TechStack } from "@/components/sections/tech-stack";
import { TeamPreview } from "@/components/sections/team-preview";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

// Los datos vienen de Supabase: se regenera como máximo cada 60 s.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <FeaturedProjects />
      <TechStack />
      <TeamPreview />
      <FAQ />
      <CTA />
    </>
  );
}
