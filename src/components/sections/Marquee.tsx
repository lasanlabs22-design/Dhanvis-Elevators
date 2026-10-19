import { liftTypes } from "@/lib/site";

/** Single-row ticker of lift types, docked at the bottom of the hero. */
export function Marquee() {
  const items = liftTypes.map((l) => l.title);
  return (
    <div
      className="relative overflow-hidden border-t border-white/8 bg-ink/50 py-5 backdrop-blur-sm lg:py-[2.2vh]"
      aria-hidden
    >
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`whitespace-nowrap px-7 font-display text-2xl font-bold tracking-[-0.02em] lg:text-[clamp(1.4rem,3.4vh,2.25rem)] ${
                  i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]" : "text-steel"
                }`}
              >
                {t}
              </span>
              <svg viewBox="0 0 20 18" className="size-3.5 shrink-0 fill-brand-light/80" aria-hidden>
                <path d="M10 0 20 18H0Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
