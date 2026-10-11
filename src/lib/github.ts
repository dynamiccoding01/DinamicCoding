/**
 * Datos públicos de GitHub para el perfil de un miembro del equipo.
 * Se leen de la API pública (sin iniciar sesión) y se guardan en caché una
 * hora. Si algo falla (usuario inexistente, límite de la API, sin red), se
 * devuelve `null` y el perfil simplemente no muestra el bloque.
 */

export interface GithubLanguage {
  name: string;
  /** Porcentaje de repositorios propios que usan este lenguaje (0–100) */
  percent: number;
}

export interface GithubStats {
  username: string;
  profileUrl: string;
  /** Repositorios públicos propios (sin contar copias de otros) */
  repos: number;
  stars: number;
  followers: number;
  /** Lenguajes más usados, de mayor a menor (máx. 4, el resto en «Otros») */
  languages: GithubLanguage[];
}

const USERNAME_RE = /^[a-z\d](?:[a-z\d-]{0,38})$/i;
const CACHE_SECONDS = 3600;
const MAX_LANGUAGES = 4;

/** Extrae el usuario de un enlace como https://github.com/usuario */
export function githubUsername(url: string | null): string | null {
  if (!url) return null;
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== "github.com" && hostname !== "www.github.com") return null;
    const username = pathname.split("/").filter(Boolean)[0] ?? "";
    return USERNAME_RE.test(username) ? username : null;
  } catch {
    return null;
  }
}

async function githubFetch<T>(path: string): Promise<T | null> {
  // Opcional: con GITHUB_TOKEN el límite sube de 60 a 5.000 consultas/hora.
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: CACHE_SECONDS },
    // Que GitHub tarde no debe frenar la página ni el build.
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) {
    console.warn(`[github] ${path} → ${res.status}`);
    return null;
  }
  return (await res.json()) as T;
}

type ApiUser = { login: string; html_url: string; followers: number };
type ApiRepo = { fork: boolean; stargazers_count: number; language: string | null };

export async function getGithubStats(
  username: string,
): Promise<GithubStats | null> {
  if (!USERNAME_RE.test(username)) return null;

  try {
    const [user, repos] = await Promise.all([
      githubFetch<ApiUser>(`/users/${username}`),
      githubFetch<ApiRepo[]>(
        `/users/${username}/repos?per_page=100&type=owner&sort=pushed`,
      ),
    ]);
    if (!user || !repos) return null;

    const own = repos.filter((repo) => !repo.fork);
    const stars = own.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    const counts = new Map<string, number>();
    for (const repo of own) {
      if (repo.language) {
        counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
      }
    }
    const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, MAX_LANGUAGES);
    const rest = sorted.slice(MAX_LANGUAGES).reduce((sum, [, n]) => sum + n, 0);
    const languages: GithubLanguage[] = total
      ? [...top, ...(rest ? ([["Otros", rest]] as [string, number][]) : [])].map(
          ([name, n]) => ({ name, percent: Math.round((n / total) * 100) }),
        )
      : [];

    return {
      username: user.login,
      profileUrl: user.html_url,
      repos: own.length,
      stars,
      followers: user.followers,
      languages,
    };
  } catch (error) {
    console.warn("[github] no se pudo leer el perfil:", error);
    return null;
  }
}
