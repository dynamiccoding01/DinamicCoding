import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const rowA = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Supabase", "Vercel",
];
const rowB = [
  "React Native", "Flutter", "Python", "AWS", "Docker", "GraphQL", "Figma", "Redis",
];

function Pill({ name }: { name: string }) {
  return (
    <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-sm text-ink-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {name}
    </span>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Se duplica la lista para que el bucle sea continuo (translateX -50%).
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`}>
      <div className="marquee__track" aria-hidden={reverse}>
        {doubled.map((name, i) => (
          <Pill key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="border-b border-line py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Nuestro stack"
          title="Tecnologías que dominamos"
          subtitle="Trabajamos con herramientas modernas, probadas y con comunidad, para construir software rápido y a prueba de futuro."
        />
      </Container>

      {/* Los marquees van a ancho completo (fuera del Container) */}
      <div className="mt-14 flex flex-col gap-4">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
