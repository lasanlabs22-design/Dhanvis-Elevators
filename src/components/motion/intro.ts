"use client";

import { useSyncExternalStore } from "react";

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** True once the lobby doors have started opening. Hero animations wait for it. */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
