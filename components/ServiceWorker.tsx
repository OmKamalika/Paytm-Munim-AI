"use client";

import { useEffect } from "react";

// Registers the minimal service worker (installability + honest offline page).
// Skipped on localhost dev so it never interferes with hot reload.
export default function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV === "development") return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
