import Link from "next/link";
import * as styles from "./page.styles.css";

/** Presents the branded recoverable error page. */
export default function ErrorPage() {
  return (
    <div className={styles.page}>
      <span className={styles.eyebrow}>Signal interrupted</span>
      <h1 className={styles.title}>We lost the thread.</h1>
      <p className={styles.lead}>
        The market desk is temporarily unavailable. Try again in a moment.
      </p>
      <Link className={styles.action} href="/">
        Return home
      </Link>
    </div>
  );
}
