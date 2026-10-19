import { ArrowUpRight, Hammer, Paintbrush, PhoneCall, RefreshCcw, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, site } from "@/lib/site";

const ICONS: LucideIcon[] = [Hammer, Wrench, PhoneCall, RefreshCcw, Paintbrush, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="section-screen bg-paper">
      <div className="container-x grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-4">
          <SectionHeading
            floor="services"
            title={"Service for\nthe long run."}
            highlight={["long", "run"]}
            intro="A lift is a 20-year relationship. One team stays accountable, from the first bolt to every service visit after."
          />
          <Reveal delay={0.2} className="mt-8 rounded-3xl bg-navy-950 p-6 text-white lg:mt-[4vh] lg:p-[3vh]">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-steel-400">Lift stuck or making noise?</p>
            <p className="mt-2 font-display text-xl font-bold">Call our service line</p>
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-signal py-2 pl-5 pr-2 font-semibold text-white transition hover:bg-[#ff4747]"
            >
              {site.phone}
              <span className="grid size-8 place-items-center rounded-full bg-white/20">
                <PhoneCall className="size-4" />
              </span>
            </a>
          </Reveal>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-rows-3">
          {services.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.title}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] border border-navy-900/10 bg-white p-6 transition-colors duration-500 hover:border-navy-950 lg:p-[2.8vh]">
                    {/* Fills from the bottom, like a car rising into view */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy-950 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
                    />
                    <span className="absolute right-5 top-5 font-mono text-xs text-steel-500 transition-colors group-hover:text-brand-light">
                      05.{i + 1}
                    </span>
                    <div className="flex flex-1 items-center gap-4 lg:gap-5">
                      <span className="grid size-11 shrink-0 place-items-center self-start rounded-2xl border border-navy-900/10 text-brand transition-all duration-500 group-hover:border-white/15 group-hover:bg-brand group-hover:text-white">
                        <Icon className="size-5 group-hover:hidden" />
                        <ArrowUpRight className="hidden size-5 group-hover:block" />
                      </span>
                      <div className="pr-6">
                        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-navy-950 transition-colors duration-500 group-hover:text-white lg:text-[clamp(1rem,2.2vh,1.25rem)]">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-steel-600 transition-colors duration-500 group-hover:text-steel-300 lg:text-[clamp(0.8rem,1.65vh,0.9rem)]">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
