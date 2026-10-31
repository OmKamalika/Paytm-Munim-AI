import type { Metadata, Viewport } from "next";
import PWAStatus from "../components/PWAStatus";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayTMunim — Intent Guard demo",
  description: "A private demo of merchant cash planning, delegated supplier terms and intent drift review.",
  manifest: "/manifest.webmanifest",
  applicationName: "PayTMunim",
  appleWebApp: { capable: true, title: "PayTMunim", statusBarStyle: "default" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#002e6e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PWAStatus>{children}</PWAStatus></body></html>;
}
