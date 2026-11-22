"use client";

import { useState } from "react";
import { TeamCard, type TeamCardMember } from "@/components/team/team-card";
import { ROLE_GROUPS, mainRole } from "@/lib/roles";
import { cn } from "@/lib/utils";

function Chip({
  label,
  count,
  pressed,
  onClick,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        pressed
          ? "bg-navy text-white"
          : "border border-line bg-white text-ink-soft hover:border-brand-300 hover:bg-brand-50 hover:text-navy",
      )}
    >
      {label}
      <span className={cn("text-xs", pressed ? "text-brand-200" : "text-muted")}>
        {count}
      </span>
    </button>
  );
}

// En pantalla grande un grupo ocupa tantas columnas como personas tiene (hasta
// 3): así los grupos de una o dos personas se acomodan lado a lado.
const SPAN = ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3"];
const COLS = ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3"];

function Group({
  title,
  text,
  members,
}: {
  title: string;
  text?: string;
  members: TeamCardMember[];
}) {
  const n = Math.min(members.length, 3);
  return (
    <section className={SPAN[n]}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-display text-xl font-extrabold tracking-tight text-navy">
          {title}
        </h2>
        {text && <p className="text-sm text-muted">{text}</p>}
      </div>
      <div className={cn("mt-5 grid gap-4 sm:grid-cols-2", COLS[n])}>
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

/**
 * El equipo agrupado por rol, con un filtro opcional arriba. «Todos» muestra
 * los grupos (cada persona una vez, ver `mainRole`); un rol muestra a todos
 * los que lo cumplen, aunque su grupo sea otro.
 */
export function TeamDirectory({ members }: { members: TeamCardMember[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const groups = ROLE_GROUPS.map((group) => ({
    ...group,
    main: members.filter((m) => mainRole(m.roles) === group.role),
    all: members.filter((m) => m.roles.includes(group.role)),
  })).filter((group) => group.all.length > 0);
  const others = members.filter((m) => !mainRole(m.roles));
  const active = groups.find((group) => group.role === filter);

  return (
    <>
      <div role="group" aria-label="Filtrar por rol" className="flex flex-wrap gap-2">
        <Chip
          label="Todos"
          count={members.length}
          pressed={!active}
          onClick={() => setFilter(null)}
        />
        {groups.map((group) => (
          <Chip
            key={group.role}
            label={group.title}
            count={group.all.length}
            pressed={active?.role === group.role}
            onClick={() => setFilter(group.role)}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-x-4 gap-y-10 lg:grid-cols-3">
        {active ? (
          <Group title={active.title} text={active.text} members={active.all} />
        ) : (
          <>
            {groups
              .filter((group) => group.main.length > 0)
              .map((group) => (
                <Group
                  key={group.role}
                  title={group.title}
                  text={group.text}
                  members={group.main}
                />
              ))}
            {others.length > 0 && <Group title="Equipo" members={others} />}
          </>
        )}
      </div>
    </>
  );
}
