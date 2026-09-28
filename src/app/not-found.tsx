import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="text-center">
        <p className="grad-text font-display text-7xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Ir al inicio</Button>
          <Button href="/proyectos" variant="secondary">
            Ver proyectos
          </Button>
        </div>
      </Container>
    </section>
  );
}
