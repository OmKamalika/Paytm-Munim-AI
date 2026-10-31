"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Download, WifiOff, X } from "lucide-react";
import "./PWAStatus.css";

type InstallPrompt = Event & {
  prompt: () => Promise<unknown>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function subscribeConnection(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

const connectionSnapshot = () => navigator.onLine;
const serverConnectionSnapshot = () => true;

export default function PWAStatus({ children }: { children: ReactNode }) {
  const online = useSyncExternalStore(subscribeConnection, connectionSnapshot, serverConnectionSnapshot);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [installing, setInstalling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [installError, setInstallError] = useState(false);
  const reconnectMessage = useRef<HTMLElement>(null);
  const blocked = !online || refreshing;

  useEffect(() => {
    // Installation is offered only when the browser supplies a real prompt.
    const offerInstall = (event: Event) => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches
        || (navigator as Navigator & { standalone?: boolean }).standalone;
      if (standalone) return;
      event.preventDefault();
      setInstallError(false);
      setInstallPrompt(event as InstallPrompt);
    };
    const installed = () => setInstallPrompt(null);
    let wasOffline = !navigator.onLine;
    const disconnected = () => { wasOffline = true; };
    const reconnected = () => {
      if (!wasOffline) return;
      setRefreshing(true);
      // A fresh document reruns account reads; offline actions are never replayed.
      window.location.reload();
    };
    window.addEventListener("beforeinstallprompt", offerInstall);
    window.addEventListener("appinstalled", installed);
    window.addEventListener("offline", disconnected);
    window.addEventListener("online", reconnected);
    if (window.isSecureContext && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {
        // The connected app remains usable if a browser blocks service workers.
      });
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", offerInstall);
      window.removeEventListener("appinstalled", installed);
      window.removeEventListener("offline", disconnected);
      window.removeEventListener("online", reconnected);
    };
  }, []);

  useEffect(() => {
    if (blocked) reconnectMessage.current?.focus();
  }, [blocked]);

  async function install() {
    if (!installPrompt || installing) return;
    setInstalling(true);
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
    } catch {
      setInstallError(true);
    } finally {
      // A beforeinstallprompt event can be used once, including when dismissed.
      setInstallPrompt(null);
      setInstalling(false);
    }
  }

  return <>
    <div inert={blocked || undefined} data-connection-state={refreshing ? "refreshing" : online ? "online" : "offline"}>{children}</div>
    {blocked && <div className="pm-connection-backdrop">
      <section ref={reconnectMessage} className="pm-connection-message" role="alertdialog" aria-modal="true" aria-labelledby="pm-connection-title" aria-describedby="pm-connection-detail" tabIndex={-1}>
        <WifiOff size={26} aria-hidden="true" />
        <h2 id="pm-connection-title">{refreshing ? "Connection restored" : "You're offline"}</h2>
        <p id="pm-connection-detail">{refreshing ? "Refreshing your latest information…" : "Reconnect to continue. Actions are unavailable offline and nothing is queued."}</p>
      </section>
    </div>}
    {installPrompt && !blocked && <aside className="pm-install" aria-label="Install PayTMunim">
      <button className="pm-install-action" type="button" disabled={installing} onClick={() => { void install(); }}><Download size={17} aria-hidden="true" />{installing ? "Opening install prompt…" : "Install PayTMunim"}</button>
      <button className="pm-install-dismiss" type="button" aria-label="Dismiss install offer" onClick={() => setInstallPrompt(null)}><X size={16} aria-hidden="true" /></button>
    </aside>}
    {installError && !blocked && <aside className="pm-install pm-install-error" role="status">
      <p>Installation couldn&apos;t open. Reload to try again.</p>
      <button className="pm-install-dismiss" type="button" aria-label="Dismiss installation message" onClick={() => setInstallError(false)}><X size={16} aria-hidden="true" /></button>
    </aside>}
  </>;
}
