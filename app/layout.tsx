import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "@/state/session";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { shell } from "./layout.styles.css";

/** Defines default document metadata for the Signal application. */
export const metadata: Metadata = {
  title: "Signal — Market intelligence",
  description: "AI-assisted prediction market discovery.",
};

export const viewport: Viewport = {
  initialScale: 1,
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
