/**
 * Roles del personal. En la base de datos se guardan como texto en
 * `equipo.funciones`; aquí se traducen a la etiqueta que ve el visitante.
 */
const ROLE_LABELS: Record<string, string> = {
  fundador: "Fundador",
  desarrollador: "Desarrollador",
  consultor: "Consultor",
  promotor: "Promotor",
  disenador: "Diseñador",
  "lider-de-proyecto": "Líder de proyecto",
  soporte: "Soporte",
};

export function roleLabel(role: string) {
  return (
    ROLE_LABELS[role] ?? role.charAt(0).toUpperCase() + role.slice(1)
  );
}

/**
 * Grupos de /equipo, en el orden en que se muestran. El panel guarda las
 * funciones sin prioridad, así que cada persona aparece una vez, en el grupo
 * de su primera función según ESTE orden; el filtro por rol muestra a todos
 * los que la cumplen. Promotor va antes que consultor para que el cliente no
 * confunda a quien promociona con quien desarrolla o asesora. Una función
 * nueva del panel debe sumarse aquí (si no, la persona cae en «Equipo»).
 */
export const ROLE_GROUPS = [
  { role: "fundador", title: "Dirección", text: "Fundó Dynamic Coding y dirige al equipo." },
  { role: "lider-de-proyecto", title: "Líderes de proyecto", text: "Coordinan cada proyecto de principio a fin." },
  { role: "desarrollador", title: "Desarrolladores", text: "Programan y construyen tu página." },
  { role: "disenador", title: "Diseñadores", text: "Diseñan cómo se ve tu página." },
  { role: "promotor", title: "Promotores", text: "Dan a conocer nuestros servicios y te ponen en contacto con el equipo." },
  { role: "consultor", title: "Consultores", text: "Te asesoran para elegir la página que tu negocio necesita." },
  { role: "soporte", title: "Soporte", text: "Te ayudan cuando tu página ya está funcionando." },
];

/** Función que decide el grupo de una persona en /equipo (o `null`). */
export function mainRole(roles: string[]) {
  return ROLE_GROUPS.find((group) => roles.includes(group.role))?.role ?? null;
}
