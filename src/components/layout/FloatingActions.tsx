"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 500));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 xl:right-[23px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <a
            href={site.phoneHref}
            className="grid size-13 place-items-center rounded-full bg-white text-navy-950 shadow-xl ring-1 ring-black/5 transition hover:scale-105 md:hidden"
            aria-label={`Call ${site.phone}`}
          >
            <Phone className="size-5" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative grid size-13 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp/40" />
            <WhatsAppIcon className="relative size-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
