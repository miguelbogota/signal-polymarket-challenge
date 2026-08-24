import Link from "next/link";
import * as styles from "./page.styles.css";

/** Presents the AI-powered Signal product landing experience. */
export default function Home() {
  return (
    <section className={styles.hero}>
      <div>
        <div className={styles.eyebrow}>Prediction intelligence / 01</div>
        <h1 className={styles.pageTitle}>
          Make the signal
          <br />
          your edge.
        </h1>
        <p className={styles.lead}>
          Signal turns live prediction markets into calm, decisive
          opportunities. AI-assisted context, transparent probabilities, and a
          focused portfolio—all in one place.
        </p>
        <div className={styles.actions}>
          <Link className={styles.button} href="/authentication">
            Enter Signal
          </Link>
          <Link className={styles.ghost} href="/search">
            Explore markets
          </Link>
        </div>
      </div>
      <div className={styles.orb}>
        <div className={styles.orbPlane} />
        <div className={styles.signalCard}>
          <span className={styles.eyebrow}>AI market read</span>
          <div className={styles.score}>
            72<span className={styles.eyebrow}>%</span>
          </div>
          <p>
            Confidence: moderate. Momentum is rising, but the evidence is
            incomplete.
          </p>
          <div className={styles.yesChoice}>
            <span>YES</span>
            <strong>0.72</strong>
          </div>
          <div className={styles.choice}>
            <span>NO</span>
            <strong>0.28</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
