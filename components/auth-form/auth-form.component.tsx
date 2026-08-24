"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, demoCredentials } from "@/hooks/use-session";
import { Button } from "@/components/button";
import * as styles from "./auth-form.styles.css";

/** Renders the private demo sign-in form and redirects successful users. */
export function AuthForm() {
  const router = useRouter();
  const { signIn } = useSession();
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [error, setError] = useState("");

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        try {
          const user = signIn(email, password);
          router.push(`/profile/${user.username}`);
        } catch (err) {
          setError((err as Error).message);
        }
      }}
    >
      <span className={styles.eyebrow}>Members only</span>
      <h2 className={styles.title}>Welcome back.</h2>
      <label className={styles.field}>
        Email
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </label>
      <label className={styles.field}>
        Password
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      {error && <p className={styles.feedback}>{error}</p>}
      <Button type="submit">Sign in to Signal</Button>
      <p className={styles.muted}>
        Demo access: miguel@signal.demo / signal2026
        <br />
        Account registration is unavailable for this private prototype.
      </p>
    </form>
  );
}
