import { useId } from "react";

type Props = {
  className?: string;
  /** "color" for light backgrounds, "light" for dark backgrounds */
  variant?: "color" | "light";
  title?: string;
};

/** Vector redraw of the Dhanvis mark: lift-shaft frames, rising arrow and steel-core building. */
export function LogoMark({ className, variant = "color", title }: Props) {
  const uid = useId().replace(/:/g, "");
  const blue = `b${uid}`;
  const steel = `s${uid}`;
  const mask = `m${uid}`;
  const stops =
    variant === "color"
      ? ["#3a3a3a", "#1a1a1a", "#000000"]
      : ["#ffffff", "#e6e6e6", "#bdbdbd"];

  return (
    <svg
      viewBox="0 0 100 122"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={blue} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.45" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
        <linearGradient id={steel} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a7a7a" />
          <stop offset="0.38" stopColor="#d9d9d9" />
          <stop offset="0.62" stopColor="#9a9a9a" />
          <stop offset="1" stopColor="#c4c4c4" />
        </linearGradient>
        <mask id={mask}>
          <rect x="-10" y="-10" width="120" height="142" fill="white" />
          <path d="M-6 88 L50 32 L106 88 V104 L50 48 L-6 104 Z" fill="black" />
        </mask>
      </defs>
      <g fill={`url(#${blue})`}>
        <g mask={`url(#${mask})`}>
          <path d="M0 0 H100 V82 H92 V8 H8 V82 H0 Z" />
          <path d="M18 33 H82 V66 H74 V41 H26 V66 H18 Z" />
          <path d="M50 12 L67 28.5 H33 Z" />
        </g>
        <path d="M0 88 L50 38 L100 88 V99.3 L50 49.3 L0 99.3 Z" />
        {/* side pillars */}
        <path d="M0 99 H8 V114 H12.5 V86.8 L18 81.3 V122 H0 Z" />
        <path d="M100 99 H92 V114 H87.5 V86.8 L82 81.3 V122 H100 Z" />
      </g>
      {/* steel core */}
      <path d="M28.5 70.8 L50 49.3 L71.5 70.8 V122 H28.5 Z" fill={`url(#${steel})`} />
      <g fill={`url(#${blue})`}>
        <path d="M24.5 74.8 L28.5 70.8 V122 H24.5 Z" />
        <path d="M75.5 74.8 L71.5 70.8 V122 H75.5 Z" />
        <path d="M46 53.3 L50 49.3 L54 53.3 V122 H46 Z" />
      </g>
    </svg>
  );
}

export function Logo({
  variant = "color",
  className = "",
  compact = false,
}: {
  variant?: "color" | "light";
  className?: string;
  compact?: boolean;
}) {
  const word = variant === "light" ? "text-white" : "text-navy-800";
  const sub = variant === "light" ? "text-steel-300" : "text-navy-700";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark variant={variant} className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-extrabold tracking-[0.02em] ${word}`}>
          DHANVIS
        </span>
        {!compact && (
          <span className={`mt-1 font-display text-[0.56rem] font-semibold tracking-[0.32em] ${sub}`}>
            ELEVATORS PVT LTD
          </span>
        )}
      </span>
    </span>
  );
}
