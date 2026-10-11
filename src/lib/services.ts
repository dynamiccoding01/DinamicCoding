import {
  Building2,
  CalendarCheck,
  FileText,
  LayoutGrid,
  MousePointerClick,
  Puzzle,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

/**
 * Catálogo de la empresa: los siete tipos de página web de sus piezas
 * gráficas. Es contenido fijo del sitio (no viene de Supabase).
 */
export interface ServiceType {
  slug: string;
  title: string;
  Icon: LucideIcon;
  /** Qué es, en una frase. */
  description: string;
  idealFor: string[];
  /** Qué quiere el cliente cuando le conviene este tipo (guía de asesoría). */
  need: string;
}

export const serviceTypes: ServiceType[] = [
  {
    slug: "landing-page",
    title: "Landing page",
    Icon: MousePointerClick,
    description:
      "Una página diseñada para convertir visitantes en clientes, enfocada en promocionar un servicio, producto o campaña específica.",
    idealFor: [
      "Captar clientes",
      "Promocionar ofertas",
      "Campañas publicitarias",
      "Generar contactos por WhatsApp",
      "Lanzamiento de productos",
    ],
    need: "Promocionar una oferta, una campaña o un lanzamiento.",
  },
  {
    slug: "pagina-informativa",
    title: "Página informativa",
    Icon: FileText,
    description:
      "Un sitio web que presenta información clara sobre tu negocio: servicios, horarios, ubicación y medios de contacto.",
    idealFor: [
      "Mostrar información de tu negocio",
      "Dar a conocer tus servicios",
      "Mejorar tu presencia digital",
      "Generar confianza en clientes",
      "Facilitar el contacto empresarial",
    ],
    need: "Que te encuentren y sepan qué haces, dónde estás y cómo contactarte.",
  },
  {
    slug: "pagina-corporativa",
    title: "Página corporativa",
    Icon: Building2,
    description:
      "Una página profesional que fortalece la imagen de tu empresa y muestra su trayectoria, servicios, equipo y proyectos.",
    idealFor: [
      "Empresas consolidadas",
      "Fortalecer la imagen institucional",
      "Mostrar portafolio y experiencia",
      "Aumentar la credibilidad de la marca",
    ],
    need: "Mostrar trayectoria, equipo y proyectos para ganar credibilidad.",
  },
  {
    slug: "catalogo-digital",
    title: "Catálogo digital",
    Icon: LayoutGrid,
    description:
      "Una plataforma donde exhibes tus productos en línea para que tus clientes los consulten fácilmente desde cualquier dispositivo.",
    idealFor: [
      "Mostrar productos en línea",
      "Compartir catálogos fácilmente",
      "Incrementar consultas de clientes",
      "Facilitar pedidos por WhatsApp",
      "Negocios con gran variedad de productos",
    ],
    need: "Exhibir muchos productos y recibir pedidos por WhatsApp.",
  },
  {
    slug: "tienda-online",
    title: "Tienda online",
    Icon: ShoppingCart,
    description:
      "Una tienda virtual que permite vender productos por internet, gestionar pedidos y recibir pagos en línea.",
    idealFor: [
      "Vender por internet",
      "Recibir pagos online",
      "Automatizar pedidos",
      "Expandir el alcance del negocio",
      "Aumentar las ventas las 24 horas",
    ],
    need: "Vender y cobrar por internet, con pedidos automáticos.",
  },
  {
    slug: "pagina-de-reservas",
    title: "Página de reservas",
    Icon: CalendarCheck,
    description:
      "Un sistema web que permite a tus clientes programar citas, reservar servicios o hacer reservas de manera rápida y sencilla.",
    idealFor: [
      "Hoteles y alojamientos",
      "Restaurantes y cafeterías",
      "Consultorios y clínicas",
      "Barberías y billares",
      "Gestión de citas y reservas",
    ],
    need: "Atender con cita o con reserva.",
  },
  {
    slug: "pagina-web-personalizada",
    title: "Página web personalizada",
    Icon: Puzzle,
    description:
      "Una solución desarrollada a medida según las necesidades específicas de tu negocio, proyecto o empresa.",
    idealFor: [
      "Proyectos únicos",
      "Sistemas empresariales",
      "Requerimientos específicos",
      "Automatización de procesos",
      "Soluciones a medida",
    ],
    need: "Algo que no encaja en lo anterior, o automatizar un proceso propio.",
  },
];

export function getServiceType(slug: string) {
  return serviceTypes.find((s) => s.slug === slug) ?? null;
}

/** Públicos a los que se dirige la empresa. */
export const audiences = [
  "Negocios",
  "Empresas",
  "Emprendedores",
  "Profesionales",
  "Marcas personales",
] as const;
