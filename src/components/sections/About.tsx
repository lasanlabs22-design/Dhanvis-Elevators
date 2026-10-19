import { Building2, Gauge, Layers3, Sparkles } from "lucide-react";
import Image from "next/image";
import { DoorReveal } from "@/components/motion/DoorReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { imageAlt, images } from "@/lib/images";
import { stats } from "@/lib/site";

const pillars = [
  {
    icon: Layers3,
    title: "Every lift type, one team",
    desc: "Home, passenger, hospital, goods, capsule, hydraulic and MRL, all under one roof.",
  },
  {
    icon: Sparkles,
    title: "Made-to-measure interiors",
    desc: "Gold, mirror and glass finishes, laser-cut ceilings and designer panels.",
  },
  {
    icon: Building2,
    title: "Retrofit specialists",
    desc: "Steel shafts bring lifts to buildings never designed for one.",
  },
  {
    icon: Gauge,
    title: "Local, responsive service",
    desc: "A Tirupati team that answers the phone and reaches you fast.",
  },
];

export function About() {
  return (
    <section id="about" className="section-screen overflow-hidden bg-paper">
      <div aria-hidden className="grid-lines-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Images */}
        <div className="relative lg:col-span-5">
          <DoorReveal className="aspect-[4/5] rounded-[28px] shadow-[0_40px_80px_-30px_rgba(8,20,58,0.45)] lg:aspect-auto lg:h-[min(68vh,620px)]">
            <Image
              src={images["glass-atrium-lift"]}
              alt={imageAlt["glass-atrium-lift"]}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
            />
          </DoorReveal>
          <DoorReveal
            delay={0.25}
            className="absolute -bottom-8 -right-2 aspect-[3/4] w-[40%] rounded-[22px] border-[6px] border-paper shadow-2xl sm:-right-8 lg:-bottom-[3vh]"
          >
            <Image
              src={images["hand-panel"]}
              alt={imageAlt["hand-panel"]}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 16vw, 40vw"
              className="object-cover"
            />
          </DoorReveal>
          <Reveal
            delay={0.5}
            className="absolute -left-3 top-8 rounded-2xl bg-navy-950 px-5 py-4 text-white shadow-2xl sm:-left-8"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-steel-400">Survey → AMC</p>
            <p className="mt-1 font-display text-2xl font-bold">
              One team <span className="text-sm font-medium text-steel-300">for life</span>
            </p>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 lg:pl-8">
          <SectionHeading
            floor="about"
            title={"A Tirupati lift company\nwith an eye for detail."}
            highlight={["detail"]}
            intro="Dhanvis Elevators Pvt Ltd installs and services all types of lifts, from two-stop home lifts to busy commercial elevators. One accountable team, from the first survey to lifetime care."
          />

          <div className="mt-10 grid gap-x-8 gap-y-6 border-t border-navy-900/10 pt-8 sm:grid-cols-2 lg:mt-[3.6vh] lg:gap-y-[2.6vh] lg:pt-[3.4vh]">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08} className="group flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-navy-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-steel-600 lg:text-[clamp(0.8rem,1.65vh,0.875rem)]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-navy-900/10 pt-8 lg:mt-[3.4vh] lg:pt-[3.2vh]">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-[clamp(2rem,5vh,3rem)]"
                />
                <p className="mt-1.5 text-xs leading-snug text-steel-500 sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
