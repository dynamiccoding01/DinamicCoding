import type { CSSProperties, ReactNode } from "react";
import type { ServiceType } from "@/lib/services";
import { cn } from "@/lib/utils";

/*
  Maquetas ilustrativas de los siete tipos de página, dibujadas en SVG con los
  colores de la marca. No son capturas de proyectos reales. En la tarjeta se
  ven quietas; en el detalle (`detailed`) se arman pieza por pieza y muestran
  números que siguen el orden de `parts` en services.ts. La animación son las
  clases `.mock-*` de globals.css.
*/

/** Línea de texto simulada. */
function Bar({
  x,
  y,
  w,
  h = 4,
  c = "fill-brand-200",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  c?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={c} />;
}

/** Bloque o tarjeta, con borde si `line`. */
function Box({
  x,
  y,
  w,
  h,
  r = 6,
  c = "fill-surface-soft",
  line,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  c?: string;
  line?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className={cn(c, line && "stroke-line")}
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** Imagen simulada: recuadro con sol y montañas. */
function Pic({
  x,
  y,
  w,
  h,
  r = 6,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
}) {
  const px = (f: number) => x + w * f;
  const py = (f: number) => y + h * f;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} className="fill-brand-100" />
      <circle cx={px(0.22)} cy={py(0.32)} r={Math.min(w, h) * 0.1} className="fill-brand-200" />
      <path
        d={`M${px(0.08)} ${py(0.88)} L${px(0.38)} ${py(0.45)} L${px(0.56)} ${py(0.68)} L${px(0.7)} ${py(0.52)} L${px(0.92)} ${py(0.88)} Z`}
        className="fill-brand-200"
      />
    </g>
  );
}

/** Visto bueno dentro de un círculo verde. */
function Check({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} className="fill-whatsapp" />
      <path
        d={`M${cx - 2.5} ${cy} l2 2 l3.5 -4`}
        className="fill-none stroke-white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Grupo que entra con el retraso `d` cuando la maqueta se arma. */
function Piece({ d, children }: { d: number; children: ReactNode }) {
  return (
    <g className="mock-piece" style={{ "--d": d } as CSSProperties}>
      {children}
    </g>
  );
}

/** Barra del sitio simulado: logo y enlaces que terminan en `end`. */
function Nav({
  items = 4,
  end = 300,
  children,
}: {
  items?: number;
  end?: number;
  children?: ReactNode;
}) {
  return (
    <Piece d={0}>
      <rect x={20} y={30} width={34} height={9} rx={3} className="fill-navy" />
      {Array.from({ length: items }, (_, i) => (
        <Bar key={i} x={end - 20 - i * 28} y={32.5} w={20} />
      ))}
      {children}
    </Piece>
  );
}

function Landing() {
  return (
    <>
      <Nav items={0}>
        <rect x={262} y={29} width={38} height={11} rx={5.5} className="fill-whatsapp" />
      </Nav>
      <Piece d={1}>
        <Bar x={20} y={55} w={150} h={11} c="fill-navy" />
        <Bar x={20} y={70} w={116} h={11} c="fill-navy" />
        <Bar x={20} y={88} w={140} />
        <Bar x={20} y={97} w={104} />
      </Piece>
      <Piece d={2}>
        <Pic x={186} y={52} w={114} h={74} r={8} />
      </Piece>
      <Piece d={3}>
        <rect x={20} y={110} width={80} height={17} rx={8.5} className="fill-whatsapp" />
        <Bar x={34} y={116.5} w={52} c="fill-white" />
      </Piece>
      <Piece d={4}>
        {[20, 116, 212].map((x) => (
          <g key={x}>
            <Box x={x} y={138} w={88} h={44} line />
            <circle cx={x + 13} cy={151} r={5} className="fill-brand-500" />
            <Bar x={x + 10} y={162} w={62} />
            <Bar x={x + 10} y={170} w={44} c="fill-brand-100" />
          </g>
        ))}
      </Piece>
      <Piece d={5}>
        <Box x={20} y={190} w={280} h={22} c="fill-brand-50" />
        {[34, 45, 56].map((cx) => (
          <circle key={cx} cx={cx} cy={201} r={6} className="fill-brand-200 stroke-white" strokeWidth={1.5} />
        ))}
        <Bar x={70} y={195} w={120} c="fill-brand-300" />
        <Bar x={70} y={203} w={84} />
        {[240, 252, 264, 276, 288].map((cx) => (
          <circle key={cx} cx={cx} cy={201} r={3} className="fill-sky" />
        ))}
      </Piece>
    </>
  );
}

function Informativa() {
  return (
    <>
      <Nav />
      <Piece d={1}>
        <Bar x={20} y={54} w={118} h={10} c="fill-navy" />
        <Bar x={20} y={71} w={150} />
        <Bar x={20} y={80} w={138} />
        <Bar x={20} y={89} w={96} />
      </Piece>
      <Piece d={2}>
        <Pic x={190} y={52} w={110} h={48} r={8} />
      </Piece>
      <Piece d={3}>
        <Box x={20} y={110} w={134} h={64} r={8} line />
        <circle cx={34} cy={124} r={6} className="fill-none stroke-brand-500" strokeWidth={1.5} />
        <path d="M34 120.5 V124 H37" className="fill-none stroke-brand-500" strokeWidth={1.5} strokeLinecap="round" />
        <Bar x={46} y={122} w={52} h={5} c="fill-navy" />
        {[140, 150, 160].map((y) => (
          <g key={y}>
            <Bar x={30} y={y} w={50} />
            <Bar x={104} y={y} w={40} c="fill-brand-300" />
          </g>
        ))}
      </Piece>
      <Piece d={4}>
        <Box x={164} y={110} w={136} h={64} r={8} c="fill-brand-50" />
        <path d="M165 150 H299 M210 111 V173 M254 111 L299 139" className="fill-none stroke-brand-100" strokeWidth={5} />
        <path d="M232 122 a8 8 0 0 1 8 8 c0 6 -8 13 -8 13 s-8 -7 -8 -13 a8 8 0 0 1 8 -8 z" className="fill-brand-500" />
        <circle cx={232} cy={130} r={3} className="fill-white" />
      </Piece>
      <Piece d={5}>
        <rect x={20} y={184} width={104} height={20} rx={10} className="fill-navy" />
        <Bar x={36} y={192} w={72} c="fill-white" />
        <rect x={132} y={184} width={104} height={20} rx={10} className="fill-whatsapp" />
        <Bar x={148} y={192} w={72} c="fill-white" />
      </Piece>
    </>
  );
}

function Corporativa() {
  return (
    <>
      <Nav items={5} />
      <Piece d={1}>
        <rect x={20} y={50} width={280} height={56} rx={8} className="fill-navy" />
        <Bar x={34} y={64} w={118} h={9} c="fill-white" />
        <Bar x={34} y={80} w={90} c="fill-brand-300" />
        <Bar x={34} y={88} w={70} c="fill-brand-300" />
        <path d="M222 106 V78 H238 V106 M244 106 V64 H262 V106 M268 106 V84 H282 V106" className="fill-brand-600" />
      </Piece>
      <Piece d={2}>
        {[20, 116, 212].map((x) => (
          <g key={x}>
            <Box x={x} y={116} w={88} h={40} line />
            <rect x={x + 9} y={125} width={11} height={11} rx={3} className="fill-brand-500" />
            <Bar x={x + 26} y={128} w={40} c="fill-navy" />
            <Bar x={x + 9} y={142} w={60} />
          </g>
        ))}
      </Piece>
      <Piece d={3}>
        {[36, 66, 96, 126].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={176} r={10} className="fill-brand-200" />
            <Bar x={cx - 11} y={192} w={22} h={3} c="fill-brand-300" />
          </g>
        ))}
      </Piece>
      <Piece d={4}>
        <Pic x={152} y={166} w={70} h={42} />
        <Pic x={230} y={166} w={70} h={42} />
      </Piece>
    </>
  );
}

function Catalogo() {
  const cards = [20, 92, 164, 236];
  return (
    <>
      <Nav items={3} />
      <Piece d={1}>
        <Box x={20} y={50} w={280} h={16} r={8} line />
        <circle cx={32} cy={57.5} r={3.5} className="fill-none stroke-muted" strokeWidth={1.5} />
        <path d="M34.5 60 L37.5 63" className="stroke-muted" strokeWidth={1.5} strokeLinecap="round" />
        <Bar x={44} y={56} w={84} c="fill-brand-100" />
      </Piece>
      <Piece d={2}>
        <rect x={20} y={74} width={44} height={12} rx={6} className="fill-navy" />
        <Bar x={28} y={78} w={28} c="fill-white" />
        {[
          [70, 50],
          [126, 40],
          [172, 54],
        ].map(([x, w]) => (
          <g key={x}>
            <rect x={x} y={74} width={w} height={12} rx={6} className="fill-brand-50 stroke-brand-200" vectorEffect="non-scaling-stroke" />
            <Bar x={x + 8} y={78} w={w - 16} c="fill-brand-300" />
          </g>
        ))}
      </Piece>
      <Piece d={3}>
        {cards.map((x) => (
          <g key={x}>
            <Box x={x} y={94} w={64} h={98} c="fill-surface" line />
            <Pic x={x + 4} y={98} w={56} h={44} r={4} />
            <Bar x={x + 6} y={150} w={44} c="fill-navy" />
            <Bar x={x + 6} y={158} w={30} />
          </g>
        ))}
      </Piece>
      <Piece d={4}>
        {cards.map((x) => (
          <g key={x}>
            <rect x={x + 6} y={170} width={52} height={14} rx={7} className="fill-whatsapp" />
            <Bar x={x + 16} y={175} w={32} c="fill-white" />
          </g>
        ))}
      </Piece>
    </>
  );
}

function Tienda() {
  return (
    <>
      <Nav items={3} end={276}>
        <path
          d="M281 31 h3 l2.5 8 h10.5 l2.5 -6 h-14"
          className="fill-none stroke-navy"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={288} cy={42.5} r={1.5} className="fill-navy" />
        <circle cx={296} cy={42.5} r={1.5} className="fill-navy" />
        <circle cx={300} cy={30} r={4} className="fill-brand-500" />
      </Nav>
      <Piece d={1}>
        {[
          [20, 50],
          [111, 50],
          [20, 134],
          [111, 134],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <Box x={x} y={y} w={83} h={76} c="fill-surface" line />
            <Pic x={x + 4} y={y + 4} w={75} h={38} r={4} />
            <Bar x={x + 6} y={y + 48} w={46} c="fill-navy" />
            <rect x={x + 6} y={y + 58} width={24} height={7} rx={2} className="fill-brand-500" />
            <rect x={x + 62} y={y + 55} width={15} height={13} rx={4} className="fill-navy" />
            <path
              d={`M${x + 69.5} ${y + 58} v7 M${x + 66} ${y + 61.5} h7`}
              className="stroke-white"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        ))}
      </Piece>
      <Piece d={2}>
        <Box x={204} y={50} w={96} h={124} r={8} line />
        <Bar x={214} y={60} w={40} h={5} c="fill-navy" />
        {[74, 93, 112].map((y) => (
          <g key={y}>
            <rect x={214} y={y} width={14} height={14} rx={3} className="fill-brand-100" />
            <Bar x={233} y={y + 2} w={36} />
            <Bar x={233} y={y + 9} w={22} h={3} c="fill-brand-100" />
            <Bar x={276} y={y + 5} w={16} c="fill-brand-300" />
          </g>
        ))}
        <path d="M214 134 H290" className="stroke-line" vectorEffect="non-scaling-stroke" />
        <Bar x={214} y={140} w={28} h={5} c="fill-navy" />
        <Bar x={266} y={140} w={26} h={5} c="fill-navy" />
      </Piece>
      <Piece d={3}>
        <rect x={214} y={153} width={78} height={14} rx={7} className="fill-navy" />
        <Bar x={234} y={158} w={38} c="fill-white" />
      </Piece>
      <Piece d={4}>
        <Box x={204} y={182} w={96} h={28} r={8} c="fill-surface" line />
        <Check cx={218} cy={196} />
        <Bar x={229} y={191} w={58} c="fill-navy" />
        <Bar x={229} y={199} w={40} h={3} />
      </Piece>
    </>
  );
}

function Reservas() {
  return (
    <>
      <Nav />
      <Piece d={1}>
        {[20, 116, 212].map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y={50}
              width={88}
              height={22}
              rx={8}
              className={i === 0 ? "fill-navy" : "fill-surface-soft stroke-line"}
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={x + 13} cy={61} r={4} className={i === 0 ? "fill-brand-300" : "fill-brand-200"} />
            <Bar x={x + 23} y={59} w={50} c={i === 0 ? "fill-white" : "fill-brand-300"} />
          </g>
        ))}
      </Piece>
      <Piece d={2}>
        <Box x={20} y={82} w={150} h={128} r={8} c="fill-surface" line />
        <Bar x={30} y={92} w={58} h={5} c="fill-navy" />
        <path
          d="M148 91.5 l-3 3 l3 3 M156 91.5 l3 3 l-3 3"
          className="fill-none stroke-muted"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {Array.from({ length: 35 }, (_, i) => (
          <rect
            key={i}
            x={30 + (i % 7) * 19}
            y={106 + Math.floor(i / 7) * 19}
            width={16}
            height={15}
            rx={3}
            className={i === 17 ? "fill-brand-500" : i % 7 === 6 ? "fill-surface-soft" : "fill-brand-50"}
          />
        ))}
      </Piece>
      <Piece d={3}>
        <Bar x={180} y={86} w={56} h={5} c="fill-navy" />
        {Array.from({ length: 9 }, (_, i) => {
          const x = 180 + (i % 3) * 41;
          const y = 98 + Math.floor(i / 3) * 20;
          const picked = i === 4;
          const taken = i === 2 || i === 6;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={37}
                height={14}
                rx={7}
                className={picked ? "fill-navy" : taken ? "fill-surface-soft" : "fill-brand-50 stroke-brand-200"}
                vectorEffect="non-scaling-stroke"
              />
              <Bar x={x + 9} y={y + 5} w={19} c={picked ? "fill-white" : taken ? "fill-line" : "fill-brand-300"} />
            </g>
          );
        })}
      </Piece>
      <Piece d={4}>
        <rect x={180} y={164} width={119} height={16} rx={8} className="fill-brand-500" />
        <Bar x={214} y={170} w={52} c="fill-white" />
        <Box x={180} y={188} w={119} h={22} r={8} c="fill-brand-50" />
        <Check cx={193} cy={199} />
        <Bar x={204} y={197} w={76} c="fill-navy" />
      </Piece>
    </>
  );
}

function Personalizada() {
  return (
    <>
      <Piece d={0}>
        <path d="M1 22 H64 V219 H13 A12 12 0 0 1 1 207 Z" className="fill-navy" />
        <Bar x={12} y={33} w={34} h={7} c="fill-white" />
        <rect x={7} y={53} width={50} height={14} rx={4} className="fill-brand-600" />
        <Bar x={14} y={58} w={30} c="fill-white" />
        {[78, 94, 110, 126].map((y) => (
          <Bar key={y} x={14} y={y} w={34} c="fill-brand-300" />
        ))}
      </Piece>
      <Piece d={1}>
        <Bar x={76} y={33} w={70} h={7} c="fill-navy" />
        <circle cx={292} cy={36} r={7} className="fill-brand-200" />
      </Piece>
      <Piece d={2}>
        {[76, 152, 228].map((x) => (
          <g key={x}>
            <Box x={x} y={50} w={72} h={36} line />
            <Bar x={x + 8} y={57} w={30} h={3} />
            <Bar x={x + 8} y={66} w={38} h={9} c="fill-navy" />
            <Bar x={x + 50} y={69} w={14} h={5} c="fill-whatsapp" />
          </g>
        ))}
        <Box x={76} y={94} w={148} h={76} c="fill-surface" line />
        {[30, 44, 24, 52, 38, 58, 46].map((h, i) => (
          <rect
            key={i}
            x={88 + i * 18}
            y={160 - h}
            width={10}
            height={h}
            rx={2}
            className={i === 5 ? "fill-brand-500" : "fill-brand-200"}
          />
        ))}
      </Piece>
      <Piece d={3}>
        <Box x={232} y={94} w={68} h={76} line />
        {[104, 126, 148].map((y, i) => (
          <g key={y}>
            <rect
              x={244}
              y={y}
              width={44}
              height={13}
              rx={4}
              className={i === 2 ? "fill-whatsapp" : "fill-brand-50 stroke-brand-200"}
              vectorEffect="non-scaling-stroke"
            />
            <Bar x={252} y={y + 4.5} w={28} c={i === 2 ? "fill-white" : "fill-brand-300"} />
          </g>
        ))}
        <path d="M266 117 V126 M266 139 V148" className="stroke-brand-300" strokeWidth={1.5} />
      </Piece>
      <Piece d={4}>
        <Box x={76} y={178} w={224} h={32} line />
        {[186, 198].map((y, i) => (
          <g key={y}>
            <circle cx={88} cy={y + 2} r={4.5} className="fill-brand-200" />
            <Bar x={98} y={y} w={i ? 50 : 64} c="fill-navy" />
            <rect x={250} y={y - 2} width={40} height={9} rx={4.5} className={i ? "fill-brand-50" : "fill-brand-100"} />
          </g>
        ))}
      </Piece>
    </>
  );
}

const SCREENS: Record<string, () => ReactNode> = {
  "landing-page": Landing,
  "pagina-informativa": Informativa,
  "pagina-corporativa": Corporativa,
  "catalogo-digital": Catalogo,
  "tienda-online": Tienda,
  "pagina-de-reservas": Reservas,
  "pagina-web-personalizada": Personalizada,
};

/** Centro de cada número (1, 2, 3…), en el orden de `parts`. */
const MARKERS: Record<string, [number, number][]> = {
  "landing-page": [[12, 60.5], [12, 118.5], [12, 146], [12, 201]],
  "pagina-informativa": [[12, 59], [12, 118], [296, 114], [12, 194]],
  "pagina-corporativa": [[156, 34.5], [12, 124], [12, 176], [148, 168]],
  "catalogo-digital": [[12, 58], [12, 80], [12, 102], [12, 177]],
  "tienda-online": [[12, 58], [204, 50], [205, 160], [204, 184]],
  "pagina-de-reservas": [[12, 61], [12, 92], [246, 88.5], [299, 164]],
  "pagina-web-personalizada": [[54, 36.5], [76, 50], [232, 94], [76, 178]],
};

function Marker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g className="mock-marker" style={{ "--d": n } as CSSProperties}>
      <circle cx={x} cy={y} r={8.5} className="fill-brand-500 stroke-white" strokeWidth={2} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white font-display text-[10px] font-bold"
      >
        {n}
      </text>
    </g>
  );
}

export function ServiceMockup({
  type,
  detailed = false,
  className,
}: {
  type: ServiceType;
  /** Se arma al cargar y numera sus partes (página de detalle). */
  detailed?: boolean;
  className?: string;
}) {
  const Screen = SCREENS[type.slug];
  if (!Screen) return null;

  return (
    <svg
      viewBox="0 0 320 220"
      className={cn("block h-auto w-full", detailed && "mock-animated", className)}
      {...(detailed
        ? { role: "img", "aria-label": `Maqueta ilustrativa: ${type.title}` }
        : { "aria-hidden": true })}
    >
      {/* Ventana del navegador */}
      <rect x={0.5} y={0.5} width={319} height={219} rx={12} className="fill-surface stroke-line" vectorEffect="non-scaling-stroke" />
      <path d="M1 22 V12.5 A11.5 11.5 0 0 1 12.5 1 H307.5 A11.5 11.5 0 0 1 319 12.5 V22 Z" className="fill-surface-soft" />
      <path d="M1 22 H319" className="stroke-line" vectorEffect="non-scaling-stroke" />
      {[12, 22, 32].map((cx) => (
        <circle key={cx} cx={cx} cy={11.5} r={3} className="fill-brand-200" />
      ))}
      <rect x={46} y={6} width={160} height={11} rx={5.5} className="fill-surface stroke-line" vectorEffect="non-scaling-stroke" />

      <Screen />

      {detailed &&
        MARKERS[type.slug]?.map(([x, y], i) => (
          <Marker key={i} n={i + 1} x={x} y={y} />
        ))}
    </svg>
  );
}
