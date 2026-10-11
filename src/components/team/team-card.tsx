import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { roleLabel } from "@/lib/roles";
import type { TeamMember } from "@/lib/types";

/** Roles de la persona como etiquetas (desarrollador, consultor…). */
export function RoleBadges({
  member,
  className,
}: {
  member: TeamMember;
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

/** Tarjeta de una persona del equipo. Enlaza a su perfil. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/equipo/${member.slug}`}
      className="card card-hover group flex h-full flex-col items-center rounded-2xl p-8 text-center"
    >
      <Avatar name={member.name} src={member.avatar_url} size={104} />
      <h3 className="mt-5 font-display text-lg font-bold text-navy">
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{member.role}</p>
      <RoleBadges member={member} className="mt-4 flex flex-wrap justify-center gap-2" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {member.headline}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Ver perfil
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
