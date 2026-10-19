import { Reveal, SplitHeading } from "@/components/motion/Reveal";
import { floorOf, type FloorId } from "@/lib/site";

type Props = {
  floor: FloorId;
  title: string;
  highlight?: string[];
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function FloorTag({ floor, tone = "light" }: { floor: FloorId; tone?: "light" | "dark" }) {
  const f = floorOf(floor);
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-3 rounded-full border py-1 pl-1 pr-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] ${
        dark ? "border-white/12 bg-white/[0.04] text-steel-300" : "border-navy-900/10 bg-white text-steel-600"
      }`}
    >
      <span
        className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[0.7rem] font-semibold tracking-normal ${
          dark ? "bg-signal/15 text-signal" : "bg-navy-900 text-white"
        }`}
      >
        {f.floor}
      </span>
      Floor {f.floor === "G" ? "G" : f.floor.padStart(2, "0")} · {f.label}
    </span>
  );
}

/** Intro paragraph, sized to the viewport height on large screens. */
export function SectionIntro({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`max-w-2xl text-base leading-relaxed sm:text-lg lg:text-[clamp(0.95rem,1.9vh,1.125rem)] ${
        tone === "dark" ? "text-steel-300" : "text-steel-600"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  floor,
  title,
  highlight = [],
  intro,
  tone = "light",
  align = "left",
  className = "",
}: Props) {
  const dark = tone === "dark";
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <FloorTag floor={floor} tone={tone} />
      </Reveal>
      <SplitHeading
        text={title}
        highlight={highlight}
        highlightClass={dark ? "text-steel" : "text-brand-gradient"}
        className={`mt-6 font-display text-[2.1rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:mt-[2.4vh] lg:text-[clamp(2.1rem,5.4vh,3.4rem)] ${
          dark ? "text-white" : "text-navy-950"
        }`}
      />
      {intro && (
        <Reveal delay={0.15}>
          <SectionIntro tone={tone} className={`mt-6 lg:mt-[2.2vh] ${center ? "mx-auto" : ""}`}>
            {intro}
          </SectionIntro>
        </Reveal>
      )}
    </div>
  );
}
