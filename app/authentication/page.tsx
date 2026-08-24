"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { useSession } from "@/hooks/use-session";
import * as styles from "./page.styles.css";

/** Shows private sign-in only to visitors without an active session. */
export default function Authentication() {
  const router = useRouter();
  const { user, ready } = useSession();

  useEffect(() => {
    if (ready && user) router.replace(`/profile/${user.username}`);
  }, [ready, router, user]);

  if (!ready || user) return null;

  return (
    <div className={styles.page}>
      <div className={styles.eyebrow}>Private signal terminal</div>
      <AuthForm />
    </div>
  );
}
