"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { Logo } from "@/components/brand/LogoMark";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { fullAddress, liftTypes, mapsLink, navLinks, site, whatsappLink } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "WhatsApp", href: whatsappLink(), icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-white">
      <div className="container-x">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-400">
              All types of lift installation &amp; service across Andhra Pradesh, from our base in Tirupati. Home, passenger, hospital, goods, capsule,
              hydraulic and MRL lifts, installed with care and maintained for life.
            </p>
            <ul className="mt-7 flex gap-3" aria-label="Social links">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.shortName} on ${label}`}
                    className="grid size-11 place-items-center rounded-full border border-white/12 text-steel-300 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:text-navy-950"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-steel-500">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.id);
                    }}
                    className="text-steel-300 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-steel-500">Lifts we install</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-steel-300 lg:grid-cols-1">
              {liftTypes.slice(0, 7).map((l) => (
                <li key={l.key}>{l.title}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-steel-500">Reach us</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 text-steel-300 transition hover:text-white">
                  <Phone className="size-4 text-brand-light" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-steel-300 transition hover:text-white"
                >
                  <InstagramIcon className="size-4 text-brand-light" /> @dhanvis_elevators_pvtltd
                </a>
              </li>
              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-steel-300 transition hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-light" />
                  <span className="leading-relaxed">{fullAddress}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-7 text-xs text-steel-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => scrollToId("lobby")}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-steel-300 transition hover:border-white/30 hover:text-white"
          >
            Back to ground floor
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="pb-[2vw] text-center font-display text-[18vw] font-extrabold leading-none tracking-[-0.04em] text-white/[0.14] [text-shadow:0_0_20px_rgba(255,255,255,0.4),0_0_70px_rgba(255,255,255,0.2)]">
          DHANVIS
        </p>
      </div>
    </footer>
  );
}
