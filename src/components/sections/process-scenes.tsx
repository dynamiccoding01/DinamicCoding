import type { CSSProperties } from "react";
import { Check, CheckCheck, Lock, Target } from "lucide-react";
import { serviceTypes } from "@/lib/services";
import { cn } from "@/lib/utils";

/*
  Escenas de «Cómo trabajamos» (una por paso). Son solo CSS: cuando `on` es
  true la escena lleva `pr-on` y arrancan sus animaciones (clases `.pr-*` en
  globals.css); al salir se cancelan y la escena queda en su estado final.
  `--d` es el retraso de cada pieza y `--t` la duración de las que la usan.
*/

/** Retraso (y duración opcional) de una pieza animada. */
const at = (delay: number, dur?: number) =>
  ({ "--d": `${delay}s`, ...(dur ? { "--t": `${dur}s` } : {}) }) as CSSProperties;

const scene = (on: boolean) =>
  cn("pr-scene flex h-full w-full items-center justify-center", on && "pr-on");

/* ─────────────── 1 · Conversamos: celular con WhatsApp ─────────────── */

export function ChatScene({ on }: { on: boolean }) {
  return (
    <div className={scene(on)}>
      <div className="flex aspect-9/17 h-full max-h-[27rem] flex-col overflow-hidden rounded-[2rem] border-[6px] border-navy bg-surface shadow-[0_30px_60px_-30px_rgba(6,33,95,0.6)]">
        <div className="flex items-center gap-2.5 bg-whatsapp px-3.5 py-3 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-display text-[11px] font-extrabold text-navy">
            DC
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold">Dynamic Coding</span>
            <span className="block text-[10px] opacity-80">WhatsApp</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-2.5 bg-brand-50 p-3 text-[12px] leading-snug">
          <p
            className="pr-rise ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-100 px-3 py-2 text-navy"
            style={at(0.3)}
          >
            Hola, quiero una solución para mi negocio.
            <CheckCheck size={13} className="pr-tick ml-1.5 inline text-brand-500" style={at(4.4)} />
          </p>

          <div className="relative">
            <div
              className="pr-typing absolute left-0 top-0 flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-3 opacity-0"
              style={at(1.1, 1.3)}
            >
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
            <p
              className="pr-rise max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-ink-soft"
              style={at(2.5)}
            >
              ¡Hola! Cuéntanos qué quieres lograr.
            </p>
          </div>

          <p
            className="pr-rise ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-100 px-3 py-2 text-navy"
            style={at(3.6)}
          >
            Vender por internet y recibir pedidos.
            <CheckCheck size={13} className="pr-tick ml-1.5 inline text-brand-500" style={at(4.8)} />
          </p>
        </div>

        <div className="m-2.5 rounded-full bg-white px-3 py-2 text-[11px] text-muted">
          Escribe un mensaje
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 2 · Te asesoramos: radar de tipos de página ─────────────── */

const RADIUS = 38; // % del cuadro
const radar = serviceTypes.map((type, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / serviceTypes.length;
  return {
    type,
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
});
// Ejemplo ilustrativo: el tipo que el radar termina eligiendo.
const chosen = Math.max(
  0,
  serviceTypes.findIndex((t) => t.slug === "tienda-online"),
);

export function AdviceScene({ on }: { on: boolean }) {
  const pick = radar[chosen];
  return (
    <div className={scene(on)}>
      <div className="relative aspect-square h-full max-h-[27rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
          <circle cx="50" cy="50" r={RADIUS} stroke="var(--color-brand-300)" strokeWidth="0.35" strokeDasharray="1.4 2" />
          <circle cx="50" cy="50" r="21" stroke="var(--color-brand-200)" strokeWidth="0.35" />
          <line
            x1="50"
            y1="50"
            x2={pick.x}
            y2={pick.y}
            pathLength={1}
            strokeDasharray={1}
            stroke="var(--color-brand-500)"
            strokeWidth="0.9"
            strokeLinecap="round"
            className="pr-draw"
            style={at(2.6)}
          />
        </svg>

        {/* Barrido del radar */}
        <div
          className="pr-sweep absolute inset-[12%] rounded-full opacity-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 72%, rgba(2,116,215,0.3))",
          }}
        />

        {/* Centro: el objetivo del cliente */}
        <div className="absolute left-1/2 top-1/2 -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-lg">
          <span className="pr-ring absolute inset-0 rounded-full border-2 border-brand-500 opacity-0" />
          <Target size={26} />
        </div>

        {radar.map(({ type, x, y }, i) => (
          <div
            key={type.slug}
            className="absolute -ml-[22px] -mt-[22px]"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="pr-pop" style={at(0.2 + i * 0.12)}>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border shadow-sm",
                  i === chosen
                    ? "pr-choose z-10 scale-125 border-brand-500 bg-brand-500 text-white"
                    : "pr-dim border-line bg-white text-brand-600 opacity-40",
                )}
                style={at(i === chosen ? 3.0 : 2.7)}
              >
                <type.Icon size={20} />
              </span>
            </div>
          </div>
        ))}

        {/* Resultado */}
        <div
          className="absolute -translate-x-1/2"
          style={{ left: `${pick.x}%`, top: `calc(${pick.y}% + 2.2rem)` }}
        >
          <span
            className="pr-pop block whitespace-nowrap rounded-full bg-navy px-3 py-1 text-xs font-medium text-white shadow-md"
            style={at(3.5)}
          >
            {serviceTypes[chosen].title}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 3 · La desarrollamos: código que arma la página ─────────────── */

type Piece = [width: number, color: string];
const code: Piece[][] = [
  [[18, "bg-sky"], [30, "bg-white/70"]],
  [[10, "bg-brand-300"], [26, "bg-white/50"]],
  [[10, "bg-brand-300"], [14, "bg-white/50"], [22, "bg-sky"]],
  [[20, "bg-white/50"]],
  [[10, "bg-brand-300"], [34, "bg-white/70"]],
  [[10, "bg-brand-300"], [18, "bg-sky"], [14, "bg-white/50"]],
  [[20, "bg-white/50"]],
  [[24, "bg-sky"], [20, "bg-white/70"]],
];

export function BuildScene({ on }: { on: boolean }) {
  return (
    <div className={scene(on)}>
      <div className="flex h-full max-h-[24rem] w-full max-w-xl flex-col gap-3">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
          {/* Editor */}
          <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-navy-deep p-3 shadow-[0_20px_40px_-24px_rgba(6,33,95,0.7)]">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((n) => (
                <span key={n} className="h-2 w-2 rounded-full bg-white/20" />
              ))}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2.5">
              {code.map((line, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-3 text-[8px] text-white/30">{i + 1}</span>
                  {line.map(([w, color], j) => (
                    <span
                      key={j}
                      className={cn("pr-grow h-1.5 rounded-full", color)}
                      style={{ ...at(0.3 + i * 0.32 + j * 0.1), width: `${w}%` }}
                    />
                  ))}
                  {i === code.length - 1 && (
                    <span className="pr-blink h-3 w-1 bg-sky" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Página que se arma */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-white p-3 shadow-[0_20px_40px_-24px_rgba(6,33,95,0.4)]">
            <div className="pr-pop flex items-center justify-between" style={at(0.8)}>
              <span className="h-2 w-10 rounded-full bg-navy" />
              <span className="flex gap-1">
                <span className="h-1.5 w-5 rounded-full bg-brand-200" />
                <span className="h-1.5 w-5 rounded-full bg-brand-200" />
              </span>
            </div>
            <div className="grid flex-1 grid-cols-[1.2fr_1fr] gap-2.5">
              <div className="flex flex-col justify-center gap-1.5">
                <span className="pr-grow h-2.5 w-full rounded-full bg-navy" style={at(1.4)} />
                <span className="pr-grow h-2.5 w-3/4 rounded-full bg-navy" style={at(1.6)} />
                <span className="pr-grow mt-1 h-1.5 w-full rounded-full bg-brand-200" style={at(1.9)} />
                <span className="pr-grow h-1.5 w-2/3 rounded-full bg-brand-200" style={at(2.1)} />
                <span className="pr-pop mt-1.5 h-4 w-14 rounded-md bg-brand-500" style={at(2.5)} />
              </div>
              <span className="pr-pop rounded-lg bg-brand-100" style={at(2.0)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="pr-rise h-8 rounded-lg border border-line bg-surface-soft"
                  style={at(3.0 + n * 0.2)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progreso de la construcción */}
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm">
          <span className="relative h-4 w-24 text-xs font-medium text-navy">
            <span className="pr-fadeout absolute inset-0" style={at(3.8)}>
              Construyendo…
            </span>
            <span className="pr-fadein absolute inset-0 flex items-center gap-1 opacity-0" style={at(3.9)}>
              <Check size={13} strokeWidth={3} className="text-brand-500" /> Listo
            </span>
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-100">
            <span
              className="pr-fill block h-full w-full origin-left rounded-full bg-brand-500"
              style={at(0.3, 3.6)}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 4 · La publicamos: dominio, publicar, en línea ─────────────── */

export function LaunchScene({ on }: { on: boolean }) {
  return (
    <div className={scene(on)}>
      <div className="flex w-full max-w-md flex-col gap-4">
        {/* Navegador con el dominio que se escribe */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_48px_-28px_rgba(6,33,95,0.5)]">
          <div className="flex items-center gap-3 border-b border-line bg-surface-soft px-3.5 py-2.5">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((n) => (
                <span key={n} className="h-2 w-2 rounded-full bg-brand-200" />
              ))}
            </span>
            <span className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] text-ink-soft">
              <Lock size={11} className="shrink-0 text-brand-500" />
              <span
                className="pr-type inline-block w-[14ch] overflow-hidden whitespace-nowrap"
                style={at(0.4)}
              >
                tu-negocio.com
              </span>
            </span>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-14 rounded-full bg-navy" />
              <span className="h-2 w-16 rounded-full bg-brand-200" />
            </div>
            <div className="grid grid-cols-[1.3fr_1fr] gap-3">
              <div className="space-y-2">
                <span className="block h-3 w-full rounded-full bg-navy" />
                <span className="block h-3 w-4/5 rounded-full bg-navy" />
                <span className="mt-1 block h-2 w-full rounded-full bg-brand-200" />
                <span className="block h-5 w-16 rounded-md bg-brand-500" />
              </div>
              <span className="block h-20 rounded-lg bg-brand-100" />
            </div>
          </div>
        </div>

        {/* Publicar → progreso → en línea */}
        <div className="flex items-center gap-3">
          <span
            className="pr-press inline-flex h-10 items-center rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-md"
            style={at(1.3)}
          >
            Publicar
          </span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-brand-100">
            <span
              className="pr-fill block h-full w-full origin-left rounded-full bg-brand-500"
              style={at(1.7, 1.3)}
            />
          </span>
          <span className="relative">
            <span
              className="pr-pop inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy shadow-md"
              style={at(3.1)}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="pr-ring absolute inset-0 rounded-full bg-whatsapp opacity-0" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-whatsapp" />
              </span>
              En línea
            </span>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "pr-burst pointer-events-none absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full opacity-0",
                  i % 2 ? "bg-sky" : "bg-brand-500",
                )}
                style={{ ...at(3.1), "--a": `${i * 30}deg` } as CSSProperties}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
