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
  /**
   * Partes principales de este tipo de página, en el orden de los números de
   * su maqueta (`src/components/services/service-mockup.tsx`).
   */
  parts: { title: string; text: string }[];
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
    parts: [
      { title: "Título que engancha", text: "Dice en una frase qué ofreces y por qué elegirte." },
      { title: "Un solo botón de acción", text: "Lleva al visitante a escribirte por WhatsApp, sin distracciones." },
      { title: "Beneficios", text: "Las razones para elegirte, claras y en pocas palabras." },
      { title: "Confianza", text: "Opiniones, fotos o resultados que respaldan lo que ofreces." },
    ],
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
    parts: [
      { title: "Quiénes son", text: "Tu negocio y lo que haces, explicado en pocas líneas." },
      { title: "Horarios", text: "Cuándo atiendes, siempre a la vista." },
      { title: "Ubicación", text: "Un mapa para que te encuentren sin perderse." },
      { title: "Contacto", text: "Botones para llamarte o escribirte por WhatsApp." },
    ],
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
    parts: [
      { title: "Secciones claras", text: "Empresa, servicios, equipo, proyectos y contacto, cada uno en su lugar." },
      { title: "Servicios", text: "Lo que ofrece la empresa, explicado con claridad." },
      { title: "Equipo", text: "Las personas que hay detrás de la empresa." },
      { title: "Trayectoria y proyectos", text: "Lo que ya hicieron, para ganar credibilidad." },
    ],
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
    parts: [
      { title: "Buscador", text: "Para encontrar un producto en segundos." },
      { title: "Categorías", text: "Los productos ordenados para recorrerlos fácil." },
      { title: "Fichas de producto", text: "Foto, nombre y detalles de cada producto." },
      { title: "Pedido por WhatsApp", text: "El cliente consulta o pide el producto con un toque." },
    ],
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
    parts: [
      { title: "Productos con precio", text: "Cada producto con su foto, su precio y un botón para agregarlo." },
      { title: "Carrito", text: "El cliente junta lo que quiere comprar." },
      { title: "Pago en línea", text: "Paga por internet al terminar su compra." },
      { title: "Pedidos", text: "Cada compra queda registrada para que la gestiones." },
    ],
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
    parts: [
      { title: "Servicios", text: "El cliente elige qué quiere reservar." },
      { title: "Calendario", text: "Ve qué días hay disponibles." },
      { title: "Horarios libres", text: "Escoge la hora que le conviene." },
      { title: "Confirmación", text: "Confirma su reserva y queda agendada." },
    ],
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
    parts: [
      { title: "Pantallas a medida", text: "Pensadas para la forma en que trabaja tu negocio." },
      { title: "Datos e indicadores", text: "La información que necesitas, siempre a la vista." },
      { title: "Procesos automáticos", text: "Las tareas repetitivas las hace el sistema." },
      { title: "Usuarios y permisos", text: "Cada persona ve y hace solo lo que le corresponde." },
    ],
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
