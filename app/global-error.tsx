"use client";

import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { button, eyebrow, page, title } from "./global-error.styles.css";

/** Provides a minimal recovery view when the root application fails. */
export default function GlobalError() {
  return (
    <html>
      <body className={themeClass}>
        <div className={page}>
          <span className={eyebrow}>500 / Signal interrupted</span>
          <h1 className={title}>Something broke.</h1>
          <button className={button} onClick={() => location.reload()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
