import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-brand-500">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Ir al inicio</Button>
          <Button href="/servicios" variant="secondary">
            Ver servicios
          </Button>
        </div>
      </Container>
    </section>
  );
}
