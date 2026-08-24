"use client";

import Link from "next/link";
import { useSession } from "@/hooks/use-session";
import * as styles from "./navbar.styles.css";

/** Renders global navigation and reflects the current authentication state. */
export function Navbar() {
  const { user, signOut } = useSession();

  return (
    <nav className={styles.nav}>
      <Link className={styles.brand} href="/">
        sig<i className={styles.brandAccent}>nal</i>
      </Link>
      <div className={styles.links}>
        <Link href="/search">Explore</Link>
        <Link href="/trending">Trending</Link>
        {user && <Link href={`/profile/${user.username}`}>Portfolio</Link>}
      </div>
      {user ? (
        <div className={styles.actions}>
          <Link className={styles.action} href={`/profile/${user.username}`}>
            @{user.username}
          </Link>
          <button className={styles.action} onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <Link className={styles.signIn} href="/authentication">
          Sign in
        </Link>
      )}
    </nav>
  );
}
