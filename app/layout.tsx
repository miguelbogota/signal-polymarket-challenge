import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "@/state/session";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { shell } from "./layout.styles.css";

/** Identifies the canonical public origin used by generated metadata. */
const siteUrl = "https://signal-polymarket-challenge.vercel.app";

/** Defines default document metadata for the Signal application. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Signal",
  title: {
    default: "Signal — AI-assisted market intelligence",
    template: "%s | Signal",
  },
  description:
    "Discover prediction markets, understand the signal, and track simulated positions with AI-assisted context.",
  keywords: [
    "prediction markets",
    "market intelligence",
    "AI recommendations",
    "Polymarket",
    "Signal",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Signal",
    title: "Signal — AI-assisted market intelligence",
    description:
      "Discover prediction markets, understand the signal, and track simulated positions with AI-assisted context.",
  },
  twitter: {
    card: "summary",
    title: "Signal — AI-assisted market intelligence",
    description:
      "Discover prediction markets, understand the signal, and track simulated positions with AI-assisted context.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/** Defines responsive viewport behavior and the browser color hint. */
export const viewport: Viewport = {
  initialScale: 1,
  themeColor: "#090b12",
  width: "device-width",
};

/** Wraps every page with the document shell and shared navigation. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={themeClass} suppressHydrationWarning>
        <SessionProvider>
          <div className={shell}>
            <Navbar />
          </div>
          <main className={shell}>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
