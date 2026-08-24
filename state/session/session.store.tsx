"use client";

import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Represents the hardcoded demonstration account. */
export type User = { username: string; email: string; password: string };
/** Defines the session state and actions shared by all authenticated UI consumers. */
type SessionStore = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, password: string) => User;
  signOut: () => void;
};
/** Defines the browser storage operations used by the session provider. */
type SafeStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Identifies the persisted browser session record. */
const key = "signal-user";
/** Represents the private demonstration account. */
export const demoCredentials: User = {
  username: "miguel",
  email: "miguel@signal.demo",
  password: "signal2026",
};
/** Retains session data in environments without working browser storage. */
const memory = new Map<string, string>();
/** Supplies a safe in-memory replacement for unavailable local storage. */
const fallbackStorage: SafeStorage = {
  getItem: (entry) => memory.get(entry) ?? null,
  setItem: (entry, value) => {
    memory.set(entry, value);
  },
  removeItem: (entry) => {
    memory.delete(entry);
  },
};
/** Shares one session value between all descendants of the root provider. */
const SessionContext = createContext<SessionStore | null>(null);

/** Selects browser storage when available and a safe fallback otherwise. */
function storage(): SafeStorage {
  const candidate = window.localStorage as Partial<Storage>;
  return typeof candidate.getItem === "function" &&
    typeof candidate.setItem === "function" &&
    typeof candidate.removeItem === "function"
    ? (candidate as SafeStorage)
    : fallbackStorage;
}

/** Creates the state and actions shared by the session provider. */
function useSessionState(): SessionStore {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = storage().getItem(key);
    if (raw) setUser(JSON.parse(raw));
    setReady(true);
  }, []);

  return useMemo(
    () => ({
      user,
      ready,
      signIn: (email: string, password: string) => {
        if (
          email !== demoCredentials.email ||
          password !== demoCredentials.password
        )
          throw new Error("Use the demo credentials shown below.");

        storage().setItem(key, JSON.stringify(demoCredentials));
        setUser(demoCredentials);
        return demoCredentials;
      },
      signOut: () => {
        storage().removeItem(key);
        setUser(null);
      },
    }),
    [ready, user],
  );
}

/** Makes one session store available to the whole application tree. */
export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSessionState();

  return <SessionContext value={session}>{children}</SessionContext>;
}

/** Reads the session shared by the nearest session provider. */
export function useSessionStore() {
  const session = useContext(SessionContext);

  if (!session)
    throw new Error("useSession must be used within SessionProvider.");

  return session;
}
