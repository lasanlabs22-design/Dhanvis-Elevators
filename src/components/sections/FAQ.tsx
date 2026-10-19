"use client";

import { AnimatePresence, motion } from "motion/react";
import { Phone, Plus } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, site, whatsappLink } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-screen bg-paper">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div>
            <SectionHeading
              floor="faq"
              title={"Questions,\nanswered."}
              highlight={["answered."]}
              intro="Planning a lift raises a lot of questions. Here are the ones we hear most, and we're always happy to talk through the rest."
            />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3 lg:mt-[4vh]">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                <Phone className="size-4" /> Call us
              </a>
              <a
                href={whatsappLink("Hello Dhanvis Elevators, I have a question about lifts.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-900/30"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" /> Ask on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="border-b border-navy-900/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left lg:py-[2.1vh]"
                    >
                      <span className="font-display text-lg font-semibold text-navy-950 lg:text-[clamp(1rem,2.2vh,1.2rem)]">
                        {f.q}
                      </span>
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-navy-900/15 text-navy-950"
                        }`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-steel-600 lg:pb-[2.4vh] lg:text-[clamp(0.85rem,1.8vh,1rem)]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
