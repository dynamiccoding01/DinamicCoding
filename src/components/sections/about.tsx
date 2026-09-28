import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const points = [
  "Equipo senior y trato directo, sin intermediarios.",
  "Código limpio, documentado y mantenible.",
  "Entregas a tiempo y con comunicación constante.",
  "Acompañamiento y soporte después del lanzamiento.",
];

export function About() {
  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Composición de imágenes */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src="/images/team-collab.jpg"
                  alt="Equipo de Dynamic Coding trabajando"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
              </div>

              {/* Imagen secundaria flotante (código) */}
              <div className="absolute -bottom-6 right-[-10px] w-[46%] overflow-hidden rounded-xl border border-white shadow-2xl shadow-black/20 sm:right-[-16px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/hero-code.jpg"
                    alt="Código en pantalla"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Badge flotante con dato */}
              <div className="glass absolute -left-3 -top-5 rounded-xl px-4 py-3 shadow-xl sm:-left-6">
                <p className="font-display text-2xl font-extrabold text-ink">+50</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                  proyectos entregados
                </p>
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <Reveal delay={120}>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                Quiénes somos
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Personas reales escribiendo{" "}
                <span className="grad-text">código real</span>.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                En Dynamic Coding somos un equipo apasionado por resolver
                problemas con tecnología. Combinamos experiencia técnica y
                cercanía para acompañarte en cada etapa de tu producto.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-ink-soft">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="/equipo" variant="secondary">
                  Conoce al equipo
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
