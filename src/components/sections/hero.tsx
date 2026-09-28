import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";

/** Ventana de código decorativa (glass) para el hero. */
function CodeWindow() {
  return (
    <div className="glass-dark overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/90" />
        <span className="h-3 w-3 rounded-full bg-amber-400/90" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        <span className="ml-3 font-mono text-xs text-slate-400">dynamic-coding.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-slate-300">
        <code>
          <span className="text-cyan">const</span> dynamicCoding = {"{"}
          {"\n"}  <span className="text-brand-300">enfoque</span>:{" "}
          <span className="text-emerald-300">&quot;a la medida&quot;</span>,
          {"\n"}  <span className="text-brand-300">stack</span>: [
          <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;Node&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;Supabase&quot;</span>],
          {"\n"}  <span className="text-brand-300">deploy</span>:{" "}
          <span className="text-cyan">async</span> () =&gt;{" "}
          <span className="text-emerald-300">&quot;🚀&quot;</span>,
          {"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070c18] text-white">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <div className="bg-grid-on-dark pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20 sm:py-28">
        <Spotlight className="grid items-center gap-14 rounded-3xl lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-slate-200">
                <span className="live-dot" />
                Disponibles para nuevos proyectos
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Construimos el software que tu empresa{" "}
                <span className="grad-text-bright">necesita</span>.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
                En Dynamic Coding diseñamos y desarrollamos aplicaciones web,
                móviles y sistemas de gestión a la medida. Del problema de
                negocio al producto en producción.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/proyectos"
                  className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-brand-500 px-7 text-base font-semibold text-navy-deep shadow-[0_14px_34px_-14px_rgba(56,214,245,0.6)] transition-all hover:shadow-[0_18px_40px_-14px_rgba(56,214,245,0.8)] active:scale-[0.98]"
                >
                  Ver proyectos
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Solicitar una consulta
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:pl-6">
            <CodeWindow />
          </Reveal>
        </Spotlight>
      </Container>
    </section>
  );
}
