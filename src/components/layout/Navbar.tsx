"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/LogoMark";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { floors, navLinks, site, whatsappLink } from "@/lib/site";
import { useActiveFloor } from "./useActiveFloor";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveFloor();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid ? "border-b border-white/8 bg-navy-950/75 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <nav className="container-x flex h-[72px] items-center justify-between gap-6" aria-label="Main">
            <a
              href="#lobby"
              onClick={(e) => {
                e.preventDefault();
                go("lobby");
              }}
              aria-label="Dhanvis Elevators home"
            >
              <Logo variant="light" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active === l.id ? "text-white" : "text-steel-300 hover:text-white"
                    }`}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={site.phoneHref}
                className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/90 transition hover:text-white md:inline-flex"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="group hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-brand-pale sm:inline-flex"
              >
                Free site survey
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu, styled as a lift car operating panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-950/96 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            exit={{ clipPath: "inset(0 50% 0 50%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex h-full flex-col pb-8 pt-24" data-lenis-prevent>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-steel-400">Select a floor</p>
              <ul className="mt-6 grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar">
                {floors.map((f, i) => (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.03 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(f.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                        active === f.id
                          ? "border-brand-light/60 bg-brand/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-steel-200"
                      }`}
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full border font-display text-sm font-bold ${
                          active === f.id
                            ? "border-brand-light text-brand-light shadow-[0_0_18px_rgba(74,146,255,0.5)]"
                            : "border-white/20"
                        }`}
                      >
                        {f.floor}
                      </span>
                      <span className="text-sm font-medium">{f.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-navy-950"
                >
                  <Phone className="size-4" /> Call now
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 text-sm font-semibold text-navy-950"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </div>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-steel-300"
              >
                <InstagramIcon className="size-4" /> @dhanvis_elevators_pvtltd
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
