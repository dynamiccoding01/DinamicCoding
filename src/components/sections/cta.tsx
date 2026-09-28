import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CTA() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="bg-grid relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy via-brand-700 to-navy-deep px-8 py-16 text-center shadow-2xl shadow-black/40 sm:px-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet/25 blur-3xl" />
            <h2 className="relative text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-brand-100">
              Cuéntanos qué necesitas y te respondemos con una propuesta. La
              primera consulta no tiene costo.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Button
                href="/contacto"
                size="lg"
                className="bg-white text-brand-700 shadow-lg hover:bg-brand-50 hover:text-brand-700"
              >
                Solicitar una consulta
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
