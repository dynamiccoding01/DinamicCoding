/**
 * Roles del personal. En la base de datos se guardan como texto en
 * `team_members.roles`; aquí se traducen a la etiqueta que ve el visitante.
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
