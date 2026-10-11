import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ProfileSection } from "@/components/team/profile-section";
import { getGithubStats } from "@/lib/github";

// Tonos de la marca para la barra de lenguajes, del más usado al menos usado.
const SHADES = [
  "bg-brand-800",
  "bg-brand-500",
  "bg-brand-300",
  "bg-brand-200",
  "bg-slate-300",
];

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-surface-soft px-3.5 py-2.5">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-display text-xl font-extrabold text-navy">
        {value.toLocaleString("es")}
      </dd>
    </div>
  );
}

/**
 * Bloque con los datos públicos de GitHub de la persona. Se actualiza solo.
 * Si GitHub no responde o el usuario no existe, no se muestra nada.
 */
export async function GithubCard({ username }: { username: string }) {
  const stats = await getGithubStats(username);
  if (!stats) return null;

  return (
    <ProfileSection
      Icon={GithubIcon}
      title="GitHub"
      action={
        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="no-print inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-navy"
        >
          @{stats.username}
          <ArrowUpRight size={15} />
        </a>
      }
    >
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2.5">
        <Stat label="Repositorios" value={stats.repos} />
        {/* Las cifras en cero no aportan: solo se muestran si hay algo que contar. */}
        {stats.stars > 0 && <Stat label="Estrellas" value={stats.stars} />}
        {stats.followers > 0 && <Stat label="Seguidores" value={stats.followers} />}
      </dl>

      {stats.languages.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-medium text-muted">Lenguajes más usados</p>
          <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-surface-soft">
            {stats.languages.map((language, i) => (
              <span
                key={language.name}
                className={SHADES[i] ?? SHADES[SHADES.length - 1]}
                style={{ width: `${language.percent}%` }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-soft">
            {stats.languages.map((language, i) => (
              <li key={language.name} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${SHADES[i] ?? SHADES[SHADES.length - 1]}`}
                />
                {language.name}
                <span className="text-muted">{language.percent}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ProfileSection>
  );
}
