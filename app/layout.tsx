import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayTMunim — Intent Guard demo",
  description: "A private synthetic demo of merchant cash planning, delegated supplier terms and intent drift review.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
