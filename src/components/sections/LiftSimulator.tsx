"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { BellRing, ChevronUp, Fan, Lightbulb, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { SevenSegment } from "@/components/brand/SevenSegment";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FLOORS = ["G", "1", "2", "3", "4", "5"];
const N = FLOORS.length;
const FLOOR_H = 100 / N; // % of shaft height
const CAR_H = FLOOR_H * 0.86;
const CW_H = 15;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Replica of the Dhanvis black-glass car operating panel button. */
function PanelButton({
  label,
  lit,
  onClick,
  aria,
  children,
}: {
  label?: string;
  lit?: boolean;
  onClick: () => void;
  aria: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      aria-pressed={lit}
      className={`group flex h-12 flex-col items-center justify-center gap-1.5 rounded-xl transition active:scale-95 lg:h-[clamp(2.4rem,5.4vh,3rem)] ${
        lit ? "text-[#8cc2ff] [filter:drop-shadow(0_0_8px_rgba(110,170,255,0.9))]" : "text-steel-200 hover:text-white"
      }`}
    >
      <span className={`h-[2px] w-6 rounded-full ${lit ? "bg-[#8cc2ff]" : "bg-steel-400/60"}`} />
      {label ? <span className="font-display text-2xl font-semibold leading-none">{label}</span> : children}
    </button>
  );
}

const legend = [
  { swatch: "size-2.5 rounded-sm border border-steel-300 bg-navy-900", label: "Car", desc: "Carries passengers between floors." },
  { swatch: "size-2.5 rounded-sm bg-steel-500", label: "Counterweight", desc: "Balances the car, so the motor works less." },
  { swatch: "size-2.5 rounded-full border-2 border-steel-400", label: "Traction sheave", desc: "Grips the ropes and drives the car." },
  { swatch: "h-2.5 w-[3px] bg-steel-500", label: "Guide rails", desc: "Keep the car steady and true." },
];

export function LiftSimulator() {
  const pos = useMotionValue(0);
  const floorRef = useRef(0);
  const queue = useRef<number[]>([]);
  const busy = useRef(false);
  const alive = useRef(true);
  const touched = useRef(false);

  const [display, setDisplay] = useState(0);
  const [requested, setRequested] = useState<number[]>([]);
  const [dir, setDir] = useState<"up" | "down" | null>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [status, setStatus] = useState("Idle at G. Press a floor.");
  const [light, setLight] = useState(true);
  const [fan, setFan] = useState(false);
  const [alarm, setAlarm] = useState(false);

  useMotionValueEvent(pos, "change", (v) => setDisplay(Math.round(v)));

  const carTop = useTransform(pos, (p) => `${100 - (p + 1) * FLOOR_H + (FLOOR_H - CAR_H) / 2}%`);
  const cwTop = useTransform(pos, (p) => `${2 + (p / (N - 1)) * (96 - CW_H)}%`);
  const sheave = useTransform(pos, (p) => p * 140);

  const run = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    while (queue.current.length && alive.current) {
      const here = floorRef.current;
      const target = [...queue.current].sort((a, b) => Math.abs(a - here) - Math.abs(b - here))[0];
      if (target !== here) {
        setDoorsOpen(false);
        setStatus("Doors closing");
        await wait(850);
        const up = target > here;
        setDir(up ? "up" : "down");
        setStatus(`Travelling ${up ? "up" : "down"} to floor ${FLOORS[target]}`);
        await animate(pos, target, {
          duration: 0.7 + Math.abs(target - here) * 0.7,
          ease: [0.45, 0, 0.2, 1],
        });
        floorRef.current = target;
      }
      queue.current = queue.current.filter((f) => f !== target);
      setRequested([...queue.current]);
      setDir(null);
      setDoorsOpen(true);
      setStatus(`Arrived at floor ${FLOORS[target]}, doors open`);
      await wait(1900);
    }
    busy.current = false;
  }, [pos]);

  const press = useCallback(
    (f: number, fromUser = true) => {
      if (fromUser) touched.current = true;
      if (queue.current.includes(f)) return;
      if (f === floorRef.current && !busy.current) {
        setDoorsOpen(true);
        setStatus(`At floor ${FLOORS[f]}, doors open`);
        return;
      }
      queue.current.push(f);
      setRequested([...queue.current]);
      void run();
    },
    [run],
  );

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // Give the demo a first ride when it comes into view, unless the visitor already pressed something.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => !touched.current && press(3, false), 900);
    return () => clearTimeout(t);
  }, [inView, press]);

  const raiseAlarm = () => {
    touched.current = true;
    setAlarm(true);
    setTimeout(() => setAlarm(false), 2600);
  };

  const moving = dir !== null;

  return (
    <section id="demo" className="section-screen overflow-hidden bg-paper">
      <div
        ref={ref}
        className="container-x grid items-center gap-12 lg:flex-1 lg:grid-cols-12 lg:items-stretch lg:gap-8"
      >
        {/* Heading + legend */}
        <div className="flex flex-col justify-center lg:col-span-4">
          <SectionHeading
            floor="demo"
            title={"Take a ride.\nPick any floor."}
            highlight={["Pick", "any", "floor"]}
            intro="An interactive look inside a traction lift. Use the car panel (a replica of the one we install) to call the car, open the doors, switch on the fan or raise the alarm."
          />
          <Reveal delay={0.2}>
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-navy-900/10 pt-6 lg:mt-[4vh] lg:pt-[3vh]">
              {legend.map((l) => (
                <li key={l.label}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy-950">
                    <span className={l.swatch} />
                    {l.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-steel-500">{l.desc}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-steel-500">Tip: press several floors and the car serves the nearest first.</p>
          </Reveal>
        </div>

        {/* Shaft cutaway */}
        <Reveal className="lg:col-span-5 lg:h-full">
          <div
            className={`relative flex flex-col overflow-hidden rounded-[28px] bg-navy-950 p-5 text-white shadow-[0_50px_100px_-40px_rgba(8,20,58,0.6)] ring-1 transition-[box-shadow] duration-300 sm:p-7 lg:h-full lg:p-[3vh] ${
              alarm ? "ring-4 ring-signal/70" : "ring-white/5"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-steel-400">Traction lift · cutaway</p>
              <p
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-steel-200"
                aria-live="polite"
              >
                <span
                  className={`size-1.5 rounded-full ${alarm ? "bg-signal" : moving ? "animate-pulse bg-gold-light" : "bg-emerald-400"}`}
                />
                {alarm ? "Alarm raised. Our team is alerted." : status}
              </p>
            </div>

            {/* Machine room */}
            <div className="relative ml-[10%] mt-5 h-14 shrink-0 rounded-t-xl border border-b-0 border-white/10 bg-white/[0.03] lg:mt-[2.4vh]">
              <span className="absolute left-3 top-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-steel-500">
                Machine room
              </span>
              <div
                style={{ left: "calc(36% - 1px)", right: "calc(20% - 1px)" }}
                className="absolute bottom-0 h-6 rounded-t-full border-2 border-b-0 border-steel-400/70"
              />
              <motion.div
                style={{ rotate: sheave, left: "calc(58% - 20px)" }}
                className="absolute bottom-[4px] grid size-10 place-items-center rounded-full border-[3px] border-steel-300 bg-navy-800"
              >
                <span className="absolute h-full w-[2px] bg-steel-300/70" />
                <span className="absolute h-[2px] w-full bg-steel-300/70" />
                <span className="size-3 rounded-full bg-steel-300" />
              </motion.div>
            </div>

            <div className="flex h-[440px] sm:h-[520px] lg:h-auto lg:min-h-[300px] lg:flex-1">
              {/* Landing labels */}
              <div className="relative w-[10%]">
                {FLOORS.map((f, i) => {
                  const here = display === i;
                  return (
                    <div
                      key={f}
                      className="absolute inset-x-0 flex items-center"
                      style={{ bottom: `${i * FLOOR_H}%`, height: `${FLOOR_H}%` }}
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-full font-mono text-[0.65rem] font-semibold transition-all duration-300 sm:size-7 sm:text-[0.7rem] ${
                          here && doorsOpen && !moving
                            ? "bg-signal text-white shadow-[0_0_16px_rgba(255,43,43,0.7)]"
                            : here
                              ? "text-white ring-1 ring-white/40"
                              : requested.includes(i)
                                ? "text-[#8cc2ff] ring-1 ring-[#8cc2ff]/60"
                                : "text-steel-500"
                        }`}
                      >
                        {f}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Shaft */}
              <div className="relative flex-1 overflow-hidden rounded-b-xl border border-t-0 border-white/10 bg-ink">
                {FLOORS.map((f, i) => (
                  <div
                    key={f}
                    className="absolute inset-x-0 border-t border-dashed border-white/10"
                    style={{ bottom: `${(i + 1) * FLOOR_H}%` }}
                  />
                ))}
                {/* guide rails */}
                <div className="absolute inset-y-0 left-[22.5%] w-[3px] bg-gradient-to-b from-steel-500/60 to-steel-500/30" />
                <div className="absolute inset-y-0 left-[48.5%] w-[3px] bg-gradient-to-b from-steel-500/60 to-steel-500/30" />
                <div className="absolute inset-y-0 left-[72%] w-[2px] bg-steel-600/50" />
                <div className="absolute inset-y-0 left-[88%] w-[2px] bg-steel-600/50" />

                {/* ropes */}
                <motion.div style={{ height: carTop }} className="absolute left-[36%] top-0 w-[2px] bg-steel-300/80" />
                <motion.div style={{ height: cwTop }} className="absolute left-[80%] top-0 w-[2px] bg-steel-300/80" />

                {/* counterweight */}
                <motion.div
                  style={{ top: cwTop, height: `${CW_H}%` }}
                  className="absolute left-[74%] w-[12%] overflow-hidden rounded-md border border-steel-500/60 bg-[repeating-linear-gradient(180deg,#4a5468_0_6px,#2b3243_6px_8px)]"
                />

                {/* car */}
                <motion.div
                  style={{ top: carTop, height: `${CAR_H}%` }}
                  className="absolute left-[25%] w-[22%] rounded-md border-2 border-steel-300 bg-navy-900 shadow-[0_0_40px_rgba(74,146,255,0.25)]"
                >
                  <div
                    className={`absolute inset-[3px] overflow-hidden rounded-[3px] transition-colors duration-500 ${
                      light ? "bg-gradient-to-b from-[#fff4d6] via-[#f5e3b5] to-[#d9b871]" : "bg-gradient-to-b from-[#2a3142] to-[#151a26]"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 flex h-[14%] items-center justify-center gap-1 bg-black/20">
                      <motion.span
                        animate={fan ? { rotate: 360 } : { rotate: 0 }}
                        transition={fan ? { repeat: Infinity, duration: 0.8, ease: "linear" } : { duration: 0.3 }}
                        className="grid"
                      >
                        <Fan className={`size-3 ${light ? "text-navy-900/60" : "text-steel-400/60"}`} />
                      </motion.span>
                    </div>
                    <User
                      className={`absolute bottom-0 left-1/2 h-[70%] w-auto -translate-x-1/2 ${light ? "text-navy-900/25" : "text-black/40"}`}
                      strokeWidth={1.5}
                    />
                    <motion.div
                      animate={{ x: doorsOpen ? "-96%" : "0%" }}
                      transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
                      className="brushed-steel absolute inset-y-0 left-0 w-1/2 border-r border-gold/70"
                    />
                    <motion.div
                      animate={{ x: doorsOpen ? "96%" : "0%" }}
                      transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
                      className="brushed-steel absolute inset-y-0 right-0 w-1/2 border-l border-gold/70"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Car operating panel */}
        <Reveal delay={0.15} className="flex items-center lg:col-span-3">
          <div className="mx-auto w-full max-w-[270px] rounded-[32px] bg-gradient-to-b from-steel-300 via-steel-100 to-steel-400 p-[6px] shadow-[0_40px_80px_-30px_rgba(8,20,58,0.55)]">
            <div className="rounded-[27px] bg-gradient-to-b from-[#0d1017] to-[#040508] px-6 pb-6 pt-6 lg:px-[2.6vh] lg:pb-[2.6vh] lg:pt-[2.6vh]">
              <div className="flex h-14 items-center justify-center gap-3 rounded-xl bg-black lg:h-[clamp(2.8rem,6.4vh,3.5rem)]">
                <SevenSegment value={FLOORS[display]} className="h-9 lg:h-[clamp(1.6rem,4vh,2.25rem)]" />
                <ChevronUp
                  strokeWidth={3}
                  className={`size-6 text-signal transition-all duration-300 ${
                    dir === "down" ? "rotate-180" : ""
                  } ${dir ? "opacity-100" : "opacity-15"}`}
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 lg:mt-[2vh]">
                <LogoMark variant="light" className="h-7 w-auto" />
                <div className="leading-none">
                  <p className="font-display text-sm font-bold tracking-wide text-white">DHANVIS</p>
                  <p className="mt-0.5 text-[0.5rem] tracking-[0.18em] text-steel-400">ELEVATORS PVT. LTD.</p>
                </div>
              </div>

              <div className="mx-auto mt-3 w-fit rounded-lg border border-white/20 px-3 py-1 text-center font-mono text-[0.55rem] uppercase leading-relaxed text-steel-300 lg:mt-[1.6vh]">
                <span className="text-signal/80">No smoking</span>
                <br />4 persons · 272 kg
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 lg:mt-[2vh]">
                {[4, 5, 2, 3, 0, 1].map((f) => (
                  <PanelButton
                    key={f}
                    label={FLOORS[f]}
                    lit={requested.includes(f)}
                    onClick={() => press(f)}
                    aria={`Floor ${FLOORS[f]}`}
                  />
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 border-t border-white/10 pt-3 lg:mt-[1.6vh] lg:pt-[1.6vh]">
                <PanelButton
                  aria="Open doors"
                  onClick={() => {
                    touched.current = true;
                    if (!busy.current) setDoorsOpen(true);
                  }}
                >
                  <span className="font-display text-xl font-semibold leading-none">&lsaquo;&thinsp;&rsaquo;</span>
                </PanelButton>
                <PanelButton
                  aria="Close doors"
                  onClick={() => {
                    touched.current = true;
                    if (!busy.current) setDoorsOpen(false);
                  }}
                >
                  <span className="font-display text-xl font-semibold leading-none">&rsaquo;&thinsp;&lsaquo;</span>
                </PanelButton>
                <PanelButton aria="Alarm" lit={alarm} onClick={raiseAlarm}>
                  <BellRing className={`size-5 ${alarm ? "text-signal" : ""}`} />
                </PanelButton>
                <PanelButton aria="Cabin light" lit={light} onClick={() => setLight((l) => !l)}>
                  <Lightbulb className="size-5" />
                </PanelButton>
                <PanelButton aria="Cabin fan" lit={fan} onClick={() => setFan((f) => !f)}>
                  <Fan className="size-5" />
                </PanelButton>
                <div className="flex items-center justify-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-steel-500">
                  COP-01
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
