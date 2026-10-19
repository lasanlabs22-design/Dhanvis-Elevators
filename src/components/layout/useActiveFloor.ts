"use client";

import { useEffect, useState } from "react";
import { floors, type FloorId } from "@/lib/site";

/** Tracks which "floor" (section) is currently in the middle of the viewport. */
export function useActiveFloor(): FloorId {
  const [active, setActive] = useState<FloorId>("lobby");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as FloorId);
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    floors.forEach((f) => {
      const el = document.getElementById(f.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}
