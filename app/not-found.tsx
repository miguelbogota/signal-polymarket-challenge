import Link from "next/link";
import * as styles from "./not-found.styles.css";

/** Presents the branded missing-market experience for unresolved routes. */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <span className={styles.eyebrow}>404 / Market absent</span>
      <h1 className={styles.title}>
        This signal
        <br />
        doesn't exist.
      </h1>
      <p className={styles.lead}>
        It may have resolved, closed, or moved out of our current feed.
      </p>
      <Link className={styles.action} href="/search">
        Browse markets
      </Link>
    </div>
  );
}
