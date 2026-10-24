"use client";

import { MapPin, Navigation, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fullAddress, mapsEmbed, mapsLink, site, whatsappLink } from "@/lib/site";

const propertyTypes = ["Independent house / villa", "Apartment", "Commercial building", "Hospital", "Warehouse / industrial", "Other"];
const requirements = ["New lift installation", "AMC / maintenance", "Repair / breakdown", "Modernisation", "Not sure yet"];

const field =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-white placeholder:text-steel-500 outline-none transition focus:border-brand-light focus:bg-white/[0.07] focus:ring-4 focus:ring-brand-light/15 lg:py-[clamp(0.55rem,1.3vh,0.8rem)]";
const label = "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-steel-400";

const quick = [
  { href: site.phoneHref, label: "Call", value: site.phone.replace("+91 ", ""), icon: Phone, iconBg: "bg-white text-ink", external: false },
  { href: whatsappLink(), label: "WhatsApp", value: "Chat now", icon: WhatsAppIcon, iconBg: "bg-whatsapp", external: true },
  {
    href: site.socials.instagram,
    label: "Instagram",
    value: "Follow us",
    icon: InstagramIcon,
    iconBg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    external: true,
  },
];

export function Contact() {
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (!name) return setError("Please tell us your name.");
    if (phone.length < 10) return setError("Please enter a valid 10-digit phone number.");
    setError("");
    const lines = [
      "Hello Dhanvis Elevators,",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Property: ${data.get("property")}`,
      `Requirement: ${data.get("requirement")}`,
      data.get("floors") ? `Floors: ${data.get("floors")}` : "",
      data.get("message") ? `Message: ${data.get("message")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-screen grain overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute -left-40 bottom-0 size-[620px] rounded-full bg-white/[0.05] blur-[150px]" />
      <div className="container-x relative grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-5">
          <SectionHeading
            floor="contact"
            tone="dark"
            title={"Let's plan\nyour lift."}
            highlight={["your", "lift"]}
            intro="Tell us about your building and we'll arrange a free site survey. Prefer to talk? Call or WhatsApp us directly."
          />

          <Reveal delay={0.1} className="mt-8 grid grid-cols-3 gap-2.5 lg:mt-[3.5vh]">
            {quick.map(({ href, label: l, value, icon: Icon, iconBg, external }) => (
              <a
                key={l}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition sm:p-3.5 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className={`grid size-10 place-items-center rounded-xl ${iconBg}`}>
                  <Icon className="size-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-steel-400">{l}</span>
                  <span className="block truncate text-[0.8rem] font-semibold sm:text-sm">{value}</span>
                </span>
              </a>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-3 flex flex-col overflow-hidden rounded-2xl border border-white/10 lg:min-h-[180px] lg:flex-1">
            <div className="flex items-start gap-3 p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-light" />
              <address className="text-sm not-italic leading-relaxed text-steel-300">
                <span className="block font-semibold text-white">{site.name}</span>
                {fullAddress}
              </address>
            </div>
            <div className="relative h-52 lg:h-auto lg:flex-1">
              <iframe
                src={mapsEmbed}
                title="Dhanvis Elevators location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)_brightness(0.95)]"
              />
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy-950 shadow-lg"
              >
                <Navigation className="size-3.5" /> Get directions
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex lg:col-span-7">
          <form
            onSubmit={submit}
            noValidate
            className="flex w-full flex-col justify-center rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-9 lg:p-[3.6vh]"
          >
            <p className="font-display text-2xl font-bold lg:text-[clamp(1.25rem,2.8vh,1.6rem)]">Request a free site survey</p>
            <p className="mt-1.5 text-sm text-steel-400">Your enquiry opens in WhatsApp, ready to send to our team.</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-[3vh] lg:gap-[1.8vh]">
              <div>
                <label htmlFor="name" className={label}>Your name</label>
                <input id="name" name="name" autoComplete="name" placeholder="Full name" className={field} required />
              </div>
              <div>
                <label htmlFor="phone" className={label}>Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  className={field}
                  required
                />
              </div>
              <div>
                <label htmlFor="property" className={label}>Property type</label>
                <select id="property" name="property" className={`${field} appearance-none`} defaultValue={propertyTypes[0]}>
                  {propertyTypes.map((p) => (
                    <option key={p} className="bg-navy-950">{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="requirement" className={label}>Requirement</label>
                <select id="requirement" name="requirement" className={`${field} appearance-none`} defaultValue={requirements[0]}>
                  {requirements.map((r) => (
                    <option key={r} className="bg-navy-950">{r}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <span className={label}>Number of floors</span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Number of floors">
                  {["G+1", "G+2", "G+3", "G+4", "G+5", "G+6 & above"].map((f) => (
                    <label key={f} className="cursor-pointer">
                      <input type="radio" name="floors" value={f} className="peer sr-only" />
                      <span className="block rounded-full border border-white/12 px-4 py-1.5 text-sm text-steel-300 transition peer-checked:border-brand-light peer-checked:bg-white/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-light hover:border-white/30">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>Anything else?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Location, timeline, special requirements…"
                  className={`${field} resize-none`}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-[#ff8a8a]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group mt-7 inline-flex w-full items-center justify-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 font-semibold text-navy-950 transition hover:bg-brand-pale sm:w-auto lg:mt-[3vh]"
            >
              Send enquiry on WhatsApp
              <span className="grid size-10 place-items-center rounded-full bg-whatsapp text-white transition-transform group-hover:rotate-[-8deg] group-hover:scale-105">
                <WhatsAppIcon className="size-5" />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
