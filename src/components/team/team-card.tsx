import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TeamMember } from "@/lib/types";

/** Tarjeta de colega en la grilla del equipo. Enlaza a su perfil. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/equipo/${member.slug}`}
      className="glass card-glow group flex flex-col items-center rounded-2xl p-8 text-center transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <Avatar name={member.name} src={member.avatar_url} size={104} />
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{member.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{member.headline}</p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {member.skills.slice(0, 3).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
        Ver perfil
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
