import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { roleLabel } from "@/lib/roles";
import type { TeamMember } from "@/lib/types";

/** Lo que usa la tarjeta: lo justo para mandarlo al navegador (filtro). */
export type TeamCardMember = Pick<
  TeamMember,
  "id" | "slug" | "name" | "role" | "roles" | "headline" | "avatar_url"
>;

/** Roles de la persona como etiquetas (desarrollador, consultor…). */
export function RoleBadges({
  member,
  className,
}: {
  member: Pick<TeamMember, "roles">;
  className?: string;
}) {
  const roles = member.roles ?? [];
  if (roles.length === 0) return null;
  return (
    <div className={className}>
      {roles.map((role) => (
        <Badge key={role} tone="brand">
          {roleLabel(role)}
        </Badge>
      ))}
    </div>
  );
}

/** Tarjeta compacta de una persona del equipo. Enlaza a su perfil. */
export function TeamCard({ member }: { member: TeamCardMember }) {
  return (
    <Link
      href={`/equipo/${member.slug}`}
      className="card card-hover group flex h-full items-start gap-4 rounded-2xl p-5"
    >
      <Avatar name={member.name} src={member.avatar_url} size={64} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-snug text-navy">
            {member.name}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
          />
        </div>
        <p className="mt-0.5 text-sm font-medium text-brand-600">{member.role}</p>
        <RoleBadges member={member} className="mt-2.5 flex flex-wrap gap-1.5" />
        {member.headline && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {member.headline}
          </p>
        )}
      </div>
    </Link>
  );
}
