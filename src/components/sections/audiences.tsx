import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { audiences } from "@/lib/services";

/** Franja con los públicos para los que desarrollamos páginas web. */
export function Audiences() {
  return (
    <section className="border-b border-line">
      <Container className="flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-navy">
          Desarrollamos páginas web para
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
          {audiences.map((audience) => (
            <li
              key={audience}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft"
            >
              <CheckCircle2 size={18} className="text-brand-500" />
              {audience}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
