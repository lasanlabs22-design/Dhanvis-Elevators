const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  G: "afedc",
  "-": "g",
  " ": "",
};

const h = (y: number) => `6,${y} 11,${y - 4.5} 49,${y - 4.5} 54,${y} 49,${y + 4.5} 11,${y + 4.5}`;
const v = (x: number, y1: number, y2: number) =>
  `${x},${y1 + 1.5} ${x + 4.5},${y1 + 6} ${x + 4.5},${y2 - 6} ${x},${y2 - 1.5} ${x - 4.5},${y2 - 6} ${x - 4.5},${y1 + 6}`;

const SHAPES: Record<string, string> = {
  a: h(5),
  g: h(50),
  d: h(95),
  f: v(5, 5, 50),
  e: v(5, 50, 95),
  b: v(55, 5, 50),
  c: v(55, 50, 95),
};

type Props = {
  value: string;
  digits?: number;
  className?: string;
  on?: string;
  off?: string;
  glow?: boolean;
};

/** Seven-segment floor display, modelled on the red indicators in Dhanvis panels. */
export function SevenSegment({
  value,
  digits = 1,
  className = "",
  on = "var(--color-signal)",
  off = "rgba(255,43,43,0.08)",
  glow = true,
}: Props) {
  const chars = value.toUpperCase().padStart(digits, " ").slice(-digits).split("");
  return (
    <span
      className={`inline-flex gap-[0.12em] ${className}`}
      role="img"
      aria-label={`Floor ${value.trim() || "none"}`}
      style={glow ? { filter: `drop-shadow(0 0 6px ${on === "var(--color-signal)" ? "rgba(255,43,43,0.55)" : on})` } : undefined}
    >
      {chars.map((ch, i) => {
        const lit = SEGMENTS[ch] ?? "";
        return (
          <svg key={i} viewBox="0 0 60 100" className="h-full w-auto" aria-hidden>
            <g transform="skewX(-7) translate(7 0)">
              {Object.entries(SHAPES).map(([seg, pts]) => (
                <polygon
                  key={seg}
                  points={pts}
                  fill={lit.includes(seg) ? on : off}
                  style={{ transition: "fill 120ms ease" }}
                />
              ))}
            </g>
          </svg>
        );
      })}
    </span>
  );
}
