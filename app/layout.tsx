import type { Metadata, Viewport } from "next";
import ServiceWorker from "../components/ServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayTMunim — Intent Guard demo",
  description: "A private synthetic demo of merchant cash planning, delegated supplier terms and intent drift review.",
  manifest: "/manifest.webmanifest",
  applicationName: "PayTMunim",
  appleWebApp: { capable: true, title: "PayTMunim", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#002e6e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ServiceWorker/></body></html>;
}
